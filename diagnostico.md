
## Bloque 1. El mapa y las direcciones

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué equipos hay y cómo están conectados? | 1 Servidor, 3 Portatiles, 2 puestos de trabajo, 1 Router, 1 Wifi, 2 Impresoras, 1 Switch, todo esta conectado en red. |
| ¿Qué direcciones tiene el router y en qué interfaz? | `ether1`: 192.168.122.20/24 `ether2`: 192.168.1.1/24 |
| ¿Qué direcciones reparte y a quién se las ha dado? | `ether1`: 192.168.122.20/24 --> Switch Oficina  `ether2`: 192.168.1.1/24 --> Operadora|
| ¿Por dónde sale a Internet? |  192.168.122.1 |
| ¿Cómo está configurado el switch? | **VLANs:** solo la VLAN 1 (`default`), activa, con los 16 puertos `Gi0/0`-`Gi3/3` asignados. No hay VLANs adicionales (las 1002-1005 son las reservadas por defecto).<br>**Estado de los puertos:** conectados (`connected`) `Gi0/0`-`Gi0/3`, `Gi1/0`-`Gi1/3` y `Gi2/0`; sin conexión (`notconnect`) `Gi2/1`-`Gi2/3` y `Gi3/0`-`Gi3/3`. Todos en VLAN 1, dúplex `a-full`, velocidad `auto`, tipo RJ45.<br>**Tabla MAC (8 dinámicas, VLAN 1):**<br>`0cf5.868f.0000` → `Gi0/0`<br>`0cf1.a36e.0000` → `Gi0/1`<br>`0cb2.16b9.0000` → `Gi0/2`<br>`0c3b.d4e0.0000` → `Gi0/3`<br>`0cc8.3996.0001` → `Gi1/0`<br>`0050.7966.6802` → `Gi1/1`<br>`0050.7966.6801` → `Gi1/2`<br>`0050.7966.6800` → `Gi1/3` | |
| ¿Qué dirección tiene cada impresora? | _Impresora 1: 192.168.1.20 · Impresora 2: 192.168.1.21 |
| ¿Qué equipos tienen dirección fija y cuáles la reciben del router? | _Fijas: …<br>Por DHCP: …_ |
 
