---
status: new
tags:

---

# ADR-0XX: Selection of DNS Architecture and Placement Strategy

1. Blocky direkt auf dem OpenWrt Beryl AX?
Laut dem Audit-Bericht kann die Installation von Blocky als natives Paket direkt auf dem OpenWrt Beryl AX erfolgen. Alternativ wird die Installation als leichtgewichtiger, unprivilegierter LXC-Container direkt auf Proxmox als noch flexibler beschrieben.

Kritische Experten-Einschätzung zur Performance:
Obwohl OpenWrt externe Pakete zulässt, ist der Beryl AX (GL-MT3000) ein auf Netzwerkdurchsatz optimierter Embedded-Router (ARM-Architektur) mit begrenztem Arbeitsspeicher (RAM) und CPU-Ressourcen. Ein DNS-Adblocker wie Blocky muss große Filterlisten im RAM vorhalten (oftmals 100+ MB, je nach Listen-Größe) und DNS-Anfragen für das gesamte Netzwerk in Echtzeit parsen.
Wenn du Blocky auf dem Router installierst, riskierst du, dass der Out-of-Memory-Killer (OOM) des Linux-Kernels bei Speicherengpässen kritische Routing- oder Firewall-Prozesse beendet. Daher ist der Rat aus dem Dokument absolut korrekt: Setze Blocky als LXC-Container auf Proxmox auf. Die HP EliteDesks haben massiv mehr CPU-Power und RAM, und der LXC-Container verbraucht kaum Overhead. Der Router teilt dann via DHCP einfach die IP des Proxmox-LXC-Containers als DNS-Server an die Clients aus.