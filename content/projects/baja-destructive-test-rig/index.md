---
# =============================================================================
#  PROJECT: Destructive Testing Rig
#  Page address: /projects/baja-destructive-test-rig/
#  Every field is explained in content/projects/_TEMPLATE/index.md
#  Images for this project go in: content/projects/baja-destructive-test-rig/images/
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "Destructive Testing Rig"
subtitle: "Load-cell rig to measure the failure load of one-way bearings"
role: "Destructive Testing Engineer"
organization: "Bruin Racing Baja SAE"
category: "Baja SAE"
timeline: "Sept 2025 – Apr 2026"
team: "3"
status: "Rig complete; handed off for destructive testing"
order: 3
draft: false

# Focus areas this project is evidence for (ids from content/profile.yaml).
areas: [test, design]
tags: ["Baja SAE", "Testing", "Mechanical Design", "Structural FEA", "CNC Manufacturing", "DFMA"]

# --- Images (remove the "#" once the file is in images/) ---------------------
cover: ./images/Baja_Full_CAD.png
coverAlt: "SOLIDWORKS CAD of destructive testing jig featuring a rectangular frame, a car jack, a lever arm, and a housing/support system for two one-way bearings."
coverCaption: "SOLIDWORKS assembly of the test rig: car jack, lever arm, bearing housing and supports, and adjustable frame"

# --- At a glance -------------------------------------------------------------
summary: "Designed a load-cell test rig to determine the failure load of two one-way bearings in series and establish vehicle safety margins. The rig was manufactured, assembled, and handed off to the team's testing group; the destructive test itself is still pending."

metrics:
  - value: "±0.001 in"
    label: "Bearing housing tolerance"
    note: "Bearing interface machined on a 3-axis CNC mill"

# --- Team-level vs. personal -------------------------------------------------
objectives:
  - "Create a rig that uses a lever arm and car jack to apply a controlled, measurable load to two one-way bearings"
  - "Integrate a load cell into the rig to measure the applied load"

outcomes:
  - "Manufactured and assembled the test rig, meeting all tolerance requirements"
  - "Verified analytically (hand calculations and structural FEA) that the bearings are the controlled failure mode"
  - "Destructive test pending: the rig has been handed off to the team's testing group"

contributions:
  - "Designed every part in the jack-to-bearing load path, including the adjustable lever arm, bearing housing, and custom keyways"
  - "Reviewed five rig components for manufacturing and assembly and iterated the design for DFMA, eliminating welding and adapting parts for 3-axis CNC milling"
  - "Created CAM toolpaths in Fusion 360 and machined the bearing housing to a ±0.001 in bearing-interface tolerance"
  - "Conducted compressive and shear failure hand calculations on the custom keyways, along with structural FEA, to select the key material and keep the bearings as the controlled failure mode"

decisions:
  - title: "Bearing Keyway Material"
    rationale: "Compressive and shear stress analysis showed that an aluminum keyway between the bearing outer race and housing would fail under the predicted maximum load, so a steel keyway was selected, trading machinability for strength."
    result: "Keyways were manufactured and met the bearing-interface fit tolerances. Calculations show the bearings remain the controlled failure mode."

# --- Skills ------------------------------------------------------------------
skills: ["DFMA", "CNC Milling", "Hand Calculations", "Structural FEA"]
tools: ["SOLIDWORKS", "Fusion 360 CAM"]

# --- Gallery -----------------------------------------------------------------
# `section` groups figures into short chapters on the page.
gallery:
  - src: ./images/Baja_Full_CAD.png
    section: "Design & analysis"
    alt: "Full CAD assembly of testing rig, including car jack, lever arm, bearing housing/supports, and adjustable frame."
    caption: "Full CAD assembly of testing rig, including car jack, lever arm, bearing housing/supports, and adjustable frame."
  - src: ./images/Baja_Key_Stress.png
    section: "Design & analysis"
    alt: "Hand calculated compressive and shear stresses on bearing inner and outer keys under expected loads, selecting 1045 carbon steel for material"
    caption: "Hand calculated compressive and shear stresses on bearing inner and outer keys under expected loads, selecting 1045 carbon steel for material"
  - src: ./images/Baja_Machining.png
    section: "Manufacturing & assembly"
    alt: "CNC milling of the bearing housing on a Haas 3-axis CNC mill"
    caption: "CNC milling of the bearing housing on a Haas 3-axis CNC mill"
  - src: ./images/Baja_Stackup.png
    section: "Manufacturing & assembly"
    alt: "Stock remaining after the first machining setup, with the bearing and key test-fitted"
    caption: "Stock remaining after the first machining setup, with the bearing and key test-fitted"
  - src: ./images/Baja_Housing.png
    section: "Manufacturing & assembly"
    alt: "Complete bearing housing after parting from stock on manual lathe and adding chamfers."
    caption: "Complete bearing housing after parting from stock on manual lathe and adding chamfers."
  - src: ./images/Baja_Key.png
    section: "Manufacturing & assembly"
    alt: "Finalized custom key machined from steel bar stock."
    caption: "Finalized custom key machined from steel bar stock."
  - src: ./images/Baja_Frame.png
    section: "Manufacturing & assembly"
    alt: "Assembled frame featuring adjustable mounting locations for car jack to provide more range for simulated bearing loads."
    caption: "Assembled frame featuring adjustable mounting locations for car jack to provide more range for simulated bearing loads."
---
