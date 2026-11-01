# TheAnoof.github.io
Engineering design portfolio

Live site: **https://theanoof.github.io**

Built with [Astro](https://astro.build) (a static-site generator) and published
automatically to GitHub Pages whenever changes reach the `main` branch.

---

## How to Customize This Portfolio

You should never need to touch the code to change your content. **Everything
you edit lives in two folders: `content/` and `public/resume/`.**

```
content/                         ← ✏️  EDIT THESE FILES
├── profile.yaml                    name, tagline, email, links, navigation, focus areas
├── about.md                        About page (bio, interests, experience, skills)
├── images/                         your portrait photo (WebsitePhoto.JPG)
└── projects/
    ├── _TEMPLATE/                  copy this folder to add a new project
    ├── fsae-wheels/
    │   ├── index.md                all text for that project page
    │   └── images/                 that project's photos, CAD, diagrams
    ├── henna-delta-robot/
    ├── baja-destructive-test-rig/
    └── ucla-underwater-robot/

public/resume/                   ← ✏️  your resume PDF

src/                             ← the website's code (no need to edit)
docs/DECISIONS.md                ← why things were built the way they were
```

### Finding what still needs filling in

Placeholder text always looks like `[Something placeholder]`. To list every
one that's left (plus missing photos and the placeholder resume), run:

```bash
npm run placeholders
```

### Your personal information → `content/profile.yaml`

| What | Field |
|---|---|
| Name | `name` |
| Small label above your name (school, year) | `eyebrow` |
| One-line tagline | `tagline` |
| 2–3 sentence intro | `intro` |
| Email, LinkedIn, GitHub | `email`, `linkedin`, `github` |
| Availability / location line | `availability`, `location` (delete to hide) |
| Engineering focus areas (order + emphasis) | `focusAreas` |
| Contact section text | `contact` |
| Browser-tab title & link-preview text | `seo` |

The file is heavily commented — read the notes at the top first. Two YAML
rules cover almost every mistake:

1. **Indentation is spaces, never tabs**, and it must line up with the lines around it.
2. **Wrap text in `"double quotes"`** if it contains `: ` (a colon followed by a space) or starts with `[`, `#`, `*` or `&`.

If you make a mistake, the site will refuse to build and tell you the file and
field, so nothing broken can go live.

### Your photo → `content/images/`

1. Save a portrait photo (JPG or PNG, roughly 4:5 or square, at least 800 px wide)
   in `content/images/` (currently `WebsitePhoto.JPG`).
2. In `content/profile.yaml`, point `photo:` at the file. `photoAlt:` is
   optional; if it's left out, the alt text is "Portrait of <your name>".


Images are automatically resized and compressed — don't worry about file size,
but please keep originals under ~10 MB.

### About page → `content/about.md`

The top section (between the `---` lines) holds lists: interests, experience
highlights, skills, current focus. Below it, write your bio as ordinary text —
leave a blank line between paragraphs. Delete any list you don't want and its
section disappears from the page.

Each experience entry can have a one-sentence `summary`, a `points:` bullet
list (e.g. copied from your resume), or both.

### Project pages → `content/projects/<project>/index.md`

Each project folder has one `index.md` file. The fields at the top become the
structured parts of the page:

| Field | Where it appears |
|---|---|
| `title`, `subtitle`, `category`, `tags` | Project card + page header |
| `role`, `organization`, `timeline`, `team`, `status` | The "title block" table at the top of the page |
| `cover`, `coverAlt`, `coverCaption` | Card image + large image at the top of the page |
| `summary` | "At a glance" — the 2–3 sentences a recruiter reads |
| `metrics` | Large impact-number callouts |
| `objectives`, `outcomes` | "Project scope — Team" section (what the **team** did) |
| `contributions` | "My contribution — Individual" section (what **you** did) |
| `decisions` | "Key engineering decisions" — decision, rationale, result |
| `skills`, `tools` | "Skills & tools" panel |
| `gallery` | Numbered figures (Fig. 01, 02…), grouped into chapters by `section` |
| `video`, `videoCaption` | Optional test/demo clip shown above the figures |
| `order` | Position on the Projects page (1 = first) |
| `draft: true` | Hides the project everywhere — live site and local preview |
| `areas` | Which focus areas on the homepage list this project as evidence |

Any optional section you delete or leave empty is hidden, and the section
numbers adjust automatically. Anything written below the closing `---` line
of a project file is ignored.

**Writing tip:** keep `objectives`/`outcomes` about the team and
`contributions`/`decisions` about you. Only use metrics you can explain in an
interview.

### Project images → `content/projects/<project>/images/`

1. Put image files in that project's `images/` folder.
2. Reference them in the project's `index.md`, starting with `./images/`:

   ```yaml
   cover: ./images/cover.jpg
   coverAlt: Wheel assembly mounted on the car before testing

   gallery:
     - src: ./images/cad-assembly.png
       section: Design
       alt: Exploded CAD view of the wheel assembly
       caption: Exploded CAD view of the hub, rim, and center-lock nut
   ```

`alt` text describes the image for people using screen readers; keep it short
and specific. **Captions should explain what the viewer is looking at** (what
was analyzed, what the result shows), not just name the part. Use lowercase
file names without spaces (`fea-results.png`, not `FEA Results.PNG`).

How figures are laid out — all automatic:

- **`section`** (optional) groups figures into chapters, in the order they
  first appear: e.g. `Design`, `Analysis`, `Manufacturing`, `Testing`. A
  chapter with a single figure shows it beside its caption.
- **Wide images** (diagrams, spreadsheets, tables — wider than about 1.8:1)
  span the full width so their text stays readable.
- **CAD screenshots and diagrams with a plain background** are shown whole on
  a backdrop of the same color, so they blend into the page. Photos keep a
  normal frame. The large top image (`cover`) is only cropped when it's a
  wide, high-resolution photo.
- Every image gets a thin dark-blue border. To change its color or thickness,
  edit `--image-border-color` and `--image-border-width` near the top of
  `src/styles/tokens.css`.

### Project videos

1. The site needs an **.mp4** file. To convert an iPhone `.MOV`, use the
   converter built into macOS (it also strips location metadata):

   ```bash
   avconvert --source ~/Desktop/clip.MOV --preset Preset1280x720 --output ~/Desktop/clip.mp4
   ```

   Keep clips short (a 10–20 s, 720p clip is typically a few MB; stay under
   ~20 MB). Or put the `.MOV` in the folder and ask Claude to convert it.
2. Put the `.mp4` in the project's `images/` folder.
3. In the project's `index.md`, remove the `#` from the `video:` and
   `videoCaption:` lines and fix the filename. (The go-kart and underwater
   robot files already have these lines waiting.)

The video appears at the top of the Figures section with play controls; it
never autoplays. If the filename is wrong, the build stops and tells you.

### Resume → `public/resume/`

Replace `public/resume/Anav_Saxena_UCLAMechanical.pdf` with your updated
resume, **using the same file name**. (Or use a different name and update
`resume.file` in `content/profile.yaml`.) Also update `resume.updated` with the
month. Visitors always get the newest version — the link includes a fingerprint
of the file, so browsers can't show a stale cached copy.

### Adding a new project

1. Copy the folder `content/projects/_TEMPLATE` and rename the copy, e.g.
   `fsae-suspension` (lowercase, hyphens, no spaces). The folder name becomes
   the address: `/projects/fsae-suspension/`.
2. Open its `index.md`, fill in the fields, and change `draft: true` to `draft: false`.
3. Set `order` to where it should appear.
4. Add images to its `images/` folder.

That's it — the card, page, homepage listing and focus-area links are created
automatically. To hide a project without deleting it, set `draft: true`; to
remove it permanently, delete its folder.

### Changing the navigation

The top-bar links are the `navigation` list in `content/profile.yaml`. You can
rename the `label`s or reorder them. The `href`s must point to existing pages
(`/projects/`, `/about/`, `/resume/`). Your name in the top-left always links
to the homepage.

---

## Previewing the site on your computer

You need [Node.js](https://nodejs.org) version 22.12 or newer (you have v24).
In a terminal, inside this folder:

```bash
npm install
```

Run that once (and again if `package.json` changes). Then start the preview:

```bash
npm run dev
```

Open **http://localhost:4321** in your browser. The page refreshes automatically
every time you save a file. Press `Ctrl + C` in the terminal to stop it.

Projects marked `draft: true` are hidden here too, so the preview always
matches the live site.

### Checking everything before publishing

```bash
npm run verify
```

This runs the same checks as the automatic deploy: it validates every content
file, builds the full site, and checks every internal link and image. If it
ends without an error, the site is safe to publish.

## Publishing changes

The live site updates automatically whenever changes reach the `main` branch on
GitHub. **Saving a file does not publish it** — it only updates your local
preview.

**With GitHub Desktop (recommended):** make sure *Current Branch* says `main`,
type a short summary of what you changed (e.g. "Update wheels project"), click
**Commit to main**, then **Push origin**.

**Or with the terminal:**

```bash
git add -A
git commit -m "Update wheels project"
git push
```

Then watch the **Actions** tab on GitHub: a green check means the site is live
(usually within 1–2 minutes). A red ✕ means a check failed — click it to see
which file needs fixing. The previous version of the site stays online until a
build succeeds, so a mistake can never take the site down.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Live preview at http://localhost:4321 |
| `npm run placeholders` | List remaining placeholder text and missing images |
| `npm run verify` | Full check: content validation, build, broken-link check |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run test:links:external` | Also check links to other websites (optional, slower) |

## For developers

- **Stack:** Astro 7 static site, TypeScript, plain scoped CSS, no client-side
  framework. Content is defined by schemas in `src/content.config.ts`.
- **Structure:** `src/pages/` (routes), `src/layouts/BaseLayout.astro` (page
  shell), `src/components/` (reusable UI), `src/lib/site.ts` (data helpers,
  `url()` for base-path-safe links), `src/styles/tokens.css` (design tokens).
- **Deploy:** `.github/workflows/deploy.yml` runs `npm run verify` on every
  push and PR, and deploys `main` to GitHub Pages via `withastro/action` and
  `actions/deploy-pages`.
- Design and architecture rationale: [`docs/DECISIONS.md`](docs/DECISIONS.md).
