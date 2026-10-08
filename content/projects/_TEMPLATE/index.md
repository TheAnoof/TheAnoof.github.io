---
# =============================================================================
#  PROJECT TEMPLATE — copy this whole folder to add a new project
# =============================================================================
#
#  1. Copy the folder `_TEMPLATE` and rename the copy, e.g. `fsae-suspension`.
#     Use lowercase-with-hyphens. The folder name becomes the web address:
#         content/projects/fsae-suspension/  →  /projects/fsae-suspension/
#     (Folders starting with "_" are ignored, which is why this one is hidden.)
#  2. Put the project's images in the new folder's `images/` subfolder.
#  3. Fill in the fields below, then write the technical write-up underneath
#     the second "---" line.
#  4. Preview with `npm run dev`. The project automatically appears on the
#     Projects page, on the homepage, and under matching focus areas.
#
#  Required fields: title, subtitle, role, organization, category, timeline,
#  summary. Everything else is optional — delete what you don't need and that
#  section of the page disappears.
#
#  Text rules: wrap text in "double quotes" if it contains a colon followed by
#  a space, or starts with a special character like [ { # * & or ! .
#  List items each start with "  - " (two spaces, dash, space).
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "[Project title placeholder]"
subtitle: "[One-line project context placeholder]"
role: "[Your role placeholder]"
organization: "[Team or organization placeholder]"
category: "[Short category label placeholder]" # e.g. Formula SAE, Personal project
timeline: "[Start – End placeholder]"           # e.g. Sep 2025 – Present
team: "[Team size placeholder]"                 # optional, e.g. 4-person subteam
status: "[Status placeholder]"                  # optional, e.g. Completed, In progress
order: 99            # position on the Projects page — 1 shows first
draft: true          # true = hidden from the live site; set to false to publish

# Which focus areas (ids from content/profile.yaml) this project is evidence for.
areas: [design]

# Up to ~3 short keywords shown on the project card.
tags: ["[Tag placeholder]", "[Tag placeholder]"]

# --- Images ------------------------------------------------------------------
# Paths are relative to THIS file. Put image files in this folder's images/.
# Remove the "#" to switch an image on. Without a cover, a neutral placeholder
# frame is shown.
# cover: ./images/cover.jpg
coverAlt: "[Describe the cover image placeholder]"
# coverCaption: "[Optional caption placeholder]"

# --- At a glance (the top of the page — what a recruiter reads) ---------------
summary: "[High-level project summary placeholder — two or three sentences: what the project is, why it mattered, and the headline result.]"

# Key numbers. Keep `value` short (e.g. "18%", "3.2 kg", "40+") and only
# use numbers you can defend in an interview.
metrics:
  - value: "[#]"
    label: "[Impact metric placeholder]"
    note: "[Optional context placeholder — e.g. versus previous year's design]"
  - value: "[#]"
    label: "[Impact metric placeholder]"

# --- Team-level vs. personal -------------------------------------------------
# What the PROJECT / TEAM set out to do.
objectives:
  - "[Project objective placeholder]"
  - "[Project objective placeholder]"

# What the PROJECT / TEAM achieved.
outcomes:
  - "[Project outcome placeholder]"
  - "[Project outcome placeholder]"

# What YOU personally did. Start each line with a verb (Designed, Machined...).
contributions:
  - "[Your contribution placeholder]"
  - "[Your contribution placeholder]"
  - "[Your contribution placeholder]"

# Engineering decisions YOU made, and why. `result` is optional.
decisions:
  - title: "[Technical decision placeholder]"
    rationale: "[Why you made this decision placeholder — constraints, trade-offs, alternatives considered]"
    result: "[What happened as a result placeholder]"

# --- Skills ------------------------------------------------------------------
skills: ["[Engineering skill placeholder]", "[Engineering skill placeholder]"]
tools: ["[Software or tool placeholder]", "[Software or tool placeholder]"]

# --- Gallery (CAD, drawings, test photos, diagrams) ----------------------------
# Remove the "#"s to switch these on. Add as many as you like.
# gallery:
#   - src: ./images/cad-assembly.png
#     alt: "Describe what the image shows, for screen readers"
#     caption: "Short caption shown under the image"
#   - src: ./images/test-setup.jpg
#     alt: "..."
#     caption: "..."
---

## [Technical section heading placeholder]

[Technical details placeholder — this is where an engineer reading closely finds the depth. Use sections like Requirements, Design approach, Analysis, Manufacturing, Testing and Lessons learned.]

## [Technical section heading placeholder]

[Technical details placeholder.]

<!--
  Markdown cheat-sheet for this section:
    ## Heading            → section heading
    **bold**  *italic*    → emphasis
    - item                → bullet list
    [text](https://...)   → link
    ![Alt text](./images/figure.png)   → an image from this project's folder
    | A | B |             → a table (see README for an example)
-->
