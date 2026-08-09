# RK001: GaN Charger PD Renegotiation Drops (Control Plane SPOF)

![Draft](https://img.shields.io/badge/Draft-lightgrey?style=for-the-badge) ![Finalization](https://img.shields.io/badge/Finalization-lightgrey?style=for-the-badge) ![Monitor](https://img.shields.io/badge/Monitor-darkgreen?style=for-the-badge) ![Closed](https://img.shields.io/badge/Closed-lightgrey?style=for-the-badge)

---

![Risk](https://img.shields.io/badge/Risk-major-darkred?style=for-the-badge)
<!-- ![Risk](https://img.shields.io/badge/Risk-increased-darkorange?style=for-the-badge) -->
<!-- ![Risk](https://img.shields.io/badge/Risk-minor-lightyellow?style=for-the-badge) -->


!!! info "1. General Information & Scope"
    * **Name:** Power Delivery (PD) Renegotiation Drops causing Control Plane SPOF
    * **ID:** RK001

## 2. Responsibilities & Environment

* **Risk Owner (Homelab Admin):** Linus Bachert
* **Affected Environment / Zone:** Layer 1 Power, Kubernetes Control Plane, Perimeter Gateway
* **Affected Hardware / Component:** UGREEN 100W GaN Charger, 3x Raspberry Pi 5, GL.iNet Beryl AX
* **Primary Use Case:** Centralized, bundled power supply for the "brain" of the cluster (etcd/Talos) as well as the external L3 routing gateway.

---

## 3. Risk Assessment (Risk Scope)

* **Triggering Issue / Finding:** Hardware limitation of the smart charger due to dynamic Power Delivery (PD) reallocation when connecting/disconnecting peripherals.

* **Relevance to Homelab Operations:**
  The power supply powers the most critical core components of the rack. A failure affects the high availability of the entire Kubernetes cluster (loss of the etcd quorum) as well as external accessibility (failure of the Beryl AX router).

!!! warning "Vulnerability & Threat Profile"
    * **Root Cause (Vulnerability):**
      The internal controller of the UGREEN GaN charger has a shared power budget. To avoid overvoltage during new PD contracts, the controller hard cuts power on *all* ports for approx. 0.5 to 1 second to renegotiate. Since the Raspberry Pis lack batteries/capacitors as buffers, this millisecond interruption leads to an immediate system crash. The power supply thus acts as a Single Point of Failure (SPOF).
    * **Threat Description:**
      Physically plugging in or unplugging a cable at the free 4th port (e.g., carelessly charging a smartphone) or a drastic current change on a faulty cable triggers the renegotiation. The probability of occurrence is extremely high in the absence of operational discipline.

!!! danger "Potential Impact"
    * **Impact Assessment (CIA Triad):**<br>
      **Availability (Critical):** Simultaneous hard reboot of all three master nodes and the router. The K8s cluster immediately loses its quorum, new pods cannot be started, and routes cannot be changed. Absolute downtime of the Control Plane.<br>
      **Integrity (Medium):** A hard power failure during a write operation carries the risk of etcd database corruption. The immutable Talos Linux strongly minimizes this, but the residual risk of a total loss of cluster states remains.

!!! success "Recommended Countermeasure"
    * **Mitigation Plan:**
      Physical architecture change to Power over Ethernet (PoE+). The Raspberry Pis will be equipped with Pi 5 PoE+ HATs and draw data as well as power via the Netgear GS308EP Switch (62W budget).<br>
      *Advantages:* Completely eliminates the PD problem, resolves the SPOF, and enables remote reboots of individual ports via the Netgear management interface.

---

## 4. Risk Response (Treatment)

Please select **one** of the following risk treatment options:

- [ ] **Risk Mitigation (Reduction)**

!!! quote ""
    The Risk Owner has authorized the implementation of the recommended countermeasures to adequately reduce the existing risk. The owner is fully aware that the risk remains active in the homelab environment until these measures are successfully deployed.

- [x] **Risk Acceptance**

!!! quote ""
    The Risk Owner acknowledges the vulnerability and its potential impact on the infrastructure. Due to specific constraints (current lack of budget for 3x PoE+ HATs), the owner explicitly accepts this risk and chooses not to implement hardware mitigation measures at this time.

- [ ] **Risk Avoidance**

!!! quote ""
    The Risk Owner mandates the immediate decommissioning, removal, or complete reconfiguration of the affected component to entirely avoid the risk. The owner acknowledges that the risk persists until the system is successfully decommissioned.