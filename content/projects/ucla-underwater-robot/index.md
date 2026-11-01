---
# =============================================================================
#  PROJECT: Underwater Robot
#  Page address: /projects/ucla-underwater-robot/
#  Every field is explained in content/projects/_TEMPLATE/index.md
#  Images for this project go in: content/projects/ucla-underwater-robot/images/
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "6-DoF Underwater Robot"
subtitle: "Underwater robot with 8 motors for 6 degrees of freedom and an integrated pneumatic projectile launcher"
role: "Design Engineer"
organization: "UCLA - ENGR 1UW"
category: "UCLA ENGR 1UW"
timeline: "Jan 2026 – Mar 2026"
team: "3"
status: "Successfully tested robot at end of quarter"
order: 4
draft: false

# Focus areas this project is evidence for (ids from content/profile.yaml).
areas: [robotics]
tags: ["UCLA Project Course", "Robotics", "CAD", "Testing", "Manufacturing"]

# --- Images (remove the "#" once the file is in images/) ---------------------
cover: ./images/UW_Full_Robot.png
coverAlt: "Completed underwater robot in testing bay."
coverCaption: "Completed underwater robot in testing bay."

# --- At a glance -------------------------------------------------------------
summary: "Designed, manufactured, and tested an underwater robot in a team of three, focusing on mechanical–electrical integration and a pneumatic launcher for underwater projectiles."

#metrics:
#  - value: "[#]"
#    label: "[Impact metric placeholder]"
#    note: "[Optional context placeholder]"
#  - value: "[#]"
#    label: "[Impact metric placeholder]"
#  - value: "[#]"
#    label: "[Impact metric placeholder]"

# --- Team-level vs. personal -------------------------------------------------
objectives:
  - "Build an underwater robot operated manually from an above-water controller and processor"
  - "Provide at least 4 degrees of freedom plus a special feature"
  - "Communicate with on-land electronics and controls through a tether"

outcomes:
  - "Designed, manufactured, assembled, and successfully tested a 6-DoF underwater robot"
  - "Integrated a pneumatic launcher that fires a projectile underwater"

contributions:
  - "Designed and tested the pneumatic launcher system, prototyping and verifying solenoid operation and iterating components to increase launch distance"
  - "Manufactured and assembled the chassis, ensuring structural stiffness underwater to prevent motor deflection"
  - "Created the physical controller, integrating its mechanical and electrical components"
  - "Created the tether mount, adding strain relief where the electronics tether meets the chassis"

#decisions:
#  - title: "[Technical decision placeholder]"
#    rationale: "[Why you made this decision placeholder — constraints, trade-offs, alternatives considered]"
#    result: "[What happened as a result placeholder]"

# --- Skills ------------------------------------------------------------------
skills: ["Pneumatics", "Manufacturing", "3D Printing", "Testing"]
tools: ["SOLIDWORKS"]

# --- Video (optional) ---------------------------------------------------------
# Put an .mp4 file in this project's images/ folder, then remove the "#" from
# the two lines below and fix the filename. (iPhone .MOV files must be exported
# as .mp4 first; keep clips short — under ~20 MB.)
# video: ./images/UW_Launcher_Test.mp4
# videoCaption: "Pneumatic launcher firing a projectile underwater"

# --- Gallery -----------------------------------------------------------------
# `section` groups figures into short chapters on the page.
gallery:
  - src: ./images/UW_Launcher.png
    section: "Design"
    alt: "SOLIDWORKS assembly of pneumatic launcher integration onto PVC chassis."
    caption: "SOLIDWORKS assembly of pneumatic launcher integration onto PVC chassis."
  - src: ./images/UW_Tether_Mount.png
    section: "Design"
    alt: "SOLIDWORKS CAD of tether mount, implementing strain relief into mechanical integration of tether onto chassis."
    caption: "SOLIDWORKS CAD of tether mount, implementing strain relief into mechanical integration of tether onto chassis."
  - src: ./images/UW_Full_Robot.png
    section: "Build & test"
    alt: "Fully assembled underwater robot, featuring 8 motors for 6-DoF motion and pneumatic launcher."
    caption: "Fully assembled underwater robot, featuring 8 motors for 6-DoF motion and pneumatic launcher."
  - src: ./images/UW_Robot_Shooting.png
    section: "Build & test"
    alt: "Frame from a test video: the pneumatic launcher firing underwater."
    caption: "Frame from a test video: the pneumatic launcher firing underwater."
---
