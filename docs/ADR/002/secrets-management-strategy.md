---
status: new
tags:
  - secrets
  - encryption
  - ESO
  - external
  - git
---

# ADR-002: Centralized Secrets Management Strategy

![Proposed](https://img.shields.io/badge/Proposed-lightgrey?style=for-the-badge) ![Accepted](https://img.shields.io/badge/Accepted-darkgreen?style=for-the-badge) ![Deprecated](https://img.shields.io/badge/Deprecated-lightgrey?style=for-the-badge) ![Superseded](https://img.shields.io/badge/Superseded-lightgrey?style=for-the-badge)

| Attribute  | Details       |
| :--------- | :------------ |
| **Date**   | 2026-08-09    |
| **Author** | Linus Bachert |

---

## Context & Problem Statement

**`Problem:`**
:   The fundamental conflict in my public GitOps homelab project is of course the requirement to declaratively store system states in version control without exposing sensitive credentials in plain text publicly in my repository. A robust solution must secure the entire lifecycle. It needs to protect secrets within the Git repository, ensure secure handling during active server operations, and guarantee that secrets are never accidentally exposed via persistent storage snapshots or system backups. Furthermore, the architecture must provide a solution for the "Secret Zero" paradox (securely bootstrapping the secret manager itself).

**`Goals:`**
:   - Implement a unified, Zero-Trust secret management solution. 
    - The concept must integrate seamlessly across different architectural layers of my homelab, specifically serving the Proxmox VE hypervisor infrastructure, the Kubernetes cluster environment and the deployment of my network architecture. Therefore, the solution must seamlessly integrate into Ansible, Terraform and FluxCD.

**`Constraints`**
:    - **In-Memory Runtime Only:** To comply with modern security best practices and prevent leaks via ZFS block-level backups, secrets must be dynamically injected and exist strictly in RAM during runtime.
     - **Unified Ecosystem:** The architecture must provide a single, cohesive tooling standard that fits Ansible, Terraform and FluxCD integration to reduce operational overhead.
     - **Public-Repo Readiness:** The encryption mechanisms must be cryptographically secure enough to safely store the GitOps repository publicly without any risk of exposure.
     - **Local Bootstrap Capability:** The core infrastructure must remain recoverable from a cold start (Disaster Recovery).

---

## Evaluation

**Evaluated Options:**
<div class="grid cards" style="grid-template-columns: 1fr;" markdown>

-   :fontawesome-brands-square-git:{ .lg .middle } __Git-Encrypted__

    ---

    ### SOPS (Secret OPerationS) + Age
    
    ##### Workflow SOPS + Age
    
    * Encrypt secrets / sensitive values inside the YAML file locally via SOPS CLI and Age public key.
    * Commit encrypted YAML files directly to public Git repository.
    * Decrypt in-memory during CI/CD pipelines or FluxCD reconciliation with the Age private key.
    
    ```mermaid
    graph TD
        subgraph local_dev [Local Development]
            A[Raw YAML Secret] -->|SOPS + Age Public Key| B[Encrypted YAML File]
        end

        subgraph git_repo [Git Repository]
            B -->|git commit & push| C[(Public Git Repo)]
        end

        subgraph ci_cd [CI/CD or FluxCD]
            C -->|Reconciliation / Pipeline| D[In-Memory Decryption via Age Private Key]
            D --> E[Plaintext Secrets Applied to Cluster]
        end

        %% Styling %%
        style local_dev fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style git_repo fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style ci_cd fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
    ```

    **Advantages**

    * [x] Zero external network dependencies for initial cold infrastructure bootstrapping.
    * [x] Perfect GitOps alignment with version-controlled, auditable secret history.
    * [x] Avoids complex stateful infrastructure like internal vaults or databases.

    **Disadvantages**
    
    * [ ] No Audit logs (identifies Git file changes, not decryptions).
    * [ ] Difficult password rotation (requires manual CLI updates).
    * [ ] Enforcing RBAC is barely possible across FluxCD, Ansible, Terraform.

    ---

    ### Bitnami Sealed Secrets
    
    ##### Workflow Sealed Secrets
    
    * Fetch public key from the cluster controller to your local machine (either dynamically or via file)
    * Encrypt secrets locally using public key from cluster controller.
    * Commit SealedSecret custom resources to public Git repository.
    * Controller decrypts into standard Kubernetes Secrets inside the cluster.

    ```mermaid
    graph TD
        subgraph local_dev [Local Development]
            fetch[Fetch Public Key from Controller] --> encrypt
            raw[Raw YAML Secret] --> encrypt[Encrypt locally via kubeseal]
            encrypt --> B[SealedSecret Custom Resource]
        end

        subgraph git_repo [Git Repository]
            B -->|git commit & push| C[(Public Git Repo)]
        end

        subgraph k8s_cluster [Kubernetes Cluster]
            C -->|Reconciliation / Apply| D[SealedSecret Controller]
            D -->|Decrypts via Private Key| E[Standard Kubernetes Secret]
        end

        %% Styling %%
        style local_dev fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style git_repo fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style k8s_cluster fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
    ```

    **Advantages**
    
    * [x] Native Kubernetes integration without external cloud network dependencies
    * [x] Easy developer workflow utilizing the dedicated kubeseal CLI tool
    * [x] Strong separation of duties utilizing asymmetric cryptography methodologies
    
    **Disadvantages**

    * [ ] Useless for physical Layer 1 bootstrapping (Proxmox or OpenWrt)
    * [ ] High risk of complete cluster loss without private key backups

-   :fontawesome-brands-keycdn:{ .lg .middle } __External Secret Management (ESO)__

    ---
    ##### Workflow ESO
    
    * All secrets are stored securely and centrally within the ESO (in my case AWS Secrets Manager), serving as the Single Source of Truth (SSoT) for the entire infrastructure
    * A self-scripted, RAM-only deployment routine provisions the OpenWrt VPN gateway and securely pushes the newly generated keys to the cloud provider API
    * The External Secrets Operator (ESO) continuously polls AWS and automatically synchronizes relevant credentials into native Kubernetes Secrets for FluxCD and cluster applications
    * Terraform and Ansible dynamically fetch their required deployment secrets directly from AWS Secrets Manager at runtime via APIs, preventing cleartext credentials in code
    * Secrets are rotated automatically via AWS, while access is strictly governed using AWS IAM policies (Least Privilege)
    
    ```mermaid
    graph TD
        subgraph aws_cloud [AWS Cloud]
            iam[IAM Policies & Auto-Rotation] -.->|Governs Access| aws_sm[(AWS Secrets Manager - SSoT)]
        end

        subgraph layer1_edge [Physical Edge / Bootstrap]
            ram_script[RAM-Only Script] -->|Provisions| openwrt[OpenWrt VPN Gateway]
            ram_script -->|Pushes Generated Keys| aws_sm
        end

        subgraph iac_tooling [Infrastructure as Code]
            aws_sm -->|Runtime API Fetch| tf_ansible[Terraform & Ansible]
        end

        subgraph k8s_cluster [Kubernetes Cluster]
            aws_sm -->|Continuously Polls & Syncs| eso[External Secrets Operator]
            eso -->|Injects| k8s_sec[Native Kubernetes Secrets]
        end

        %% Styling %%
        style aws_cloud fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style layer1_edge fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style iac_tooling fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
        style k8s_cluster fill:transparent,stroke:#666,stroke-width:1px,stroke-dasharray: 5 5
    ```

    **Advantages**

    * [x] Single source of truth for physical and cloud infrastructure layers.
    * [x] Centralized governance utilizing AWS KMS Customer Managed Keys.
    * [x] No plaintext secrets ever stored in local Git repositories.

    **Disadvantages**

    * [ ] Infrastructure bootstrapping deadlocks without external internet connectivity to AWS.

</div>

---

### Final Decision

* **Chosen Decision:** ESO - AWS Secret Manager (with local RAM-only Bootstrap Script)
* **Causal Chain & Rationale (Why?):**
    * *Risk:* Internal vaults cause deadlocks during physical Layer 1 bootstrapping.
    * *Justification:* AWS Secrets Manager enforces a strict single source of truth.
    * *Justification:* RAM-only bootstrap script resolves the Secret Zero network bottleneck.
    * *Justification:* Script generates random passwords in RAM, pushing directly to AWS.
    * *Justification:* OpenWrt is initialized (Internet/VPN) before GitOps (Ansible/Terraform) triggers.
    * *Justification:* Dynamic injection ensures secrets never persist on ZFS storage snapshots.
    * *Justification:* Architecture aligns perfectly with my future hybrid AWS integration plans.

---

## Consequences & Implications

* **Positive Consequences (Benefits):**
    * Absolute centralized governance across local and AWS cloud environments.
    * Zero plaintext exposure risk within public GitHub repositories.
    * Prevents disk leaks by injecting secrets strictly into RAM.
* **Negative Consequences (Drawbacks/Risks):**
    * Hard dependency on external AWS connectivity for continuous reconciliation.
    * Increased operational complexity maintaining the local automated bootstrap script.
    * Minor ongoing cost overhead for AWS Secrets Manager and KMS.
* **Technical Debt:** 
    * Maintaining the custom RAM-only bootstrap script against AWS API changes (1st time bootstrapping).
    * Ensuring local OpenWrt routing always prioritizes external AWS connectivity.

---

<!-- ## Alignment & Relations

* **Related Artifacts:**  -->
