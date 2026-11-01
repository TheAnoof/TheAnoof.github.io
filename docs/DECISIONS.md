# Decisions & Assumptions Log

A concise record of why the site is built the way it is. Newest entries go at
the bottom of each section. **⟲ = worth revisiting later.**

## Confirmed with Anav (2026-10-08)

| Topic | Decision |
|---|---|
| Visual direction | "Drafting Table" base (warm off-white, near-black ink, engineering-drawing cues) with "Quiet Editorial" restraint and image-led project cards. Drawing motifs must stay subtle and functional. |
| Accent color | Blueprint blue (`#24489a`). |
| Positioning | Weighted focus: **Mechanical design (primary) → Robotics → Manufacturing**, with Test & validation shown as a supporting area. Robotics is labelled "Growing focus" to reflect the aspiration. ⟲ wording |
| Tooling | Node.js 24 LTS installed by Anav. |

## Architecture

- **Astro 7 static site, no client-side framework.** The content is static, so
  every page is pre-rendered HTML. The site ships **zero JavaScript**; page
  transitions use the browser-native CSS `@view-transition` (no-op in browsers
  that don't support it).
- **Content separated from code.** All personal content lives in `/content`
  (outside `src/`) so "files I edit" and "files I don't" are physically separate.
  `src/content.config.ts` validates every content file with a schema (Zod), so
  mistakes fail the build with a clear message instead of deploying broken pages.
- **One folder per project** (`content/projects/<slug>/index.md` + `images/`).
  The folder name is the URL. A single template (`src/pages/projects/[slug].astro`)
  renders every project. Folders starting with `_` are ignored (used for `_TEMPLATE`).
- **Profile in YAML** (`content/profile.yaml`) rather than TypeScript/JSON:
  YAML allows comments and is the most forgiving format for a non-developer.
  Parsed with the `yaml` package through Astro's `file()` loader so it gets the
  same schema validation and image handling as other content.
- **Cross-reference check:** a project's `areas` must match a focus-area `id`
  in the profile, otherwise the build fails with a message naming the file.
- **Base-path safety:** all internal links go through `url()` in `src/lib/site.ts`.
  The repo is the special `<user>.github.io` repo, so `base` is unset, but
  moving to a project repo later only needs `base` set in `astro.config.mjs`.
- **Images** are processed by Astro (`sharp`): responsive `srcset`, WebP output,
  explicit dimensions (no layout shift), lazy loading except above-the-fold.
  Missing images render a styled figure placeholder instead of breaking.
- **Fonts self-hosted** via Astro's Fonts API (Fontsource provider, downloaded at
  build time). Visitors' browsers make no third-party requests. Fallback font
  metrics are adjusted automatically to minimize layout shift.
- **Resume** lives in `public/resume/` so it has a stable, shareable URL
  (`/resume/Anav-Saxena-Resume.pdf`). The resume page embeds it on screens
  ≥ 768 px; phones get the Download / Open buttons only, because mobile
  browsers render embedded PDFs poorly. If the PDF is missing, the page shows a
  notice instead of a broken embed.

## Design system

- **Typography:** IBM Plex Sans (body + headings) and IBM Plex Mono (small
  uppercase labels). Plex was designed for an engineering company, reads well
  at small sizes, and avoids the overused Inter/SaaS look. Mono labels echo the
  lettering in a drawing title block. Fluid type scale with `clamp()`. ⟲
- **Color:** warm off-white paper `#f7f5f0`, near-black ink `#1a1d21`, two grays,
  hairline rules, one accent (blueprint blue). All text colors pass WCAG AA
  (≥ 4.5:1) on every background used; body text is ~15:1.
- **Light theme only** (no dark mode). Matches the stated preference and halves
  the design/QA surface. ⟲
- **Drafting cues, used sparingly and only where they carry information:**
  numbered section labels (`01 — Overview`), a ruled "title block" for project
  metadata, numbered figures (`Fig. 01`), a dimension line showing the project
  count, corner crop marks on the portrait, a faint grid in image placeholders,
  and a "Rev." build date in the footer.
- **Shape:** small radii (4–12 px) and hairline borders rather than heavy shadows;
  shadows appear only on hover.
- **Motion:** short (180–420 ms) fades/lifts on load and hover; all disabled
  under `prefers-reduced-motion`.
- **Breakpoints (content-driven):** 40, 45, 48, 52, 60 rem. Layouts are
  single-column first, then grid.

## Information architecture

- **Navigation:** Projects · About · Resume, with the name linking home (no
  separate "Home" item — the common convention, and it keeps the bar on one
  line at 375 px without a hamburger menu or JavaScript). Resume is styled as a
  button so recruiters can find it instantly. Header is sticky.
- **Homepage order:** hero (name, tagline, intro, availability, View projects /
  Download resume, LinkedIn/GitHub/email) → weighted focus areas, each linking to
  the projects that evidence it → all project cards → contact.
- **Project page order:** title block → hero image → **At a glance** (summary +
  key metrics) → **Project scope — Team** (objectives, outcomes) → **My
  contribution — Individual** (role, contributions, key decisions) → skills &
  tools → figures → previous/next. Metrics were moved up next to
  the summary (rather than after contributions) so the impact is visible
  without scrolling deep. "Team" vs "Individual" tags make the boundary of
  personal contribution explicit.
- **About page:** label-column rows (Background, Engineering focus, Interests,
  Experience, Skills, Current focus); empty sections are hidden.
- **Project cards:** image-led, with index number, category, title, role,
  subtitle, ≤ 3 tags, and a "View project →" cue. The whole card is clickable
  but only the title is the accessible link.

## Assumptions (made because they weren't specified) ⟲

- Display name **"Anav Saxena"** and the SEO description come from the old
  `_config.yml`.
- **GitHub link** pre-filled as `https://github.com/TheAnoof` (the repo owner).
- **Project `areas`** (which focus areas each project supports) are a best
  guess: Wheels → design, manufacturing · Henna robot → robotics, design · Test
  rig → test, design · Underwater robot → robotics. Marked TODO in each file.
- **Project tags** "Wheel assembly", "Delta robot", "Test rig" and "Underwater
  robot" are derived only from the project names.
- The **project order** follows the order Anav listed them.
- Project URLs: `/projects/fsae-wheels/`, `/projects/henna-delta-robot/`,
  `/projects/baja-destructive-test-rig/`, `/projects/ucla-underwater-robot/`.
- No claims, metrics, dates, or biography were invented; all are placeholders.

## Dependencies

| Package | Why |
|---|---|
| `astro` | Static site generator (includes `sharp` for images). |
| `yaml` | Parses `content/profile.yaml` (comment-friendly config). |
| `@astrojs/check`, `typescript` (dev) | `astro check` type/content validation. TypeScript is pinned to 6.x because `@astrojs/check` doesn't support 7.x yet. ⟲ |
| `@types/node` (dev) | Types for the resume page's build-time file check. |
| `linkinator` (dev) | Broken-link checker (internal links, anchors, CSS assets) run in CI. |

npm's install-script allowlist (`allowScripts` in `package.json`) **denies**
the optional `esbuild` and `fsevents` install scripts; both work without them.

## Quality & deployment

- **CI** (`.github/workflows/deploy.yml`) runs on every push and pull request:
  `astro check` → `astro build` → link check. Only pushes to `main` deploy, using
  the official `withastro/action` + `actions/deploy-pages`. A failing check
  blocks deployment, so the previous version stays live.
- Link checking skips external sites in CI (LinkedIn blocks automated checks,
  and outside sites going down shouldn't block a deploy). Run
  `npm run test:links:external` occasionally to check them.
- Astro's anonymous build telemetry is disabled in CI. ⟲ To disable it locally
  too, run `npx astro telemetry disable` (affects only your machine).
- **Privacy:** no analytics, cookies, trackers, forms, or third-party requests
  from visitors' browsers.
- **Not included (low priority / not requested):** sitemap, custom domain,
  analytics, contact form, dark mode, image lightbox (gallery images open
  full-size in the browser instead).

## Changes to pre-existing files

- `README.md`: original title and description kept; customization guide added.
- `_config.yml`: **removed**. It configured GitHub's legacy Jekyll build, which
  no longer runs once Pages is switched to "GitHub Actions". Its title and
  description were carried into `content/profile.yaml`.

## Revisions (2026-10-31, after Anav's content review)

- **Removed the "Engineering detail" (Markdown write-up) section** from project
  pages; the skills/tools panel became its own "Skills & tools" section. Text
  below a project file's closing `---` is no longer displayed, and the
  placeholder write-up text was removed from the project files.
- **Drafts are hidden everywhere.** Previously `draft: true` projects still
  appeared in the local preview (`npm run dev`), which made it look like the
  setting wasn't working. Now preview and live site always match.
- **Images get a 2 px dark blueprint-blue border** (`--image-border-color` /
  `--image-border-width` in `tokens.css`) so photos and CAD renders read as
  framed figures instead of floating on the page. ⟲ experimental
- **Custom favicon removed.** GitHub Pages provides none by default, so
  browsers show their own generic tab icon (same as the original site).
- **White panels for body text on Home and About** (`.panel` in `global.css`,
  matching the project-page panels). Text inside panels uses the darker ink
  color (≈16:1 contrast) instead of gray. Applies to the hero intro + links,
  focus areas, contact section, About lede, and every About section.

