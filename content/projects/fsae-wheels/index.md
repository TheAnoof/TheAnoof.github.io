---
# =============================================================================
#  PROJECT: Wheels Subsystem
#  Page address: /projects/fsae-wheels/
#  Every field is explained in content/projects/_TEMPLATE/index.md
#  Images for this project go in: content/projects/fsae-wheels/images/
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "FSAE Wheels Subsystem"
subtitle: "Designing the wheel hub and upright assemblies and managing their vehicle integration"
role: "Wheels Responsible Engineer"
organization: "Formula SAE — Bruin Formula Racing"
category: "Formula SAE"
timeline: "Sept 2025 – Present"
status: "FEA in progress, awaiting finalization before manufacturing"
order: 1
draft: false

# Focus areas this project is evidence for (ids from content/profile.yaml).
areas: [design, manufacturing]
tags: ["Formula SAE", "Mechanical Design", "Structural FEA", "CNC Manufacturing", "DFMA"]

# --- Images (remove the "#" once the file is in images/) ---------------------
cover: ./images/WH_Front_Assembly.png
coverAlt: "Front left wheel hub assembly"
coverCaption: "Front left wheel hub assembly"

# --- At a glance -------------------------------------------------------------
summary: "Designing the front and rear wheel hub and upright assemblies around Vehicle Dynamics hardpoints and a 74 lb suspension mass target, using trade studies to set the system architecture and reworking the uprights for in-house 3-axis CNC machining."

metrics:
  - value: "~$900"
    label: "Projected manufacturing cost reduction"
    note: "23% below the previous year's outsourcing cost (the majority of the subsystem's manufacturing cost), from machining the uprights in-house"
  - value: "~1 lb"
    label: "Estimated hub/upright mass reduction"
    note: "Preliminary; total across all four corners, largely from removing the rear calipers"
#  - value: "[#]"
#    label: "[Impact metric placeholder]"

# --- Team-level vs. personal -------------------------------------------------
#objectives:
#  - ""
#  - "[Project objective placeholder]"

#outcomes:
#  - "[Project outcome placeholder]"
#  - "[Project outcome placeholder]"

contributions:
  - "Modified the uprights for in-house manufacturing, projected to reduce manufacturing cost by ~$900 (23% vs. the previous year's outsourcing cost)"
  - "Adapted the rear wheel hubs and uprights to remove the rotor and caliper, contributing to an estimated 1 lb total mass reduction (preliminary)"
  - "Conducted trade studies to select the shim camber-adjustment method and deep-groove ball bearing arrangement, weighing performance, serviceability, manufacturability, and cost"
  - "Reworked the bearing radial/axial load calculations from maximum cornering/braking tire load cases, eliminating assumptions in past calculations, to select SKF bearings"
  - "Defining the preload method for the deep-groove ball bearing arrangement to reduce internal axial clearance and increase system rigidity"
  - "Performing Ansys Mechanical FEA for maximum cornering/braking loads (0.392 g longitudinal, 1.884 g lateral, factor of safety 1.3) to confirm positive safety margins and minimize unsprung mass"
  - "Machined two adapters connecting the rear wheel hubs to the dynamometer from aluminum 7075-T6 on a Haas CNC mill"

decisions:
  - title: "Camber Adjustment Method"
    rationale: "Conducted a trade study of outboard shims, inboard shims, and a turnbuckle for camber adjustment, considering adjustment range, manufacturability, and compliance. Selected outboard shims for their wide range, minimal compliance, fewest parts, and camber adjustment that does not affect other vehicle dynamics parameters."
    result: "Outboard shim adjustment integrated into the front and rear uprights; the required adjustment range is pending from the Vehicle Dynamics sub-team. The upper clevis was separated from the upright to allow camber adjustment."
  - title: "Upright Manufacturing"
    rationale: "Drafted plans and conducted a trade study of outsourced, in-house 3-axis milled, and welded sheet-metal uprights, considering weight, tolerances, compliance, and cost. Selected in-house 3-axis milling for its large cost benefit with little weight penalty."
    result: "Front and rear upright geometry modified for in-house manufacturing and approved at the team-wide Critical Design Review. Projected to reduce cost by ~$900."

# --- Skills ------------------------------------------------------------------
skills: ["Mechanical Design", "DFMA", "Trade Studies", "3-Axis CNC Manufacturing", "Load Analysis"]
tools: ["SOLIDWORKS", "Ansys Mechanical"]

# --- Gallery -----------------------------------------------------------------
# `section` groups figures into short chapters on the page.
gallery:
  - src: ./images/WH_Front_Assembly.png
    section: "Design"
    alt: "SOLIDWORKS assembly of front left wheel"
    caption: "SOLIDWORKS assembly of front left wheel"
  - src: ./images/WH_Rear_Assembly.png
    section: "Design"
    alt: "SOLIDWORKS assembly of rear left wheel"
    caption: "SOLIDWORKS assembly of rear left wheel"
  - src: ./images/WH_Camber_Trade_Study.png
    section: "Design"
    alt: "Trade study scores deciding between different camber adjustment methods"
    caption: "Trade study scores deciding between different camber adjustment methods"
  - src: ./images/WH_FBD.png
    section: "Analysis"
    alt: "Free body diagram showing lateral and longitudinal force analysis to derive bearing loads"
    caption: "Free body diagram showing lateral and longitudinal force analysis to derive bearing loads"
  - src: ./images/WH_Bearing_Calcs.png
    section: "Analysis"
    alt: "Updated spreadsheet reflecting new bearing load calculations to derive SKF bearing rating based on loads and expected life"
    caption: "Updated spreadsheet reflecting new bearing load calculations to derive SKF bearing rating based on loads and expected life"
  - src: ./images/WH_FHub_FEA_3.png
    section: "Analysis"
    alt: "Front wheel hub structural analysis setup under combined cornering and braking load"
    caption: "Front wheel hub structural analysis setup under combined cornering and braking load"
  - src: ./images/WH_FHub_FEA_1.png
    section: "Analysis"
    alt: "Front wheel hub structural analysis results, showing max stress at rotor integration"
    caption: "Front wheel hub structural analysis results, showing max stress at rotor integration"
  - src: ./images/WH_FHub_FEA_2.png
    section: "Analysis"
    alt: "Front wheel hub structural analysis mesh refinement at max stress area. Stress converged under 5% variation upon refinement"
    caption: "Front wheel hub structural analysis mesh refinement at max stress area. Stress converged under 5% variation upon refinement"
  - src: ./images/WH_Dyno_CAM.png
    section: "Manufacturing"
    alt: "CAM created in Fusion 360 to machine dynamometer adapter to attach to wheel hub and dynamometer interface. Optimized for minimal setups and tool changes"
    caption: "CAM created in Fusion 360 to machine dynamometer adapter to attach to wheel hub and dynamometer interface. Optimized for minimal setups and tool changes"
  - src: ./images/WH_Dyno_Machining.jpeg
    section: "Manufacturing"
    alt: "Machining process for aluminum 7075-T6 dynamometer adapters on a Haas CNC mini mill"
    caption: "Machining process for aluminum 7075-T6 dynamometer adapters on a Haas CNC mini mill"
  - src: ./images/WH_Dyno_Final.jpeg
    section: "Manufacturing"
    alt: "Finished dynamometer adapters featuring center bore to fit wheel hub, counterbores for fastening to driving pegs, and through holes to fasten to dynamometer"
    caption: "Finished dynamometer adapters featuring center bore to fit wheel hub, counterbores for fastening to driving pegs, and through holes to fasten to dynamometer"
---
