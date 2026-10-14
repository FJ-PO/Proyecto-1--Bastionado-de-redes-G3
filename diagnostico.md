
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

## Bloque 2. El servidor por dentro
¿Cómo se llama, qué sistema es y qué dirección tiene?
Nombre: srv-mareas
Sistema: Ubuntu 24.04.5 LTS
Dirección:192.168.1.10/24

¿Qué servicios están escuchando en la red, y en qué puertos?
- FTP (vsftpd) para transferencia de archivos en el puerto TCP 21
- SSH (systemd) para acceso remoto seguro en el puerto TCP 22
- Telnet (inetd) para acceso remoto sin cifrado tradicional en el puerto TCP 23
- DNS (systemd-resolve) para resolución de nombres de dominio en el puerto TCP 53
- HTTP (nginx) un servidor web en el puerto TCP 80
- NetBIOS/SMB (smbd) para compartir archivos en red en el puerto TCP 139
- SMB (smbd) para compartir archivos e impresoras en el puerto TCP 445

¿Qué servicios están en marcha? 
Hay muchos pero supongo que los más importantes son estos:
- nginx.service: Es el servidor web. 
- mariadb.service: Es la base de datos. 
- smbd.service (Samba): Es el que permite que el servidor actúe como un almacén de archivos compartido, permitiendo a ordenadores de la oficina (especialmente Windows) entrar a carpetas compartidas en red.
- vsftpd.service: Es el servidor FTP. Para subir, descargar o actualizar los archivos del servidor a distancia.
- cron.service: Es el programador de tareas. Se encarga de que se ejecuten automáticamente las copias de seguridad (backups), limpiezas de disco y tareas de mantenimiento del sistema.

¿Qué usuarios existen?
- Administrador, que es la jefa.
- informático externo.
- becario
- y asesoría fiscal que es externa también.

¿Quién puede administrar el servidor?
El administrador, el informático y el becario.

## Bloque 3. El portátil y los puestos.

### 1. Al encender el portátil, ¿pide algo antes de llegar al inicio de sesión?
Al encender el portátil, no se observa ninguna petición de contraseña previa al inicio de sesión. El equipo arranca y llega a la pantalla de inicio de sesión de Linux, donde se solicitan las credenciales de dos usuarios: `osboxes.org` y `Laura Medina - Asesora`.


### 2. ¿Quién lo usa y qué permisos tiene?
En el portátil aparecen dos usuarios en la pantalla de inicio de sesión: `osboxes.org` y `Laura Medina - Asesora`.

- **Usuario osboxes:** tiene UID 1000 y GID 1000. Pertenece a los grupos `osboxes`, `adm`, `cdrom`, `sudo`, `dip`, `plugdev`, `lpadmin`, `lxd` y `sambashare`. Puede ejecutar comandos como administrador mediante `sudo`, según la comprobación realizada.
- **Usuario Laura Medina - Asesora (`laura`):** tiene UID 1001 y GID 1001. Pertenece únicamente al grupo `laura`. No tiene autorización para ejecutar comandos mediante `sudo`, según el resultado obtenido. Su directorio personal es `/home/laura` y utiliza la shell `/bin/bash`.


### 3. ¿Qué documentos hay guardados en él?
No hay documentos guardados en el directorio `Documentos` del usuario con el que se ha ejecutado el comando.


### 4. ¿Cómo están sus discos?
El equipo dispone de un disco principal llamado `vda`, dividido en varias particiones.

| Partición | Sistema de archivos | Punto de montaje | Tamaño | Espacio ocupado | Espacio disponible |
|---|---|---|---|---|---|
| `/dev/vda1` | ext4 | `/` | 217 GB | 6,7 GB | 199 GB |
| `/dev/vda2` | ext4 | `/boot` | 252 MB | 84 MB | 149 MB |
| `/dev/vda4` | swap | — | — | — | — |
| `/dev/vda5` | ext4 | `/home` | 265 GB | 64 MB | 252 GB |

Además, aparecen varios dispositivos `loop` con sistema de archivos `squashfs`, relacionados con aplicaciones instaladas mediante Snap. También aparecen sistemas de archivos temporales `tmpfs`, que utilizan memoria.

### 5. ¿Qué dirección IP tiene el portátil y de dónde la saca?

El portátil tiene la dirección IP `192.168.1.200/24` en la interfaz de red `ens3`, que está activa.

La puerta de enlace predeterminada es `192.168.1.1` y la red local es `192.168.1.0/24`.

La configuración de red se obtiene mediante DHCP, como indica el resultado del comando `ip route`, donde aparece `proto dhcp`.


### 6. ¿Qué dirección IP tiene el puesto y de dónde la saca?
**Credenciales predeterminadas:**
- Usuario: `IEUser`
- Contraseña: `Passw0rd!`
  
- El equipo `Puesto-1` tiene la dirección IPv4 `172.26.0.129` y la máscara de subred `255.255.252.0`.
- La puerta de enlace predeterminada es `172.26.0.1`.
- El equipo obtiene la configuración IP automáticamente mediante DHCP, ya que el campo «DHCP habilitado» indica «Sí». El servidor DHCP que aparece es `172.26.0.1`.


### 7. ¿Cómo llega el puesto a los documentos de los clientes?
El comando `net use` muestra la siguiente información:

| Campo | Resultado |
|---|---|
| Unidad de red | `Z:` |
| Ruta compartida | `\\192.168.1.10\clientes` |
| Estado | `Unavailable` (no disponible) |

Además, el comando `net view` devuelve el mensaje `There are no entries in the list`, es decir, no muestra equipos compartidos en la lista de red.

El puesto accede a los documentos de los clientes mediante una carpeta compartida de red, asignada a la unidad `Z:`. La ruta de acceso es `\\192.168.1.10\clientes`. Sin embargo, la conexión aparece como `Unavailable` (no disponible), por lo que no se encuentra accesible en ese momento. El comando `net view` tampoco muestra entradas en la lista de equipos compartidos.


### 8. ¿Qué usuarios hay en el puesto?
El comando `whoami` indica que el usuario con el que se ha iniciado sesión es `msedgewin10\ieuser`.

Por otro lado, el comando `net user` muestra las siguientes seis cuentas locales:

- `Administrator`
- `DefaultAccount`
- `Guest`
- `IEUser`
- `sshd`
- `WDAGUtilityAccount`

Por tanto, el equipo tiene seis cuentas locales registradas, aunque la cuenta utilizada en la sesión actual es `IEUser`.


### 9. ¿Está cifrado el disco del puesto?
Para comprobar si el disco del puesto está cifrado, he abierto el símbolo del sistema como administrador y he ejecutado el comando `manage-bde -status`.

El resultado obtenido ha sido:

```text
ERROR: There are no disk volumes that can be protected with BitLocker Drive Encryption.
```

Por tanto, Windows indica que no hay volúmenes de disco que puedan protegerse con BitLocker Drive Encryption. Con esta comprobación no se puede confirmar que el disco esté cifrado mediante BitLocker.




## Bloque 4. La sala de espera y el exterior

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
$   NAME     PORT  CERTIFICATE  VRF
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
