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
#  3. Fill in the fields below. (Anything written below the closing "---"
#     line is not shown on the site.)
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
draft: true          # true = hidden everywhere (live site + preview); false = shown

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

# --- Video (optional) ---------------------------------------------------------
# A short test or demo clip (.mp4 or .webm) in this project's images/ folder.
# iPhone .MOV files must be exported as .mp4 first; keep clips under ~20 MB.
# video: ./images/test-run.mp4
# videoCaption: "What the video shows"

# --- Gallery (CAD, drawings, test photos, diagrams) ----------------------------
# Remove the "#"s to switch these on. Add as many as you like.
# `section` (optional) groups figures into chapters such as "Design",
# "Analysis", "Manufacturing", "Testing". Wide images (diagrams, spreadsheets)
# automatically span the full width.
# gallery:
#   - src: ./images/cad-assembly.png
#     section: "Design"
#     alt: "Describe what the image shows, for screen readers"
#     caption: "Explain what the viewer is looking at, not just the part name"
#   - src: ./images/test-setup.jpg
#     section: "Testing"
#     alt: "..."
#     caption: "..."
---
