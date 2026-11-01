# Stage 2 & 3 Audit — Content, Visual & UX Review

**Site audited:** https://theanoof.github.io (live) · commit `19e7ecc` ("Typo Fixes")
**Branch for changes:** `portfolio/stage-2-3-refinement` (separate worktree: `../TheAnoof.github.io-stage-2-3`)
**Date:** 2026-10-31 · **Status:** Phase B complete; no site changes made yet

---

## 0. Phase A — Repository reconnaissance

| Check | Result |
|---|---|
| Current branch / tree | `main`, clean. Four files that first looked modified were the "Typo Fixes" commit being made in GitHub Desktop during the check. |
| Local vs. GitHub vs. live | Identical. `main` = `origin/main` = `19e7ecc`; its deploy succeeded; live HTML confirmed (resume fingerprint `abd5a943`, updated FSAE summary). |
| Refinement branch | `portfolio/stage-2-3-refinement` created from `19e7ecc` **in a separate worktree folder**, so the folder you edit in GitHub Desktop stays on `main` and your normal update flow can't accidentally commit to the wrong branch. |
| Architecture | Astro 7 static site, zero client JS, content in `/content` validated by `src/content.config.ts`, GitHub Actions deploy (`npm run verify` gate → `deploy-pages`). Unchanged since Stage 1 except your content and the Stage-1 refinements. |
| Published projects | FSAE Wheels (order 1), Go-Kart (2), Baja Test Rig (3), Underwater Robot (4). |
| Drafts | `henna-delta-robot` (`draft: true`, all placeholders) — correctly hidden; `/projects/henna-delta-robot/` returns the 404 page. |
| Unused assets | `WH_Front_Bearing_Selection.png`, `WH_Rear_Bearing_Selection.png`, `GK_Chassis_CAD.png` are in the repo but not referenced. |
| README accuracy | Mostly current. Stale: resume filename (`Anav-Saxena-Resume.pdf` → actual `Anav_Saxena_UCLAMechanical.pdf`), headshot filename, publishing section doesn't describe the GitHub Desktop flow you actually use. |
| `npm run placeholders` | 32 items: 27 in the hidden henna draft (fine), plus 5 **stale** TODO comments (email / LinkedIn / GitHub / Baja `areas`) that are already resolved. Nothing placeholder-like is visible on any live page (verified by scanning the built HTML). |

### What was inspected

- **Every content file** read directly (profile, about, 4 projects, henna draft, template).
- **Rendered live pages** in a real browser: Home, About, Projects, Resume, all 4 project pages, 404.
- **Automated sweep at 1440, 1280, 768, 390 and 375 px** of all 8 pages: horizontal overflow, broken images, text < 12 px, tap targets < 24 px, header wrapping.
- **Screenshots** at 1440 × 900 and 390 × 844 of every page (top, middle, gallery and footer regions).
- **All 133 referenced assets** requested from GitHub Pages: 133 × HTTP 200. Browser console: no errors. Network: no failed requests.
- **Image sharpness**: rendered size × 2 (retina) vs. the largest image actually served, per image, per page.
- **Resume PDF** text compared against site facts (titles, dates, graduation year, skills).
- **Conventions research** (brief, for the two structural recommendations): a published hardware case study (Formlabs × Lightcraft) places each image inside the topical section it supports, with its own caption, rather than collecting them in a grid at the end. This matches standard technical-report practice: figures appear beside the text that cites them, and wide figures run full width.

---

## 1. Executive summary

Version 1 is fundamentally sound and should be **refined, not redesigned**.

**What's working:**
- Layout, typography, color and navigation are clean and consistent.
- No page overflows at any tested width.
- Every asset loads; no JavaScript errors.
- Text contrast passes WCAG AA everywhere.
- The project-page structure (Team scope vs. Individual contribution) does exactly what it was meant to.
- Your FSAE content is technically strong: real load cases, a trade-study rationale, a bearing-calculation rework, FEA with a mesh-convergence check, and CAM-to-machined-part evidence.

**The biggest gaps aren't styling. They are, in order of impact:**

1. **Accuracy and polish problems on live pages**
   - A typo in the first project's subtitle ("anduprights"), shown on the homepage card.
   - "dynamometer" misspelled 5×, plus about 10 other spelling slips.
   - FSAE presents *projected* savings as achieved ("~$900 (23%) **Saved**", "reducing … cost by ~$900"), even though your own notes and your resume correctly say "projected".
2. **Your strongest evidence is under-used or missing.**
   - Your resume contains three significant items the site doesn't show:
     - the **SAMPE carbon-fiber I-beam** (real three-point bend test, failure at 5,300 lbf vs. a 7,200 lbf load case, root-caused to delamination). This is the only completed *physical test with measured results* across all your work.
     - **CNC Machining Mentor, FIRST Team 2473** (Tormach commissioning, feeds/speeds calculator, SOPs). This is your strongest manufacturing credential.
     - FSAE details like the **74-lb suspension mass target** and **ISO 18388-based relief-groove sizing**.
   - Baja and SAMPE also don't appear in the About page's Experience list.
3. **Figures are presented in a way that hides their value.**
   - **Wide diagrams are unreadable at page size:** the free-body diagram, bearing spreadsheet and camber trade-study table are shrunk into 4:3 boxes.
   - **The figures are disconnected from what they prove:** 4–11 per project sit in one undifferentiated grid at the end of the page.
   - **The first image on the first project is blurry:** a 610-px render stretched to 1,148 px (3.8× upscaled on retina screens).
   - **A code bug serves smaller images than available:** the gallery caps many images at 800 px, and three go-kart images get no responsive sizes at all.
4. **Several statements need qualification or clarification.**
   - **Go-kart:** "fastest time … among 3 other groups" and "drove in several more races" are ambiguous.
   - **Baja:** timeline ends Apr 2026 while the status is still "Awaiting Test".
   - **Homepage intro:** "owning design of mechanical and robotic systems" slightly over-reaches for the robotics side.
5. **Recruiter path.** On a 1440 × 900 screen, project cards start ~1,640 px down, below a text-only focus section. The evidence comes second.

**Recommendation:** fix the accuracy and typo items (P0), the image pipeline and image presentation (P1), and the copy (P1, with your approval). Then decide on adding SAMPE/FIRST and on the two structural options in §9.

---

## 2. Content audit (all pages)

Criteria: Clarity · Professionalism · Conciseness · Technical depth · Hierarchy · Consistency · Recruiter effectiveness.

### Home (`content/profile.yaml`)

| Element | Current | Assessment |
|---|---|---|
| Eyebrow | "UCLA \| Mechanical Engineering \| Class of 2029" | ✅ Clear, matches resume ("Expected June 2029"). Separators: use `·` for consistency with other labels (P3). |
| Tagline | "Designing, analyzing, building, and testing everything from cars to robots" | Good energy and scope, but "everything" reads as hyperbole and the line names no concrete evidence. **Clarity/professionalism: fair.** |
| Intro | "Mechanical engineering student owning design of mechanical and robotic systems. Seeking Summer 2027 roles…" | "Owning design of … robotic systems" isn't supported by visible evidence: you own FSAE hubs/uprights, and the robotics work is class/team based. It also omits the two strongest differentiators, Formula SAE ownership and hands-on CNC machining. **Positioning risk: P1.** |
| Location | "Cupertino/Los Angeles, CA" | Resume says "Cupertino, CA". Minor discrepancy (question 8). |
| Focus · Design | "Design, analyze, and build mechanical systems (SOLIDWORKS, Onshape, Ansys) to fit performance, cost, DFMA, and serviceability requirements." | ✅ Specific and accurate. Slight grammar polish only. |
| Focus · Robotics | "Work on personal projects in robotics building off of 4+ years in FIRST, wanting to dive deeper into human-robot interaction systems." | The only robotics personal project (henna) is hidden, so "personal projects" has no visible evidence. Omits that you now **teach** ENGR 1UW. Run-on sentence. P1 copy. |
| Focus · Manufacturing | "Leverage experience in manual and CNC machine operation…" | ✅ Accurate. Could name Haas/Tormach and CAM to be concrete (P2). |
| Projects intro | "A mix of past and ongoing work in various engineering teams and personal projects!" | Generic; the exclamation mark undercuts the professional tone; "personal projects" currently has none visible. P2. |
| Contact | "Get in touch!" / "…Always down for talking about robotics, machining, or teaching…" | Friendly but casual ("always down"). A recruiter-facing tone keeps the warmth without the slang. P2. |
| SEO description (link previews) | "Engineering design portfolio containing ongoing projects and past experiences." | Generic. This is the text shown when the link is pasted into LinkedIn or iMessage. P2. |

### About (`content/about.md`)

| Element | Assessment |
|---|---|
| **Lede** | "…Active ownership in Formula SAE, building on strong foundation…" is a sentence fragment. "**Looking to develop hands-on skills**" *undersells you*: you already machine production parts and mentor others on CNC. P1. |
| **Bio** | "I am a second year UCLA mechanical engineer" → "second-year mechanical engineering student at UCLA" (you are a student). Otherwise clear and genuine. P1 polish. |
| **Experience** | Accurate titles and dates, matching the resume. **Missing:** Baja SAE (2025–2026), SAMPE (2025–2026), FIRST 2473 CNC Machining Mentor (Summer 2026; student 2021–2025). Order is "most relevant first" rather than reverse-chronological, which is fine but unstated. Date format "Sept 2025 - present" is inconsistent with project pages ("Present") and uses a hyphen instead of an en dash. |
| **Skills** | The "Programming & Electronics" group contains only Python and MATLAB; no electronics are listed. "Manufacturing" omits **manual mill/lathe** and **fixturing**, both on your resume and evidenced on the Baja page (manual lathe parting). No group for **engineering methods** (FEA, hand calculations, trade studies, DFMA, bearing selection), which the projects demonstrate repeatedly. P2. |
| Interests / Current focus | Commented out, so the sections are hidden. ✅ Correct choice: no visible placeholders. |

### Consistency issues (site-wide)

| Issue | Instances |
|---|---|
| Spelling | **anduprights** (FSAE subtitle, also on homepage card) · **dynometer** ×5 (→ dynamometer) · **Adjustement** · **derivce** · **SOLIDWORK** · **adpaters** · **measureable** · "Vehicle **Dynamic** hardpoints" (team name is Vehicle Dynamics) · "due large cost benefit" (→ due to the) |
| Dates | "Sept 2025 - Present" vs "Sept 2025 - present" vs "Mar 2026 - Jun 2026"; hyphen vs en dash; "Sept" vs "Sep" |
| Units | "1-lb", "±0.001 inches" vs "±0.001 inch", "0.392G long, 1.884G lat, 1.3 FS" (→ 0.392 g longitudinal, 1.884 g lateral, FoS 1.3) |
| Acronyms / names | "6-DoF" (title) vs "6-DOF" (body) · "Fusion360" vs "Fusion 360" · "Aluminum 7075-T6" vs "aluminum 7075-T6" · "8020 extrusions" (brand is 80/20) · "go kart" vs "go-kart" · "Carbon Steel" mid-sentence capitals |
| Tense | FSAE mixes completed ("Reworked") and ongoing ("Defining", "Performing") work. That's correct for an in-progress project, but the page never says which parts are done. Other projects are past tense ✅. |
| Role titles | Baja: site says "Destructive Test **Design** Engineer", resume says "Destructive Testing Engineer" (question 2). Go-Kart and Underwater both say "Design Engineer" for class teams. Acceptable, but consider "Chassis design lead"-style specificity if accurate. |

---

## 3. Project-by-project observations

### 3.1 FSAE Wheels Subsystem — strongest page, needs accuracy and figure fixes

**Story (top of page):**
- Subtitle has the "anduprights" typo.
- Summary is accurate but dense ("within context of Vehicle Dynamic hardpoints").
- Objectives and outcomes are commented out, so there is **no Team-scope section**. That's honest for an in-progress project, but the page never states what is finished vs. in progress beyond the status cell ("FEA in progress, awaiting finalization before manufacturing").

**Metrics:**
- **Cost.** "~$900 (23%) **Saved**" is styled as an achieved result; the qualifier ("Projected…") sits in small gray text underneath. Contribution #1 says "reducing subsystem manufacturing cost by ~$900 (23%)" with no qualifier. Your resume words it correctly: "*projected to* reduce subsystem manufacturing cost by ~$900 (23%)". **P0 accuracy.**
- **Mass.** "1-lb Reduction" is "preliminary", but contribution #2 states it as fact. **P0 accuracy.**
- **Baseline.** The basis of "23%" (of what baseline?) isn't stated (question 3).
- **Formatting.** Values are phrases rather than numbers. On phones, "1-lb Reduction" breaks mid-word into "Reductio / n" (§5).

**Contribution:** excellent specificity (load cases, SKF bearing selection, preload method, mesh convergence). Two items worth adding from your resume, with your OK:
- the **74-lb suspension mass target**
- **relief-groove dimensions based on ISO 18388**

**Decisions:** genuinely good engineering storytelling. Polish only:
- Camber result: "with specific range needs decision awaiting determination from Vehicle Dynamics sub-team" is hard to parse.

**Figures (11):** strong set, poorly presented.
- Fig. 01 duplicates the hero image.
- The FBD, spreadsheet and trade-study table are unreadable in 4:3 boxes.
- The order mixes CAD → analysis → manufacturing without signposting.
- Captions are generally excellent ("…mesh refinement… converged under 5% variation"). Keep this voice.

**Hero:** `WH_Front_Assembly.png` is **610 × 652 px**, cropped to 2:1 and stretched to 1,148 px wide → visibly soft and heavily cropped. **Asset needed** (§8).

### 3.2 Go-Kart — needs factual clarification

**Claims to clarify (question 1):**
- Summary: "Produced robust, reliable go kart that **drove in several more races than other projects** and **achieved the fastest time**."
- Outcome: "achieving **fastest time** around a controlled track **among 3 other groups**."
- Ambiguities:
  - Is "fastest time" a lap time, an overall race time, or the fastest of several runs?
  - Is it 4 teams total (you + 3), or 3 total?
  - "Several more races" — how many races did your kart complete vs. the others?

**Contributions:** only 3, all chassis-focused. They're good, but the "test" focus area links here and the page shows no testing work beyond the race result. A brief note on what you tested or iterated would help (question 1).

**Skills:** "SOLIDWORKS" duplicated as a skill rather than a tool; "Integration" and "Technical Presentations" are vague. Tags include "ENGR 1 Class" (better: "UCLA project course").

**Images:**
- Four images (`GK_CAD`, `GK_Front`, `GK_Wheel`, `GK_Steering`) are only **422–498 px wide** and render soft at 560 px (§7).
- The cover photo is authentic but busy (classroom background). It's acceptable; a cleaner shot of the finished kart would be stronger (optional asset).

### 3.3 Baja Destructive Testing Rig — must separate "verified" from "tested"

**Already good:**
- Status "Awaiting Test" and summary "Awaiting testing data" are honest.
- Outcomes describe manufacturing/assembly and *analytical* verification; nothing claims the destructive test happened. ✅

**Recommended:** an explicit status breakdown so a reader can't misread it:

| Stage | Status |
|---|---|
| Rig manufactured & assembled | Complete |
| Analytical verification | Complete (hand calcs + FEA) |
| Destructive test | Pending |

**Consistency problems:**
- **Timeline vs. status.** Timeline ends **Apr 2026**, yet the test is still pending in Oct 2026. Did your involvement end, or is the test still scheduled (question 2)?
- **FEA attribution.** The outcome says "confirming via hand calculations and structural FEA", but your contributions list only hand calcs. Your resume says you "Performed FEA and hand-calculated key stress". If that FEA was yours, it belongs in contributions (question 2).

**Metrics:**
- "±0.001 inches" — strong, specific, verifiable. ✅
- "5 Components Reviewed" with a sentence as the label is a weak metric; it reads as filler next to the tolerance figure. Better as a contribution bullet (P2).

**Cover:** currently the full CAD render. Your assembled-frame photo (`Baja_Frame.png`) would show real hardware first; consider it as the cover (P2, your call).

**Spelling / naming:** "measureable", "Fusion360", "1045 Carbon Steel".

### 3.4 6-DoF Underwater Robot

- **"Solenoid":** already fixed in `19e7ecc`. ✅
- **Clarity edits:**
  - "Fully designed and tested…" → drop "Fully".
  - "launch projectile further" → "increase launch distance".
- **"6-DOF" vs. "6-DoF":** inconsistent; standardize on "6-DoF".
- **Vague contribution:** "Created physical controller to integrate mechanical and electrical components". What was the controller (enclosure? joystick box? wiring harness)? One clause of specifics would make it credible (optional info).
- **Skills section:** commented out, so this is the only project with no skills panel. Your commented list ("SOLIDWORKS, pneumatics, manufacturing, 3D printing, testing") looks accurate; re-enable it with consistent capitalization (P2, autonomous unless you object).
- **Testing:** no video or measured launch distance. If you have a clip of the launcher firing, a 5–10 s muted loop would be the most convincing robotics evidence on the site (optional asset; no third-party service needed).
- **Hero:** the cover is nearly square (1609 × 1536) but is cropped to 2:1, cutting the robot.

### 3.5 Hidden: Henna applicator

Correctly hidden. Your resume has enough material for a strong page:
- Klipper hand-contour mapping
- ISO 13850 E-stop
- Manta M5P/CM4 control
- NEMA 17 / GT2 motion sizing

It's ready to build whenever you have photos or CAD (question 4).

---

## 4. UX & visual design audit

| Dimension | Findings |
|---|---|
| **A. First impression** | Professional, restrained, clearly an engineering portfolio, not a SaaS template. The warm paper + blueprint-blue + mono labels identity is distinctive without being decorative. **Keep it.** The weakest first-impression element is image quality on the FSAE card and hero (soft, upscaled). |
| **B. Typography** | IBM Plex Sans/Mono hierarchy works; line lengths are within 50–75 characters; mobile body text is 16 px. Issues: metric values are set at display size (46 px) but contain phrases, which causes awkward wraps; figure captions at 14 px gray are readable but long captions (FSAE Fig. 09–11) run 3 lines. |
| **C. Layout & spacing** | Section rhythm is consistent. **Issues:** (1) "At a glance" puts the tag list in an orphaned right column; tags already appear on cards. (2) The FSAE page is 7,400 px on desktop and 9,100 px on mobile, mostly from 11 equal-size figures. (3) The odd figure counts leave an empty right cell (cosmetic, P3). |
| **D. Color & identity** | Cohesive; one accent used consistently; dark-blue image borders now frame images well. Contrast: all text ≥ 4.5:1. Colors don't compete with imagery. No change recommended. |
| **E. Navigation** | Clear header (Projects · About · Resume button), sticky; name returns home; breadcrumb + previous/next on project pages; resume reachable in one click from every page. ✅ **Issue:** projects sit below the focus section on Home (§1 #5, question 5). |
| **F. Interaction** | Hover lift on cards, arrow nudges, visible focus outline, reduced-motion respected. Restrained. ✅ Gallery "open full-size" opens the raw image in the same tab; acceptable, though a recruiter loses their place. Opening in a new tab is a cheap improvement (P3). |
| **G. Project presentation** | Cards communicate enough (category, title, role, one-line subtitle, 3 tags) but **omit the timeline and status** that tell a recruiter what is recent or ongoing (P2). Contributions are easy to find ✅. Metrics are visually prominent but need qualification (P0) and shorter values (P1). The technical depth lives in figures, which are currently the hardest part of the page to read (P1). |

---

## 5. Responsiveness findings

Automated sweep across 8 pages × 5 viewports, plus screenshots at 1440 and 390:

| Check | 1440 | 1280 | 768 | 390 | 375 |
|---|---|---|---|---|---|
| Horizontal overflow | none | none | none | none | none |
| Header on one line | ✅ | ✅ | ✅ | ✅ | ✅ |
| Broken images | 0 | 0 | 0 | 0 | 0 |
| Text < 12 px | none | none | none | none | none |
| Project cards | 2-col | 2-col | 2-col (narrow, OK) | 1-col | 1-col |

**Problems found:**
- **Metric values break mid-word on phones** ("1-lb Reductio / n", "~$900 (23%) Saved" over three lines). The cause is phrase-length values in the two-column phone grid. **P1.**
- **Wide figures on phones:** the FBD, spreadsheet and trade-study table become ~340 px wide with unreadable text. **P1** (same fix as §7.3).
- **Resume page on phones:** buttons only, by design (mobile PDF embeds are unreliable). Fine, though ~60% of the screen is empty. P3.
- **Small tap targets:** footer links, the breadcrumb "Projects" link and focus-area "See" links are 17–22 px tall. They're inline or well spaced, so they meet the WCAG 2.5.8 spacing exception, but slightly larger hit areas would help thumbs. P3.

---

## 6. Accessibility & usability observations

| Check | Result |
|---|---|
| Contrast | ✅ All text ≥ 4.5:1 (body ~16:1 inside panels). |
| Alt text | ✅ Every image has alt text. **However**, alt text duplicates the visible caption word-for-word, so screen readers read each figure twice. Shorter alts ("CAD render, front wheel assembly") would be cleaner (P3). The portrait has empty alt because `photoAlt` is commented out, so screen readers skip your photo (P3, one-line fix). |
| Headings | ✅ One `<h1>` per page, logical `h2` sections. Decision cards use `h4` under `h3` ✅. |
| Semantics | ✅ Landmarks, `nav` labels, breadcrumb `aria-current`, `figure`/`figcaption`, definition lists for metadata. |
| Focus states | ✅ Visible 2 px blue outline; cards show focus. |
| Reduced motion | ✅ Entrance animation and smooth scroll disabled. |
| Color-only meaning | ✅ "Team" vs. "Individual" are text labels, not just color. |
| Minor | The entrance animation starts content at `opacity: 0`. In a backgrounded tab it stays hidden until the tab is viewed. That's harmless for people, but a transform-only animation would remove the edge case (P3). |

---

## 7. Technical concerns

1. **Gallery image-size bug (P1).**
   - `Gallery.astro` picks sizes from a fixed list (480/800/1200/1600) and drops any larger than the original, but never adds the original's own width.
   - Result: images between 801 and 1199 px wide (e.g., `WH_FHub_FEA_1` 1075 px, `Baja_Full_CAD` 1066 px, `UW_Launcher` 882 px) are served at **800 px**.
   - Images under 480 px (`GK_CAD`, `GK_Wheel`, `GK_Steering`) get **no responsive sizes at all**.
   - Measured at 1440 px: 19 of the 38 images on the Home, About and project pages are enlarged on retina screens (gallery figures 1.4–2.3×, the FSAE hero 3.8×).
   - `MediaFrame` already handles this correctly; the gallery should match.
2. **Hero (the large image at the top of each project page) treats every cover the same (P1).**
   - It always crops to 2:1 at 1,148 px wide.
   - Near-square covers (FSAE 0.94, Underwater 1.05) lose ~50% of the image.
   - Low-resolution covers are stretched.
   - The hero should adapt to the source: show near-square or low-res covers uncropped and at no more than their native size.
3. **Unused italic font (P2).** IBM Plex Sans *Italic* (75 KB) is **preloaded on every page** but no page uses italics. It competes with the first image for bandwidth.
4. **Photo weight on retina screens (P2).**
   - Noisy phone photos (5,712 px sources) produce a 2,000-px WebP of ~2.1 MB for the go-kart hero on 2× screens.
   - Lower WebP quality for photos, or a 1,600-px cap on heroes, cuts this roughly in half with no visible loss.
5. **Deploy artifact size (P3).**
   - Astro copies every original image into the build (74 MB total; 12 MB phone JPGs) even though no page links them.
   - Visitors never download them, so this has no user impact.
6. **Docs drift (P3).**
   - README filenames are stale.
   - Five resolved TODO comments still trigger `npm run placeholders`.
   - DECISIONS.md lacks the worktree/branch note and the resume-fingerprint decision.
7. **Verification coverage.**
   - `npm run verify` checks content schema, types, build and internal links/anchors.
   - It does not check image sharpness or phone layout. Those were checked manually here; no new dependency is recommended.

---

## 8. Recommended improvements

**Legend:** 🟢 **Autonomous**: I'll do it (copy-level or technical, no factual change); veto anything you disagree with. 🟡 **Needs approval**: positioning, structure or content removal. 🔵 **Needs info/assets** from you.

### P0 — fix before relying on the affected pages

**R1 · P0 · 🟢 Fix all spelling errors.** Applies to the instances listed in §2, e.g. "anduprights", dynamometer ×5, "Adjustement", "derivce", "SOLIDWORK", "adpaters", "measureable", "Vehicle Dynamic".
- *Problem:* typos on live pages, one on the first homepage card.
- *Why:* spelling errors on an engineering portfolio read as carelessness, especially next to tolerance callouts.
- *Benefit:* removes the most visible credibility leak.

**R2 · P0 · 🟢 Restore the qualifiers on FSAE projected/estimated figures.** Keeps your numbers and your own wording from the notes and resume.
- **Cost metric:** value `~$900`, label "Projected manufacturing cost reduction", note "≈23% … from moving upright machining in-house".
- **Mass metric:** value `~1 lb`, label "Estimated hub/upright mass reduction (front + rear)", note "Preliminary; mostly from removing the rear rotors and calipers".
- **Contribution bullets** get "projected to" / "estimated".
- *Problem:* projections are presented as achieved results.
- *Why:* your stated rule; interviewers will probe these numbers.
- *Benefit:* the numbers stay impressive and become defensible.

### P1 — high-value recruiter/engineer improvements

**R3 · P1 · 🟢 Fix the gallery image-size bug** (§7.1).
- *Benefit:* sharper CAD/FEA figures at no cost.

**R4 · P1 · 🟢 Make the hero adapt to its image** (§7.2).
- Covers that are low-res or near-square display uncropped, at native size or smaller, on the paper background.
- Wide, high-res covers keep the full-bleed 2:1 treatment.
- *Benefit:* the first image on every project page stops looking soft or cut off.

**R5 · P1 · 🟢 Metric values as numbers, descriptions in the label.** Tighten the metric typography and allow one column on phones when values are long.
- *Problem:* mid-word breaks on phones; values compete with labels.
- *Benefit:* metrics read at a glance, like spec callouts.

**R6 · P1 · 🟢 Wide figures span the full gallery width at their natural shape.** Automatic: any figure wider than ~1.8:1 (the FBD, spreadsheet and trade-study table). All other figures keep their own aspect ratio instead of a forced 4:3 box.
- *Benefit:* diagrams become legible without clicking.

**R7 · P1 · 🟡 Group figures into short "chapters"** (Option A, question 6).
- Add an optional `section:` field to each gallery item (e.g. *CAD & design · Analysis · Manufacturing · Testing*).
- The page renders a small heading per group and keeps figure numbering continuous.
- Projects without sections look exactly as they do today.
- *Problem:* 11 undifferentiated figures at the end, disconnected from the story.
- *Why:* hardware case studies and technical reports place figures in topical sections (§0 research).
- *Benefit:* an engineer can jump straight to "Analysis"; recruiters see the design → analysis → manufacture arc.
- *Cost:* one optional field; no new dependency.

**R8 · P1 · 🟡 Show projects sooner on the homepage** (question 5).
- **Option A (recommended):** hero → Projects → Focus → Contact.
- **Option B:** keep the order but compress the focus areas into a single row inside the hero.
- *Why:* the 30-second recruiter test. Evidence should arrive within the first scroll.

**R9 · P1 · 🟡 Copy rewrites for tagline, intro, About lede/bio and focus descriptions** (question 7). Proposed text is below.
- *Problem:* the intro over-reaches on robotics; the lede undersells hands-on work; there are fragments.
- *Why:* consistent identity of *design → analysis → manufacture → test*.
- *Benefit:* a recruiter can repeat your identity in one sentence.

**R10 · P1 · 🔵 Clarify the go-kart result and Baja status/role/FEA** (questions 1–2).
- *Benefit:* removes ambiguity a technical interviewer would catch.

**R11 · P1 · 🟡🔵 Add the missing resume work** (question 4).
- SAMPE carbon I-beam as a project page. This is the site's only completed physical test with measured results, and it strengthens "Test & validation".
- FIRST 2473 CNC Machining Mentor, Baja SAE and SAMPE added to About → Experience.
- Optional FSAE additions: the 74-lb suspension mass target, ISO 18388 relief grooves, and the electronics enclosures (confirm they belong to the wheels role).

**R12 · P1 · 🔵 Higher-resolution exports for undersized images.**
- `WH_Front_Assembly` and `WH_Rear_Assembly`: re-export at ≥ 2,400 px wide.
- Go-kart images (`GK_CAD`, `GK_Front`, `GK_Wheel`, `GK_Steering`): ≥ 1,600 px wide, or the original photos.
- *How:* SOLIDWORKS → File → Save As → PNG, set the resolution in Options; or a full-screen screenshot on a retina display. Drop the new files into the same `images/` folder with the **same filename**.

### P2 — meaningful polish

**R13 · 🟢 Consistency pass** across dates, units, acronyms and names, per the §2 table.
- Dates: "Sep 2025 – Present".
- Units: "1 lb", "±0.001 in", "0.392 g".
- Acronyms and names: "6-DoF", "Fusion 360", "80/20", "go-kart".

**R14 · 🟢 Replace the orphaned tag column in "At a glance"** with nothing (tags remain on the cards), giving the summary full width. Alternatively, keep the tags below the summary.

**R15 · 🟢 Add the timeline and a short status to project cards.** For example "Sep 2025 – Present · In progress".
- *Benefit:* recruiters see what is current.

**R16 · 🟢 Drop the unused italic font preload; reduce photo weight on retina screens** (§7.3–7.4).

**R17 · 🟢 Re-enable Underwater skills** with consistent capitalization (your own commented list).

**R18 · 🟡 Remove gallery figures that duplicate the hero.** Affects FSAE Fig. 01, Baja Fig. 01, Underwater Fig. 01 and Go-Kart Fig. 04.
- *Benefit:* tighter pages; the first figure becomes new information.
- Alternative: keep them, and I'll only stop numbering them as new.

**R19 · 🟡 Baja: turn "5 Components Reviewed" into a contribution bullet** and add the status-breakdown table from §3.3.

**R20 · 🟡 Skills regrouped to match the resume.** Software (SOLIDWORKS, Onshape, Ansys Mechanical, Python, MATLAB); Manufacturing (Haas/Tormach CNC, manual mill/lathe, Fusion 360/Onshape CAM, FDM, laser cutting, fixturing); a new **Engineering methods** group (FEA, hand calculations, bearing selection, trade studies, DFMA). Every item is already evidenced in your projects or resume.

**R21 · 🟡 Professional-tone edits** to the projects intro, contact message and link-preview description (proposals below).

**R22 · 🔵 Optional assets:**
- a 5–10 s clip of the underwater launcher (or go-kart run)
- a clean photo of the finished go-kart
- the unused bearing-selection screenshots, which could support the FSAE bearing contribution: say if you want them in

### P3 — optional refinements

**R23 · 🟢 Docs:** fix stale README filenames; describe the GitHub Desktop publishing flow; remove resolved TODO comments; add decisions to DECISIONS.md.

**R24 · 🟢 Open full-size figures in a new tab;** shorter alt text where a caption exists; set the portrait alt text.

**R25 · 🟢 Entrance animation: transform-only** (no opacity), so content is never invisible.

**R26 · 🟢 Slightly larger hit areas** for footer, breadcrumb and "See" links.

**R27 · 🟡 GitHub link** (question 8): your GitHub profile has one public repository (this site) and no bio. Either fill in the profile or show the link only in the footer.

### Proposed copy (for question 7, edit freely)

Every statement below is drawn from your content files or resume; nothing is new.

- **Tagline:** "I design, analyze, machine, and test mechanical systems — from Formula SAE wheel hubs to underwater robots."
- **Intro:** "Mechanical engineering student who owns the wheel hub and upright design for Bruin Formula Racing and machines parts on Haas and Tormach CNC mills. Seeking Summer 2027 internships in mechanical design, robotics, manufacturing, or test."
- **Focus · Robotics:** "Four years of FIRST Robotics and UCLA's ENGR 1UW underwater robotics course, which I now teach. Growing into human–robot interaction systems."
- **Focus · Manufacturing:** "Manual and CNC machining (Haas, Tormach) with CAM in Fusion 360 and Onshape — designing parts around the tools actually available."
- **About lede:** "Mechanical engineering student focused on taking parts from CAD and analysis through machining and test. I own the wheel hub and upright design for Bruin Formula Racing, designed a destructive-test rig for Baja SAE, and bring four years of FIRST Robotics experience, including mentoring my former team's CNC program."
- **About bio ¶1:** "I'm a second-year mechanical engineering student at UCLA. I like owning a part end to end: defining its loads, designing and analyzing it, planning how it will be made, and machining it myself."
- **About bio ¶2:** "I'm currently the Wheels Responsible Engineer on Bruin Formula Racing, an instructor for UCLA's ENGR 1UW underwater robotics course, and a technician in the UCLA Engineering Makerspace. I'm looking for internships where I can go deeper into mechanical design, robotic systems, and manufacturing."
- **Projects intro:** "Formula SAE, Baja SAE, and UCLA project-course work — each taken beyond CAD into analysis, manufacturing, or testing."
- **Contact:** heading "Get in touch"; message "Seeking Summer 2027 internships in mechanical design, robotics, manufacturing, or test. Always glad to talk about robotics, machining, or teaching — reach me by email or on LinkedIn."
- **Link-preview description:** "Portfolio of Anav Saxena, UCLA mechanical engineering student — mechanical design, FEA, CNC machining, and robotics projects from Formula SAE, Baja SAE, and UCLA courses."
- **Card subtitles:**
  - FSAE: "Designing the wheel hub and upright assemblies and managing their vehicle integration"
  - Go-Kart: "Ten-week design–build–race of an electric go-kart"
  - Baja: "Load-cell rig to measure the failure load of one-way bearings"

---

## 9. Questions requiring your input

1. **Go-kart result.**
   - What exactly was "fastest time": a single lap, a full race, or the best of several runs?
   - Was it 4 teams total (yours + 3)?
   - What does "drove in several more races than other projects" mean in numbers?
   - Anything you tested or iterated that we can mention?
2. **Baja.**
   - Is the destructive test still scheduled, and are you still involved (the timeline ends Apr 2026)?
   - Which title is correct: "Destructive Testing Engineer" (resume) or "Destructive Test Design Engineer" (site)?
   - Did you personally run the FEA, as your resume says?
3. **FSAE numbers.**
   - "23%" is relative to what baseline (e.g., outsourced uprights, total subsystem manufacturing cost)?
   - Is the ~1 lb reduction the total across all corners?
   - May I add the 74-lb suspension-mass target and ISO 18388 relief-groove sizing from your resume?
   - Are the "custom electronics enclosures" part of the wheels role?
4. **Missing work.** Which should I add?
   - **(a)** SAMPE carbon I-beam as a project page (I'd need photos/CAD/FEA screenshots of the layup, beam, test setup and failure)
   - **(b)** FIRST 2473 CNC Machining Mentor in About → Experience
   - **(c)** Baja and SAMPE in About → Experience
   - **(d)** a hidden henna page drafted from your resume, ready for photos later

   *Recommendation: a, b, c now; d when you have images.*
5. **Homepage order.**
   - **A:** projects directly after the hero *(recommended)*.
   - **B:** keep the order, compress the focus areas into the hero.
   - **C:** no change.
6. **Project figures.**
   - **A:** figure chapters with automatic wide figures *(recommended)*.
   - **B:** wide figures only.
   - **C:** no change.

   Also: remove figures that duplicate the hero image (R18), yes or no?
7. **Copy.** For the proposed text in §8: *accept all / accept with edits (tell me which) / keep mine*. This includes softening the intro's "owning design of … robotic systems" claim.
8. **Assets & branding.**
   - **Exports:** can you re-export the FSAE assembly renders (≥ 2,400 px) and provide larger go-kart images (≥ 1,600 px)?
   - **Video:** do you have a launcher or go-kart clip?
   - **GitHub link:** keep it in the hero, or footer only?
   - **Location:** "Cupertino/Los Angeles, CA" (site) or "Cupertino, CA" (resume)?

---

## 10. Change classification summary

| Bucket | Items |
|---|---|
| 🟢 **I'll do autonomously** (no factual change) | R1, R2, R3, R4, R5, R6, R13, R14, R15, R16, R17, R23–R26 |
| 🟡 **Needs your approval** | R7 (Q6), R8 (Q5), R9/R20/R21 (Q7), R18 (Q6), R19, R27 (Q8) |
| 🔵 **Needs information or assets** | R10 (Q1–2), R11 (Q3–4), R12/R22 (Q8) |

*Nothing has been changed on the site yet. All work will happen on `portfolio/stage-2-3-refinement`; nothing will be pushed or merged to `main`.*

---

## 11. Final report — Phase D–F (implemented 2026-10-31)

Branch `portfolio/stage-2-3-refinement` (local only — **not pushed, not merged**). Live site untouched.

### What changed and why

| Area | Change | Audit item |
|---|---|---|
| **Accuracy** | FSAE metrics/contributions now say *projected* / *estimated*; metric notes state the basis (23% vs. previous year's outsourcing cost; ~1 lb total across four corners). Go-kart result stated precisely (fastest best lap of 4 teams; ~12 runs vs 1–3). Baja separates built / verified analytically / test pending (rig handed off). | R2, R10 |
| **Spelling & consistency** | ~15 typos fixed (anduprights, dynamometer ×5, Adjustment, derive, SOLIDWORKS, adapters, measurable, Vehicle Dynamics…); en-dash dates, "Present", 6-DoF, Fusion 360, 80/20, units. | R1, R13 |
| **Copy** | New tagline, intro, focus descriptions, About lede and bio, projects intro, contact text, link-preview description, card subtitles. | R9, R21 |
| **About** | Baja SAE, SAMPE and FIRST 2473 CNC Mentor added verbatim from the resume; entries in resume order; skills regrouped (Software · Manufacturing · Engineering methods). | R11, R20 |
| **Homepage** | Projects directly after the hero; GitHub link moved to the footer. | R8, R27 |
| **Project pages** | Figure chapters (Design / Analysis / Manufacturing…); wide figures full-width; adaptive hero; full-width summary (duplicate tag column removed); Baja metric "5 Components Reviewed" folded into a contribution; Underwater skills re-enabled; video support with commented stubs. | R6, R7, R14, R17, R19 |
| **Images** | Gallery size bug fixed; plain-background images blended into matching backdrops; no more cropping/enlarging of near-square or low-res covers; cards show CAD covers whole. Retina-upscaled images: **19 → 5 of 38**. | R3, R4 |
| **Metrics** | Short values, no mid-word breaks on phones. | R5 |
| **Cards** | Timeline shown on every card. | R15 |
| **Performance** | Unused 75 KB italic font removed from every page; JPEG photos encoded at quality 72. | R16 |
| **Accessibility** | Portrait alt text fallback; no double-read captions; ≥ 24 px tap targets; full-size figures open in a new tab; entrance animation never fully hides content. | R24–R26 |
| **Docs** | README (figures, chapters, videos + `avconvert`, photo, resume, GitHub Desktop publishing), template, DECISIONS.md; stale TODO comments removed. | R23 |

**Files modified:** `content/profile.yaml`, `content/about.md`, all four published project files, `_TEMPLATE`; `src/components/{Gallery, MediaFrame, ProjectCard, MetricGrid, FocusAreas, ContactBlock, SiteFooter}.astro`, `src/pages/{index, about}.astro`, `src/pages/projects/[slug].astro`, `src/content.config.ts`, `src/lib/imageTone.ts` (new), `src/styles/{global, tokens}.css`, `astro.config.mjs`, `package.json` (`sharp` listed explicitly — already installed), `README.md`, `docs/`.
**URLs:** unchanged. **New dependencies:** none (sharp was already part of the install).

### Validation (all passed)

- `npm run verify`: 0 errors / 0 warnings; 9 pages; **143 internal links + anchors OK**.
- `npm run test:links:external`: **155 links OK** (LinkedIn skipped — blocks bots).
- `npm run placeholders`: only the hidden henna draft (28 items).
- 9 pages × 5 viewports (1440/1280/768/390/375): no horizontal overflow, no text < 12 px, no image overflowing its frame, no metric mid-word breaks, header on one line.
- Browser: no console errors, no JS errors, no broken images; resume embed loads (200, `application/pdf`), download link fingerprinted.
- Video feature tested with a temporary file (renders as a separate asset; missing file and `.MOV` produce clear build errors), then removed.

### Assets you can still provide

| Asset | Where | Notes |
|---|---|---|
| Go-kart race clip | `content/projects/ucla-go-kart/images/` | Convert to .mp4 (README), then uncomment `video:` / `videoCaption:` |
| Launcher test clip | `content/projects/ucla-underwater-robot/images/` | Same as above |
| Larger go-kart images | same filenames in `ucla-go-kart/images/` | Current 422–498 px; any original photo ≥ 1600 px |
| FSAE electronics-integration work | — | You mentioned adding this later |

### Remaining issues / not done (by decision)

- FSAE renders (610–657 px) and two FEA screenshots (~1,100 px) remain slightly soft on retina screens — the source resolution limits them; they are now shown smaller/uncropped to minimize this.
- Henna page and a SAMPE project page intentionally not created.
- Mobile Resume page shows buttons only (embedded PDFs are unreliable on phones) — by design.
- The live site still shows Version 1 until you review and merge this branch.

### Before the next audit

1. Review the branch locally and adjust copy to your voice.
2. Decide whether the figure chapters work for you (easy to change: they're just the `section:` lines).
3. Add the videos when converted.
4. Merge to `main` (fast-forward) and confirm the deploy.
