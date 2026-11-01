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
title: "Go-Kart"
subtitle: "Ten-week design–build–race of an electric go-kart"
role: "Design Engineer"
organization: "UCLA - ENGR 1GK"
category: "UCLA ENGR 1GK"
timeline: "Mar 2026 – Jun 2026"
team: "5"
status: "Successfully ran at end of quarter"
order: 2
draft: false

# Which focus areas (ids from content/profile.yaml) this project is evidence for.
areas: [test, design]

# Up to ~3 short keywords shown on the project card.
tags: ["UCLA Project Course", "Mechanical Design", "CAD", "Testing", "Manufacturing"]

# --- Images ------------------------------------------------------------------
# Paths are relative to THIS file. Put image files in this folder's images/.
# Remove the "#" to switch an image on. Without a cover, a neutral placeholder
# frame is shown.
cover: ./images/GK_Full.JPG
coverAlt: "Fully assembled go-kart during final testing"
coverCaption: "Fully assembled go-kart during final testing"

# --- At a glance (the top of the page — what a recruiter reads) ---------------
summary: "Ten-week project to design, build, and race an electric go-kart driven by scooter hub motors. Our kart set the fastest best lap of the four teams and completed roughly a dozen runs, while most teams completed one to three."

# Key numbers. Keep `value` short (e.g. "18%", "3.2 kg", "40+") and only
# use numbers you can defend in an interview.
metrics:
  - value: "1st"
    label: "Fastest best lap of 4 teams"
    note: "Best lap compared with each team's best lap on a controlled track"
  - value: "~12"
    label: "Runs completed"
    note: "Most teams completed 1–3 runs"

# --- Team-level vs. personal -------------------------------------------------
# What the PROJECT / TEAM set out to do.
objectives:
  - "Fully design, manufacture, and test an electric go-kart, including the chassis, basic suspension, steering, electronics enclosure, brakes, and driver integration"
  - "Design vehicle to meet chassis strength and braking standards to ensure driver safety"

# What the PROJECT / TEAM achieved.
outcomes:
  - "Designed, built, and raced a fully functioning electric go-kart that set the fastest best lap of the four teams on a controlled track"
  - "Completed roughly a dozen runs, while most teams completed one to three"
  - "Presented designs at preliminary and final design reviews, applying feedback to improve safety and system integration"

# What YOU personally did. Start each line with a verb (Designed, Machined...).
contributions:
  - "Designed (SOLIDWORKS) and assembled the go-kart chassis from 80/20 aluminum extrusions and aluminum gussets"
  - "Maximized chassis stiffness by adding two full-length extrusions along the chassis to minimize flex"
  - "Modified gusset designs to combine three parts into one and integrate the chassis and steering systems"

# Engineering decisions YOU made, and why. `result` is optional.
# decisions:
#  - title: "[Technical decision placeholder]"
#    rationale: "[Why you made this decision placeholder — constraints, trade-offs, alternatives considered]"
#    result: "[What happened as a result placeholder]"

# --- Skills ------------------------------------------------------------------
skills: ["Mechanical Design", "Systems Integration", "Technical Presentations"]
tools: ["SOLIDWORKS"]

# --- Video (optional) ---------------------------------------------------------
# Put an .mp4 file in this project's images/ folder, then remove the "#" from
# the two lines below and fix the filename. (iPhone .MOV files must be exported
# as .mp4 first; keep clips short — under ~20 MB.)
# video: ./images/GK_Race.mp4
# videoCaption: "Go-kart run on the controlled track"

# --- Gallery (CAD, drawings, test photos, diagrams) ----------------------------
# `section` groups figures into short chapters on the page.
gallery:
  - src: ./images/GK_CAD.png
    section: "Design"
    alt: "Full CAD assembly of go-kart, including chassis, steering, electronics box, hub motor wheels in rears, and brake handle (seat hidden for clarity)"
    caption: "Full CAD assembly of go-kart, including chassis, steering, electronics box, hub motor wheels in rears, and brake handle (seat hidden for clarity)"
  - src: ./images/GK_Chassis.JPG
    section: "Build"
    alt: "Chassis sub-system assembled from 80/20 extrusions and aluminum gussets"
    caption: "Chassis sub-system assembled from 80/20 extrusions and aluminum gussets"
  - src: ./images/GK_Front.png
    section: "Build"
    alt: "Front of assembled go-kart chassis with system of extrusions and gussets to create frame and laser cut birch wood to mount components"
    caption: "Front of assembled go-kart chassis with system of extrusions and gussets to create frame and laser cut birch wood to mount components"
  - src: ./images/GK_Wheel.png
    section: "Build"
    alt: "Rear hub motor wheel mounting bracket, integrated directly into chassis frame to ensure stiffness"
    caption: "Rear hub motor wheel mounting bracket, integrated directly into chassis frame to ensure stiffness"
  - src: ./images/GK_Steering.png
    section: "Build"
    alt: "F-shaped aluminum gusset used to combine 3 distinct gusset connections into 1 part and integrate steering into chassis"
    caption: "F-shaped aluminum gusset used to combine 3 distinct gusset connections into 1 part and integrate steering into chassis"
  - src: ./images/GK_Full.JPG
    section: "Build"
    alt: "Fully assembled go-kart with all systems integrated"
    caption: "Fully assembled go-kart with all systems integrated"
---
