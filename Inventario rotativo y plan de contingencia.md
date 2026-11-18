### Medida 6: Inventario rotativo y plan de contingencia

#### 6.1 Inventario de equipos
 
| Equipo | Función | IP actual | Datos relevantes |
|---|---|---|---|
| Servidor `srv-mareas` | Almacén de documentos de clientes, FTP, Samba, copias | 192.168.1.10 (fija) | Ubuntu 24.04.5; Samba, vsftpd, SSH, nginx, MariaDB, cron; discos vda (en uso) y vdb (vacío) |
| Router | Salida a Internet, DHCP, NAT hacia el FTP | ether1 192.168.122.20 · ether2 192.168.1.1 | Sin reglas de filtrado; sale por 192.168.122.1 |
| Switch Oficina | Conecta toda la oficina | Sin IP de gestión documentada | 16 puertos (`Gi0/0`-`Gi3/3`), 9 en uso, solo VLAN 1 |
| AP Wi-Fi clientes | Wi-Fi de la sala de espera | Sin documentar | Pasará a la VLAN 40 (Medida 1) |
| Puesto 1 y Puesto 2 | Trabajo diario | DHCP (192.168.1.197 y .198) | Windows (MSEDGEWIN10); unidad Z: hacia `\\192.168.1.10\clientes` |
| Portátil de Laura | Trabajo de la asesora | 192.168.1.200 (DHCP) | Ubuntu; documentos locales en `/home/laura/Documentos/Clientes` |
| Impresora 1 / 2 | Impresión | 192.168.1.20 / 192.168.1.21 (fijas) | Pasarán a 192.168.2.66 / .67 (Medida 2) |
| Asesoría fiscal (externa) | Sube y descarga archivos por FTP | 192.168.122.50 | Fuera de la oficina, conectada a la operadora |
 
Para cada equipo se añaden también el responsable, la fecha de la última revisión y dónde está guardada su configuración.
 
#### 6.2 Análisis de fallos y prioridad de recuperación
 
| Prioridad | Qué falla | Qué se para | Cómo se recupera | Tiempo objetivo |
|---|---|---|---|---|
| 1 | Servidor | No hay acceso a documentos, ni FTP, ni copias | Reinstalar Ubuntu, aplicar la configuración documentada y restaurar las copias del disco vdb (Medida 8) | 1 día laborable |
| 2 | Router | Sin Internet, sin DHCP y sin FTP de la asesoría | Cargar el último export de configuración en el router; si no hay equipo, reconfigurar a mano con la documentación | 4 horas |
| 3 | Switch | La oficina queda incomunicada | Cargar la configuración guardada (VLAN y troncales) y recolocar los cables según el mapa de puertos | 4 horas |
| 4 | Puesto o portátil | Una persona sin trabajar | Usar otro puesto; los datos están en el servidor, salvo los locales del portátil de Laura | Mismo día |
| 5 | Impresora | No se imprime desde ese equipo | Usar la otra impresora | Mismo día |
| 6 | AP Wi-Fi | Los clientes se quedan sin Wi-Fi | No afecta al trabajo interno; se reconfigura el AP | Cuando se pueda |
 
Los documentos de Laura están en su disco local y no en el servidor. Eso hay que reflejarlo como riesgo en el inventario.
 
#### 6.3 Reparto rotativo
 
Cada trimestre revisa una persona distinta, en orden fijo (Administradora → Laura → Puesto 1 → Puesto 2 → …). El informático externo valida el resultado. Cada revisión deja una línea en el registro:
 
| Fecha | Responsable | Cambios detectados en el inventario | Resultado de la simulación | Siguiente en el turno |
|---|---|---|---|---|
| | | | | |
 
#### 6.4 Simulación controlada de fallo
 
Una vez por trimestre, fuera del horario de atención, se elige un escenario (por ejemplo, "se apaga el router" o "se restaura una carpeta de cliente desde la copia") y se mide el tiempo real de recuperación. Si supera el tiempo objetivo, se corrige el plan.
