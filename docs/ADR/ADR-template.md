---
tags:
  - Architecture
  - ADR
  - [Tag 1]
  - [Tag 2]
---
# ADR-XXX: [Short Title of the Architectural Decision]

![Proposed](https://img.shields.io/badge/Proposed-lightgrey?style=for-the-badge) ![Accepted](https://img.shields.io/badge/Accepted-darkgreen?style=for-the-badge) ![Deprecated](https://img.shields.io/badge/Deprecated-lightgrey?style=for-the-badge) ![Superseded](https://img.shields.io/badge/Superseded-lightgrey?style=for-the-badge)

| Attribute  | Details       |
| :--------- | :------------ |
| **Date** | YYYY-MM-DD    |
| **Author** | [Your Name] |

---

## Context & Problem Statement

**`Problem:`**
:   [Describe the underlying issue, challenge, or requirement that needs to be addressed. Why is this decision necessary right now? What are you trying to solve?]

**`Goals:`**
:   - [Goal 1: What does success look like?]
    - [Goal 2: Which architectural principles (e.g., Zero-Trust, GitOps, High Availability) must be met?]
    - [Goal 3: What is the desired business/technical outcome?]

**`Constraints:`**
:   - **[Constraint 1]:** [e.g., Budget limits, physical space limitations, hardware availability.]
    - **[Constraint 2]:** [e.g., Time constraints, compatibility with existing legacy systems.]
    - **[Constraint 3]:** [e.g., Compliance, security, or safety regulations.]

---

## Decision

### [Main Category of the Decision, e.g., System Architecture / Hardware Selection]

<div class="grid cards" style="grid-template-columns: 1fr; gap: 1.5rem;" markdown>

-   :lucide-layers:{ .lg .middle } __[Component Group / Logical Tier Name]__

    ---

    | Image | Item / Concept Name | Details / Specs | Price / Metric | Reference Link |
    | :--- | :--- | :--- | :--- | :--- |
    | <img src="images/placeholder.png" width="60" alt="Placeholder"> | **[Item 1]** | [Key Specifications] | [Value] | [Link](#){: target="_blank" } |
    | <img src="images/placeholder.png" width="60" alt="Placeholder"> | **[Item 2]** | [Key Specifications] | [Value] | [Link](#){: target="_blank" } |

    **Decision Rationale - [Focus Area]**

    * **[Key Reason 1]:** [Explain *why* this specific component/technology was chosen over alternatives. Focus on the engineering thought process.]
    * **[Key Reason 2]:** [Explain how this choice satisfies the previously mentioned constraints or goals.]
    * **[Key Reason 3]:** [Mention any specific configurations or structural implementations required for this choice.]

-   :lucide-component:{ .lg .middle } __[Second Component Group / Logical Tier Name]__

    ---

    | Image | Item / Concept Name | Details / Specs | Price / Metric | Reference Link |
    | :--- | :--- | :--- | :--- | :--- |
    | <img src="images/placeholder.png" width="60" alt="Placeholder"> | **[Item 1]** | [Key Specifications] | [Value] | [Link](#){: target="_blank" } |

    **Decision Rationale - [Focus Area]**

    * **[Key Reason 1]:** [Provide the architectural justification.]
    * **[Key Reason 2]:** [Provide the architectural justification.]

</div>

---

## Consequences & Implications

**`Positive Consequences (Benefits):`**
:   - **[Benefit 1]:** [Describe the immediate or long-term positive impacts of this decision on the system (e.g., increased security, better performance, reduced MTTR).]
:   - **[Benefit 2]:** [Describe another positive impact.]

**`Negative Consequences (Drawbacks/Risks):`**
:   - **[Risk 1]:** [Acknowledge any known limitations, operational overhead, or newly introduced risks (e.g., increased complexity, single points of failure, vendor lock-in).]
:   - **[Risk 2]:** [Acknowledge another drawback.]

**`Technical Debt:`**
:   - **[Debt Item 1]:** [Document any shortcuts taken that will require future refactoring (e.g., "Currently using manual configuration, needs to be migrated to Ansible in Q4").]
:   - **[Debt Item 2]:** [Document any hardware/software that is a temporary workaround.]