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

### Medida 1.2: Aislar el Wi-Fi de clientes
- Qué problema resuelve y cómo lo sabemos: Acceso desde AP a la red interna, todo está en la misma red.
- Qué hacemos: Aislar el Ap de la red interna.
- Qué cambiamos y en qué equipo: AP wifi-clientes (SSID propio), router en VLAN 40
- A quién afecta: A nadie
- Cómo comprobaremos: un móvil de cliente navega pero no ve a otros móviles ni a ningún equipo interno

### Medida 2: Aislar y proteger las impresoras
- Qué problema resuelve y cómo lo sabemos: Las impresoras pueden recibir accesos no autorizados y el móvil de un cliente puede acceder a ellas. Además, tienen servicios innecesarios que pueden suponer un riesgo de seguridad.
- Qué hacemos: Asignar una IP fija a cada impresora, desactivar los servicios innecesarios, cambiar la contraseña de administración y configurar el router para permitir únicamente la impresión desde la VLAN 10.
- Qué cambiamos y en qué equipo: Configuramos la impresora 1 con la IP fija 192.168.2.66 y la impresora 2 con 192.168.2.67, ambas con máscara 255.255.255.240 y puerta de enlace 192.168.2.65. En el switch configuramos la VLAN 30 y en el router limitamos el acceso a las impresoras para que solo puedan utilizarlas los puestos autorizados.
- A quién afecta: A los empleados que utilizan las impresoras y al administrador encargado de configurar la red.
- Cómo comprobaremos que protege y que la gestoría sigue trabajando: Comprobamos que se puede imprimir desde ambos puestos, que las impresoras mantienen sus IP fijas y que el móvil de un cliente no puede acceder a ellas ni a sus paneles de administración. También verificamos que los servicios innecesarios están desactivados y que el panel de administración está protegido por contraseña.

### Medida 3: Desactivar servicios innecesarios del servidor y cerrar puertos
- Qué problema resuelve y cómo lo sabemos: el servidor tiene servicios que podrían no ser necesarios y que aumentan la superficie de ataque. Se ha comprobado que nginx está escuchando en el puerto 80, aunque el servidor no aloja ninguna página web, y que Telnet es un servicio inseguro porque no cifra las comunicaciones.
- Qué hacemos: desactivar Telnet y nginx/HTTP. Comprobar si MariaDB es necesario para alguna aplicación y desactivarlo si no se utiliza. Revisar los puertos abiertos y permitir únicamente las conexiones necesarias.
- Qué cambiamos y en qué equipo: en el servidor Ubuntu, desactivamos los servicios innecesarios y cerramos los puertos que no se necesiten, manteniendo los necesarios.
- A quién afecta: a los usuarios y dispositivos que se conectan al servidor. Antes de desactivar un servicio, comprobaremos que no sea necesario para el trabajo diario.
- Cómo comprobaremos: realizamos un escaneo de puertos antes y después de los cambios. Verificamos que los servicios innecesarios ya no estén escuchando, que los puertos correspondientes estén cerrados o filtrados y que las conexiones necesarias sigan funcionando correctamente.

### Medida 4: Reforzar los accesos y proteger los archivos compartidos
- Qué problema resuelve y cómo lo sabemos: existen accesos que no están suficientemente protegidos. La carpeta de clientes es accesible sin contraseña y el becario conserva permisos de administrador aunque ya no trabaja en la gestoría. Además, una asesoría externa necesita acceder a los datos de esa carpeta mediante FTP.
- Qué hacemos: revisar los privilegios de los usuarios, quitar los permisos de administrador al becario y deshabilitar su cuenta si ya no es necesaria. Configurar Samba para exigir usuario y contraseña a los empleados que accedan a los documentos. Crear o configurar una cuenta específica para la asesoría externa, que le permita acceder mediante FTP únicamente a la carpeta de clientes y consultar los datos que necesita, sin acceder al resto del servidor. Limitar sus permisos a las operaciones necesarias y, si es posible, utilizar SFTP o FTPS para proteger las comunicaciones.
- Qué cambiamos y en qué equipo: en el servidor Ubuntu, revisamos las cuentas y los permisos, protegemos la carpeta /srv/gestoria/clientes mediante Samba y configuramos el acceso FTP de la asesoría externa para limitarlo a dicha carpeta. También deshabilitamos la cuenta del becario.
- A quién afecta: al becario, que pierde el acceso, a los empleados, que tendrán que identificarse para consultar los documentos, y a la asesoría externa, que seguirá accediendo a los datos de clientes mediante una cuenta propia y con permisos limitados.
- Cómo comprobaremos: verificamos que el becario ya no puede acceder ni administrar el servidor, que los empleados autorizados pueden abrir y guardar documentos y que los usuarios sin permisos no pueden acceder a la carpeta. Comprobamos también que la asesoría externa puede acceder mediante FTP a los datos que necesita, pero no a otras carpetas del servidor, y que las copias de seguridad siguen funcionando correctamente.

### Medida 5: Separar el acceso de la asesoría fiscal y los trabajadores
- Qué problema resuelve y cómo lo sabemos: La asesoría fiscal es externa y utiliza FTP mediante lftp para acceder al servidor. Los trabajadores internos utilizan Samba para compartir los documentos de los clientes. Es necesario limitar el acceso de cada uno a los archivos que necesita.
- Qué hacemos: Mantener Samba para los trabajadores internos y FTP para la asesoría fiscal, restringiendo los permisos de cada usuario. También revisaremos la seguridad de FTP, añadiendo UFW para solo dar acceso por ftp a la IP de la asesoria y Fail2ban para limitar los intentos de accesos, ya que no cifra las comunicaciones por defecto.
- Qué cambiamos y en qué equipo: En el servidor Ubuntu, configuramos los permisos de Samba para los trabajadores y los permisos de FTP para la asesoría fiscal.
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

  
