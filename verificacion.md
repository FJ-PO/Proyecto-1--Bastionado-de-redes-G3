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
4. Ip portatil linux y windows: <br> 
<img width="900" height="497" alt="Captura de pantalla 2026-11-04 142139" src="https://github.com/user-attachments/assets/04e2ddf9-84d0-46e1-b074-50cd91f4f4e7" />
<img width="950" height="290" alt="Captura de pantalla 2026-11-04 142224" src="https://github.com/user-attachments/assets/a563277b-0a84-4dc2-90e4-2ac15e50152b" />
<img width="359" height="244" alt="image" src="https://github.com/user-attachments/assets/39899226-8649-4e1c-b289-f9d1c710c6a4" />
<br><br>
5. Ping de las impresoras al servidor, y del servidor a lo móviles <br>
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
<img width="688" height="332" alt="image" src="https://github.com/user-attachments/assets/188bef3c-633e-43d8-b29f-b9f28422eecc" />
<img width="945" height="215" alt="image" src="https://github.com/user-attachments/assets/5370bcf8-a027-4403-a9a2-10388a686d10"/>
<img width="837" height="255" alt="image" src="https://github.com/user-attachments/assets/be87253c-4678-4458-90a5-cd832d5d6a3b" />
<br><br>
5. Ping entre equipos:<br>
<img width="941" height="266" alt="image" src="https://github.com/user-attachments/assets/fb6f1fef-dee8-4f82-a10f-bcd07a932226" />
<img width="688" height="265" alt="image" src="https://github.com/user-attachments/assets/7685dba1-a2b7-42c2-993a-a5e57065e524" />
<br><br>
- **¿Sigue funcionando tras reiniciar?:** Si <br>
- **¿La gestoría sigue trabajando? Qué se ha probado:** Si, los dispositivos que deberían estar conectados hacen ping, y los que no deben estar conectados no lo hacen. <br>
- **Comprobado por:** Judit
