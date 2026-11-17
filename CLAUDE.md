# CLAUDE.md

This is the engineering portfolio of Anav Saxena, a UCLA mechanical engineering student. It is an Astro 7 static site, and it deploys to https://theanoof.github.io through GitHub Actions on every push to `main`.

- **Content** lives in `/content`; **code** lives in `/src`.
- **How-to:** `README.md`.
- **Design and architecture rationale:** `docs/DECISIONS.md`.
- If `docs/handoffs/` contains a continuation document, read the most recent one before starting work.

## Non-negotiables

- **Facts:** Never invent accomplishments, metrics, results, calculations, contributions, technologies, dates, job titles, team sizes, or outcomes.
  - Keep these states distinct: completed, preliminary, estimated, projected, analytically verified, physically tested, and pending.
  - Never credit Anav alone for a team's results.
  - If a claim is unclear, ask.
- **Positioning:** Don't present Anav as a software engineer, AI engineer, or research scientist, and don't inflate their expertise.
- **Anav's own writing:** Content Anav wrote is real content, not placeholder text to rewrite. Edit it for clarity and keep its meaning.
- **Images:** Use only Anav's genuine photos, CAD screenshots, diagrams, and test images. Never use stock, AI-generated, or fabricated images.
- **Verification:** Never weaken the checks (`npm run verify`, the link check, the placeholder finder) just to make a build pass.
- **`main` is the live site.** Without Anav's explicit approval in chat, never:
  - push to, merge into, or deploy `main`
  - force-push
  - rewrite history
  - delete project content or routes

  Do refinement work on a branch.
- **Uncommitted changes:** Never overwrite, discard, or stash them. Explain what you see and ask.
- **URLs:** Keep existing URLs and project slugs unless Anav approves a change.
- **No external services without asking:** no analytics, tracking, cookies, external forms, databases, or third-party integrations.
- **Secrets and privacy:** Never commit secrets. Stop and ask about any privacy concern.
- **Personal details:** Don't change the email, LinkedIn, GitHub URL, location, or photo without asking. The email is public on purpose.

## Working with Anav

- **Background:** Anav is a mechanical engineering student and a beginner at web development.
- **Handle on your own:** implementation, CSS, responsive layout, accessibility, performance, and testing.
- **Ask Anav about:** branding, positioning, content accuracy, and major layout or visual-identity changes. Ask one concise question, lay out the alternatives, and recommend one.
- **Communication:** Be direct, frank, and efficient. Don't congratulate yourself, and report test results accurately.
- **Publishing:** Anav pushes with GitHub Desktop from the main checkout. The command line has no git credentials.
- **Pronouns:** Refer to Anav by name or as they/them.

## Engineering conventions

- **Architecture:** Keep zero client-side JavaScript and the content/component architecture.
- **Design:** Keep the established design: Drafting Table with Quiet Editorial restraint, a blueprint-blue accent, and IBM Plex. Change it only when a specific problem justifies it.
- **Before calling a change done:**
  1. `npm run verify` must pass. It is the same gate CI uses.
  2. Run `npm run placeholders`.
  3. For anything that renders, check it in a browser at 1440, 1280, 768, 390, and 375 px wide.
