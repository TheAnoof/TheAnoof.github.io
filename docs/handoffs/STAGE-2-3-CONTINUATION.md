# Stage 2/3 Continuation Handoff

> Working document for the next Claude Code session. The repository is
> **public**, and Anav decided to keep this file and `CLAUDE.md` **uncommitted**.
> Don't commit either one (§6B mentions a privacy item).
> Last updated 2026-11-01, after Stage 2/3 was published.

## 1. Handoff overview

| | |
|---|---|
| **Project** | Anav Saxena: mechanical engineering portfolio (`TheAnoof/TheAnoof.github.io`), live at https://theanoof.github.io |
| **Handoff date** | 2026-11-01 |
| **Stage** | Stages 2 and 3 (content refinement plus visual/UX refinement) are implemented, validated, and **published to `main` with Anav's explicit approval** on 2026-11-01 (see §5 "Publication"). Next comes a new chat in which Anav gives feedback on the live version. After that, the independent Gemini Pro audit. |
| **Work folder** | `/Users/anavsaxena/Desktop/Coding/GitHub/TheAnoof.github.io-stage-2-3` (a linked git worktree) |
| **Branch** | `portfolio/stage-2-3-refinement` |
| **HEAD** | `788edd481aa3455f4b6b2bd32f2a99f779eb9442` ("Add Stage 2/3 audit report and update docs") |
| **Relation to `main`** | Identical. `main` was fast-forwarded to `788edd4`. The branch itself was never pushed, and `origin` has only `main`. |
| **Working tree** | Nothing staged or modified. Two untracked files, **deliberately left uncommitted at Anav's request**: this document and `CLAUDE.md`. Also a gitignored `.claude/launch.json`. On 2026-11-01 a commit of these two files ("claude files", `43c8f0d`) was briefly made on this branch, most likely from GitHub Desktop. With Anav's OK it was undone: files kept, branch back at `788edd4`, never pushed. If these files ever show up as committed again, don't merge that branch into `main`, because it would publish them in the public repo. Ask Anav. |
| **`main` / live site** | `main` = `origin/main` = `788edd4`, which is **live** (deploy verified, §5 "Publication"). Anav's usual folder, `/Users/anavsaxena/Desktop/Coding/GitHub/TheAnoof.github.io`, is the main worktree. It is on `main`, and Anav commits and pushes from it with GitHub Desktop. |
| **Immediate next action** | In the new chat, confirm the git state, then ask Anav for their feedback on the live version and work through it on a new branch (§9). Don't start the Gemini audit or Safari/phone testing until Anav says to. |

## 2. Project purpose and professional context

- **Candidate:** Anav Saxena, a second-year UCLA Mechanical Engineering student (Class of 2029).
  - **Current roles:**
    - Wheels Responsible Engineer, Bruin Formula Racing (Sept 2025 – Present)
    - Underwater Robotics Instructor (ENGR 1UW)
    - UCLA Engineering Makerspace Technician
    - CNC Machining Mentor, FIRST Team 2473 (Summer 2026; team member 2021–2025)
  - **Past roles:**
    - Destructive Testing Engineer, Bruin Racing Baja SAE (left Apr 2026)
    - Carbon I-Beam Engineer, SAMPE
  - **Sources of truth:** the resume (`public/resume/Anav_Saxena_UCLAMechanical.pdf`) and `content/about.md`.
- **Target roles:** Summer 2027 internships. The site copy names mechanical design, robotics, manufacturing, and test.
  - The weighting confirmed in Stage 1: mechanical design first, then robotics (labelled "Growing focus"), then manufacturing, with test and validation as a supporting area.
  - "Quality engineering" appeared as a target in Anav's Stage 2/3 brief and handoff brief, but **Anav decided on 2026-11-01 to leave it out** of the target roles on the site. Don't add it.
  - Never position Anav as a software engineer, AI engineer, or research scientist, and don't imply experience the content doesn't demonstrate.
- **Audiences:**
  - **A. Engineering recruiters:** should grasp identity, focus, and strongest evidence in 30–60 seconds.
  - **B. Engineers and hiring managers:** should find substantive technical depth on project pages.
- **Objective:** show *what* Anav accomplished and *how* they approached each engineering problem. The site is about engineering capability, not frontend skill.

## 3. Design philosophy and quality bar

Rationale lives in `docs/DECISIONS.md` (sections: Design system, Information architecture, Revisions, Stage 2 & 3). Read it before changing anything visual.

- **Visual identity:** a "Drafting Table" base with "Quiet Editorial" restraint.
  - **Colour and type:** warm off-white paper (`#f7f5f0`), near-black ink, and a single blueprint-blue accent (`#24489a`). Type is IBM Plex Sans, with Plex Mono for labels.
  - **Drafting cues**, used only where they carry information: numbered sections, project title block, `Fig. NN` labels, dimension line, crop marks on the portrait, "Rev." date in the footer.
  - **Surfaces:** white `.panel` boxes behind body text and 2 px blueprint-blue image borders. Light theme only.
  - **Motion:** short and subtle, disabled under reduced-motion.
  - **Tokens:** `src/styles/tokens.css`.
- **Must not feel like:** a PDF rendered as a website, a generic AI-generated portfolio, a SaaS landing page, a frontend showcase, or something over-animated.
- **Information hierarchy:**
  - **Homepage:** Hero → Projects (01) → Focus (02) → Contact (03). Evidence appears within the first scroll.
  - **Project page:** title block → hero image → *At a glance* (summary + metrics) → *Project scope (Team)* → *My contribution (Individual)*: role, contributions, key decisions → *Skills & tools* → *Figures* (chapters, plus an optional video) → previous/next.
  - **Why this order:** the important facts (what, why, Anav's part, result, impact) come first and depth comes after. The Team/Individual split makes the boundary of Anav's personal contribution explicit.
  - **Project variety:** don't force every project into an identical visual composition just for consistency.
  - **Resume:** stays one click away, as a button in the header.
- **Writing:**
  - Concise, specific, and professional, with no generic filler.
  - Consistent terms: en-dash date ranges ("Sept 2025 – Present"), "6-DoF", "Fusion 360", "80/20", "SOLIDWORKS", "dynamometer", and units written as "1 lb" and "±0.001 in".
  - Exact evidence wording: *completed / preliminary / estimated / projected / verified analytically / physically tested / pending*.
- **Quality bar:**
  - Base decisions on the actual rendered site.
  - Justify every change by recruiter usability, technical communication, readability, performance, or professionalism.
  - Keep what works; don't redesign without a reason.
  - Verify in a real browser at 1440×900, 1280×800, 768×1024, 390×844, and 375×812.
  - Never claim visual testing based only on reading code. If no browser is available, say so.
  - Report results frankly.
  - **Dependencies:** avoid unnecessary libraries, frameworks, and services. Don't add a browser-testing dependency unless it clearly earns its place, and explain why.

## 4. Technical architecture

- **Stack:**
  - Astro 7.3.7 with static output and zero client JavaScript; TypeScript; scoped CSS.
  - Fonts are self-hosted through the Astro Fonts API.
  - Images go through `astro:assets` and sharp (WebP output, responsive `srcset`).
  - Node v24.21.0 at `/usr/local/bin/node`.
- **Content** (files Anav edits):
  - **`content/profile.yaml`:** home page, contact block, focus areas, SEO.
  - **`content/about.md`:** About page. Experience entries take optional `points` bullets.
  - **`content/projects/<slug>/index.md` + `images/`:** one folder per project, and the folder name is the URL. `_TEMPLATE` is ignored. `draft: true` hides a project everywhere.
  - **Schemas:** `src/content.config.ts`. Invalid content fails the build with a clear message.
  - **Resume:** `public/resume/Anav_Saxena_UCLAMechanical.pdf`, linked with a content hash (`resumeHref()` in `src/lib/site.ts`).
- **Key code:**
  - **`src/pages/projects/[slug].astro`:** the single project template; holds the adaptive hero and video support.
  - **`src/components/Gallery.astro`:** groups figures by `section`, spans figures with an aspect ratio of 1.8:1 or wider across the full width, and shows other figures uncropped in 4:3 frames.
  - **`src/components/MediaFrame.astro`:** `fit` = cover / contain / auto, plus `inset`.
  - **`src/lib/imageTone.ts`:** build-time sampling of each image's border colour so plain-background images blend into a matching backdrop.
  - **Also:** `ProjectCard`, `MetricGrid`, `FocusAreas`, `ContactBlock`, `SiteFooter`, and `src/pages/{index,about,resume}.astro`.
- **Projects:**
  - **Published, in order:** `fsae-wheels`, `ucla-go-kart`, `baja-destructive-test-rig`, `ucla-underwater-robot`.
  - **Hidden:** `henna-delta-robot` (a draft containing only placeholders).
- **Deployment** (`.github/workflows/deploy.yml`):
  - `npm run verify` runs on every push to any branch and on pull requests.
  - **Only a push to `main` deploys** (`withastro/action@v6`, then `actions/deploy-pages@v5`).
  - If a check fails, the previous site stays live.
- **Commands:**
  - `npm run verify`: astro check, build, and internal link check. This is the same gate CI uses.
  - `npm run placeholders`: lists placeholder text still to fill in.
  - `npm run test:links:external`: checks links to other sites.
- **Local preview:**
  - Run `npm run build`, then `preview_start` with `stage23-preview` (serves the worktree's `dist/` at http://localhost:4322). Use `stage23-dev` for a live-reloading server.
  - The configs exist in this worktree's `.claude/launch.json` and in the main folder's `.claude/launch.json`.
  - Port 4321 belongs to the main folder's own configs.
- **Docs:**
  - **`README.md`:** customization guide for a non-developer.
  - **`docs/DECISIONS.md`:** design and architecture decisions.
  - **`docs/reviews/STAGE-2-3-AUDIT.md`:** the full Stage 2/3 audit and final report.

## 5. Completed work

### Before Stage 2/3 (already live on `main`)

- **Stage 1:** build and first deploy.
- **Review round on 2026-10-31:**
  - Removed the "Engineering detail" section.
  - Drafts hidden everywhere.
  - Image borders added.
  - Favicon removed.
  - White text panels added.
  - Larger About photo.
- **Resume cache-busting fix:** `b4b55e2`.

### Stage 2/3 (on the branch)

**Process:**
1. **Phase A:** reconnaissance.
2. **Phase B:** audit (`STAGE-2-3-AUDIT.md` §0–10, with recommendations R1–R27 and eight questions).
3. **Phase C:** Anav's answers (§7).
4. **Phase D:** implementation.
5. **Phase E:** validation.
6. **Phase F:** final report, in audit §11 and delivered in chat.

**Commits:**

| Commit | Scope |
|---|---|
| `7a7fb73` | Content: `content/profile.yaml`, `content/about.md`, the four published project files, `_TEMPLATE` |
| `13825e8` | Presentation: 7 components, `index`/`about`/`[slug]` pages, `src/content.config.ts`, new `src/lib/imageTone.ts`, `global.css`/`tokens.css`, `astro.config.mjs`, `package.json` (lists sharp explicitly; it was already installed) |
| `788edd4` | Docs: audit report, `README.md`, `docs/DECISIONS.md` |

**What changed** (the per-item table with audit references is in §11 of the audit):

- **Accuracy:**
  - **FSAE:**
    - The ~$900 / 23% figure is labelled *projected* and measured against the previous year's outsourcing cost.
    - The ~1 lb figure is labelled *estimated* and *preliminary*, and is the total across all four corners.
    - These qualifiers appear in both the metrics and the contribution bullets.
    - The 74 lb suspension mass target was added.
  - **Go-kart:** "fastest best lap of 4 teams" and "~12 runs vs. 1–3 for most teams".
  - **Baja:**
    - Title is now "Destructive Testing Engineer".
    - Outcomes are separated into three stages: rig built; verified analytically (hand calculations + FEA); destructive test pending after the handoff.
    - "5 components reviewed" moved from a metric to a contribution bullet.
- **Copy:**
  - Every proposal in audit §8 ("Proposed copy") was accepted as written: tagline, intro, focus text, About lede and bio, projects intro, contact section ("Get in touch"), SEO description, and card subtitles.
  - About 15 typos fixed, plus a consistency pass on dates, units, and terms.
- **About:**
  - Experience now has six entries in resume order. The Baja, SAMPE, and FIRST CNC Mentor bullets are verbatim from the resume.
  - Skills are regrouped as Software / Manufacturing / Engineering methods.
- **Homepage:**
  - Projects moved directly after the hero.
  - The GitHub link now appears only in the footer.
  - The portrait has fallback alt text.
- **Project pages:**
  - **Figures:**
    - Grouped into chapters via `section:`.
    - Wide figures span the full width.
    - All figures were kept, including ones that repeat the hero.
  - **Adaptive hero:**
    - Covers narrower than 1.25:1 or under 1400 px wide are shown uncropped.
    - Others keep the 2:1 crop.
  - **Layout:**
    - The tag column in *At a glance* was removed.
    - Skills and tools are listed separately.
  - **Underwater robot:** skills re-enabled.
  - **Video:**
    - Optional `video` / `videoCaption` fields.
    - Commented-out stubs in the go-kart and underwater robot files.
- **Images:**
  - Fixed a `srcset` bug (images were capped at 800 px, and those under 480 px had no `srcset`).
  - Plain or gradient backgrounds now blend into the page via a 5% feathered edge.
  - Cards use `fit="auto"`.
  - Images that look upscaled on retina screens dropped from 19 to 5 of 38.
- **Other:**
  - Metric values no longer break mid-word.
  - Project cards show the timeline.
  - The unused italic font was removed (75 KB less per page).
  - JPEG quality is 72.
  - Tap targets are at least 24 px.
  - Full-size figures open in a new tab.
  - The entrance animation starts at 40% opacity, so content is never invisible.

### Validation results

- **Re-run at handoff** (2026-11-01, HEAD `788edd4`):
  - `npm run verify`: 0 errors, 0 warnings, 0 hints; build complete; 143 internal links OK.
  - `npm run placeholders`: 28 items, all in the hidden henna draft.
- **Phase E** (2026-10-31, local preview of the same code):
  - External links: 155 OK (LinkedIn is skipped because it blocks bots).
  - 9 pages × 5 viewports: no horizontal overflow, no text under 12 px, no images spilling out of their frames, no metric breaking mid-word, and the header stays on one line.
  - No console errors, JavaScript errors, or broken images.
  - Resume embed returns 200 `application/pdf`; the download link carries the content hash.
  - The video feature was tested with a temporary file, which was then removed.
- **Testing method:** all testing used the desktop app's built-in Chromium browser with emulated viewports. **Safari/WebKit and real phones have not been tested** (§6C).

### Publication (2026-11-01)

1. **Approval:** Anav gave explicit approval in chat: "Yes, publish the changes that have been made so far to main."
2. **Pre-checks passed:** the main folder was clean and on `main`; GitHub's `main` was still `19e7ecc`; a fast-forward was possible.
3. **Fast-forward:** in the main folder, `git merge --ff-only portfolio/stage-2-3-refinement` moved `main` from `19e7ecc` to `788edd4`. No merge commit, no force.
4. **Push:** Anav pushes from GitHub Desktop ("Push origin"), because the command line has no credentials.
5. **Pushed:** Anav pushed at 02:30 local time.
6. **Deploy:** the GitHub Actions run succeeded at 02:32: https://github.com/TheAnoof/TheAnoof.github.io/actions/runs/41297805392
7. **Live-site check** (2026-11-01, after the deploy):
   - **Pages:** all 8 published pages return 200; the henna draft returns 404, as intended.
   - **Content:** the live HTML shows the new content (projects before focus, new tagline, FSAE "Projected", 74 lb, figure chapters, no GitHub link in the hero).
   - **Resume:** the link carries the content hash `abd5a943`, which matches the current PDF, and returns `application/pdf`.
   - **Links:** a linkinator crawl of the live site found 148 internal links and assets, all OK.
   - **Layout:** a browser check of the 8 pages at 1440, 1280, 768, 390, and 375 px found no horizontal overflow, broken images, text under 12 px, or images spilling out of their frames. The header stays on one line.
   - **Console:** no errors.
   - **Caveat:** this was still the built-in Chromium browser; see §6C.

## 6. Unfinished work

### A. Implementation remaining (Claude)

| Item | Where | Status | Next action / blocker |
|---|---|---|---|
| **Feedback on the live version** | any | Next chat | Anav will review the published site and give feedback in a new chat. That includes adjusting the wording to their voice. Apply the feedback on a new branch without adding facts. |
| Project videos | `ucla-go-kart/images/GK_Race.mp4`, `ucla-underwater-robot/images/UW_Launcher_Test.mp4` | Stub lines commented out | Blocked on the files. Convert `.MOV` per README "Project videos" (`avconvert`), uncomment `video:` / `videoCaption:` (confirm the captions with Anav), then verify. |
| Larger go-kart images | `ucla-go-kart/images/` (currently 422–498 px wide) | Waiting on Anav | Blocked on the files. The current images were taken from design-review slides and Anav didn't save the originals, so larger versions may not exist. Replacing files under the same names needs no code change; check sharpness afterwards. |
| FSAE electronics-integration work | `content/projects/fsae-wheels/index.md` | Not started | Blocked on Anav's content. Anav is doing electronics-integration work **for the wheels role** and will add it later. The electronics *enclosure* is a separate item and is **not** part of the wheels role. |
| Outdated doc text (optional) | `docs/DECISIONS.md` "Information architecture" (old homepage order, old resume filename); audit header ("no site changes made yet") and the last line of audit §10 | Superseded by later sections | Low priority. Tidy up only with Anav's agreement. |

### B. User input required

**Still open:**

1. **Feedback on the live version:** the agenda for the next chat; Anav leads it.
2. **Figure chapters:** accepted "for now"; Anav wants to revisit them after seeing the result. This will probably come up in that feedback.
3. **Minor:** the wording of the "Growing focus" label for robotics (marked ⟲ in `docs/DECISIONS.md`).

**Resolved by Anav on 2026-11-01** (don't raise these again):

- **Publishing:** approved, and done (§5 "Publication").
- **Quality engineering:** leave it out of the target roles.
- **Unused images:** `fsae-wheels/images/WH_Front_Bearing_Selection.png`, `WH_Rear_Bearing_Selection.png`, and `ucla-go-kart/images/GK_Chassis_CAD.png`. **Leave them alone**; Anav will deal with them as needed. Don't use, move, or delete them.
- **Old resume in git history:** an older resume file (added in `9829bd9`, since replaced) contains personal contact details that are not on the live site. **Leave it in history.** No history rewrite.
- **`CLAUDE.md`:** **leave it uncommitted.** This handoff document stays uncommitted too.

### C. Validation remaining

- **Post-deploy check:** done and passed (§5 "Publication").
- **Safari/WebKit and real phones: NOT TESTED.** All testing so far used the built-in Chromium browser with emulated viewports. Anav has decided to handle this **in a new chat**. What needs checking:
  - the feathered edge mask (`mask-composite` / `-webkit-mask-composite`)
  - images shown uncropped
  - the video element
  - general layout on a real iPhone/Android at actual pixel density

  Don't start it until Anav brings it up. Then either ask Anav to check on their own devices, or test in WebKit if it's available.
- **Automated audits:** no Lighthouse or axe run is on record. Accessibility checks were targeted: alt text, tap targets, text size, and contrast (from Stage 1). No keyboard-only or screen-reader pass has been done.
- **Videos:** real video files, once provided.

### D. Optional future improvements

- **Gemini Pro audit** (the next major stage). It comes after the feedback round. Gemini can only see the live URL, so the site has to be published first.
  1. Gemini critiques the site as a recruiter and as a hiring manager.
  2. Claude decides which findings are valid.
  3. Anav approves which changes to make.
  4. Claude implements them.

  Don't start until Stage 2/3 is closed.
- **SAMPE carbon I-beam project page:** this would be the site's only completed physical test with measured results. Anav doesn't have enough surviving material for a page and said they will add it themselves if they find it. Don't propose building it.
- **Henna page:** stays hidden until Anav has images.
- **FSAE renders:** Anav cannot produce higher-resolution files, so the five remaining soft images are limited by their source files.
- **Not built in Stage 1** (left out because nobody asked for them): sitemap, dark mode, lightbox. Ask before adding any of them. A custom domain was explicitly ruled out "yet" in Stage 1.

## 7. Important decisions and assumptions

The full log is in `docs/DECISIONS.md`, in the "Stage 2 & 3 refinement" section and the sections above it.

**Phase C answers (authoritative facts and decisions from Anav):**

- **Go-kart:**
  - "Fastest time" means Anav's team had the best lap among the four teams' best laps.
  - The team completed about 12 runs; most teams completed 1–3.
- **Baja:**
  - The destructive test is still planned, but Anav is no longer involved. The rig was handed to the team's testing group, and Anav left in April 2026.
  - The correct title is "Destructive Testing Engineer".
  - Anav did some FEA but lost the figures; only hand calculations remain. **Do not mention the lost figures on the site.**
- **FSAE:**
  - The 23% is measured against the previous year's outsourcing cost, which is most of the wheel subsystem's manufacturing cost.
  - The ~1 lb is the total across all four corners.
  - Add the 74 lb mass target. Do **not** add the ISO 18388 detail; that work is still in progress.
  - The electronics enclosure is not part of the wheels role. Separate electronics-integration work for the wheels role will be added later by Anav.
- **About:** add Baja, SAMPE, and the FIRST CNC Mentor role "exactly as they show up in my resume". No SAMPE project page, and henna stays hidden.
- **Layout and figures:**
  - Homepage option A: projects directly after the intro.
  - Figures option A: chapters, for now.
  - Keep the figures that repeat the hero image.
- **Copy and contact:**
  - Accept all copy changes; Anav will adjust the phrasing later.
  - Move the GitHub link to the footer.
  - Keep the location as "Cupertino/Los Angeles, CA".

**Decisions from Anav on 2026-11-01, after reviewing the handoff:**

- Publish Stage 2/3 to `main`.
- Leave quality engineering out of the target roles.
- Leave the unused images alone.
- Leave the old resume in git history.
- Keep `CLAUDE.md` uncommitted.
- Handle Safari and real-phone testing in a new chat.
- Collect feedback on the new version in a new chat.

**Rejected; do not reintroduce:**

- Removing gallery figures that repeat the hero image (audit R18).
- The ISO 18388 relief-groove detail.
- Electronics enclosures under the wheels role.
- A SAMPE project page or unhiding henna (for now).
- Homepage options B and C; figure options B and C.
- The GitHub link in the hero.
- Changing the location to "Cupertino, CA".
- From earlier rounds:
  - the Markdown "Engineering detail" section
  - a custom favicon
  - drafts showing in the local preview
  - any client-side JavaScript framework or hamburger menu
  - dark mode
  - an embedded PDF on phones (buttons only, by design)
  - a public note that the Baja FEA figures were lost

**Autonomous technical choices** (revisable with evidence; details in `DECISIONS.md`):

| Setting | Value | Note |
|---|---|---|
| Background-blend threshold | 28 | Calibrated on the current images; an image with a busy edge simply gets the standard frame. |
| Adaptive hero cutoffs | 1.25:1 aspect, 1400 px width | Below either one, the cover is shown uncropped. |
| Wide-figure cutoff | 1.8:1 | Figures at or above this span the full width. |
| JPEG quality | 72 | |
| Entrance animation | starts at 40% opacity | Content is never fully hidden. |

## 8. User preferences and working instructions

- **Autonomy:** Anav is a mechanical engineering student with essentially no web-development background.
  - **Claude handles on its own:** implementation, component architecture, CSS, minor layout, responsiveness, performance, accessibility, testing, code quality, and ordinary UX decisions.
  - **Anav decides:** personal branding, professional positioning, content accuracy, major creative direction, significant layout changes, and visual identity.
  - **How to ask:** a concise question that explains the alternatives and gives a recommendation. Don't ask about technical details Anav can't evaluate.
  - **Doing steps yourself:** do as many steps as possible yourself, and say clearly when Anav firmly needs to act (for example, clicking Push in GitHub Desktop).
- **Communication:**
  - Direct, efficient, and frank; critically evaluate your own work.
  - No self-congratulation, and don't present ordinary decisions as exceptional.
  - Report assumptions and test results accurately, including failures.
- **Content accuracy:** never invent accomplishments, metrics, results, calculations, contributions, technologies, dates, titles, team sizes, or outcomes.
  - Never turn an estimate into a measured result, or a projection into an achievement.
  - Never attribute a team's results to Anav alone.
  - If something is unclear, flag it and ask.
  - Anav wrote much of the content. Edit it for clarity while keeping its meaning; don't treat it as placeholder text to rewrite.
- **Images:**
  - Use only Anav's genuine photos, CAD screenshots, diagrams, and test images.
  - Never use stock photography, AI-generated CAD, fabricated diagrams, or artificial renders that could pass for real work.
  - Don't add visible placeholders on the public site where a section can simply be left out. If an asset is missing, tell Anav exactly which file is needed and where it goes.
- **Verification and changes:**
  - Never weaken or bypass the verification checks just to make the build pass.
  - Keep commits small and understandable.
  - Don't modify unrelated files.
  - Don't delete files Anav wrote without explaining why.
- **Git safety** (Anav's verbatim rules): "Do NOT: Push changes to main. Merge into main. Trigger a production deployment. Rewrite Git history. Force-push. Delete existing project content or routes."
  - These hold unless Anav explicitly approves the specific action in chat.
  - "If there are uncommitted changes, do not overwrite, discard, or automatically stash them. Explain the situation and ask how to proceed."
  - "Preserve existing URLs and project route slugs unless I explicitly approve a change. The current portfolio link is already being shared with recruiters."
- **Security and privacy:**
  - "Do not introduce analytics, tracking, external forms, databases, third-party integrations, or external services without asking me first."
  - Never commit credentials or unnecessary personal documents.
  - If something raises a security or privacy concern, stop and ask.
- **Personal information:** don't change the email, LinkedIn, GitHub URL, location, or photo without asking. The email is public on the site on purpose.
- **Publishing:**
  - The command line has **no git credentials**, so Claude cannot push. Anav pushes with GitHub Desktop from the main folder.
  - The worktree setup exists so that folder always stays on `main`. Never commit in the main folder, except an approved fast-forward (§9 step 5).
  - GitHub Desktop can also show this review folder as a repository, and the untracked `CLAUDE.md` and handoff appear there as changes. Remind Anav to leave them unchecked.
- **Pronouns:** in docs, refer to Anav by name or as they/them.

## 9. Immediate next steps (new chat: feedback on the live version)

1. **Read:**
   - `CLAUDE.md`
   - this document
   - the "Stage 2 & 3 refinement" section of `docs/DECISIONS.md`
   - §11 of `docs/reviews/STAGE-2-3-AUDIT.md`

   Don't redo the audit, reimplement completed items, or reopen the questions resolved in §6B.
2. **Check the git state:**
   - Run `git status --short --branch` in this worktree. Expect `## portfolio/stage-2-3-refinement` with only `?? CLAUDE.md` and `?? docs/handoffs/`.
   - Run `git -C /Users/anavsaxena/Desktop/Coding/GitHub/TheAnoof.github.io status --short --branch`. Expect `## main...origin/main`, clean.
   - Both `main` and `git ls-remote origin refs/heads/main` should be at `788edd4` or later. If Anav has since edited content directly on `main`, it may be newer.
   - Confirm the deploy succeeded (§5 "Publication").

   If anything is unexpected, stop, describe what you see, and ask.
3. **Ask Anav for their feedback** on the live site (https://theanoof.github.io). They will lead with feedback on the new version, which may include wording in their own voice and the figure chapters.
4. **Make the changes on a new branch:**
   1. In this worktree, create a branch from the current `main`, for example `git switch -c portfolio/post-launch-feedback main`. The untracked handoff files carry over. Don't delete the old branch without asking.
   2. Make the changes.
   3. Run `npm run verify`.
   4. Run `npm run build`, start `preview_start` with `stage23-preview` (http://localhost:4322), and check the affected pages at all five viewports.
   5. Commit on the branch.
   6. Report back.
5. **Publish only after Anav explicitly approves.** Use the same procedure as §5 "Publication":
   1. Check that the main folder is clean and on `main`, and that `main` equals `origin/main` (`git ls-remote` works without credentials).
   2. Run `git -C <main folder> merge --ff-only <branch>`.
   3. Ask Anav to click **Push origin** in GitHub Desktop.
   4. Watch `git ls-remote` and the Actions API (`https://api.github.com/repos/TheAnoof/TheAnoof.github.io/actions/runs?head_sha=<sha>`).
   5. Check the live pages.
6. **Later, each only when Anav says to start:**
   - Safari and real-phone testing (§6C)
   - the Gemini Pro audit (§6D)
   - videos and larger images, once Anav provides them (§6A)

## 10. References

- **Live site:** https://theanoof.github.io
- **Repository:** https://github.com/TheAnoof/TheAnoof.github.io
- **Folders:**
  - Worktree (this branch): `/Users/anavsaxena/Desktop/Coding/GitHub/TheAnoof.github.io-stage-2-3`
  - Main folder (`main`, used with GitHub Desktop): `/Users/anavsaxena/Desktop/Coding/GitHub/TheAnoof.github.io`
- **Docs:**
  - `CLAUDE.md`
  - `README.md` (customizing, previewing, publishing, converting videos)
  - `docs/DECISIONS.md`
  - `docs/reviews/STAGE-2-3-AUDIT.md` (§1 summary, §8 recommendations R1–R27 and proposed copy, §9 questions, §11 final report)
- **Content:** `content/profile.yaml`, `content/about.md`, `content/projects/*/index.md`, `content/projects/_TEMPLATE/index.md`
- **Key code:**
  - `src/content.config.ts`
  - `src/lib/site.ts`
  - `src/lib/imageTone.ts`
  - `src/components/Gallery.astro`
  - `src/components/MediaFrame.astro`
  - `src/pages/projects/[slug].astro`
  - `src/pages/index.astro`
  - `.github/workflows/deploy.yml`
- **Commits:**

  | Commit | What |
  |---|---|
  | `19e7ecc` | Previous live version (before Stage 2/3), and the branch base |
  | `7a7fb73` | Stage 2/3 content |
  | `13825e8` | Stage 2/3 presentation |
  | `788edd4` | Stage 2/3 docs; branch HEAD, and `main` since publication |
  | `b4b55e2` | Resume cache-busting |
  | `9829bd9` | Older resume file (privacy item, §6B) |
- **Other local branch:** `dev/astro-site` (`71f15a9`), the Stage 1 development branch, already contained in `main`.

### Sources and confidence

- **How this was assembled:**
  - From the repository: git state, file contents, docs, and a fresh `npm run verify`.
  - From the conversation. The conversation was compacted once, just before this handoff was requested, so the earlier turns were available only as a summary.
- **Cross-check:** on 2026-11-01, every fact Anav supplied was checked against the verbatim user messages in the raw session transcript:
  - the Stage 1 brief
  - review feedback round 1
  - the publishing request
  - the resume-cache issue
  - the Stage 2/3 brief
  - the Phase C answers

  That check corrected one error (the electronics-integration item in §6A) and added the directives about positioning, images, and verification in §8.
- **Possibly lost to compaction:** intermediate reasoning and the exact wording of explanations given to Anav in chat. For example, the earlier answer on how editing and publishing work after going live is now captured in `README.md`.
- **Recovery source:** the full prior transcript, if ever needed, is at `/Users/anavsaxena/.claude/projects/-Users-anavsaxena-Desktop-Coding-GitHub-TheAnoof-github-io/ce78be14-7189-47b1-8bcb-f7c52e1d5d34.jsonl` (local only).
- **Assumptions vs. decisions:** labelled throughout. The ones that matter are the technical thresholds in §7, which are autonomous choices, not Anav's decisions.
