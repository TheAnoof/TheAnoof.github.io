import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Profile = CollectionEntry<'profile'>['data'];
export type Project = CollectionEntry<'projects'>;
export type FocusArea = Profile['focusAreas'][number];

/**
 * Builds an internal link that respects Astro's `base` setting, so the site
 * keeps working if it is ever served from a sub-path. Always use this for
 * links to pages or files inside this site.
 */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Where the resume PDF lives on disk (public/ + the path in profile.yaml). */
export function resumePath(profile: Profile): string {
  return join(process.cwd(), 'public', profile.resume.file);
}

/**
 * Link to the resume PDF with a short fingerprint of its contents, e.g.
 * /resume/Resume.pdf?v=3f9a1c2b. Replacing the PDF changes the fingerprint,
 * so browsers (and the embedded preview) always fetch the new version instead
 * of showing a copy they saved earlier.
 */
export function resumeHref(profile: Profile): string {
  const href = url(profile.resume.file);
  const path = resumePath(profile);
  if (!existsSync(path)) return href;
  const version = createHash('sha1').update(readFileSync(path)).digest('hex').slice(0, 8);
  return `${href}?v=${version}`;
}

export async function getProfile(): Promise<Profile> {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('content/profile.yaml is missing or empty.');
  return entry.data;
}

/** Published projects (draft: false), sorted by `order` then title. */
export async function getProjects(): Promise<Project[]> {
  const [projects, profile] = await Promise.all([
    // `draft: true` hides a project everywhere — live site and local preview.
    getCollection('projects', ({ data }) => !data.draft),
    getProfile(),
  ]);

  // Catch typos in `areas:` early, with a message that names the file.
  const known = new Set(profile.focusAreas.map((a) => a.id));
  for (const p of projects) {
    for (const area of p.data.areas) {
      if (!known.has(area)) {
        throw new Error(
          `content/projects/${p.id}/index.md lists area "${area}", but no focus area ` +
            `with that id exists in content/profile.yaml. Valid ids: ${[...known].join(', ')}.`,
        );
      }
    }
  }

  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export function projectUrl(project: Project): string {
  return url(`/projects/${project.id}/`);
}

/** Two-digit index label used on cards and section headers: 1 → "01". */
export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
