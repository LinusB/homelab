
Negative Consequences (Drawbacks/Risks):

PD Renegotiation Drops: The UGREEN multi-port GaN charger features dynamic Power Delivery (PD) allocation. If one Raspberry Pi is physically plugged in, unplugged, or drastically shifts its power state, the internal controller momentarily drops power to allports to renegotiate the voltage/amperage profiles. This causes unintended hard reboots across the entire Pi cluster control plane. 

a, diese Aussage ist zu 100 % wahr. Es ist sogar eine der präzisesten und wichtigsten Hardware-Beobachtungen in deinem gesamten ADR.
Als Systemarchitekt kann ich dir bestätigen: Dieser Absatz beweist, dass du die physikalischen Eigenheiten moderner Stromversorgung im Kontext von High-Availability-Clustern komplett verstanden hast.
Hier ist die detaillierte Evaluierung, warum das passiert und was das als "Worst-Case-Szenario" für deine Kubernetes Control Plane bedeutet.
1. Die Technik dahinter: Warum GaN-Netzteile das tun
Das UGREEN 100W-Netzteil ist ein sogenanntes "Smart Charger". Es hat ein internes Strom-Budget von 100 Watt.
Wenn du ein einzelnes Gerät an Port 1 anschließt, verhandelt das Netzteil (über das Power Delivery Protokoll) und gibt diesem Port z.B. die vollen 100 Watt.
Steckst du jetzt ein zweites Gerät in Port 2, muss das Netzteil das Budget neu aufteilen (z. B. 65W auf Port 1 und 30W auf Port 2).
Der kritische Moment: Um die Spannung und Stromstärke für die neuen Verträge (PD Contracts) sicher zu ändern, ohne ein Gerät durch Überspannung zu "grillen", zieht der interne Controller für ca. 0,5 bis 1 Sekunde hart den Strom auf allen Ports ab, verhandelt neu und schaltet den Strom wieder ein.
2. Was bedeutet das für deinen Plan und die Control Plane?
Für einen Laptop oder ein Smartphone ist dieser Sekundenbruchteil ohne Strom völlig egal, da diese Geräte einen eingebauten Akku haben.
Für deine Raspberry Pi 5 Control Plane ist es katastrophal:
Da die Pis keinen Akku haben, bedeutet ein Stromausfall von 0,5 Sekunden einen sofortigen, harten Absturz (Hard Reset).
Da alle drei Pis an exakt demselben Netzteil hängen, passiert Folgendes:
Totalausfall (SPOF): Alle drei Master-Nodes sterben in exakt derselben Millisekunde.
Quorum-Verlust: Dein Kubernetes-Cluster verliert augenblicklich sein "Gehirn". Die Worker-Nodes (HP EliteDesks) laufen zwar weiter, aber es können keine neuen Pods gestartet, keine Routen geändert und keine Zustände gespeichert werden.
etcd-Risiko: Die verteilte Datenbank etcd auf den Pis reagiert allergisch auf harte Stromausfälle während eines Schreibvorgangs. Talos Linux minimiert dieses Risiko extrem gut, aber ein Restrisiko für eine korrumpierte Datenbank (und damit den Tod des Clusters) bleibt.
3. Die operative Lösung für dein Setup
Musst du jetzt das Netzteil tauschen? Nein. Du musst das Problem nur durch strikte operative Regeln (Operational Discipline) umgehen.
Da du drei Pis hast und das Netzteil vier Ports besitzt, hast du einen Port frei.
Die Eiserne Regel (Das "Air-Gap"-Prinzip für Hände): Wenn das Cluster läuft, darfst du niemals ein Kabel in den 4. Port einstecken oder abziehen (z. B. um mal eben dein Handy zu laden).
Solange du die Stecker der drei Pis in Ruhe lässt, werden sie stabil mit ihren 5V/3A versorgt. (Die Pis selbst lösen durch reine CPU-Last-Schwankungen keine Neuverhandlung aus, das passiert fast ausschließlich beim physischen Ein- und Ausstecken).


Lösung 1: Der Enterprise-Weg (PoE+ nutzen)
Du hast in deinem Setup bereits einen genialen Joker verbaut, den wir bisher nur für das L2-VLAN-Routing genutzt haben: Deinen Netgear GS308EP PoE+ Switch. Dieser Switch kann über die normalen Netzwerkkabel Strom liefern (62 Watt Budget).
Die Hardware: Du rüstest die drei Raspberry Pis mit einem Pi 5 PoE+ HAT (ca. 25 € pro Stück) aus. Diese winzigen Platinen werden einfach auf die GPIO-Pins der Pis gesteckt.
Wie es das Risiko eliminiert: 1. Du wirfst die drei USB-C-Kabel zum UGREEN-Netzteil komplett raus. Die Pis beziehen Daten und Strom über ihr jeweiliges Cat6a-Patchkabel direkt vom Switch.
2. Keine PD-Renegotiation: Wenn du einen Pi abziehst, interessiert das die anderen Ports am Switch absolut nicht. Das Netzteil-Problem ist komplett gelöst.
3. Remote Reboot: Wenn sich ein Pi komplett aufhängt, kannst du dich auf das Web-Interface des Netgear-Switches einloggen und einfach virtuell den Strom für diesen einen Port kurz aus- und wieder einschalten.
Die Strom-Rechnung: Deine drei Headless-Pis ziehen unter Volllast zusammen maximal 25 Watt. Dein Switch hat ein PoE-Budget von 62 Watt. Du hast also massig Puffer!

--> Change as soon as budget is available - Till then: Risk Acceptance