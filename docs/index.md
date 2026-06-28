---
icon: lucide/info
---

# Architecture Documentation & Repository Structuring

## 1. Top-Level Architecture of the GitHub Repository

| Directory / File | Function and Structural Content |
| :--- | :--- |
| `docs/` | This directory exclusively contains the structured `.md` (Markdown) source files compiled by MkDocs. It serves as the core knowledge base. |
| `docker/` | All `docker-compose.yml` stacks and `.env.example` configurations are versioned here, cleanly separated by logical services. |
| `kubernetes/` | A dedicated repository for future Helm charts, Kustomize overlays, and YAML manifests for the planned hybrid K3s cluster. |
| `scripts/` | Directory for imperative shell and Python scripts. CLI commands used within the system (e.g., for provisioning the Kali VM or executing ZFS tuning) are stored here as executable files. |
| `.github/workflows/` | Contains the CI/CD pipelines for GitHub Actions. This defines the workflow that automatically compiles MkDocs and publishes the artifacts to GitHub Pages upon a commit to the main branch. |
| `mkdocs.yml` | The essential, centralized configuration file for the "Material for MkDocs" framework, controlling the layout, navigation structure, and active Markdown extensions. |

---

## 2. Hierarchical Structure of the Knowledge Base (`docs/` Navigation)

| Directory / Navigation Node | Description and Content Focus |
| :--- | :--- |
| `01_architecture/` | Macro-architecture, hardware specifications (HP EliteDesk, Raspberry Pi cluster), network topology, and IP Address Management (IPAM). |
| `02_infrastructure/` | Hypervisor layer and cluster infrastructure. Contains documentation for the Proxmox VE host, the future Proxmox Backup Server (PBS), and the Kubernetes Control-Plane/Worker architecture. |
| `03_compute/` | Virtual machines and execution environments. This documents the specifications for VM 100 (Service Monolith), VM 101 (Home Assistant), and VM 999 (Kali Linux). |
| `04_services/` | Logical applications, entirely decoupled from their host execution environment. Subdivided into categories like Identity & Gateway (OIDC, NPM), Productivity (Nextcloud, Paperless, Treck), and Media (Immich). |
| `05_operations/` | Operations, maintenance, and observability. Encompasses the planned monitoring systems, centralized logging mechanisms, and in-depth backup/disaster recovery concepts. |