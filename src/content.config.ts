/**
 * Content schema — the "contract" for everything in the /content folder.
 *
 * You normally never edit this file. It checks your content files when the
 * site builds, so a typo or a missing field produces a clear error message
 * (naming the file and the field) instead of a silently broken page.
 *
 * Only edit this file if you want to ADD A NEW KIND OF FIELD to every project.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

/* ------------------------------------------------------------------------ */
/* Site profile — content/profile.yaml                                       */
/* ------------------------------------------------------------------------ */

const link = z.object({
  label: z.string(),
  href: z.string(),
});

const profile = defineCollection({
  // The whole YAML file becomes a single entry with the id "profile".
  loader: file('content/profile.yaml', {
    parser: (text) => ({ profile: parseYaml(text) }),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      headline: z.string(),
      eyebrow: z.string(),
      tagline: z.string(),
      intro: z.string(),
      location: z.string().optional(),
      availability: z.string().optional(),

      photo: image().optional(),
      photoAlt: z.string().default(''),

      email: z.string(),
      linkedin: z.string().optional(),
      github: z.string().optional(),

      resume: z.object({
        file: z.string(),
        downloadName: z.string(),
        updated: z.string().optional(),
      }),

      navigation: z.array(link).min(1),

      focusAreas: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            emphasis: z.enum(['primary', 'secondary', 'supporting']),
            label: z.string().optional(),
            description: z.string().optional(),
          }),
        )
        .default([]),

      projectsIntro: z.string().optional(),

      contact: z.object({
        heading: z.string(),
        message: z.string(),
      }),

      seo: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
});

/* ------------------------------------------------------------------------ */
/* About page — content/about.md                                             */
/* ------------------------------------------------------------------------ */

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './content' }),
  schema: z.object({
    title: z.string().default('About'),
    lede: z.string(),
    interests: z.array(z.string()).default([]),
    highlights: z
      .array(
        z.object({
          title: z.string(),
          organization: z.string().optional(),
          dates: z.string().optional(),
          summary: z.string().optional(),
          link: z.string().optional(),
        }),
      )
      .default([]),
    skills: z
      .array(
        z.object({
          group: z.string(),
          items: z.array(z.string()),
        }),
      )
      .default([]),
    currentFocus: z.string().optional(),
  }),
});

/* ------------------------------------------------------------------------ */
/* Projects — content/projects/<project-folder>/index.md                     */
/* ------------------------------------------------------------------------ */

const projects = defineCollection({
  loader: glob({
    // Folders whose names start with "_" (like _TEMPLATE) are ignored.
    pattern: ['*/index.md', '!_*/index.md'],
    base: './content/projects',
    // The folder name becomes the page address: /projects/<folder-name>/
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      // --- Card + header -------------------------------------------------
      title: z.string(),
      subtitle: z.string(),
      role: z.string(),
      organization: z.string(),
      category: z.string(),
      timeline: z.string(),
      team: z.string().optional(),
      status: z.string().optional(),
      order: z.number().default(99),
      draft: z.boolean().default(false),
      areas: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),

      // --- Images -------------------------------------------------------
      cover: image().optional(),
      coverAlt: z.string().default(''),
      coverCaption: z.string().optional(),

      // --- At a glance ----------------------------------------------------
      summary: z.string(),
      metrics: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
            note: z.string().optional(),
          }),
        )
        .default([]),

      // --- Team-level vs. personal ---------------------------------------
      objectives: z.array(z.string()).default([]),
      outcomes: z.array(z.string()).default([]),
      contributions: z.array(z.string()).default([]),
      decisions: z
        .array(
          z.object({
            title: z.string(),
            rationale: z.string(),
            result: z.string().optional(),
          }),
        )
        .default([]),

      // --- Skills + gallery -----------------------------------------------
      skills: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

export const collections = { profile, about, projects };
