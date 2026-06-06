---
status: new
tags:
  - secrets
  - encryption
  - ESO
  - external
  - git
---

![Draft](https://img.shields.io/badge/Status-Draft-blue?style=for-the-badge)
<!-- Weitere Status-Optionen (gewünschten einfach oben einfügen):
![Accepted](https://img.shields.io/badge/Status-Accepted-brightgreen?style=for-the-badge)
![Rejected](https://img.shields.io/badge/Status-Rejected-red?style=for-the-badge)
![Deprecated](https://img.shields.io/badge/Status-Deprecated-orange?style=for-the-badge)
-->

| Attribute | Details |
| :--- | :--- |
| **Date** | 2026-06-05 |
| **Author** | Linus Bachert |

---

## Context & Problem Statement

**`Problem:`**
:   A fundamental conflict in any professional GitOps architecture is the requirement to    declaratively store system states in version control without exposing sensitive credentials in plain text. A robust solution must secure the entire lifecycle. It needs to protect secrets within the Git repository, ensure secure handling during active server operations, and guarantee that secrets are never accidentally exposed via persistent storage snapshots or system backups. Furthermore, the architecture must solve the "Secret Zero" paradox - securely bootstrapping the secret manager itself.

**`Goals:`**
:   - Implement a unified, Zero-Trust secret management solution. 
    - The concept must integrate seamlessly across different architectural layers, specifically serving both the Proxmox VE hypervisor infrastructure and the Kubernetes cluster environment which are used in this homelab.

**`Constraints`**
:    - **In-Memory Runtime Only:** To comply with modern security best practices and prevent leaks via ZFS block-level backups, secrets must be dynamically injected and exist strictly in RAM during runtime.
:    - **Unified Ecosystem:** The architecture must provide a single, cohesive tooling standard that fits both environments (PVE and Kubernetes) to reduce operational overhead.
:    - **Public-Repo Readiness:** The encryption mechanisms must be cryptographically secure enough to safely store the GitOps repository publicly without any risk of exposure.
:    - **Local Bootstrap Capability:** The core infrastructure must remain recoverable from a cold start (Disaster Recovery).

---

## Decision

**Evaluated Options:**
<div class="grid cards" markdown>
- :fontawesome-brands-square-git: __Git-Encrypted__
- :fontawesome-brands-keycdn: __Exteral Secret Management (ESO)__
</div>
    * **Option 1:** [Name of Tool/Approach 1] — [Brief description]
    * **Option 2:** [Name of Tool/Approach 2] — [Brief description]
    * **Option 3:** [Name of Tool/Approach 3] — [Brief description]
* **Chosen Decision:** [State the selected solution or hybrid approach clearly.]
* **Causal Chain & Rationale (Why?):**
    * *Risk:* [Identify specific risks of rejected options, e.g., Cluster loss leads to permanent lockout / Outage drops local bootstrap capability.]
    * *Justification:* [Explain the reasoning behind the choice. Why does this specific approach solve the problem within the given constraints?]

---

## Consequences & Implications

* **Positive Consequences (Benefits):**
    * [Expected benefit 1, e.g., Offline resilience for core infrastructure.]
    * [Expected benefit 2, e.g., Simplified dynamic credential rotation.]
* **Negative Consequences (Drawbacks/Risks):**
    * [Drawback 1, e.g., Operational overhead of managing two distinct toolsets.]
* **Technical Debt:** [Acknowledge any temporary trade-offs, manual steps, or future refactoring required.]

---

## Alignment & Relations

* **Related Artifacts:** [List impacted architecture blueprints, GitOps structures, or scope documents.]
* **Related Decisions:** [Link to other dependencies, e.g., Supersedes ADR-002, Blocks ADR-005.]

---

## Prerequisites & Bootstrap Setup

!!! info "Minimum Setup Requirements"
    Before applying this architecture, ensure the following tools are initialized:
    
    * **Dependency 1:** `[Installation / Initialization Command]`
    * **Dependency 2:** `[Configuration / Generation Command]`

---

## Reference Configurations & Code Examples

=== "GitOps Directory Structure"

=== "Manifest Configuration"

---

## Runbooks & Maintenance Operations

[Add relevant step-by-step instructions for maintenance, troubleshooting, or operational procedures here.]

---

## Additional Information & References

* [Link to Official Documentation](#)
* [Link to Community Discussion / GitHub Issue](#)