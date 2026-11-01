---
# =============================================================================
#  PROJECT: Destructive Testing Rig
#  Page address: /projects/baja-destructive-test-rig/
#  Every field is explained in content/projects/_TEMPLATE/index.md
#  Images for this project go in: content/projects/baja-destructive-test-rig/images/
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "Destructive Testing Rig"
subtitle: "Destructively determine maximum load of one-way bearings."
role: "Destructive Test Design Engineer"
organization: "Bruin Racing Baja SAE"
category: "Baja SAE"
timeline: "Sept 2025 - Apr 2026"
team: "3"
status: "Awaiting Test"
order: 3
draft: false

# Focus areas this project is evidence for (ids from content/profile.yaml).
# TODO: confirm these — they were filled in as a best guess.
areas: [test, design]
tags: ["Baja SAE", "Testing", "Mechanical Design", "Structural FEA", "CNC Manufacturing", "DFMA"]

# --- Images (remove the "#" once the file is in images/) ---------------------
cover: ./images/Baja_Full_CAD.png
coverAlt: "SOLIDWORKS CAD of destructive testing jig featuring a rectangular frame, a car jack, a lever arm, and a housing/support system for two one-way bearings."
coverCaption: "Full CAD of destructive test jig"

# --- At a glance -------------------------------------------------------------
summary: "Designed a test rig to determine failure load of two one-way bearings in series and establish vehicle safety margins. Awaiting testing data."

metrics:
  - value: "±0.001 inches"
    label: "Bearing Housing tolerance"
    note: "Machined bearing housing on 3-axis CNC mill within tight tolerance"
  - value: "5 Components Reviewed"
    label: "Reviewed rig parts for manufacturing and assembly, updating design to reflect DFMA considerations"

# --- Team-level vs. personal -------------------------------------------------
objectives:
  - "Create a rig that utilizes a lever arm and car jack to apply a controlled, measureable load to two one-way bearings"
  - "Integrate load cell into test rig to measure applied load"

outcomes:
  - "Successfully manufactured and assembled test rig, clearing all tolerance requirements"
  - "Validated that bearings are controlled failure mode through hand calculations and structural FEA"

contributions:
  - "Designed all parts on jack to bearing load path including adjustable lever arm, bearing housing, and custom keyways"  
  - "Iterated rig design for DFMA, eliminating need for welding and modifying parts for 3-axis CNC milling"
  - "Created CAM toolpaths in Fusion360 and manufactured bearing housing within ±0.001 inch bearing interface tolerance"
  - "Conducted compressive and shear failure hand calculations on custom keyways to select correct material and ensure bearings remain controlled failure mode"

decisions:
  - title: "Bearing Keyway Material"
    rationale: "Compressive and shear stress analysis showed that aluminum keyway between bearing outer race and housing would fail under predicted max load. A steel keyway was selected then, trading off ease of machinability for strength."
    result: "Keyways were successfully manufactured and fit tolerances for bearing interface. Calculations show that bearings will maintain controlled failure mode."

# --- Skills ------------------------------------------------------------------
skills: ["SOLIDWORKS", "DFMA", "Fusion 360 CAM", "CNC Milling"]
# tools: ["[Software or tool placeholder]", "[Software or tool placeholder]"]

# --- Gallery -----------------------------------------------------------------
gallery:
  - src: ./images/Baja_Full_CAD.png
    alt: "Full CAD assembly of testing rig, including car jack, lever arm, bearing housing/supports, and adjustable frame."
    caption: "Full CAD assembly of testing rig, including car jack, lever arm, bearing housing/supports, and adjustable frame."
  - src: ./images/Baja_Machining.png
    alt: "CNC Milling process for bearing housing in Haas 3-axis CNC Mill"
    caption: "CNC Milling process for bearing housing in Haas 3-axis CNC Mill"
  - src: ./images/Baja_Stackup.png
    alt: "Stock left after first setup machining bearing housing. Bearing and key fit in to check fit."
    caption: "Stock left after first setup machining bearing housing. Bearing and key fit in to check fit."
  - src: ./images/Baja_Housing.png
    alt: "Complete bearing housing after parting from stock on manual lathe and adding chamfers."
    caption: "Complete bearing housing after parting from stock on manual lathe and adding chamfers."
  - src: ./images/Baja_Key_Stress.png
    alt: "Hand calculated compressive and shear stresses on bearing inner and outer keys under expected loads, selecting 1045 Carbon Steel for material"
    caption: "Hand calculated compressive and shear stresses on bearing inner and outer keys under expected loads, selecting 1045 Carbon Steel for material"
  - src: ./images/Baja_Key.png
    alt: "Finalized custom key machined from steel bar stock."
    caption: "Finalized custom key machined from steel bar stock."
  - src: ./images/Baja_Frame.png
    alt: "Assembled frame featuring adjustable mounting locations for car jack to provide more range for simulated bearing loads."
    caption: "Assembled frame featuring adjustable mounting locations for car jack to provide more range for simulated bearing loads."
---
