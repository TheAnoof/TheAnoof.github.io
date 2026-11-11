#!/usr/bin/env node
/**
 * Builds the downloadable PDF portfolio.
 *
 *   npm run build     builds the website, then runs this
 *   npm run pdf       same, and also saves page previews and opens the PDF
 *
 * What it does, in order:
 *   1. Opens the print page (dist/portfolio-pdf/) in a headless Chromium.
 *   2. Checks the page BEFORE printing: every image loaded, nothing overflows
 *      or overlaps, everything is inside the printable area, text is black and
 *      large enough to read.
 *   3. Prints it to dist/downloads/<Name>-Engineering-Design-Portfolio.pdf
 *      (US Letter, one page per sheet).
 *   4. Reads the finished PDF back and checks it: page count, page size, that
 *      every piece of source text is on the right page, and that website-only
 *      text did not leak in.
 *   5. Removes the print page from dist/ so it is never published.
 *
 * Any failed check stops with an error and no PDF, so a broken portfolio can
 * never be deployed (the previous version of the site stays online).
 *
 * This script knows nothing about the content. Everything it checks comes from
 * the "manifest" that the print page (src/pages/portfolio-pdf.astro) writes
 * from the content files.
 *
 * Options:  --preview    also save a PNG of every page + a contact sheet to pdf-preview/
 *           --open       open the finished PDF
 *           --keep-page  leave dist/portfolio-pdf/ in place (for debugging)
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const ROUTE = 'portfolio-pdf';
const flags = new Set(process.argv.slice(2));

/** Smallest text allowed, in points. Layout must adapt instead of shrinking text. */
const MIN_PT = { body: 9, caption: 7.5, fine: 6.5 };
/** Nothing may sit closer than this to the edge of the paper (printers can't reach it). */
const SAFE_MARGIN_IN = 0.4;
/** Below this many original pixels per printed inch an image looks soft on paper. */
const SOFT_DPI = 150;
const WARN_BYTES = 5 * 1024 * 1024;
const MAX_BYTES = 12 * 1024 * 1024;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
};

function stop(title, lines = []) {
  console.error(`\n✖ PDF portfolio: ${title}`);
  for (const line of lines) console.error(`    ${line}`);
  console.error('');
  process.exit(1);
}

/** Serves dist/ on a private local address so the page loads exactly as it would online. */
function serve() {
  const server = createServer((request, response) => {
    let path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(dist, path));
    if (!file.startsWith(dist + sep) || !existsSync(file) || !statSync(file).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' });
    response.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/**
 * Runs inside the page. Returns a list of problems (which block the PDF) and
 * details for the report.
 */
function inspectPage({ widthIn, heightIn, safeIn, minPt }) {
  const IN = 96;
  const problems = [];
  const sheets = [...document.querySelectorAll('.sheet')];
  const snippet = (el) => `"${(el.textContent || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 60)}"`;
  const outside = (r, area, slack = 0.5) =>
    r.left < area.left - slack || r.right > area.right + slack || r.top < area.top - slack || r.bottom > area.bottom + slack;

  sheets.forEach((sheet, index) => {
    const name = `Page ${index + 1} (${sheet.dataset.project ?? sheet.dataset.kind})`;
    const box = sheet.getBoundingClientRect();
    if (Math.abs(box.width - widthIn * IN) > 0.5 || Math.abs(box.height - heightIn * IN) > 0.5) {
      problems.push(`${name}: the sheet is ${(box.width / IN).toFixed(2)} × ${(box.height / IN).toFixed(2)} in, not ${widthIn} × ${heightIn} in.`);
    }
    if (sheet.scrollHeight > sheet.clientHeight + 1 || sheet.scrollWidth > sheet.clientWidth + 1) {
      problems.push(`${name}: the content is ${sheet.scrollHeight - sheet.clientHeight}px too tall for one page.`);
    }

    // Everything visible must be inside the printable area.
    const safe = { left: box.left + safeIn * IN, right: box.right - safeIn * IN, top: box.top + safeIn * IN, bottom: box.bottom - safeIn * IN };
    for (const el of sheet.querySelectorAll('h1, h2, p, dt, dd, li, figcaption, img, a')) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && outside(r, safe)) {
        problems.push(`${name}: <${el.tagName.toLowerCase()}> ${snippet(el)} reaches outside the printable area.`);
      }
    }

    // The page's main blocks (header, images, skills, footer…) must not run into each other.
    const blocks = [...sheet.children].filter((el) => el.getBoundingClientRect().height > 0);
    blocks.forEach((el, i) => {
      const next = blocks[i + 1];
      if (next && next.getBoundingClientRect().top < el.getBoundingClientRect().bottom - 0.5) {
        problems.push(`${name}: "${el.className}" overlaps "${next.className}".`);
      }
    });

    // No clipped text. (Tightly set headings let letter tops and tails poke a
    // little past their line box, so allow for that; a lost line is far more.)
    for (const el of sheet.querySelectorAll('h1, h2, p, dt, dd, li, figcaption')) {
      const slack = Math.max(1, 0.4 * parseFloat(getComputedStyle(el).fontSize));
      if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + slack) {
        problems.push(`${name}: text is cut off: ${snippet(el)}.`);
      }
    }

    // Text must be pure black and at least the minimum size for its kind.
    const walker = document.createTreeWalker(sheet, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const el = walker.currentNode.parentElement;
      if (!walker.currentNode.textContent.trim() || seen.has(el)) continue;
      seen.add(el);
      const style = getComputedStyle(el);
      const pt = parseFloat(style.fontSize) * 0.75;
      const kind = el.closest('figcaption') ? 'caption' : el.closest('.label, .foot, .contents__page') ? 'fine' : 'body';
      if (pt < minPt[kind] - 0.01) {
        problems.push(`${name}: ${snippet(el)} is ${pt.toFixed(1)} pt; the minimum for ${kind} text is ${minPt[kind]} pt.`);
      }
      if (style.color !== 'rgb(0, 0, 0)') problems.push(`${name}: ${snippet(el)} is not pure black (${style.color}).`);
    }

    // Images: loaded, decoded, not distorted.
    for (const img of sheet.querySelectorAll('img')) {
      const file = img.closest('figure')?.dataset.file || img.getAttribute('src');
      if (!img.complete || !img.naturalWidth || !img.naturalHeight) {
        problems.push(`${name}: the image ${file} did not load.`);
        continue;
      }
      const r = img.getBoundingClientRect();
      if (!r.width || !r.height) problems.push(`${name}: the image ${file} has no size on the page.`);
      else if (Math.abs(r.width / r.height / (img.naturalWidth / img.naturalHeight) - 1) > 0.015) {
        problems.push(`${name}: the image ${file} is stretched (its shape on the page does not match the file).`);
      }
    }

    // Figures (image + caption) stay inside the image area and never overlap.
    const region = sheet.querySelector('.visuals');
    if (region) {
      const area = region.getBoundingClientRect();
      const rects = [...region.querySelectorAll('figure')].map((figure) => {
        const a = figure.querySelector('img').getBoundingClientRect();
        const b = figure.querySelector('figcaption').getBoundingClientRect();
        if (!b.height) problems.push(`${name}: ${figure.dataset.file} has an empty caption.`);
        if (b.top < a.bottom - 0.5) problems.push(`${name}: the caption of ${figure.dataset.file} overlaps its image.`);
        return {
          file: figure.dataset.file,
          left: Math.min(a.left, b.left),
          right: Math.max(a.right, b.right),
          top: a.top,
          bottom: Math.max(a.bottom, b.bottom),
        };
      });
      rects.forEach((r, i) => {
        if (outside(r, area, 1)) problems.push(`${name}: ${r.file} (image or caption) spills out of the image area.`);
        for (const other of rects.slice(i + 1)) {
          const w = Math.min(r.right, other.right) - Math.max(r.left, other.left);
          const h = Math.min(r.bottom, other.bottom) - Math.max(r.top, other.top);
          if (w > 0.75 && h > 0.75) problems.push(`${name}: ${r.file} overlaps ${other.file}.`);
        }
      });
    }
  });

  // The real web fonts must be in use, not a fallback.
  const loaded = [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family.replace(/["']/g, ''));
  const wanted = (el) => getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/["']/g, '');
  const body = wanted(document.body);
  const label = document.querySelector('.label') ? wanted(document.querySelector('.label')) : body;
  for (const family of new Set([body, label])) {
    if (!loaded.includes(family)) problems.push(`The font "${family}" did not load; the PDF would fall back to a different typeface.`);
  }

  return { problems, sheets: sheets.length, fonts: [...new Set(loaded)] };
}

const squash = (text) => text.normalize('NFKC').replace(/\s+/g, '');

/** Reads the finished PDF back and compares it with what the content files say. */
async function inspectPdf(bytes, manifest) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: new Uint8Array(bytes), verbosity: 0 }).promise;
  const problems = [];
  const expectedPages = manifest.pages.length;
  if (doc.numPages !== expectedPages) {
    problems.push(`The PDF has ${doc.numPages} pages; expected ${expectedPages} (1 cover + ${expectedPages - 1} projects).`);
  }

  const texts = [];
  const links = [];
  const widthPt = manifest.page.widthIn * 72;
  const heightPt = manifest.page.heightIn * 72;
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const [x0, y0, x1, y1] = page.view;
    if (Math.abs(x1 - x0 - widthPt) > 0.5 || Math.abs(y1 - y0 - heightPt) > 0.5 || page.rotate !== 0) {
      problems.push(`PDF page ${n} is ${((x1 - x0) / 72).toFixed(2)} × ${((y1 - y0) / 72).toFixed(2)} in (rotation ${page.rotate}°), not ${manifest.page.widthIn} × ${manifest.page.heightIn} in.`);
    }
    const content = await page.getTextContent();
    texts.push(squash(content.items.map((item) => item.str ?? '').join(' ')));
    const annotations = await page.getAnnotations();
    links.push(annotations.filter((a) => a.subtype === 'Link').map((a) => a.url ?? a.unsafeUrl ?? ''));
  }

  manifest.pages.forEach((page, index) => {
    const text = texts[index];
    const where = `PDF page ${index + 1} (${page.title})`;
    if (text === undefined) return;
    if (!text.length) problems.push(`${where} has no selectable text.`);
    for (const item of page.expect) {
      if (!text.includes(squash(item.text))) {
        problems.push(`${where}: the ${item.field} does not match its source (${item.source}). Expected: "${item.text}"`);
      }
    }
    for (const item of page.forbid) {
      if (text.includes(squash(item.text))) {
        problems.push(`${where}: contains text that should not be in the PDF — ${item.why}: "${item.text.slice(0, 80)}"`);
      }
    }
  });

  // Each project appears on exactly one page (its own).
  manifest.pages.forEach((page, index) => {
    if (page.kind !== 'project') return;
    const summary = squash(page.expect.find((e) => e.field === 'At a glance').text);
    const found = texts.map((text, i) => (text.includes(summary) ? i + 1 : 0)).filter(Boolean);
    if (found.length !== 1 || found[0] !== index + 1) {
      problems.push(`"${page.title}" should appear once, on page ${index + 1}; found on page(s): ${found.join(', ') || 'none'}.`);
    }
  });

  // Contact links on the cover stay clickable.
  const clean = (address) => address.replace(/\/$/, '');
  for (const href of manifest.links) {
    if (!(links[0] ?? []).some((url) => clean(url) === clean(href))) problems.push(`The cover link ${href} is not clickable in the PDF.`);
  }

  return { problems, pages: doc.numPages, doc };
}

/** Saves a PNG of each PDF page and a contact sheet of all of them. */
async function savePreviews(doc, folder) {
  mkdirSync(folder, { recursive: true });
  for (const name of readdirSync(folder)) if (/\.(png|jpg)$/.test(name)) rmSync(join(folder, name));
  const { default: sharp } = await import('sharp');
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: 2 }); // 144 px per inch
    const { canvas, context } = doc.canvasFactory.create(viewport.width, viewport.height);
    await page.render({ canvasContext: context, viewport }).promise;
    const png = canvas.toBuffer('image/png');
    writeFileSync(join(folder, `page-${n}.png`), png);
    pages.push(png);
  }
  const cols = Math.min(3, pages.length);
  const cellW = 612;
  const cellH = 792;
  const gap = 24;
  const rows = Math.ceil(pages.length / cols);
  const tiles = await Promise.all(
    pages.map(async (png, i) => ({
      input: await sharp(png).resize(cellW, cellH).extend({ top: 1, bottom: 1, left: 1, right: 1, background: '#8a8a8a' }).toBuffer(),
      left: gap + (i % cols) * (cellW + 2 + gap),
      top: gap + Math.floor(i / cols) * (cellH + 2 + gap),
    })),
  );
  await sharp({
    create: { width: cols * (cellW + 2 + gap) + gap, height: rows * (cellH + 2 + gap) + gap, channels: 3, background: '#d9d9d9' },
  })
    .composite(tiles)
    .jpeg({ quality: 88 })
    .toFile(join(folder, 'all-pages.jpg'));
}

/** Removes the print page, and any image made only for it, from dist/. */
function removePrintPage(assetPaths) {
  rmSync(join(dist, ROUTE), { recursive: true, force: true });
  const htmlFiles = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.html')) htmlFiles.push(readFileSync(full, 'utf8'));
    }
  };
  walk(dist);
  let removed = 0;
  for (const path of assetPaths) {
    const file = normalize(join(dist, path));
    const name = file.split(sep).pop();
    if (!file.startsWith(dist + sep) || !existsSync(file)) continue;
    if (htmlFiles.some((html) => html.includes(name))) continue; // a real page uses it too
    rmSync(file);
    removed++;
  }
  return removed;
}

async function main() {
  if (!existsSync(join(dist, ROUTE, 'index.html'))) {
    stop('the print page has not been built.', ['Run "npm run build" (it builds the website first, then the PDF).']);
  }

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    stop('the PDF tools are not installed.', ['Run "npm install", then "npm run pdf:setup".']);
  }

  const server = await serve();
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch();
  } catch (error) {
    server.close();
    stop('the browser used to make the PDF is not installed yet.', [
      'Run this once:  npm run pdf:setup',
      '(It downloads a private copy of Chromium, about 100 MB, stored outside this project.)',
      '',
      String(error.message).split('\n')[0],
    ]);
  }

  try {
    const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
    await page.emulateMedia({ media: 'print' });
    const trouble = [];
    page.on('pageerror', (error) => trouble.push(`Script error on the print page: ${error.message}`));
    page.on('requestfailed', (request) => trouble.push(`Could not load ${request.url().replace(origin, '')}`));
    page.on('response', (response) => {
      if (response.status() >= 400) trouble.push(`${response.status()} for ${response.url().replace(origin, '')}`);
    });

    await page.goto(`${origin}/${ROUTE}/`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__PORTFOLIO_PDF__?.ready === true, null, { timeout: 90_000 });
    const { layout, manifest, assets } = await page.evaluate(() => ({
      layout: window.__PORTFOLIO_PDF__,
      manifest: JSON.parse(document.getElementById('pdf-manifest').textContent),
      assets: [...document.images].map((img) => new URL(img.currentSrc || img.src).pathname),
    }));

    if (trouble.length) stop('the print page did not load cleanly.', trouble);
    if (layout.error) stop('the images could not be arranged.', [layout.error]);

    // --- Check the page before printing --------------------------------------
    const pageCheck = await page.evaluate(inspectPage, {
      widthIn: manifest.page.widthIn,
      heightIn: manifest.page.heightIn,
      safeIn: SAFE_MARGIN_IN,
      minPt: MIN_PT,
    });
    if (pageCheck.sheets !== manifest.pages.length) {
      pageCheck.problems.push(`The page has ${pageCheck.sheets} sheets; expected ${manifest.pages.length}.`);
    }
    if (pageCheck.problems.length) stop('the layout check failed, so no PDF was made.', pageCheck.problems);

    // --- Print ------------------------------------------------------------------
    const output = join(dist, manifest.output);
    mkdirSync(join(output, '..'), { recursive: true });
    await page.pdf({
      path: output,
      width: `${manifest.page.widthIn}in`,
      height: `${manifest.page.heightIn}in`,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
      preferCSSPageSize: true,
      tagged: true,
    });

    // --- Check the finished PDF ---------------------------------------------------
    const bytes = readFileSync(output);
    const pdfCheck = await inspectPdf(bytes, manifest);
    if (bytes.length > MAX_BYTES) {
      pdfCheck.problems.push(`The PDF is ${(bytes.length / 1048576).toFixed(1)} MB; the limit is ${MAX_BYTES / 1048576} MB. Include fewer images.`);
    }
    if (pdfCheck.problems.length) {
      rmSync(output, { force: true });
      stop('the finished PDF failed its checks and was deleted.', pdfCheck.problems);
    }

    if (flags.has('--preview')) await savePreviews(pdfCheck.doc, join(root, 'pdf-preview'));

    const removed = flags.has('--keep-page') ? 0 : removePrintPage(assets);

    // --- Report ---------------------------------------------------------------------
    const warnings = [];
    if (bytes.length > WARN_BYTES) warnings.push(`The PDF is over 5 MB; some application portals limit uploads to 5 MB.`);
    console.log(`\n✔ PDF portfolio built: ${relative(root, output)}`);
    console.log(`    ${pdfCheck.pages} pages · US Letter ${manifest.page.widthIn} × ${manifest.page.heightIn} in · ${(bytes.length / 1048576).toFixed(2)} MB`);
    for (const sheet of layout.sheets) {
      console.log(`\n    ${sheet.title} — ${sheet.images.length} image(s), ${sheet.imageShare}% of the page`);
      if (sheet.images.length > 6) {
        warnings.push(`${sheet.title}: ${sheet.images.length} images share one page, so each is small. 2–6 reads best.`);
      }
      for (const image of sheet.images) {
        const soft = image.sourceDpi < SOFT_DPI;
        if (soft) warnings.push(`${sheet.title}: ${image.file} prints at only ${image.sourceDpi} dpi and will look soft. A larger original would fix it.`);
        console.log(
          `      ${image.file.padEnd(28)} ${image.widthIn.toFixed(2)} × ${image.heightIn.toFixed(2)} in  ${String(image.dpi).padStart(4)} dpi` +
            `${image.size === 'normal' ? '' : `  (${image.size})`}${soft ? '  ⚠ soft' : ''}`,
        );
      }
    }
    if (manifest.leftOut.length) {
      console.log(`\n    Not in the PDF (includeInPdf: false): ${manifest.leftOut.map((p) => p.title).join(', ')}`);
    }
    console.log(
      `\n    Checked: ${manifest.pages.reduce((n, p) => n + p.expect.length, 0)} pieces of source text match exactly; ` +
        `${manifest.pages.reduce((n, p) => n + p.forbid.length, 0)} website-only phrases are absent.`,
    );
    if (!flags.has('--keep-page')) console.log(`    Print page removed from dist/ (${removed} PDF-only image file(s) with it).`);
    if (flags.has('--preview')) console.log(`    Page previews saved to pdf-preview/ (all-pages.jpg shows every page).`);
    for (const warning of warnings) console.log(`\n    ⚠ ${warning}`);
    console.log('');

    if (flags.has('--open')) {
      const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open';
      spawn(opener, [output], { stdio: 'ignore', detached: true }).unref();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => stop('unexpected error.', [error.stack ?? String(error)]));
