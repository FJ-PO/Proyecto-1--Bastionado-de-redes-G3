# Propuesta · La maldición de la gestoría (Mareas Asesores)

## 1. La red

### 1.1 Dibujo

Esquema visual

<img width="754" height="400" alt="esquema vlans" src="https://github.com/user-attachments/assets/c031413e-fe77-4e19-bbe6-0ed2ef7c4d18" />


### 1.2 Qué separamos y por qué

No se compra hardware, así que usamos VLAN en el switch que ya hay y reglas en el router. Cinco segmentos:

| VLAN | Qué contiene | Por qué va separado |
|---|---|---|
| 10 Puestos | Puestos 1 y 2, portátil | Es el trabajo diario con datos de clientes. Es lo que hay que proteger. |
| 20 Servidor | Servidor | Concentra los datos. Solo lo alcanza quien lo necesita, y solo por los servicios necesarios. |
| 30 Impresoras | Impresoras 1 y 2 | Equipos con poco mantenimiento y sin autenticación; no deben ver ni ser vistos por el resto. |
| 40 Clientes | AP Wi-Fi y móviles de clientes | Red no confiable. Solo sale a Internet. |

### 1.3 Reparto de direcciones

| Segmento y función | VLAN / interfaz | Red/prefijo | Rango utilizable | Puerta de enlace |
|---|---|---|---|---|
| Puestos y portátiles (40 equipos) | VLAN 10 | 192.168.2.0/26 | 192.168.2.1 – 192.168.2.62 | 192.168.2.1 |
| Servidor y equipo externo | VLAN 20 | 192.168.1.0/24 | 192.168.1.1 – 192.168.1.254 | 192.168.1.1 |
| Impresoras | VLAN 30 | 192.168.2.64/28 | 192.168.2.65 – 192.168.2.78 | 192.168.2.65 |
| Wi-Fi clientes | VLAN 40 | 192.168.2.128/25 | 192.168.2.129 – 192.168.2.254 | 192.168.2.129 |


**Justificación:** Las subredes se han elegido según la cantidad de dispositivos de cada segmento. La VLAN 10 utiliza una `/26` para los 40 ordenadores y portátiles; la VLAN 20, una `/24` para los servidores y el equipo externo; la VLAN 30, una `/28` para las impresoras; y la VLAN 40, una `/25` para los clientes Wi-Fi. Cada segmento tiene su propia puerta de enlace. El servidor tiene IP fija, y las impresoras podrán tener IP fija o reserva DHCP, mientras que el resto de dispositivos recibirán su dirección automáticamente mediante DHCP.

### 1.4 Qué se permite y qué se bloquea

| Origen → Destino | Regla | Motivo |
|---|---|---|
| Clientes (40) → Internet | Permitir salida a internet | Es lo que busca un cliente en la sala de espera. |
| Clientes (40) → resto de VLAN | **Bloquear todo** | Un cliente no debe ver servidor, puestos ni impresoras. |
| Puestos (10) → Servidor (20) | Permitir solo los servicios necesarios con samba | Trabajar con los datos sin abrir todo. |
| Puestos (10) → Impresoras (30) | Permitir solo impresión | Imprimir. |
| Puestos (10) → Internet | Permitir | Servicios externos. |
| Servidor (20) → Internet | Solo lo imprescindible, actualizaciones | Reduce lo que un servidor comprometido puede hacer. |
| Impresoras (30) → cualquiera | **Bloquear** (solo respuestas) | Una impresora nunca inicia conexiones. |


---

## 2. Las medidas

### Medida 1: Segmentar la red en VLAN con reglas entre segmentos
- Qué problema resuelve y cómo lo sabemos: comparte una red plana y el AP de clientes llega al mismo switch.
- Qué hacemos: acotar
- Qué cambiamos y en qué equipo: switch oficina (VLAN y troncal), router (subinterfaces y reglas), AP (SSID de clientes en VLAN 40)
- A quién afecta: nadie en el trabajo diario, los clientes solo salen a Internet
- Cómo comprobaremos que protege y que la gestoría sigue trabajando: desde un móvil de la VLAN 40, el servidor y las impresoras no responden. Desde un puesto se abre el programa de gestión, se imprime y se navega.

### Medida 2: Aislar el Wi-Fi de clientes
- Qué problema resuelve y cómo lo sabemos: Acceso desde AP a la red interna, todo está en la misma red.
- Qué hacemos: Aislar el Ap de la red interna.
- Qué cambiamos y en qué equipo: AP wifi-clientes (SSID propio), router en VLAN 40
- A quién afecta: A nadie
- Cómo comprobaremos: un móvil de cliente navega pero no ve a otros móviles ni a ningún equipo interno

### Medida 3: Aislar y proteger las impresoras
- Qué problema resuelve y cómo lo sabemos: Las impresoras pueden recibir accesos no autorizados y el móvil de un cliente puede acceder a ellas. Además, tienen servicios innecesarios que pueden suponer un riesgo de seguridad.
- Qué hacemos: Asignar una IP fija a cada impresora, desactivar los servicios innecesarios, cambiar la contraseña de administración y configurar el router para permitir únicamente la impresión desde la VLAN 10.
- Qué cambiamos y en qué equipo: Configuramos la impresora 1 con la IP fija 192.168.2.66 y la impresora 2 con 192.168.2.67, ambas con máscara 255.255.255.240 y puerta de enlace 192.168.2.65. En el switch configuramos la VLAN 30 y en el router limitamos el acceso a las impresoras para que solo puedan utilizarlas los puestos autorizados.
- A quién afecta: A los empleados que utilizan las impresoras y al administrador encargado de configurar la red.
- Cómo comprobaremos que protege y que la gestoría sigue trabajando: Comprobamos que se puede imprimir desde ambos puestos, que las impresoras mantienen sus IP fijas y que el móvil de un cliente no puede acceder a ellas ni a sus paneles de administración. También verificamos que los servicios innecesarios están desactivados y que el panel de administración está protegido por contraseña.


### Medida 4: Endurecer el servidor
- Qué problema resuelve y cómo lo sabemos: accesos no autorizados al servidor. El servidor tiene servicios innecesarios abiertos, Telnet sin cifrado y una carpeta de clientes accesible sin contraseña. Además, el becario puede administrar el servidor aunque ya no trabaja en la gestoría.
- Qué hacemos: desactivar los servicios que sobran (Telnet), revisión de privilegios, reforzar la seguridad de los servicios que se mantienen y configurar samba. Exigir usuario y contraseña para acceder a los documentos y quitar los permisos de administrador al becario o eliminar su usuario.
- Qué cambiamos y en qué equipo: en el servidor Ubuntu, desactivamos los servicios innecesarios y configuramos los que se mantienen para mejorar su seguridad, protegemos la carpeta /srv/gestoria/clientes mediante Samba y deshabilitamos la cuenta del becario.
- A quién afecta: Al becario, que pierde el acceso, y al resto de empleados, que tendrán que identificarse para consultar los documentos.
- Cómo comprobaremos: escaneo de puertos antes/después y prueba de trabajo normal desde los puestos. Comprobamos que Telnet y los servicios innecesarios están cerrados, que el becario no puede acceder, que los usuarios autorizados pueden abrir y guardar documentos y que las copias de seguridad siguen funcionando.

### Medida 5: Separar el acceso de la asesoría fiscal y los trabajadores
- Qué problema resuelve y cómo lo sabemos: La asesoría fiscal es externa y utiliza FTP mediante lftp para acceder al servidor. Los trabajadores internos utilizan Samba para compartir los documentos de los clientes. Es necesario limitar el acceso de cada uno a los archivos que necesita.
- Qué hacemos: Mantener Samba para los trabajadores internos y FTP para la asesoría fiscal, restringiendo los permisos de cada usuario. También revisaremos la seguridad de FTP, ya que no cifra las comunicaciones por defecto.
- Qué cambiamos y en qué equipo: En el servidor Ubuntu, configuramos los permisos de Samba para los trabajadores y los permisos de FTP para la asesoría fiscal. En el router, revisamos las reglas que permiten el acceso FTP desde el exterior.
- A quién afecta: A los trabajadores internos, a la asesoría fiscal externa y al administrador informático.
- Cómo comprobaremos: Verificamos que los trabajadores pueden acceder a sus carpetas mediante Samba y que la asesoría fiscal puede acceder mediante lftp únicamente a los archivos autorizados.


### Medida 6: Renovación Rotativa Inventario y plan de contingencia.
- Qué problema resuelve y cómo lo sabemos: Permite identificar los equipos esenciales de la red y conocer las consecuencias de una posible avería. 
- Qué hacemos:  Identificar los equipos y servicios, analizar qué pasaría si alguno falla,  establecer prioridades de recuperación, y documentarlo.
- Qué cambiamos y en qué equipo: En principio no se modifica ningún equipo. 
- A quién afecta: A nadie, simplemente hay que realizar la documentación.
- Cómo comprobaremos: Revisaremos que el inventario esté completo cada 3 meses (Rotativa porque cada 3 meses le toca hacerlo a alguien diferente de la plantilla), hacemos una simulación controlada de fallos, y vemos si está bien la documentación.

### Medida 7: Cifrado completo del disco y arranque seguro
- Qué problema resuelve y cómo lo sabemos: Si alguien roba el servidor, equipos o extrae sus discos, no podría acceder a los documentos de los clientes. Además, no se podría arrancar el equipo desde un USB para modificar el sistema.
- Qué hacemos: Endurecer la seguridad mediante el cifrado completo del disco y activar Secure Boot para impedir el arranque de componentes no autorizados.
- Qué cambiamos y en qué equipo: En el servidor y equipos linux, activamos  LUKS para cifrar sus discos y configuramos Secure Boot, lo mismo para los equipos windows pero en vez de LUKS con BitLocker. Protegemos también la configuración de la BIOS con contraseña y restringimos el arranque desde USB. 
- A quién afecta: A los empleados de la gestoría que acceden a los documentos y al administrador informático encargado del mantenimiento del servidor.
- Cómo comprobaremos: Verificamos que, al extraer el disco y conectarlo a otro equipo, los datos no sean legibles sin la clave de recuperación. Comprobamos que el servidor solo arranca con componentes autorizados y que los empleados pueden seguir accediendo a sus documentos y aplicaciones con normalidad.

### Medida 8: Copias de seguridad y recuperación ante averías
- Qué problema resuelve y cómo lo sabemos: Las copias se guardan actualmente en /var/backups/gestoria, dentro del disco principal. Si falla todo el servidor, podríamos perder tanto los documentos como las copias. El segundo disco (/dev/vdb) está vacío y tiene 4 GB.
- Qué hacemos: Guardar las copias diarias en el segundo disco (vdb). Si no podemos utilizar almacenamiento externo o remoto, documentamos el riesgo de perder todo en una avería completa y establecemos un procedimiento para recuperar el sistema.
- Qué cambiamos y en qué equipo: En el servidor srv-mareas, preparamos el segundo disco y modificamos el script /usr/local/bin/copias-clientes.sh para guardar allí las copias. Documentamos los pasos para reinstalar el sistema y recuperar los documentos.
- A quién afecta: Al administrador informático, responsable de configurar y comprobar las copias, y a los empleados si se produce una interrupción del servicio.
- Cómo comprobaremos: Verificamos que las copias se realizan diariamente y hacemos una prueba de recuperación de documentos. También documentamos cómo actuar si falla todo el servidor.


## 3. Las cuatro molestias 

| Molestia | A quién afecta | Por qué merece la pena |
|---|---|---|
| Contraseñas nuevas y más largas en equipos y servidor | Toda la plantilla | Mayor seguridad de los datos de la red interna |
| Wi-Fi de clientes separada: el personal no usa ese Wi-Fi con sus móviles | Plantilla con móvil propio | Un móvil de empleado en la red de clientes queda fuera de la interna |
| Impresión solo desde los puestos autorizados | Quien imprima desde un dispositivo no registrado | Impresoras cerradas sin tocar el trabajo normal |

---

## 4. Dos descartes


### Descarte 1: Comprar un cortafuegos dedicado / segundo servidor
- Motivo: no se puede comprar hardware.
- Riesgo que queda abierto: el filtrado depende de lo que permita el router actual.

### Descarte 2: Segundo factor en todo
- Motivo: Acceso denegado para usuarios no autorizados
- Riesgo que queda abierto: alguien con acceso físico a una toma de red de la oficina entra.

  
