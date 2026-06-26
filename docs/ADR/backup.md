---
tags:
  - Infrastructure
  - Hardware
  - IT-Rack
  - Server
  - HP EliteDesk
  - Underlay
  - PDU
  - Network components
---
# IT Procurement - Physical Infrastructure

![Draft](https://img.shields.io/badge/Status-Draft-blue?style=for-the-badge)

| Attribute  | Details       |
| :--------- | :------------ |
| **Date** | 2026-06-17    |
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

### Active Compute & Network Fabric

<div class="grid cards" style="grid-template-columns: 1fr; gap: 1.5rem;" markdown>

-   :lucide-cpu:{ .lg .middle } __Compute Nodes (Hypervisor Plane)__

    ---

    | Item Name | Specs / Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **HP EliteDesk 805 G6 Mini** | Ryzen 5 Pro 4650G, 16GB RAM, 256GB SSD | €299.99 | [Link](https://www.ram-koenig.de/hp-elitedesk-805-g6-mini-pc-ryzen5-pro-4650g-3e4b8us-nowifi/3089?srsltid=AfmBOorVpprLt4sA2FSzflFRj5M9L8dI-2PwwNThtPNfiCYMF5FF7PQ9) |
    | **HP EliteDesk 800 G6 Mini** | Intel Core i5-10500T, 32GB RAM, No SSD | €411.90 | [Link](https://greendot.it/HP-EliteDesk-800-G6-mini?gad_source=1&gad_campaignid=22902928996&gbraid=0AAAAACtGVi4SHXn4G3kCCcbBI4UjmcjuA&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa32zh_kA2kVUoE_FOAgB_fUT8bJqwx0RU0m4HzGdpDlSJHogP0ki3caAouyEALw_wcB) |
    | **Raspberry Pi 5 (8GB)** | Broadcom BCM2712, 8GB RAM | €94.90 | [Link](https://www.welectron.com/Raspberry-Pi-5-8-GB-RAM) |
    | **Raspberry Pi 5 (4GB) (Qty: 2)** | Broadcom BCM2712, 4GB RAM | 2x €69.90 | [Link](https://www.welectron.com/Raspberry-Pi-5-4-GB-RAM) |

    **Decision Rationale - Compute Tier**

    * **Control Plane:** The Raspberry Pi 5 nodes form a dedicated, highly available Kubernetes control plane. Their ARM architecture provides extreme energy efficiency for orchestrating cluster states without consuming primary compute resources.
    * **Worker Nodes:** The HP EliteDesk nodes handle the actual worker payloads. Their powerful x86 architecture (Ryzen 5 / Core i5) and high RAM capacity deliver the necessary performance for heavy data processing and demanding container workloads.
    * A mixed-architecture approach (x86 AMD/Intel alongside ARM) provides a realistic micro-datacenter environment, allowing for rigorous testing of multi-arch container builds and GitOps deployments.

-   :lucide-hard-drive:{ .lg .middle } __Storage & Persistence (Data Plane)__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **2TB NVMe SSD (SN7100) (Qty: 2)** | WD Black | 2x €149.90 | [Link](https://www.cyberport.de/pc-und-zubehoer/festplatten-ssds/ssd-solid-state-disk/wd-black/pdp/3318-06u/wd-black-sn7100-nvme-ssd-2-tb-m-2-2280-pcie-4-0.html?APID=814&campaign=20461247648&gad_campaignid=20461248386&gad_source=1&gbraid=0AAAAADtQIJwktWXzegtFoeYRhAlYoZBER&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa1OKLpJ3t-gvR__YL9C-_eJz1XZyldSKRdNnyhuipPwmBwiss0PKi8aArlFEALw_wcB&prodid=3318-06U) |
    | **1TB NAS SATA SSD** | Seagate IronWolf 125 | ~€89.00 | [Link](https://www.amazon.de/dp/B08H4V2F6K?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |
    | **2TB HDD (Pipeline 5900rpm)** | Seagate | €38.99 | [Link](https://www.amazon.de/dp/B008B0RQ1C?ref=ppx_yo2ov_dt_b_fed_asin_title) |
    | **128GB MicroSD V30 (Qty: 2)** | Lexar | 2x €23.99 | [Link](https://www.amazon.de/dp/B08XZ7FXGR?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |
    | **128GB MicroSD UHS-I** | SanDisk Extreme | €15.99 | [Link](https://www.amazon.de/dp/B09X7BK27V?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |
    | **Dual SATA Docking Station (USB 3.0)** | FIDECO | €35.19 | [Link](https://www.amazon.de/dp/B07D8S7RN7?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Storage Tiering**

    * **Tiering Strategy:** Strict segregation between fast NVMe storage (for OLTP databases and Proxmox VM root disks), enterprise-grade NAS SSDs (IronWolf) for continuous-write application data, and a mechanical 2TB HDD acting as an ultra-low-cost cold storage and backup repository.
    * The FIDECO dock enables modular expansion via USB 3.0 without breaking the compact 10-inch form factor constraints, seamlessly housing both the 2.5-inch SATA SSD and the 3.5-inch HDD.
    * High-endurance SD cards ensure resilient quorum and boot drives for the ARM-based cluster components.

-   :lucide-network:{ .lg .middle } __Network Fabric & Routing (Underlay)__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Beryl AX (GL-MT3000)** | GL.iNet | €62.39 | [Link](https://www.gl-inet.com/en-de/products/gl-mt3000) |
    | **8-Port Gigabit PoE+ Switch (62W)** | Netgear GS308EP | €74.99 | [Link](https://www.amazon.de/dp/B08LZJ2H9S?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Network Fabric**

    * The Beryl AX serves as the primary perimeter router and hardware firewall, handling internal routing and strictly regulating incoming/outgoing traffic to the cluster.
    * **Zero-Trust Foundation:** Fully managed capabilities (VLAN tagging, IGMP Snooping) are mandatory to enforce strict physical and logical network separation between the management interface, storage networks, and public-facing services.
    * The 62W PoE+ budget provides critical headroom to power external access points or to transition the Raspberry Pi nodes to a pure PoE power-delivery model in future iterations.

</div>

### Passive Infrastructure & Housing

<div class="grid cards" style="grid-template-columns: 1fr; gap: 1.5rem;" markdown>

-   :lucide-box:{ .lg .middle } __Infrastructure / Housing__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **10-Inch Rack, 9U, 200mm Depth** | Tecmojo | €89.90 | [Link](https://www.amazon.de/dp/B0GDNP6WX6?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Architectural Foundation**

    * The white outer casing forms the basis for the high-contrast "Stormtrooper" look.
    * 9 rack units (9U) provide enough space for the physical separation of underlay and overlay.
    <br>
    <br>

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Adhesive Vinyl Foil Black (45cm x 2m)** | d-c-fix | €5.95 | [Link](https://www.amazon.de/dp/B005FPTB3W?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Budget-Optimized Stealth Design**

    * Matte black, wipeable adhesive foil allows for custom black-out of the silver PDU that mismatched with the common black color scheme.
    * Provides an extremely cost-effective alternative to buying custom black hardware or professional painting, perfectly optimizing the overall project budget while achieving an enterprise look.

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
    | **Hook and Loop Cable Tie Roll, 10mm Width** | Gemi | €5.94 | [Link](https://www.amazon.de/dp/B0FH4S1KBX?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

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
    <br>
    <br>

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Power Supply 12V 3A (36W)** | TOBWOLF | €10.19 | [Link](https://www.amazon.de/dp/B07N197JH8?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Cost-Effective Reliability**

    * Delivers stable 12V/3A power necessary for auxiliary hardware needed for the Fideco Docking Station.
    * Highly economical hardware choice that fulfills the power requirements without unnecessary premium markups, adhering to strict financial constraints for the homelab build.

-   :lucide-zap:{ .lg .middle } __Power Transmission__
  
    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Cable 100W USB-C (Qty: 4, 1M)** | UGREEN | 2x €10.44 | [Link](https://www.amazon.de/dp/B09N94MZG9?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Performance Guarantee & Safety**

    * The E-Marker chip delivers the full 5A/5V required by the Raspberry Pi 5 under load.
    * The thick cross-section prevents heat generation, while the aluminum finish provides an enterprise look.

-   :lucide-thermometer:{ .lg .middle } __Environment Monitoring & Thermal__
  
    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Copper M.2 Heatsink (Qty: 2)** | JEYI | €5.10 | [Link](https://de.aliexpress.com/item/1005005713746988.html) |
    | **Zigbee 3.0 Temp. & Humidity Sensor** | Generic | €2.89 | [Link](https://de.aliexpress.com/item/1005011992980900.html?isdl=y&aff_fsk=_c4Bef2CJ&src=PrecisDEBS&aff_platform=aff_feeds&aff_short_key=_c4Bef2CJ&pdp_npi=4%40dis%21EUR%2117.00%217.99%21%21%21%21%21%40%2112000057229906325%21afff%21%21%21&_randl_language=de&locale=de_DE&region=DE&site=glo&n=true&is_redirect=n&cn=23555774122_193822278155&cv=1005011992980900&dp=Cj0KCQjwxvjRBhC2ARIsAI7KJa1mnx0T8-olsEnau0JGsMbbh5IaNAO_SV1l-bw09Ocg4RG2LjFoyrQaApZWEALw_wcB.CkEKCQjwo_PRBhCYARIwAKzjslY9tLoiTzArb4-jOLxvT4UOUZyXT3IbCVHf-vUcMwb8HxLKNPAHOBm9w_KCGgJWLg.0AAAAAqSLCK-ERvZA6OfXQKqnZ1V_ffpZp&rd=4276263485105848866&gad_source=1&gad_campaignid=23555774122&gbraid=0AAAAAqSLCK-ERvZA6OfXQKqnZ1V_ffpZp&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa1mnx0T8-olsEnau0JGsMbbh5IaNAO_SV1l-bw09Ocg4RG2LjFoyrQaApZWEALw_wcB) |
    | **ZB Dongle-E USB Dongle** | SONOFF | €15.79 | [Link](https://de.aliexpress.com/item/1005010075573565.html) |

    **Decision Rationale - Thermal Resilience & IoT Bridging**

    * **Heatsinks:** Required to passively dissipate heat from the NVMe SSDs inside the 32GB HP EliteDesk node, actively preventing thermal throttling under heavy load.
    * **Sensors:** Crucial for live monitoring of the ambient temperature and humidity inside the compact 10-inch rack space to prevent hardware degradation.
    * **Coordinator:** The SONOFF dongle acts as the reliable Zigbee receiver/coordinator, bridging environmental data seamlessly into the management plane (e.g., Home Assistant).
  
-   :lucide-server:{ .lg .middle } __Mounting__

    ---

    | Item Name | Manufacturer | Price | Product Link |
    | :--- | :--- | :--- | :--- |
    | **Rackmount - Netgear PoE Switch** | N/A | €14.99 | [Link](https://www.amazon.de/dp/B0GMCTB3XJ?ref=ppx_yo2ov_dt_b_fed_asin_title) |
    | **Rackmount - HP EliteDesk (Qty: 2)** | N/A | 2x €15.99 | [Link](https://www.amazon.de/dp/B0GCTBXNWX?ref=ppx_yo2ov_dt_b_fed_asin_title) |
    | **Raspberry Pi 5 Case + 27W PSU** | Miuzei | €19.99 | [Link](https://www.amazon.de/dp/B0CRYQFDQP?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) |

    **Decision Rationale - Symmetry, Stability & Reusability**

    * **3D-Printed Mounts:** Mandatory for flush mounting on 8U. Since Netgear does not provide 10-inch ears, this ensures an exact fit directly under the patch panel for a perfect "waterfall" cable routing. The rough PEI texture imitates powder-coated industrial steel.
    * **Pi Case:** Salvaged from existing older stock inventory. Provides a heavy-duty passive cooling aluminum shell for the Pi 5 without requiring additional budget allocation.
  
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