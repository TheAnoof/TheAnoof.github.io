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
subtitle: "Designing a racing go-kart from scratch."
role: "Design Engineer"
organization: "UCLA - ENGR 1GK"
category: "UCLA ENGR 1GK"
timeline: "Mar 2026 - Jun 2026"
team: "5"
status: "Successfully ran at end of quarter"
order: 2
draft: false

# Which focus areas (ids from content/profile.yaml) this project is evidence for.
areas: [test, design]

# Up to ~3 short keywords shown on the project card.
tags: ["ENGR 1 Class", "Mechanical Design", "CAD", "Testing", "Manufacturing"]

# --- Images ------------------------------------------------------------------
# Paths are relative to THIS file. Put image files in this folder's images/.
# Remove the "#" to switch an image on. Without a cover, a neutral placeholder
# frame is shown.
cover: ./images/GK_Full.JPG
coverAlt: "Fully assembled go-kart during final testing"
coverCaption: "Fully assembled go-kart during final testing"

# --- At a glance (the top of the page — what a recruiter reads) ---------------
summary: "Ten-week project designing an electric go-kart using scooter hub motors to compete in race at end of design cycle. Produced robust, reliable go kart that drove in several more races than other projects and achieved the fastest time."

# Key numbers. Keep `value` short (e.g. "18%", "3.2 kg", "40+") and only
# use numbers you can defend in an interview.
#metrics:
#  - value: "[#]"
#    label: "[Impact metric placeholder]"
#    note: "[Optional context placeholder — e.g. versus previous year's design]"
#  - value: "[#]"
#    label: "[Impact metric placeholder]"

# --- Team-level vs. personal -------------------------------------------------
# What the PROJECT / TEAM set out to do.
objectives:
  - "Fully design, manufacture, and test an electric go-kart, including the chassis, basic suspension, steering, electronics enclosure, brakes, and driver integration"
  - "Design vehicle to meet chassis strength and braking standards to ensure driver safety"

# What the PROJECT / TEAM achieved.
outcomes:
  - "Designed a fully functioning electric go-kart, achieving top speed around a controlled track among 3 other groups."
  - "Presented designs at preliminary and final design reviews, applying feedback to make the go-kart safer and integrate systems more effectively."

# What YOU personally did. Start each line with a verb (Designed, Machined...).
contributions:
  - "Designed (SOLIDWORKS) and assembled go-kart chassis using a series of 8020 extrusions and aluminum gussets"
  - "Maximized chassis stiffness by adding two full-length extrusions running along chassis length to minimize flexing"
  - "Modified gusset designs to combine 3 parts into 1 and integrate chassis and steering systems seamlessly"

# Engineering decisions YOU made, and why. `result` is optional.
# decisions:
#  - title: "[Technical decision placeholder]"
#    rationale: "[Why you made this decision placeholder — constraints, trade-offs, alternatives considered]"
#    result: "[What happened as a result placeholder]"

# --- Skills ------------------------------------------------------------------
skills: ["SOLIDWORKS", "Mechanical Design", "Integration", "Technical Presentations"]
#tools: ["[Software or tool placeholder]", "[Software or tool placeholder]"]

# --- Gallery (CAD, drawings, test photos, diagrams) ----------------------------
# Remove the "#"s to switch these on. Add as many as you like.
gallery:
  - src: ./images/GK_CAD.png
    alt: "Full CAD assembly of go-kart, including chassis, steering, electronics box, hub motor wheels in rears, and brake handle (seat hidden for clarity)"
    caption: "Full CAD assembly of go-kart, including chassis, steering, electronics box, hub motor wheels in rears, and brake handle (seat hidden for clarity)"
  - src: ./images/GK_Chassis.JPG
    alt: "Assembly of chassis sub-system"
    caption: "Assembly of chassis sub-system"
  - src: ./images/GK_Front.png
    alt: "Front of assembled go-kart chassis with system of extrusions and gussets to create frame and laser cut birch wood to mount components"
    caption: "Front of assembled go-kart chassis with system of extrusions and gussets to create frame and laser cut birch wood to mount components"
  - src: ./images/GK_Full.JPG
    alt: "Fully assembled go-kart with all systems integrated"
    caption: "Fully assembled go-kart with all systems integrated"
  - src: ./images/GK_Wheel.png
    alt: "Rear hub motor wheel mounting bracket, integrated directly into chassis frame to ensure stiffness"
    caption: "Rear hub motor wheel mounting bracket, integrated directly into chassis frame to ensure stiffness"
  - src: ./images/GK_Steering.png
    alt: "F-shaped aluminum gusset used to combine 3 distinct gusset connections into 1 part and integrate steering into chassis"
    caption: "F-shaped aluminum gusset used to combine 3 distinct gusset connections into 1 part and integrate steering into chassis"
---
