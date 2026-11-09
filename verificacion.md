# Verificaciones.

## Medida 1: Segmentar la red en VLAN con reglas entre segmentos
- **Qué se comprueba:** Que estén todas las vlans hechas y configuradas.
- **Cómo se ha comprobado:** En el router con '*/export*'. En el switch principal con '*show vlans*'. En todos los dispositivos, comprobar que se han asignado bien las ips por DHCP según las vlans con '*ip a*' o con '*show ip*'.
- **Antes:** <br>
1.Router sin Vlans configuradas: <br>
<img width="583" height="502" alt="Captura de pantalla 2026-11-09 103129" src="https://github.com/user-attachments/assets/483c6ab8-dc76-423a-aa8e-f3560c1b98bb" />
<br><br>
2.Switch sin Vlans configuradas:  <br>
<img width="479" height="269" alt="Captura de pantalla 2026-11-09 102946" src="https://github.com/user-attachments/assets/f1f0dda2-bb36-46cc-b74c-56f009bb3ce9" />
<br><br>
3.Ips impresoras: <br>
<img width="494" height="287" alt="ip-asesoria" src="https://github.com/user-attachments/assets/671ea099-d861-4942-b892-62e0e9408a69" />
<img width="492" height="285" alt="ip-movil-cliente" src="https://github.com/user-attachments/assets/c296d26f-c2b2-4479-979a-08b412ebfb87" />
<br><br>

<img width="359" height="244" alt="image" src="https://github.com/user-attachments/assets/39899226-8649-4e1c-b289-f9d1c710c6a4" />

4.Ping de las impresoras al servidor, y del servidor a lo móviles <br>
<img width="356" height="143" alt="Captura de pantalla 2026-11-09 103831" src="https://github.com/user-attachments/assets/c78c9e70-e207-4d7d-ac1d-c30ab35fcd4c" />
<img width="493" height="142" alt="Captura de pantalla 2026-11-09 103715" src="https://github.com/user-attachments/assets/ae0d5d7b-b7d1-48d7-be92-e31304f1d33d" />
<br>

- **Después:** [salida o captura después de aplicarla]
- **¿Sigue funcionando tras reiniciar?:** Si
- **¿La gestoría sigue trabajando? Qué se ha probado:** Si, los dispositivos que deberían estar conectados hacen ping, y los que no deben estar conectados no lo hacen. 
- **Comprobado por:** Judit
