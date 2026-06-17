---
icon: lucide/milestone
---


- :lucide-server:{ .lg .middle } **10-Inch Rackmount Bracket for PoE Switch**

  ---

  **Manufacturer:** N/A | **Price:** €14.99 | [**Product Link**](#)

  #### Rationale: Symmetry & Stability

  - :lucide-badge-check: Mandatory for flush mounting on 8U.
  - :lucide-badge-check: Netgear does not provide 10-inch rack ears, so this
    ensures an exact fit directly under the patch panel for a perfect
    "waterfall" cable routing aesthetic.

- :lucide-server:{ .lg .middle } **10-Inch Rackmount Bracket for HP EliteDesk
  (Qty: 2)**

  ***

  **Manufacturer:** N/A | **Price:** €31.98 | [**Product Link**](#)

  #### Rationale: Time Efficiency & Datacenter Look

  - :lucide-badge-check: Allows immediate project continuation without waiting
    for private 3D prints.
  - :lucide-badge-check: The rough PEI texture of the front imitates
    powder-coated industrial steel, emphasizing a professional server aesthetic.

</div>

- **Chosen Decision:** Procure pre-manufactured 10-inch rackmount brackets
  instead of relying on custom 3D printing.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Relying on private 3D printing introduces timeline delays, potential
    fitment issues due to printer bed size limitations, and structural
    inconsistencies.
  - _Justification:_ Purchasing ready-made mounts guarantees immediate
    availability, exact standard fitments, and a professional datacenter finish
    suitable for an enterprise-grade portfolio presentation.

---

## Network Connection

<div class="grid cards" markdown>

- :lucide-cable:{ .lg .middle } **Cat6a Patch Cable 10Gbps Ethernet Cable (Qty:
  2, Front)**

  ***

  **Manufacturer:** Ercielook | **Price:** €11.98 | [**Product Link**](#)

  #### Rationale: Cyberpunk Aesthetic & Flexibility

  - :lucide-badge-check: Transparent RJ-45 connectors catch the LED light of the
    switch creating a high-end "Fiber-Optic" effect.
  - :lucide-badge-check: Highly flexible, allowing for tight, clean front bends
    without mechanical tension.

- :lucide-cable:{ .lg .middle } **Cat6a Patch Cable High Speed Network Cable
  (Rear)**

  ***

  **Manufacturer:** Ercielook | **Price:** €15.46 | [**Product Link**](#)

  #### Rationale: Cable Management & Service Loops

  - :lucide-badge-check: Round cables (unlike rigid flat cables) bend 90 degrees
    without causing port tension.
  - :lucide-badge-check: The 1-meter length allows for professionally coiled
    "Service Loops" hidden at the rear of the rack.

</div>

- **Chosen Decision:** Segmented cabling strategy utilizing specialized
  aesthetic cables for the front and standard round cables for the rear.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Using identical, rigid cables throughout causes tension on hardware
    ports and degrades the clean, front-facing "waterfall" aesthetic.
  - _Justification:_ Mixing transparent cables in the front enhances the visual
    portfolio impact, while flexible round cables in the rear ensure safe,
    structured routing and maintenance loops.

---

## Power Supply

<div class="grid cards" markdown>

- :lucide-plug-zap:{ .lg .middle } **4-Way Power Strip Network Cabinet -
  DN-95418**

  ***

  **Manufacturer:** DIGITUS | **Price:** €15.29 | [**Product Link**](#)

  #### Rationale: B2B Standard

  - :lucide-badge-check: Space-saving 1U power distribution unit (PDU) with a
    premium aluminum housing.
  - :lucide-badge-check: Prevents loose power strips inside the rack and offers
    an excellent price-performance ratio.

- :lucide-plug-zap:{ .lg .middle } **Power Cable 3-Pin 1.80m + 2X C5 Power
  Y-Cable**

  ***

  **Manufacturer:** ACT | **Price:** €16.71 | [**Product Link**](#)

  #### Rationale: Consolidation

  - :lucide-badge-check: Merges the power delivery of both HP EliteDesks into a
    single wall plug.
  - :lucide-badge-check: Frees up valuable slots on the PDU and massively
    reduces cable clutter at the back of the rack.

- :lucide-battery-charging:{ .lg .middle } **Nexode 100W USB-C Charger with 4X
  USB-C Ports**

  ***

  **Manufacturer:** UGREEN | **Price:** €35.98 | [**Product Link**](#)

  #### Rationale: Efficiency & Fire Prevention

  - :lucide-badge-check: Cutting-edge GaN technology (95% efficiency) prevents
    heat buildup within the enclosed rack.
  - :lucide-badge-check: Extremely safe for 24/7 continuous operation due to
    800+ temperature measurements per second.

</div>

- **Chosen Decision:** Centralized, high-efficiency power distribution
  leveraging a dedicated 1U PDU, GaN chargers, and Y-splitters.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Deploying standard consumer power strips and individual heavy power
    bricks causes dangerous heat buildup, thermal throttling, and unmanageable
    cable sprawl.
  - _Justification:_ GaN technology ensures minimal heat dissipation, while
    Y-cables and a rack-mounted PDU keep the rear structured, safe, and maximize
    available sockets for future expansion.

---

## Infrastructure / Housing

<div class="grid cards" markdown>

- :lucide-box:{ .lg .middle } **10-Inch Desktop Mini Rack, 9U, 200mm Depth**

  ***

  **Manufacturer:** Tecmojo | **Price:** €89.90 | [**Product Link**](#)

  #### Rationale: Architectural Foundation

  - :lucide-badge-check: The white outer casing establishes the baseline for the
    high-contrast "Stormtrooper" design pattern.
  - :lucide-badge-check: 9 rack units (9U) provide sufficient vertical space for
    the physical separation of underlay and overlay architectures.

</div>

- **Chosen Decision:** 9U 10-inch form factor rack with a white exterior finish.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ A smaller rack eliminates the ability to physically separate cluster
    layers, whereas a standard 19-inch rack is excessively large for a
    desktop-based homelab environment.
  - _Justification:_ 9U delivers the optimal capacity balance for a separated
    underlay/overlay topology, and the white chassis creates a visually striking
    contrast necessary for high-quality architectural documentation.

---

## Power Transmission

<div class="grid cards" markdown>

- :lucide-zap:{ .lg .middle } **USB-C Cable 100W Charging Cable USB-C (Qty: 2,
  1M)**

  ***

  **Manufacturer:** UGREEN | **Price:** 2x €10.44 | [**Product Link**](#)

  #### Rationale: Performance Guarantee & Safety

  - :lucide-badge-check: The embedded E-Marker chip delivers the full 5A/5V
    throughput that the Raspberry Pi 5 demands under heavy load.
  - :lucide-badge-check: The thick copper cross-section prevents heat
    generation, while the aluminum connector finish matches the enterprise
    hardware aesthetic.

</div>

- **Chosen Decision:** Premium 100W E-Marker USB-C cables for all SBC (Single
  Board Computer) power deliveries.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Standard 60W cables physically cap current at 3A, bottlenecking the
    Raspberry Pi 5 under load and leading to power-state warnings and cluster
    instability.
  - _Justification:_ 100W cables guarantee unrestricted 5A/5V power delivery,
    ensuring rock-solid node stability during peak workload executions.

---

## Cable Management

<div class="grid cards" markdown>

- :lucide-paperclip:{ .lg .middle } **Reusable Hook-and-Loop Cable Ties Black
  (50 Pcs)**

  ***

  **Manufacturer:** Oksdown | **Price:** €3.99 | [**Product Link**](#)

  #### Rationale: Modularity

  - :lucide-badge-check: Gentle on delicate cable jackets and allows for
    infinite readjustments.
  - :lucide-badge-check: Enables bundling the rear wiring into thick, clean
    cable trunks routed invisibly along the black rack rails.

</div>

- **Chosen Decision:** Reusable hook-and-loop (Velcro) straps instead of
  traditional plastic zip ties.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Standard zip ties bite into cable shielding over time and require
    destructive cutting to modify, completely hindering iterative homelab setups
    and upgrades.
  - _Justification:_ Velcro allows continuous, non-destructive architecture
    adjustments and perfectly conceals bundled cables against the dark internal
    framework.

---

## Network Distribution

<div class="grid cards" markdown>

- :lucide-network:{ .lg .middle } **12-Port Cat6 Patch Panel – 0.5U (10-Inch)**

  ***

  **Manufacturer:** GeeekPi | **Price:** €25.99 | [**Product Link**](#)

  #### Rationale: Future-Proofing & Stealth Design

  - :lucide-badge-check: Delivers a clean, stealth-black look without
    distracting manufacturer logos on the front panel.
  - :lucide-badge-check: Full modularity via unpopulated slots, allowing
    keystones to be individually upgraded later if bandwidth requirements change
    (e.g., Cat7/Cat8).

</div>

- **Chosen Decision:** Unpopulated, modular 0.5U keystone patch panel.
- **Causal Chain & Rationale (Why?):**
  - _Risk:_ Pre-populated, soldered panels block future physical network
    upgrades, and heavily branded consumer-grade hardware visually degrades the
    enterprise feel of the rack.
  - _Justification:_ An unpopulated panel offers maximum lifecycle flexibility,
    while the logo-free stealth design maintains a highly professional, unified
    aesthetic across the rack face.
