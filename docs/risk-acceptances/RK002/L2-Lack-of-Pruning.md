# RK002: Static L2 Trunking & Lack of Physical VLAN Pruning

![Draft](https://img.shields.io/badge/Draft-lightgrey?style=for-the-badge) ![Finalization](https://img.shields.io/badge/Finalization-lightgrey?style=for-the-badge) ![Monitor](https://img.shields.io/badge/Monitor-darkgreen?style=for-the-badge) ![Closed](https://img.shields.io/badge/Closed-lightgrey?style=for-the-badge)

---

!!! info "1. General Information & Scope"
    * **Name:** Violation of Layer 2 Least Privilege via Static All-VLAN Trunking
    * **ID:** RK002

## 2. Responsibilities & Environment

* **Risk Owner (Homelab Admin):** Linus Bachert
* **Affected Environment / Zone:** Layer 2 Network Fabric & Hypervisor SDN
* **Affected Hardware / Component:** Netgear GS308EP (Smart Managed Plus), Proxmox `vlan-aware` Bridge
* **Primary Use Case:** Core switching backplane connecting the OpenWrt routing layer, Proxmox hypervisors, and bare-metal Kubernetes nodes.

---

## 3. Risk Assessment (Risk Scope)

* **Triggering Issue / Finding:** 
  > The physical Netgear switch lacks API/CLI support for automated GitOps provisioning. To enable continuous deployment without manual Web-UI intervention, the trunk ports connecting the hypervisor and router are statically pre-provisioned to allow all 802.1Q VLAN tags (2-4094).

* **Relevance to Homelab Operations:**
  > This configuration affects the entire network isolation strategy of the datacenter. It enables fully automated IaC deployments via Terraform and Ansible by shifting the isolation boundary from the physical switch up to the software-defined layer.

!!! warning "Vulnerability & Threat Profile"
    * **Root Cause (Vulnerability):**
      > Intentional architectural circumvention of physical Layer 2 VLAN Pruning (Principle of Least Privilege). The switch operates as a "dumb pipe," indiscriminately forwarding all tagged frames across trunk links.
    * **Threat Description:**
      > **1. VLAN Hopping:** A compromised virtual machine (e.g., within the Kali/TryHackMe enclave) could attempt to craft malicious 802.1Q-tagged frames to escape its assigned network zone and traverse the open physical trunk.<br>
      > **2. Broadcast Flooding:** The switch forwards broadcast and multicast traffic across all trunked ports unnecessarily, creating a wider broadcast domain than architecturally required.

!!! danger "Potential Impact"
    * **Impact Assessment (CIA Triad):**
      > **Confidentiality & Integrity:** If VLAN hopping succeeds, an attacker gains lateral movement capabilities across logically separated zones, potentially compromising the management plane or the Kubernetes control plane.<br>
      > **Availability:** Unrestricted broadcast traffic could marginally degrade physical link performance on the trunk ports, though the impact is negligible in a micro-datacenter scale.

!!! success "Recommended Countermeasure"
    * **Mitigation Plan:**
      > **1. Hypervisor Mitigation (Compensating Control):** Enforce strict MAC and VLAN anti-spoofing via the Proxmox Host Firewall (`ebtables`) on the `vlan-aware` bridge. This strictly drops any guest-generated 802.1Q tags before they reach the physical NIC.<br>
      > **2. Physical Segmentation:** Maintain strict, untagged access ports (VLAN 20) for the bare-metal Raspberry Pi nodes. No exposure of an open trunk to end-devices that lack strict hypervisor-level packet inspection.

---

## 4. Risk Response (Treatment)

Please select **one** of the following risk treatment options:

- [x] **Risk Mitigation (Reduction)**

!!! quote ""
    The implementation of the recommended software-defined countermeasures (Proxmox Host Firewall and strict static access port assignments for the Control Plane) is mandated and executed to adequately reduce the existing vulnerability. While the physical hardware limitation persists and a hardware replacement is excluded due to budget and 10-inch form-factor constraints, the applied compensating controls effectively neutralize the threat of VLAN hopping. The remaining risk from broadcast traffic is relatively small and will be accepted as a minor trade-off to keep the current setup running smoothly.

- [ ] **Risk Acceptance**

!!! quote ""
    The vulnerability and its potential impact on the infrastructure are acknowledged. Due to specific constraints, this risk is explicitly accepted without the implementation of further mitigation measures.

- [ ] **Risk Avoidance**

!!! quote ""
    The immediate decommissioning, removal, or complete reconfiguration of the affected component is mandated to entirely avoid the risk. The risk persists until the system is successfully decommissioned.