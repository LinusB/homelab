# Physical Topography
This section defines the hardware footprint and Layer 1 cabling structure of my own 10-inch micro-datacenter.

## [Hardware Inventory](https://linusb.github.io/homelab/ADR/001/it-procurement/#active-compute-network-fabric)

**Network & Routing**

*   **Gateway:** Beryl AX (GL-MT3000)
*   **L2 Fabric:** Netgear GS308EP

**Compute Cluster**

*   **Node HP 1-2:** HP EliteDesk 800 G6 Mini (32GB RAM)
*   **Node HP 2-2:** HP EliteDesk 805 G6 Mini (16GB RAM)
*   **Node Pi 1-3:** Raspberry Pi 5 (8GB RAM)
*   **Node Pi 2-3:** Raspberry Pi 5 (4GB RAM)
*   **Node Pi 3-3:** Raspberry Pi 5 (4GB RAM)

![Enterprise Homelab - Production Ready](images/homelab-overview.png){ loading=lazy }
*Fig 1: The fully integrated 9U compute and network infrastructure.*

---

## Port Allocation & Cabling

The patch panel translates the physical switch connections into defined architectural roles, separating trunked traffic from bare-metal access.

*   **Port 1 (Red):** Uplink to Gateway (Beryl AX)
*   **Port 2 & 3 (Purple):** 802.1Q Trunks to Hypervisors (HP Nodes)
*   **Port 4, 5 & 6 (Blue):** Access Ports for Bare-Metal Nodes (Raspberry Pis --> future Control Plane)
*   **Port 7 (Green):** Out-of-Band (OOB) Management

![Front Panel Topology](images/L2-Patchpanel.png){ loading=lazy }
*Fig 2: Physical Front Panel Topology and Layer 1 Segmentation.*