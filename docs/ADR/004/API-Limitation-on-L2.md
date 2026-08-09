---
status: new
tags:
  - Architecture
  - ADR
  - GitOps
  - Network Automation
---
# ADR-004: Layer-2 Automation Strategy for API-Limited Network Hardware

![Proposed](https://img.shields.io/badge/Proposed-lightgrey?style=for-the-badge) ![Accepted](https://img.shields.io/badge/Accepted-darkgreen?style=for-the-badge) ![Deprecated](https://img.shields.io/badge/Deprecated-lightgrey?style=for-the-badge) ![Superseded](https://img.shields.io/badge/Superseded-lightgrey?style=for-the-badge)

| Attribute  | Details       |
| :--------- | :------------ |
| **Date** | 2026-08-03    |
| **Author** | Linus Bachert |

---

## Context & Problem Statement

**`Problem:`**
:   The core Layer-2 fabric relies on the Netgear GS308EP switch, which completely lacks native programmatic interfaces (no REST API, no SSH/CLI, no SNMP write support). Modifying VLAN tags for new deployments requires manual Web-UI interaction. This breaks the declarative CI/CD pipeline, introduces configuration drift, and blocks true Infrastructure as Code (IaC) automation which is the goal of my homelab project.

**`Goals:`**
:   - Restore a 100% declarative GitOps workflow while operating.
    - Eliminate manual human intervention for network provisioning during routine deployments.
    - Ensure idempotent network state enforcement.

**`Constraints:`**
:   - **Hardware limits:** Hardware replacement is strictly excluded due to the 10-inch rack form factor and my **budget restrictions** :(
    - **Performance:** The embedded switch CPU is quite slow, which could lead to frequent timeouts during heavy automation attempts.

---

## Evaluation

**Evaluated Options:**
<div class="grid cards" markdown>

-   :lucide-terminal:{ .lg .middle } __Programmatic Workarounds__

    ---

    #### Option 1: API Reverse Engineering (Python)
    
    **Advantages**
    
    * [x] Maintains strict physical VLAN pruning on the switch.
    * [x] Requires no architectural changes to the hypervisor network.
    
    **Disadvantages**
    
    * [ ] Highly fragile and the pipeline can break with minor firmware updates.
    * [ ] Complex state parsing required from raw HTML/CGI outputs.
    * [ ] High risk of network session exhaustion and IP lockouts due to parallel sessions or incorrect state retrieval.

    ---

    #### Option 2: Web-UI Automation (Playwright)

    **Advantages**
    
    * [x] Bypasses complex CSRF/Hash reverse engineering by executing native JS.
    * [x] Requires no architectural changes to the hypervisor network.
    
    **Disadvantages**
    
    * [ ] Extremely slow embedded CPU can causes frequent CI/CD timeout errors which would lead to a mess with terraform.
    * [ ] DOM-dependent --> pipeline breaks instantly on UI/CSS changes.
    * [ ] Requires heavyweight dependencies (headless browser) in CI/CD runners.

-   :lucide-layers:{ .lg .middle } __Architectural Abstraction__

    ---

    #### Option 3: Static L2 Trunking (SDN Delegation)
    
    **Advantages**
    
    * [x] 100% declarative integration using robust IaC providers (Terraform/Ansible).
    * [x] Zero configuration drift; physical switch state becomes immutable.
    * [x] Fully eliminates CI/CD pipeline pauses for network provisioning.
    
    **Disadvantages**
    
    * [ ] Violates physical Layer-2 Least Privilege (wide-open trunks) --> See my Risk Acceptance (RK002).
    * [ ] Demands strict software firewalling to prevent VLAN hopping on all trunk ports.

</div>

### Final Decision

* **Chosen Decision:** Option 3 (Static L2 Trunking / Architectural Abstraction).
* **Causal Chain & Rationale (Why?):**
    * *Risk:* Options 1 and 2 introduce massive technical debt. Attempting to force an uncooperative, slow hardware switch into an IaC pipeline using web-scraping scripts creates extreme CI/CD fragility (frequent pipeline failures due to timeouts or session lockouts).
    * *Justification:* By configuring the physical switch exactly once (Day 0) to allow all 802.1Q VLAN tags (VLAN 2-4094) on the trunk ports, the switch becomes a static backplane. All dynamic network isolation logic is successfully shifted to Proxmox SDN and OpenWrt DSA, which offer stable, officially supported APIs and providers, fully satisfying the declarative GitOps requirement without requiring new hardware.

---

## Consequences & Implications

* **Positive Consequences (Benefits):**
    * Fully automated pipeline; deployments no longer pause for manual network provisioning.
    * High stability --> no fragile web-scraping scripts or custom Python modules to maintain.
    * Cost efficiency --> solves the enterprise-grade automation requirement without purchasing API-capable switches.
* **Negative Consequences (Drawbacks/Risks):**
    * L2 Least Privilege violation --> the trunk ports unnecessarily forward all broadcast/multicast traffic across the backplane.
    * VLAN Hopping Risk --> a compromised VM could theoretically attempt to craft 802.1Q tags to traverse the open trunk.
* **Technical Debt:** 
    * The physical switch is left "wide open," mandating strict reliance on the Proxmox Host Firewall (`ebtables`) as a compensating control for anti-spoofing.
    * Bare-metal Raspberry Pi nodes cannot process trunked traffic dynamically and still require a manual "Day 0" untagged access port configuration (see [IPAM](https://linusb.github.io/homelab/architecture/layer-3/ipam/#ip-space)).

---

## Alignment & Relations

* **Related Artifacts:** 
    * **[RK002](https://linusb.github.io/homelab/RK002/L2-Lack-of-Pruning/):** Static L2 Trunking & Lack of Physical VLAN Pruning (Risk Acceptance)