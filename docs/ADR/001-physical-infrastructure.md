---
tags:
  - Infrastructure
  - Rack
  - HP Elitedesk
  - Underlay
---
# Physical Infrastructure

![Draft](https://img.shields.io/badge/Status-Draft-blue?style=for-the-badge)

<!-- Weitere Status-Optionen (gewünschten einfach oben einfügen):
![Accepted](https://img.shields.io/badge/Status-Accepted-brightgreen?style=for-the-badge)
![Rejected](https://img.shields.io/badge/Status-Rejected-red?style=for-the-badge)
![Deprecated](https://img.shields.io/badge/Status-Deprecated-orange?style=for-the-badge)
-->

| Attribute  | Details       |
| :--------- | :------------ |
| **Date**   | 2026-06-17    |
| **Author** | Linus Bachert |

---

## Context & Problem Statement

**`Problem:`**
:   To transition from theoretical cloud and security concepts to applied engineering, a physical infrastructure is required that accurately simulates an enterprise-grade environment within a strictly constrained physical space. Standard consumer hardware setups lack the physical network separation, safety standards, and structural rigor required to demonstrate advanced architectural concepts.

**`Goals:`**
:   - Design and build an "Enterprise Homelab" in a compact 10-inch form factor.
    - Serve as a tangible, high-quality portfolio piece demonstrating senior-level capabilities in GitOps, Cloud Security Posture Management, and Governance, Risk & Compliance (GRC).
    - Reflect principles of Zero-Trust and strict physical/logical separation (Underlay vs. Overlay) while maintaining a clean, highly professional aesthetic.

**`Constraints:`**
:   - **Spatial Limitations:** Strict spatial limitations within a 9U, 10-inch enclosure requiring precise cable routing and thermal management.
    - **Budget & Safety:** Budget optimization without compromising on 24/7 operational safety and fire prevention.
    - **Hardware Availability:** Dependency on custom or 3D-printed mounting solutions due to a lack of standard 10-inch enterprise hardware.

---

## Decision

### Hardware Components

<div class="grid cards" style="grid-template-columns: 1fr; gap: 1.5rem;" markdown>

-   :lucide-box:{ .lg .middle } __Infrastructure / Housing__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **10-Inch Rack, 9U, 200mm Depth** | Tecmojo | €89.90 | [Link](https://www.amazon.de/dp/B0GDNP6WX6?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Architectural Foundation**

    * The white outer casing forms the basis for the high-contrast "Stormtrooper" look.
    * 9 rack units (9U) provide enough space for the physical separation of underlay and overlay.

-   :lucide-network:{ .lg .middle } __Network Distribution__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **12-Port Cat6 Patch Panel – 0.5U** | GeeekPi | €25.99 | [Link](https://www.amazon.de/dp/B0D5Q6CJ1J?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Future-Proofing & Stealth Design**

    * Clean, black look without distracting logos on the front.
    * Full modularity via empty slots to upgrade keystones individually later if needed (e.g., Cat7/8).

-   :lucide-cable:{ .lg .middle } __Network Connection__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **White Cat6a Patch Cable (Qty: 10, Front)** | Ercielook | 2x €5.99 | [Link](https://www.amazon.de/dp/B0F8BL9MW2?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |
    | **Black Cat6a Patch Cable (Qty: 12, Rear)** | Ercielook | €15.46 | [Link](https://www.amazon.de/dp/B0DTY32BZN?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Aesthetic & Flexibility:**

    * Transparent RJ-45 connectors catch the LED light of the switch ("Fiber-Optic" effect).
    * Flexible enough for tight, clean front bends without tension.
    * Round cables (unlike rigid flat cables) bend 90 degrees without tension.
    * 1-meter length allows for professionally coiled "Service Loops" at the rear.

-   :lucide-paperclip:{ .lg .middle } __Cable Management__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Cable Ties Black (50 Pcs)** | Oksdown | €3.99 | [Link](https://www.amazon.de/dp/B092T8N7T3?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Modularity**

    * Gentle on the cable jacket and infinitely adjustable.
    * Allows bundling the rear cables into invisible, thick cable strands along the black rack rails.

-   :lucide-plug-zap:{ .lg .middle } __Power Supply__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **4-Way Power Strip Network Cabinet** | DIGITUS | €15.29 | [Link](https://www.amazon.de/dp/B09M6W23ZM?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - B2B Standard**

    * Space-saving 1U power distribution unit (PDU) with an aluminum housing.
    * Prevents loose power strips in the rack and offers an excellent price-performance ratio.
    <br>
    <br>

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Power Cable 3-Pin C5 Power Y-Cable** | ACT | €16.71 | [Link](https://www.amazon.de/dp/B07SJ6RS4X?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Consolidation**

    * Merges the power of the two HP EliteDesks into a single plug.
    * Saves valuable slots on the PDU and massively reduces cable clutter at the rear of the rack.
    <br>
    <br>

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **100W USB-C Charger - 4X USB-C Ports** | UGREEN | €35.98 | [Link](https://www.amazon.de/dp/B0CYT1VVMV?ref=ppx_yo2ov_dt_b_fed_asin_title) |

    **Decision Rationale - Efficiency & Fire Prevention**

    * Cutting-edge GaN technology (95% efficiency) prevents heat buildup in the rack.
    * Extremely safe for 24/7 operation due to 800+ temperature measurements per second.

-   :lucide-zap:{ .lg .middle } __Power Transmission__
  
    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Cable 100W USB-C (Qty: 4, 1M)** | UGREEN | 2x €10.44 | [Link](https://www.amazon.de/dp/B09N94MZG9?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Performance Guarantee & Safety**

    * The E-Marker chip delivers the full 5A/5V required by the Raspberry Pi 5 under load.
    * The thick cross-section prevents heat generation, while the aluminum finish provides an enterprise look.
  
-   :lucide-server:{ .lg .middle } __Mounting__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Rackmount - Netgear PoE Switch** | N/A | €14.99 | [Link](https://www.amazon.de/dp/B0GMCTB3XJ?ref=ppx_yo2ov_dt_b_fed_asin_title) |
    | **Rackmount - HP EliteDesk (Qty: 2)** | N/A | 2x €15.99 | [Link](https://www.amazon.de/dp/B0GCTBXNWX?ref=ppx_yo2ov_dt_b_fed_asin_title) |

    **Decision Rationale - Symmetry & Stability**

    * Mandatory for flush mounting on 8U.
    * Since Netgear does not provide 10-inch ears, this ensures an exact fit directly under the patch panel for a perfect "waterfall" cable routing.
    * Immediate project continuation without waiting for private 3D prints.
    * The rough PEI texture of the front imitates powder-coated industrial steel and emphasizes the professional server aesthetic.
  
</div>

---

## Consequences & Implications

**`Positive Consequences (Benefits):`**
:   - **Professional Portfolio Aesthetic:** The high-contrast "Stormtrooper" design, combined with transparent RJ-45 connectors and stealth black components, yields an enterprise-datacenter aesthetic perfect for architectural documentation.
:   - **Operational Safety:** Utilizing GaN technology for power and E-Marker chips in USB-C cables guarantees safe, sustained 5V/5A power delivery, mitigating thermal risks in a confined 24/7 environment.
:   - **High Modularity:** The use of Keystone patch panels and reusable hook-and-loop ties allows for rapid, toolless adjustments and future hardware upgrades without rebuilding the entire routing structure.

**`Negative Consequences (Drawbacks/Risks):`**
:   - **PD Renegotiation Drops:** The UGREEN multi-port GaN charger features dynamic Power Delivery (PD) allocation. If one Raspberry Pi is physically plugged in, unplugged, or drastically shifts its power state, the internal controller momentarily drops power to *all* ports to renegotiate the voltage/amperage profiles. This can cause unintended hard reboots across the entire Pi cluster.
:   - **Spatial Density:** The extreme density of a 10-inch rack requires meticulous cable bending radii. Even with flexible Cat6a cables, routing behind the nodes leaves minimal margin for error during maintenance.

**`Technical Debt:`**
:   - **Single Point of Failure (SPOF) for Power:** Relying on a single USB-C charger for all Raspberry Pi nodes means a failure of this one brick brings down the entire cluster. Future refactoring may require transitioning to PoE+ (Power over Ethernet) Hats powered by a managed PoE switch to ensure individual port power control and true high availability.
:   - **Non-Standard Mounting:** The reliance on 3D-printed PLA/PETG mounts for the HP EliteDesks introduces structural vulnerabilities compared to stamped steel. Care must be taken during any physical transport or relocation of the rack.

