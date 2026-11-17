/**
 * Downloadable PDF portfolio — the pieces the website and the PDF print page
 * (src/pages/portfolio-pdf.astro) must agree on: the file name, which projects
 * and images are included, and the checks that stop a broken PDF from being
 * built.
 *
 * Nothing here holds content. Every word in the PDF comes from the same files
 * as the website (content/profile.yaml, content/about.md and each project's
 * index.md). To change what the PDF contains, edit `includeInPdf` in those
 * files — never this one.
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getEntry } from 'astro:content';
import sharp from 'sharp';
import { getProfile, getProjects, url, type Profile, type Project } from './site';

/** Document title shown on the cover and in each page footer. */
export const PDF_TITLE = 'Engineering Design Portfolio';

/** Address of the print layout page. It is removed from the published site. */
export const PDF_ROUTE = '/portfolio-pdf/';

/** Most images one project page can hold; 2–6 is the range that reads well. */
export const PDF_MAX_IMAGES = 8;

/** e.g. "Anav-Saxena-Engineering-Design-Portfolio.pdf", from the name in profile.yaml. */
export function pdfFileName(profile: Profile): string {
  return `${profile.name.trim().replace(/\s+/g, '-')}-${PDF_TITLE.replace(/\s+/g, '-')}.pdf`;
}

/** Where the generated PDF is published, relative to the site root. */
export function pdfPath(profile: Profile): string {
  return `/downloads/${pdfFileName(profile)}`;
}

/** Link for the "Download this portfolio" buttons. */
export function pdfHref(profile: Profile): string {
  return url(pdfPath(profile));
}

export type PdfSize = 'small' | 'normal' | 'large';

export interface PdfFigure {
  image: ImageMetadata;
  caption: string;
  alt: string;
  size: PdfSize;
}

export interface PdfProject {
  id: string;
  /** Content file, for error messages. */
  file: string;
  data: Project['data'];
  figures: PdfFigure[];
}

const PLACEHOLDER = /\[[^[\]\n]*placeholder[^[\]\n]*\]/i;

/** A field counts as filled in when it has real text (not empty, not a placeholder). */
function missing(value: string | undefined): boolean {
  return !value || !value.trim() || PLACEHOLDER.test(value);
}

function fail(problems: string[]): never {
  throw new Error(
    `The PDF portfolio cannot be built until this is fixed:\n` +
      problems.map((p) => `  • ${p}`).join('\n') +
      `\n(To leave a project out of the PDF instead, set "includeInPdf: false" in its index.md.)`,
  );
}

/**
 * Projects that get a page in the PDF: published (`draft: false`) and marked
 * `includeInPdf: true`, in the same order as the website. Each keeps only the
 * gallery images marked `includeInPdf: true`.
 */
export async function getPdfProjects(): Promise<PdfProject[]> {
  const projects = (await getProjects()).filter((p) => p.data.includeInPdf);
  const problems: string[] = [];

  const result = projects.map((project) => {
    const file = `content/projects/${project.id}/index.md`;
    const { data } = project;

    for (const field of ['title', 'role', 'organization', 'timeline', 'summary'] as const) {
      if (missing(data[field])) problems.push(`${file}: "${field}" is empty or still a placeholder.`);
    }
    if (data.skills.length + data.tools.length === 0) {
      problems.push(`${file}: add at least one entry under "skills" or "tools".`);
    }
    for (const item of [...data.skills, ...data.tools]) {
      if (missing(item)) problems.push(`${file}: a "skills"/"tools" entry is empty or still a placeholder.`);
    }

    const selected = data.gallery.filter((g) => g.includeInPdf);
    if (selected.length === 0) {
      problems.push(`${file}: no gallery image has "includeInPdf: true". Mark at least one.`);
    }
    if (selected.length > PDF_MAX_IMAGES) {
      problems.push(
        `${file}: ${selected.length} images are marked "includeInPdf: true", but one page holds at most ` +
          `${PDF_MAX_IMAGES} (2–6 reads best). Set some to false.`,
      );
    }
    selected.forEach((g) => {
      if (missing(g.caption)) {
        const name = (g.src as ImageMetadata & { fsPath?: string }).fsPath?.split('/').pop() ?? 'an image';
        problems.push(`${file}: ${name} is marked "includeInPdf: true" but has no "caption".`);
      }
    });

    return {
      id: project.id,
      file,
      data,
      figures: selected.map((g) => ({ image: g.src, caption: g.caption ?? '', alt: g.alt, size: g.pdfSize })),
    };
  });

  if (problems.length) fail(problems);
  return result;
}

/** Published projects that are NOT in the PDF (used to check they stay out). */
export async function getProjectsLeftOutOfPdf(): Promise<Project[]> {
  return (await getProjects()).filter((p) => !p.data.includeInPdf);
}

/** Everything the cover page needs, checked for completeness. */
export async function getPdfCover() {
  const [profile, about] = await Promise.all([getProfile(), getEntry('about', 'about')]);
  const problems: string[] = [];
  if (missing(profile.name)) problems.push('content/profile.yaml: "name" is empty.');
  if (missing(profile.eyebrow)) problems.push('content/profile.yaml: "eyebrow" (school | major | class) is empty.');
  if (missing(profile.location)) problems.push('content/profile.yaml: "location" is empty.');
  if (!profile.photo) problems.push('content/profile.yaml: "photo" is not set.');
  if (missing(profile.email)) problems.push('content/profile.yaml: "email" is empty.');
  if (!about) problems.push('content/about.md is missing.');
  else if (missing(about.data.lede)) problems.push('content/about.md: "lede" is empty or still a placeholder.');
  if (problems.length || !about || !profile.photo || !profile.location) fail(problems);

  return { profile, about, photo: profile.photo, location: profile.location, blurb: about.data.lede };
}

/* ------------------------------------------------------------------------ */
/* Images sized for print                                                    */
/* ------------------------------------------------------------------------ */

export interface PdfImage {
  src: string;
  width: number;
  height: number;
  /** Width of the original file in pixels (after applying its rotation). */
  sourceWidth: number;
}

const formatCache = new Map<string, Promise<'png' | 'jpeg'>>();

/**
 * Photos are smallest as JPEG; flat graphics (CAD on a plain background,
 * spreadsheets, diagrams) are smaller AND sharper as PNG. Try both at the
 * final size and keep PNG unless JPEG is clearly smaller.
 */
function bestFormat(path: string, width: number): Promise<'png' | 'jpeg'> {
  const key = `${path}@${width}`;
  let result = formatCache.get(key);
  if (!result) {
    result = (async () => {
      const resized = sharp(path).rotate().resize({ width });
      const [jpeg, png] = await Promise.all([
        resized.clone().flatten({ background: '#ffffff' }).jpeg({ quality: 84 }).toBuffer(),
        resized.clone().png().toBuffer(),
      ]);
      return png.length <= jpeg.length * 1.3 ? 'png' : 'jpeg';
    })().catch(() => 'jpeg' as const);
    formatCache.set(key, result);
  }
  return result;
}

/**
 * Prepares one image for the PDF: scaled so its longer side is at most
 * `longSide` pixels (never enlarged), in the format that suits it.
 */
export async function pdfImage(image: ImageMetadata, longSide: number): Promise<PdfImage> {
  const ratio = image.width / image.height;
  const cap = Math.min(longSide, Math.max(image.width, image.height));
  const width = Math.round(ratio >= 1 ? cap : cap * ratio);
  const path = (image as ImageMetadata & { fsPath?: string }).fsPath;
  const format = path ? await bestFormat(path, width) : image.format === 'png' ? 'png' : 'jpeg';
  const result = await getImage({ src: image, width, format, quality: format === 'jpeg' ? 84 : undefined });
  return { src: result.src, width, height: Math.round(width / ratio), sourceWidth: image.width };
}

/**
 * Pixel budget for an image's longer side. Pages with fewer images print each
 * one larger, so they get more pixels; `pdfSize` shifts the budget up or down.
 * The aim is roughly 250–300 dots per inch on paper without bloating the file.
 */
export function pdfLongSide(imagesOnPage: number, size: PdfSize): number {
  const base = imagesOnPage <= 1 ? 2200 : imagesOnPage <= 3 ? 1700 : 1300;
  const factor = size === 'large' ? 1.45 : size === 'small' ? 0.8 : 1;
  return Math.round(base * factor);
}
