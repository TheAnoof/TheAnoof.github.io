/**
 * Image layout for the PDF portfolio's project pages.
 *
 * This script runs ONLY inside the print page (src/pages/portfolio-pdf.astro),
 * which is used to make the PDF and is never published. The website itself
 * still ships no JavaScript.
 *
 * For each project page it takes the selected images (in gallery order) and
 * tries every sensible way of arranging them as nested rows and columns —
 * never cropping, never stretching — then keeps the arrangement that gives
 * the images the most room. Images marked `pdfSize: large` get a bigger share,
 * `small` a smaller one. Caption heights are measured with the real font, and
 * the result is checked against the rendered page before it is accepted.
 *
 * The outcome is published on `window.__PORTFOLIO_PDF__` for the build script
 * (scripts/build-portfolio-pdf.mjs), which refuses to make a PDF if anything
 * went wrong.
 */
(() => {
  'use strict';

  const IN = 96; // CSS pixels per inch
  const GAP_X = 0.16 * IN; // between images side by side
  const GAP_Y = 0.13 * IN; // between a caption and the image below it
  const MIN_SIDE = 1.0 * IN; // no image may be smaller than this on either side
  const MIN_DPI = 130; // low-resolution images are not enlarged past this
  const FAIRNESS = -2; // below 0 favors arrangements where no image is dwarfed; lower = stricter
  const MAX_DEPTH = 3; // rows inside columns inside rows — deep enough
  const MAX_SIDE_BY_SIDE = 4;
  const SHARE = { small: 0.5, normal: 1, large: 2.2 }; // relative area each size aims for

  const state = { ready: false, error: null, sheets: [] };
  window.__PORTFOLIO_PDF__ = state;

  const sum = (list) => list.reduce((a, b) => a + b, 0);
  const isLeaf = (node) => node.i !== undefined;
  const describe = (node) => (isLeaf(node) ? String(node.i + 1) : `${node.dir}(${node.kids.map(describe).join(' ')})`);

  /** Every arrangement of images 0..n-1, kept in order, as nested rows/columns. */
  function arrangements(n) {
    if (n === 1) return [{ i: 0 }];
    const memo = new Map();
    const other = (dir) => (dir === 'row' ? 'col' : 'row');
    // Every way to cut images i..j into consecutive children of a `dir` node.
    const cuts = (i, j, dir, depth) => {
      const key = `${i},${j},${dir},${depth}`;
      if (memo.has(key)) return memo.get(key);
      const out = [];
      for (let k = i; k <= j; k++) {
        const firsts = k === i ? [{ i }] : depth < MAX_DEPTH ? nodes(i, k, other(dir), depth + 1) : [];
        if (k === j) for (const first of firsts) out.push([first]);
        else for (const rest of cuts(k + 1, j, dir, depth)) for (const first of firsts) out.push([first, ...rest]);
      }
      memo.set(key, out);
      return out;
    };
    const nodes = (i, j, dir, depth) =>
      cuts(i, j, dir, depth)
        .filter((kids) => kids.length >= 2 && (dir === 'col' || kids.length <= MAX_SIDE_BY_SIDE))
        .map((kids) => ({ dir, kids }));
    return [...nodes(0, n - 1, 'row', 1), ...nodes(0, n - 1, 'col', 1)];
  }

  /**
   * Geometry for one set of images. `ratio[i]` is width ÷ height,
   * `widest[i]` is the most a low-resolution image may be enlarged to, and
   * `caption(i, width)` is the caption's height when it is that wide.
   */
  function geometry(ratio, widest, caption) {
    // An image fills its slot unless that would enlarge it past its limit.
    const drawnWidth = (i, w) => Math.min(w, widest[i]);
    const leafHeight = (i, w) => drawnWidth(i, w) / ratio[i] + caption(i, drawnWidth(i, w));

    // Largest value in [lo, hi] for which test(value) is still true.
    const largest = (lo, hi, test) => {
      if (test(hi)) return hi;
      for (let k = 0; k < 22 && hi - lo > 0.2; k++) {
        const mid = (lo + hi) / 2;
        if (test(mid)) lo = mid;
        else hi = mid;
      }
      return lo;
    };

    // A row that is (at most) h tall. Plain images in it share one image
    // height: h minus the tallest caption among them — or less, if one of them
    // is low-resolution and may not be enlarged that far. Nested columns match
    // the row's final height.
    const rowAt = (node, h) => {
      const limit = Math.min(Infinity, ...node.kids.filter(isLeaf).map((kid) => widest[kid.i] / ratio[kid.i]));
      let cap = 0;
      let widths = [];
      let height = h;
      for (let k = 0; k < 8; k++) {
        const imageHeight = Math.max(1, Math.min(h - cap, limit));
        height = Math.min(h, imageHeight + cap);
        widths = node.kids.map((kid) => (isLeaf(kid) ? ratio[kid.i] * imageHeight : widthOf(kid, height)));
        const tallest = Math.max(0, ...node.kids.map((kid, j) => (isLeaf(kid) ? caption(kid.i, widths[j]) : 0)));
        if (tallest <= cap + 0.01) break;
        cap = tallest;
      }
      return { h: height, widths, total: sum(widths) + GAP_X * (node.kids.length - 1) };
    };
    const rowFor = (node, w) => rowAt(node, largest(4, 4000, (h) => rowAt(node, h).total <= w));

    function heightOf(node, w) {
      if (isLeaf(node)) return leafHeight(node.i, w);
      if (node.dir === 'col') return sum(node.kids.map((kid) => heightOf(kid, w))) + GAP_Y * (node.kids.length - 1);
      return rowFor(node, w).h;
    }

    function widthOf(node, h) {
      if (isLeaf(node)) return largest(1, 4000, (w) => leafHeight(node.i, w) <= h);
      if (node.dir === 'col') return largest(4, 4000, (w) => heightOf(node, w) <= h);
      return rowAt(node, h).total;
    }

    /**
     * Positions every image for a block that is `w` wide; returns the block
     * height. Each box records the size the image is drawn at and `slot`, the
     * width it was offered (larger only when the image hit its limit).
     */
    function place(node, x, y, w, boxes) {
      if (isLeaf(node)) {
        const width = drawnWidth(node.i, w);
        boxes[node.i] = { x, y, w: width, h: width / ratio[node.i], slot: w };
        return leafHeight(node.i, w);
      }
      if (node.dir === 'col') {
        let top = y;
        node.kids.forEach((kid, j) => {
          top += place(kid, x, top, w, boxes) + (j < node.kids.length - 1 ? GAP_Y : 0);
        });
        return top - y;
      }
      const row = rowFor(node, w);
      const free = w - GAP_X * (node.kids.length - 1);
      const used = sum(row.widths);
      // Normally the row fills its width exactly. If a low-resolution image
      // held it back, keep the sizes and center the shorter row instead.
      const held = used < free * 0.996;
      const scale = held ? 1 : free / used;
      let left = x + (held ? (free - used) / 2 : 0);
      let height = 0;
      node.kids.forEach((kid, j) => {
        const width = row.widths[j] * scale;
        height = Math.max(height, place(kid, left, y, width, boxes));
        left += width + GAP_X;
      });
      return height;
    }

    return { heightOf, place, largest };
  }

  /** Measures caption text with the page's real font. */
  function captionMeter(figures) {
    const style = getComputedStyle(figures[0].querySelector('figcaption'));
    const context = document.createElement('canvas').getContext('2d');
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const lineHeight = parseFloat(style.lineHeight);
    const offset = parseFloat(style.marginTop);
    const space = context.measureText(' ').width;
    const words = figures.map((figure) =>
      figure
        .querySelector('figcaption')
        .textContent.trim()
        .split(/\s+/)
        .map((word) => context.measureText(word).width),
    );
    const extraLines = figures.map(() => 0); // raised if the page wraps a caption more than predicted
    const height = (i, width) => {
      let lines = 1;
      let used = 0;
      for (const word of words[i]) {
        if (used > 0 && used + space + word > width - 1) {
          lines++;
          used = word;
        } else {
          used += (used > 0 ? space : 0) + word;
        }
      }
      return offset + (lines + extraLines[i]) * lineHeight;
    };
    return { height, extraLines, lineHeight };
  }

  function layOut(sheet) {
    const region = sheet.querySelector('.visuals');
    const figures = [...region.querySelectorAll('figure')];
    const title = sheet.querySelector('h2')?.textContent ?? sheet.dataset.project;
    const started = performance.now();
    const W = region.clientWidth;
    const H = region.clientHeight;
    const ratio = figures.map((f) => Number(f.dataset.ratio));
    const share = figures.map((f) => SHARE[f.dataset.size] ?? 1);
    const widest = figures.map((f) => (Number(f.dataset.sourceWidth) / MIN_DPI) * IN);
    const meter = captionMeter(figures);
    const candidates = arrangements(figures.length);

    const block = document.createElement('div');
    block.className = 'vblock';
    region.append(block);
    block.append(...figures);

    let chosen = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const { heightOf, place, largest } = geometry(ratio, widest, meter.height);
      let best = null;
      for (const tree of candidates) {
        const width = heightOf(tree, W) <= H ? W : largest(W * 0.2, W, (w) => heightOf(tree, w) <= H);
        const drawn = [];
        const height = place(tree, 0, 0, width, drawn);
        if (height > H + 0.5) continue;
        if (drawn.some((d) => Math.min(d.w, d.h) < MIN_SIDE)) continue;
        // Score the arrangement by a "fair average" of the image areas (each
        // divided by the share it should get). Unlike a plain total, this
        // average is pulled down hard by any image that ends up tiny, so the
        // winner is the arrangement where the images are large AND none is
        // dwarfed. A small penalty per nested group keeps simple grids ahead
        // of fussy ones.
        const groups = describe(tree).split('(').length - 1;
        const fair = sum(drawn.map((d, i) => share[i] * ((d.w * d.h) / share[i]) ** FAIRNESS)) / sum(share);
        // A low-resolution image sitting in a slot much wider than it can
        // fill leaves a ragged gap, so prefer arrangements that avoid that.
        const gap = Math.max(...drawn.map((d) => 1 - d.w / d.slot));
        const score = fair ** (1 / FAIRNESS) * (1 - 0.01 * groups) * (1 - 0.25 * gap);
        if (!best || score > best.score) best = { tree, width, height, drawn, score };
      }
      if (!best) {
        throw new Error(
          `The ${figures.length} images selected for "${title}" cannot all fit on one page at a readable size. ` +
            `Set "includeInPdf: false" on one or more of them, or mark supporting images "pdfSize: small".`,
        );
      }

      block.style.width = `${best.width}px`;
      block.style.height = `${best.height}px`;
      best.drawn.forEach((d, i) => {
        const figure = figures[i];
        figure.style.left = `${d.x}px`;
        figure.style.top = `${d.y}px`;
        figure.style.width = `${d.w}px`;
        const img = figure.querySelector('img');
        img.style.width = `${d.w}px`;
        img.style.height = `${d.h}px`;
      });

      // Check the prediction against the real page: did any caption take more
      // lines than expected? If so, allow for it and arrange again.
      let wrappedMore = false;
      best.drawn.forEach((d, i) => {
        const actual = figures[i].querySelector('figcaption').getBoundingClientRect().height;
        const predicted = meter.height(i, d.w) - parseFloat(getComputedStyle(figures[i].querySelector('figcaption')).marginTop);
        if (actual > predicted + 0.75) {
          meter.extraLines[i] += Math.max(1, Math.round((actual - predicted) / meter.lineHeight));
          wrappedMore = true;
        }
      });
      chosen = best;
      if (!wrappedMore) break;
    }

    const sheetArea = sheet.clientWidth * sheet.clientHeight;
    state.sheets.push({
      project: sheet.dataset.project,
      title,
      arrangement: describe(chosen.tree),
      tried: candidates.length,
      ms: Math.round(performance.now() - started),
      imageShare: Math.round((sum(chosen.drawn.map((d) => d.w * d.h)) / sheetArea) * 100),
      unusedHeightIn: Number(((H - chosen.height) / IN).toFixed(2)),
      images: chosen.drawn.map((d, i) => ({
        file: figures[i].dataset.file,
        size: figures[i].dataset.size,
        widthIn: Number((d.w / IN).toFixed(2)),
        heightIn: Number((d.h / IN).toFixed(2)),
        // Pixels of the embedded image per printed inch.
        dpi: Math.round(figures[i].querySelector('img').naturalWidth / (d.w / IN)),
        // Pixels of the ORIGINAL file per printed inch (below ~130 looks soft on paper).
        sourceDpi: Math.round(Number(figures[i].dataset.sourceWidth) / (d.w / IN)),
      })),
    });
  }

  async function run() {
    if (document.readyState !== 'complete') await new Promise((resolve) => addEventListener('load', resolve));
    await document.fonts.ready;
    for (const sheet of document.querySelectorAll('.sheet[data-kind="project"]')) layOut(sheet);
  }

  run()
    .catch((error) => {
      state.error = String(error?.message ?? error);
    })
    .finally(() => {
      state.ready = true;
      document.documentElement.dataset.pdf = state.error ? 'error' : 'ready';
    });
})();
