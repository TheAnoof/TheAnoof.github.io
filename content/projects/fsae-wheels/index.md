---
# =============================================================================
#  PROJECT: Wheels Subsystem
#  Page address: /projects/fsae-wheels/
#  Every field is explained in content/projects/_TEMPLATE/index.md
#  Images for this project go in: content/projects/fsae-wheels/images/
# =============================================================================

# --- Card + page header ------------------------------------------------------
title: "FSAE Wheels Subsystem"
subtitle: "Designing wheel hub and uprights for maximum"
role: "Wheels Responsible Engineer"
organization: "Formula SAE — Bruin Formula Racing"
category: "Formula SAE"
timeline: "Sept 2025 - Present"
status: "FEA in progress, awaiting finalization before manufacturing"
order: 1
draft: false

# Focus areas this project is evidence for (ids from content/profile.yaml).
areas: [design, manufacturing]
tags: ["Formula SAE", "Mechanical Design", "Structural FEA","CNC Manufacturing", "DFMA"]

# --- Images (remove the "#" once the file is in images/) ---------------------
cover: ./images/WH_Front_Assembly.png
coverAlt: "Front left wheel hub assembly"
coverCaption: "Front left wheel hub assembly"

# --- At a glance -------------------------------------------------------------
summary: "Designing wheel hub and upright assemblies within context of Vehicle Dynamic hardpoints and conducting trade studies to define system architecture. Modifying upright geometry for 3-axis CNC mill manufacturability."

metrics:
  - value: "~$900 (23%) Saved"
    label: "Manufacturing Cost Reduction"
    note: "Projected figure based on in-house upright manufacturing"
  - value: "1-lb Reduction"
    label: "Estimated Hub/Upright Mass Reduction (Front and Rears)"
    note: "Preliminary figure, largely due to removal of calipers from rears"
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
  - "Modified uprights for in-house manufacturing, reducing subsystem manufacturing cost by ~$900 (23%)"
  - "Adapted rear wheel hubs and uprights to remove rotor and caliper, reducing system mass by 1-lb"
  - "Conducted trade studies to define shim camber adjustment method and deep groove ball bearing arrangement, weighting performance, serviceability, manufacturability, and cost" 
  - "Reworked bearing radial/axial load calculations based on maximum cornering/braking tire load cases, eliminating assumptions made in past calculations to select SKF bearings"
  - "Defining preload method for deep groove ball bearing arrangement to reduce internal axial clearances and increase system rigidity" 
  - "Performing Ansys mechanical FEA for maximum cornering/braking loads (0.392G long, 1.884G lat, 1.3 FS) to confirm positive safety margins and minimize unsprung mass"
  - "Machined two adapters, connecting rear wheel hubs to dynometer, on Haas CNC mill out of Aluminum 7075-T6"

decisions:
  - title: "Camber Adjustement Method"
    rationale: "Conducted trade study between outboard shims, inboard shims, and turnbuckle adjustment method for camber. Considered adjustment range, manufacturability, and compliance concerns. Selected outboard shim adjustment method due to wide range, minimal compliance, fewest parts, and isolated camber adjustment that would not impact other vehicle dynamic parameters."
    result: "Outboard shim adjustment method integrated with front and rear uprights with specific range needs decision awaiting determination from Vehicle Dynamics sub-team. Upper clevis modified to be separated from upright to allow for camber adjustment."
  - title: "Upright Manufacturing"
    rationale: "Drafted plans and conducted trade study between outsourced, in-house 3-axis milled, and sheet metal welded uprights. Considered weight, tolerances, compliance, and cost. Selected in-house 3-axis milling due large cost benefit without greatly impacting weight."
    result: "Front and rear upright geometry modified for in-house manufacturing and approved at team-wide Critical Design Review. Projected to reduce cost by ~$900."

# --- Skills ------------------------------------------------------------------
skills: ["Mechanical Design", "DFMA", "Trade Studies", "3-Axis CNC Manufacturing", "Load Analysis"]
tools: ["SOLIDWORKS", "Ansys Mechanical"]

# --- Gallery -----------------------------------------------------------------
gallery:
   - src: ./images/WH_Front_Assembly.png
     alt: "SOLIDWORKS assembly of front left wheel"
     caption: "SOLIDWORKS assembly of front left wheel"
   - src: ./images/WH_Rear_Assembly.png
     alt: "SOLIDWORK assembly of rear left wheel"
     caption: "SOLIDWORK assembly of rear left wheel"
   - src: ./images/WH_FBD.png
     alt: "Free body diagram showing lateral and longitudinal force analysis to derivce bearing loads"
     caption: "Free body diagram showing lateral and longitudinal force analysis to derivce bearing loads"
   - src: ./images/WH_Bearing_Calcs.png
     alt: "Updated spreadsheet reflecting new bearing load calculations to derive SKF bearing rating based on loads and expected life"
     caption: "Updated spreadsheet reflecting new bearing load calculations to derive SKF bearing rating based on loads and expected life"
   - src: ./images/WH_Camber_Trade_Study.png
     alt: "Trade study scores deciding between different camber adjustment methods"
     caption: "Trade study scores deciding between different camber adjustment methods"
   - src: ./images/WH_FHub_FEA_3.png
     alt: "Front wheel hub structural analysis setup under combined cornering and braking load"
     caption: "Front wheel hub structural analysis setup under combined cornering and braking load"
   - src: ./images/WH_FHub_FEA_1.png
     alt: "Front wheel hub structural analysis results, showing max stress at rotor integration"
     caption: "Front wheel hub structural analysis results, showing max stress at rotor integration"
   - src: ./images/WH_FHub_FEA_2.png
     alt: "Front wheel hub structural analysis mesh refinement at max stress area. Stress converged under 5% variation upon refinement"
     caption: "Front wheel hub structural analysis mesh refinement at max stress area. Stress converged under 5% variation upon refinement"
   - src: ./images/WH_Dyno_CAM.png
     alt: "CAM created in Fusion 360 to machine dynometer adapter to attach to wheel hub and dynometer interface. Optimized for minimal setups and tool changes"
     caption: "CAM created in Fusion 360 to machine dynometer adapter to attach to wheel hub and dynometer interface. Optimized for minimal setups and tool changes"
   - src: ./images/WH_Dyno_Machining.jpeg
     alt: "Machining process for aluminum 7075-T6 dynometer adpaters on a Haas CNC mini mill"
     caption: "Machining process for aluminum 7075-T6 dynometer adpaters on a Haas CNC mini mill"
   - src: ./images/WH_Dyno_Final.jpeg
     alt: "Finished dynometer adapters featuring center bore to fit wheel hub, counterbores for fastening to driving pegs, and through holes to fasten to dynometer"
     caption: "Finished dynometer adapters featuring center bore to fit wheel hub, counterbores for fastening to driving pegs, and through holes to fasten to dynometer"
---
