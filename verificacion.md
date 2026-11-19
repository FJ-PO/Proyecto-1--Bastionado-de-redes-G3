# Verificaciones.

## Medida 1: Segmentar la red en VLAN con reglas entre segmentos
- **Qué se comprueba:** Que estén todas las vlans hechas y configuradas.
- **Cómo se ha comprobado:** En el router con '*/export*'. En el switch principal con '*show vlans*'. En todos los dispositivos, comprobar que se han asignado bien las ips por DHCP según las vlans con '*ip a*' o con '*show ip*'. 
- **Antes:** <br>
1. Router sin Vlans configuradas: <br>
<img width="583" height="502" alt="Captura de pantalla 2026-11-09 103129" src="https://github.com/user-attachments/assets/483c6ab8-dc76-423a-aa8e-f3560c1b98bb" />
<br><br>
2. Switch sin Vlans configuradas:  <br>
<img width="479" height="269" alt="Captura de pantalla 2026-11-09 102946" src="https://github.com/user-attachments/assets/f1f0dda2-bb36-46cc-b74c-56f009bb3ce9" />
<br><br>
3. Ip Móviles: <br>
<img width="492" height="285" alt="ip-movil-cliente" src="https://github.com/user-attachments/assets/c296d26f-c2b2-4479-979a-08b412ebfb87" />

<br><br>
5. Ip portatil linux y windows: <br> 
<img width="460" height="155" alt="Captura de pantalla 2026-11-04 142224" src="https://github.com/user-attachments/assets/a563277b-0a84-4dc2-90e4-2ac15e50152b" />
<img width="450" height="155" alt="Captura de pantalla 2026-11-04 142139" src="https://github.com/user-attachments/assets/da885327-04db-4e2d-a693-49d2f4f8aeff" />
<img width="359" height="244" alt="image" src="https://github.com/user-attachments/assets/39899226-8649-4e1c-b289-f9d1c710c6a4" />
<br><br>
6. Ping de las impresoras al servidor, y del servidor a lo móviles <br>
<img width="356" height="143" alt="Captura de pantalla 2026-11-09 103831" src="https://github.com/user-attachments/assets/c78c9e70-e207-4d7d-ac1d-c30ab35fcd4c" />
<img width="493" height="142" alt="Captura de pantalla 2026-11-09 103715" src="https://github.com/user-attachments/assets/ae0d5d7b-b7d1-48d7-be92-e31304f1d33d" />
<br>

- **Después:**
1. Configuración de las vlans en el router: <br>
<img width="493" height="283" alt="image" src="https://github.com/user-attachments/assets/07a8b26e-2f1d-4da1-a127-e0a93f01cc6a" />
<br><br>
2. Configuración de las vlans en el switch: <br>
<img width="476" height="190" alt="image" src="https://github.com/user-attachments/assets/65209c66-c4d2-4526-a9b2-338e76b512bd" />
<br><br>
3. Ip moviles: <br>
<img width="517" height="253" alt="image" src="https://github.com/user-attachments/assets/01180fae-f310-4aee-aeba-daadd8c7eafc" />
<br><br>
4. Ip portatil linux y windows: <br>
<img width="492" height="127" alt="image" src="https://github.com/user-attachments/assets/5370bcf8-a027-4403-a9a2-10388a686d10"/>
<img width="418" height="127" alt="image" src="https://github.com/user-attachments/assets/be87253c-4678-4458-90a5-cd832d5d6a3b" />
<img width="344" height="166" alt="image" src="https://github.com/user-attachments/assets/188bef3c-633e-43d8-b29f-b9f28422eecc" />
<br><br>
5. Ping entre equipos:<br>
<img width="470" height="133" alt="image" src="https://github.com/user-attachments/assets/fb6f1fef-dee8-4f82-a10f-bcd07a932226" />
<img width="344" height="133" alt="image" src="https://github.com/user-attachments/assets/7685dba1-a2b7-42c2-993a-a5e57065e524" />
<br><br>
-  **¿Sigue funcionando tras reiniciar?:**  Si <br>
-  **¿La gestoría sigue trabajando? Qué se ha probado:**  Si, los dispositivos que deberían estar conectados hacen ping, y los que no deben estar conectados no lo hacen. Ejm: los equipos hacen ping entre si, pero no hacen ping a nada más. Al servidor se conectan por samba y a las impresoras solo imprimen, no se conectan a ellas. <br>
-  **Comprobado por:**  Judit

---

## Medida 2: Aislar y proteger las impresoras
- **¿Qué se comprueba?:** Que las IP de las impresoras sean estáticas y que los puestos pueden conectarse con ellas.
- **¿Cómo se ha comprobado?:** En las impresoras poniendo '*show ip*' y verificando que no estén por DHCP y desde los puestos haciendo '*ping*' a las impresoras.
- **Antes:**
1. No tenían IPs estáticas conectadas a la VLAN:
<img width="1668" height="434" alt="image" src="https://github.com/user-attachments/assets/d7748b49-a5ea-47dd-a857-af2a52c973dc" />
- **Después:** <br>
1. IPs estáticas:
<img width="1323" height="418" alt="image" src="https://github.com/user-attachments/assets/4cddb5a5-cfba-4bc9-8234-6610627f443d" />

2. Los móviles no tienen acceso a las impresoras:
<img width="341" height="349" alt="image" src="https://github.com/user-attachments/assets/ac6de366-a62a-4fdf-ba66-f66eb73d2850" />

---

## Medida 3: Desactivar servicios innecesarios del servidor y cerrar puertos
- **Qué se comprueba:** Que los servicios innecesarios ya no estén escuchando, que los puertos correspondientes estén cerrados y que las conexiones necesarias sigan funcionando correctamente.
- **Cómo se ha comprobado (orden, desde qué equipo):** En el servidor se ha comprobado que telnet,ngix, y mariadb ya no esten activados, y no haya ningún puerto abierto para esos servicios.
- **Antes:** (No encuentro la captura del antes)
1. Puertos abiertos:
FTP (vsftpd) para transferencia de archivos en el puerto TCP 21
SSH (systemd) para acceso remoto seguro en el puerto TCP 22
Telnet (inetd) para acceso remoto sin cifrado tradicional en el puerto TCP 23
DNS (systemd-resolve) para resolución de nombres de dominio en el puerto TCP 53
HTTP (nginx) un servidor web en el puerto TCP 80
NetBIOS/SMB (smbd) para compartir archivos en red en el puerto TCP 139
SMB (smbd) para compartir archivos e impresoras en el puerto TCP 445

2. Servicios en marcha:
nginx.service: Es el servidor web.
mariadb.service: Es la base de datos.
smbd.service (Samba): Es el que permite que el servidor actúe como un almacén de archivos compartido, permitiendo a ordenadores de la oficina (especialmente Windows) entrar a carpetas compartidas en red.
vsftpd.service: Es el servidor FTP. Para subir, descargar o actualizar los archivos del servidor a distancia.
cron.service: Es el programador de tareas. Se encarga de que se ejecuten automáticamente las copias de seguridad (backups), limpiezas de disco y tareas de mantenimiento del sistema.

- **Después:** <br>
<img width="487," height="67" alt="Captura de pantalla 2026-11-17 135428" src="https://github.com/user-attachments/assets/47e915da-dd2f-487c-9921-cb7b8812ea03" /><br>
<img width="487" height="165" alt="Captura de pantalla 2026-11-17 135551" src="https://github.com/user-attachments/assets/b66fffd8-d03c-47f6-8ed3-3c7966fb066d" /><br>
<img width="481" height="204" alt="Captura de pantalla 2026-11-17 135718" src="https://github.com/user-attachments/assets/f53599c3-5009-48ae-bcab-34efb8048ca5" /><br>
<img width="401" height="296" alt="Captura de pantalla 2026-11-17 140843" src="https://github.com/user-attachments/assets/c53e0a19-b761-4185-adef-e18aa7dab3ed" /><br>
-  **¿Sigue funcionando tras reiniciar?:**  Si <br>
-  **¿La gestoría sigue trabajando? Qué se ha probado:**  Si, antes de aplicar la medida se comprobó que esos servicios no se usaran, así que esta medida no interfiere en ningún momento con el trabajo de la gestoría. <br>
-  **Comprobado por:**  Judit

---

# Comprobación -- Medida 4

**Qué se comprueba:** Que la carpeta compartida `clientes` solo es accesible por el grupo `trabajadores`, que no se puede entrar de forma anónima, y que `asesores` puede leer pero no escribir.

**Cómo se ha comprobado (orden, desde qué equipo):** Desde `srv-mareas` como `administrador`: 1. `sudo testparm` y `sudo pdbedit -L`, 2. `ls -ld /srv/gestoria/clientes` y los grupos, 3. acceso anónimo con `smbclient //192.168.1.10/clientes -N`, 4. lectura con `sudo -u asesores ls /srv/gestoria/clientes`.

**Antes:** La cuenta `asesores` no podía leer `clientes`.

**Después:**

- Samba exige usuario del grupo `trabajadores`.

<img width="650" height="718" alt="1" src="https://github.com/user-attachments/assets/4812d4b3-38e3-4ab1-b43f-d463cbaaac65" />

Carpeta `root:trabajadores` con permisos `2770`, acceso anónimo rechazado.
<img width="650" height="718" alt="2" src="https://github.com/user-attachments/assets/ea8e6184-cb62-48fe-8ee6-59702acbae5e" />

- `asesores` lee en solo lectura.
<img width="650" height="718" alt="3" src="https://github.com/user-attachments/assets/c26f86dc-4e52-4937-83a0-5e0cf1f5bd64" />


**¿Sigue funcionando tras reiniciar?:** Sí. La configuración de Samba y los permisos están guardados en disco, así que se mantienen al reiniciar.

**¿La gestoría sigue trabajando? Qué se ha probado:** Sí. Los trabajadores siguen accediendo a clientes y asesores puede consultarlo en solo lectura.

**Comprobado por:** Francisco José Pérez Ortiz

---

### Medida 5: Separar el acceso de la asesoría fiscal y los trabajadores
- **Qué se comprueba:**  
- **Cómo se ha comprobado (orden, desde qué equipo):**  
- **Después: [salida o captura después de aplicarla]**
<img width="684" height="820" alt="image" src="https://github.com/user-attachments/assets/11f05e74-f6a7-421e-bf8b-ec63d0d75abb" />

<img width="779" height="374" alt="image" src="https://github.com/user-attachments/assets/3c566f6f-19b6-4ee0-bac6-729ec6723a24" />

- **¿Sigue funcionando tras reiniciar?:**  
- **¿La gestoría sigue trabajando? Qué se ha probado:**  
- **Comprobado por:**  

---

### Medida 6: Renovación Rotativa Inventario y plan de contingencia.
- **Qué se comprueba:** Que el inventario esté bien hecho.
- **Cómo se ha comprobado (orden, desde qué equipo):** Se ha revisado en general los documentos ya creados y los conocimientos ya obtenidos a lo largo de la tarea sobre la empresa, y comprobado que todo lo descrito en dicho documento es coherente, verificable y actualizado.
- **Antes:** No había ningún tipo de inventario.
- **Después:** Tenemos el archivo [Inventario rotativo y plan de contingencia.md](./Inventario rotativo y plan de contingencia.md) 
- **¿Sigue funcionando tras reiniciar?:** Si
- **¿La gestoría sigue trabajando? Qué se ha probado:** Si
- **Comprobado por:** Judit

---

# Comprobación -- Medida 8: Copias de seguridad y recuperación

**Qué se comprueba:** Que las copias se guardan en el segundo disco, que se hacen a diario de forma automática, y que los documentos se pueden recuperar desde una copia.

**Cómo se ha comprobado (orden, desde qué equipo):** Desde `srv-mareas` como `administrador`: 1. estado del disco (`cat /proc/partitions`, `sudo fdisk -l /dev/vdb`, `sudo blkid`, `mount`, `cat /etc/fstab`), 2. destino del script (`sudo cat /usr/local/bin/copias-clientes.sh`), 3. programación (`/etc/cron.d/gestoria`), 4. copias existentes y ejecución manual (`sudo ls -lh /mnt/backups/gestoria/`, `sudo /usr/local/bin/copias-clientes.sh`), 5. restaurar `clientes-2026-11-19.tar` en `/tmp/prueba-recup`.

**Antes:** Las copias se guardaban en `/var/backups/gestoria`, en el disco principal; si fallaba el servidor se perdían a la vez los documentos y las copias.

**Después:**

- Segundo disco formateado `ext4` y montado en `/mnt/backups`.

  <img width="647" height="484" alt="1" src="https://github.com/user-attachments/assets/88256c20-d1f6-456a-a478-d8133aa4ed97" />

- Montaje permanente en `/etc/fstab`, el script guarda en `/mnt/backups/gestoria` y se ejecuta a diario a las 22:15.

  <img width="650" height="718" alt="2" src="https://github.com/user-attachments/assets/6b454690-5ef9-4c95-b21a-6493e24cdcc9" />


- Copias diarias (del 3 al 19 de noviembre), ejecución manual `OK copia realizada`, retención de 14 días funcionando.
  
  <img width="640" height="718" alt="3" src="https://github.com/user-attachments/assets/0263db7f-3f50-4fb9-aa7a-8157c9691422" />

- Recuperación correcta: los documentos de los 6 clientes se restauran íntegros.

<img width="640" height="718" alt="4" src="https://github.com/user-attachments/assets/089ef05f-f033-4600-8c58-49cd60080b03" />

**¿Sigue funcionando tras reiniciar?:** Sí. El disco se monta solo al arrancar porque está en `/etc/fstab`, además el script comprueba que el disco este montado antes de copiar.

**¿La gestoría sigue trabajando? Qué se ha probado:** Sí. Las copias se hacen en segundo plano sin afectar al trabajo, la recuperación se probó en una carpeta temporal sin tocar los datos en uso.

**Comprobado por:** Francisco José Pérez Ortiz


  
