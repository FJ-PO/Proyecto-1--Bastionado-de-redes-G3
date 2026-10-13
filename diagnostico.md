
## Bloque 1. El mapa y las direcciones

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué equipos hay y cómo están conectados? | 1 Servidor, 3 Portatiles, 2 puestos de trabajo, 1 Router, 1 Wifi, 2 Impresoras, 1 Switch, todo esta conectado en red. |
| ¿Qué direcciones tiene el router y en qué interfaz? | `ether1`: 192.168.122.20/24 `ether2`: 192.168.1.1/24 |
| ¿Qué direcciones reparte y a quién se las ha dado? | `ether1`: 192.168.122.20/24 --> Switch Oficina  `ether2`: 192.168.1.1/24 --> Operadora|
| ¿Por dónde sale a Internet? |  192.168.122.1 |
| ¿Cómo está configurado el switch? | **VLANs:** solo la VLAN 1 (`default`), activa, con los 16 puertos `Gi0/0`-`Gi3/3` asignados. No hay VLANs adicionales (las 1002-1005 son las reservadas por defecto).<br>**Estado de los puertos:** conectados (`connected`) `Gi0/0`-`Gi0/3`, `Gi1/0`-`Gi1/3` y `Gi2/0`; sin conexión (`notconnect`) `Gi2/1`-`Gi2/3` y `Gi3/0`-`Gi3/3`. Todos en VLAN 1, dúplex `a-full`, velocidad `auto`, tipo RJ45.<br>**Tabla MAC (8 dinámicas, VLAN 1):**<br>`0cf5.868f.0000` → `Gi0/0`<br>`0cf1.a36e.0000` → `Gi0/1`<br>`0cb2.16b9.0000` → `Gi0/2`<br>`0c3b.d4e0.0000` → `Gi0/3`<br>`0cc8.3996.0001` → `Gi1/0`<br>`0050.7966.6802` → `Gi1/1`<br>`0050.7966.6801` → `Gi1/2`<br>`0050.7966.6800` → `Gi1/3` | |
| ¿Qué dirección tiene cada impresora? | Impresora 1: 192.168.1.20 · Impresora 2: 192.168.1.21 |
| ¿Qué equipos tienen dirección fija y cuáles la reciben del router? | **Por DHCP:** `portatil-laura` (`.200`), dos equipos Windows `MSEDGEWIN10` (`.197` y `.198`) y `Movil` (`.196`).<br>**Fija:** el equipo con `192.168.1.10` (MAC `0C:F5:86:8F:00:00`, no aparece en los leases), `Impresora-1`, `Impresora-2`, `Kali` y el equipo de MAC `0C:C8:39:96:00:01`|
 
##Bloque 4. La sala de espera y el exterior

¿Qué dirección recibe el móvil de un cliente?
- ip dhcp: DORA IP 192.168.1.196/24 GW 192.168.1.1
- show ip:
NAME        : Movil[1]
IP/MASK     : 192.168.1.196/24
GATEWAY     : 192.168.1.1
DNS         : 192.168.1.1
DHCP SERVER : 192.168.1.1
DHCP LEASE  : 86376, 86400/43200/75600
MAC         : 00:50:79:66:68:00
LPORT       : 20080
RHOST:PORT  : 127.0.0.1:20081
MTU         : 1500

Desde ese móvil, ¿se llega al servidor? ¿A las impresoras? ¿Al router? ¿A Internet?
- A 1.1.1.1 si hace ping
- A 192.168.122.20 si hace ping // Router ether1
- A 192.168.1.1 si hace ping // Router ether2
- A 192.168.1.10/24 si hace ping // Servidor
- A 192.168.1.20 si hace ping // Impresora 1
- A 192.168.1.21 si hace ping // Impresora 2

¿Qué dirección tiene la asesoría fiscal y dónde está respecto a la oficina?
IP: 192.168.122.50/24
Está conectado directamente a la operadora ya que es una asesoría externa

¿Qué se deja pasar desde fuera hacia la oficina?
ip firewall nat print:
 0    chain=srcnat action=masquerade out-interface=ether1

 1    ;;; FTP-asesoria
      chain=dstnat action=dst-nat to-addresses=192.168.1.10 protocol=tcp
      in-interface=ether1 dst-port=21

 2    ;;; FTP-pasivo-asesoria
      chain=dstnat action=dst-nat to-addresses=192.168.1.10 protocol=tcp
      in-interface=ether1 dst-port=40000-40050

ip firewall filter print
Flags: X - disabled, I - invalid; D - dynamic
No aparece nada

¿Qué servicios ofrece el propio router?

ip service print
Flags: X, I - INVALID
Columns: NAME, PORT, CERTIFICATE, VRF
#   NAME     PORT  CERTIFICATE  VRF
0   telnet     23               main
1   ftp        21
2   www        80               main
3   ssh        22               main
4 X www-ssl   443  none         main
5   api      8728               main
6   winbox   8291               main
7   api-ssl  8729  none         main


Desde la asesoría, ¿se llega a la dirección exterior del router?
IP: 192.168.122.1
Si hace ping
