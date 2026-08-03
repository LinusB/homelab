# Layer 3: IPAM & Routing Boundaries

## IP Address Management (IPAM)

| Segment Name | VLAN ID | IPv4 CIDR Block | Physical/Logical Assignment | Primary Function & Routing Profile |
| :--- | :--- | :--- | :--- | :--- |
| **Management (MGMT)** | `10` | `10.10.10.0/24` | Native/Untagged on switch port | Out-of-band management for Proxmox UI, Netgear switch, Talos API, OpenWrt SSH. Access strictly regulated. |
| **K8s Control Plane** | `20` | `10.10.20.0/24` | 3x Raspberry Pi 5 (Bare-Metal) | Strictly isolated network for the Kubernetes API, the etcd quorum, and the Talos Virtual IP. |
| **K8s Worker Nodes** | `21` | `10.10.21.0/24` | Proxmox VMs (HP EliteDesk) | Compute resources for K8s workloads. Communication to the control plane is limited to essential ports. |
| **General Compute** | `30` | `10.10.30.0/24` | Proxmox VMs (HP EliteDesk) | Standard VMs outside the K8s ecosystem. Independent security policies and direct internet access. |
| **Offensive Security** | `40` | `10.10.40.0/24` | Kali Linux VM on Proxmox | Isolated pentesting environment. Default L3 drop policy to all networks, temporary access granted exclusively via IaC. |
| **IoT / Sensors** | `50` | `10.10.50.0/24` | Zigbee/WLAN Gateways | Highly restrictive network for peripheral sensors. No internet access, ingress completely blocked. |

## Kubernetes Segmentation Standard

*   **Compliance (BSI IT-Grundschutz):** In accordance with requirement **APP.4.4.A7**, network traffic between management components and workload nodes is strictly isolated.
*   **Implementation:** The Control Plane (VLAN 20) and Worker Nodes (VLAN 21) operate in entirely separate broadcast domains. 
*   **Addressing Scheme:** For logical consistency and simplified administration, all VLAN IDs map directly to the third octet of their respective IPv4 subnets.