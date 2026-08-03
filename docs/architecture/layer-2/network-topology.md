# Layer 2 Network Topology

## Architecture Overview

![Layer 2 Topology](images/layer-2-setup.png#only-light)
![Layer 2 Topology](images/layer-2-setup-dark.png#only-dark)

## Core Components & Architectural Rationale

### 1. Hardware L2 Fabric (Netgear GS308EP)
*   **Role:** Serves as the physical IEEE 802.1Q boundary and primary distribution layer.
*   **Access Ports (Blue):** Connects the Bare Metal nodes (Raspberry Pi 5 Control Plane) to enforce strict, hardware-level VLAN assignment.
*   **Trunk Ports (Purple/Red):** Forwards tagged 802.1Q frames to the Proxmox hypervisor nodes and the OpenWrt edge router.

### 2. Virtual Hypervisor Switch (Proxmox)
*   **Technology:** Native VLAN-aware Linux Bridge (`vmbr0`).
*   **Rationale (OVS Deprecation):** Open vSwitch (OVS) and SPAN (Port Mirroring) were explicitly excluded from the design to maintain strict isolation for the Offensive Security Enclave (Kali VM - VLAN 40).
*   **Defense-in-Depth:** Utilizing the native Linux Bridge allows the built-in Proxmox firewall to remain fully active on the Kali VM's vNIC, establishing a zero-trust boundary before traffic reaches the physical network.

### 3. Edge Gateway (OpenWrt - GL-MT3000)
*   **Technology:** Distributed Switch Architecture (DSA).
*   **Role:** Functions as the Layer 2 to Layer 3 translation boundary.
*   **Rationale:** The router natively ingests the L2 trunk and maps the VLANs into logical, isolated Linux interfaces (e.g., `br-lan.20`, `br-lan.40`). This enables immediate, granular Layer 3 routing and the enforcement of strict Zone-to-Zone firewall policies.