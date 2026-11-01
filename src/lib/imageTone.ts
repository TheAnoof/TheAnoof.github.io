/**
 * Build-time helper: detects whether an image has a plain, uniform border —
 * typical of CAD screenshots, renders, spreadsheets and diagrams — and if so
 * returns that border color.
 *
 * The site uses this to show such images uncropped on a backdrop of the same
 * color, so a gray SOLIDWORKS background or a white spreadsheet blends into
 * its frame instead of looking like a pasted-in rectangle. Photos (busy,
 * non-uniform borders) return `undefined` and keep the normal treatment.
 *
 * Runs only during the build; nothing is sent to the browser.
 */
import type { ImageMetadata } from 'astro';
import sharp from 'sharp';

const cache = new Map<string, Promise<string | undefined>>();

/**
 * Max 90th-percentile deviation (0–255) from the fitted border for it to count
 * as plain. Measured on this site's images: flat CAD/diagram backgrounds score
 * 1–10, SOLIDWORKS gradient backgrounds 18–25, photos and busy screenshots 43+.
 * Small mismatches are hidden by the edge feathering in the CSS.
 */
const UNIFORMITY_THRESHOLD = 28;

/**
 * Returns a CSS background that matches the image's border: a solid color, or
 * a top-to-bottom gradient (SOLIDWORKS' default viewport background is a
 * vertical gradient). Returns undefined for photos and busy images.
 */
export function edgeColor(image: ImageMetadata | undefined): Promise<string | undefined> {
  // Astro attaches the source file path as a hidden property on image metadata.
  const path = image ? (image as ImageMetadata & { fsPath?: string }).fsPath : undefined;
  if (!path) return Promise.resolve(undefined);
  let result = cache.get(path);
  if (!result) {
    result = sample(path).catch(() => undefined);
    cache.set(path, result);
  }
  return result;
}

type RGB = [number, number, number];

async function sample(path: string): Promise<string | undefined> {
  const size = 64;
  const { data, info } = await sharp(path)
    .rotate() // respect EXIF orientation, like the published image
    .flatten({ background: '#ffffff' }) // transparent PNGs sit on white
    .resize(size, size, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = (x: number, y: number): RGB => {
    const o = (y * size + x) * info.channels;
    return [data[o], data[o + 1], data[o + 2]];
  };
  const mean = (list: RGB[]): RGB =>
    [0, 1, 2].map((c) => list.reduce((s, p) => s + p[c], 0) / list.length) as RGB;

  const rows = (y: number) => Array.from({ length: size }, (_, x) => px(x, y));
  const top = mean(rows(0));
  const bottom = mean(rows(size - 1));

  // Compare every border pixel with a vertical blend from the top color to the
  // bottom color. A flat or vertically graded background fits closely. A few
  // pixels may differ (a part or gridline touching the edge), so the test uses
  // the 90th-percentile deviation rather than the worst pixel.
  const deviations: number[] = [];
  const dev = (p: RGB, e: number[]) => Math.max(...p.map((v, k) => Math.abs(v - e[k])));
  for (let i = 0; i < size; i++) {
    const t = i / (size - 1);
    const expected = top.map((c, k) => c + (bottom[k] - c) * t);
    deviations.push(dev(px(0, i), expected), dev(px(size - 1, i), expected));
    deviations.push(dev(px(i, 0), top), dev(px(i, size - 1), bottom));
  }
  deviations.sort((a, b) => a - b);
  const p90 = deviations[Math.floor(deviations.length * 0.9)];
  if (p90 > UNIFORMITY_THRESHOLD) return undefined;

  const css = (c: RGB) => `rgb(${c.map(Math.round).join(' ')})`;
  const differs = top.some((c, k) => Math.abs(c - bottom[k]) > 4);
  return differs ? `linear-gradient(to bottom, ${css(top)}, ${css(bottom)})` : css(top);
}
