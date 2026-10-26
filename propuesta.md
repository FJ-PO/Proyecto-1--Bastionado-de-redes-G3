# Propuesta · La maldición de la gestoría (Mareas Asesores)

## 1. La red

### 1.1 Dibujo

Esquema visual

<img width="844" height="400" alt="WhatsApp Image 2026-10-19 at 17 33 51" src="https://github.com/user-attachments/assets/dc6c305d-2a7d-43ce-9bb1-eb3b3260f75c" />


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


Justificación: Para los 40 usuarios, una subred /24 es suficiente, ya que permite conectar hasta 253 dispositivos con direcciones IP utilizables. Para los servidores e impresoras, al ser menos equipos, basta con una subred /27, que dispone de 30 direcciones utilizables. Los servidores y las impresoras tendrán IP fija o DHCP, mientras que los ordenadores y los dispositivos conectados por Wi-Fi recibirán su dirección IP automáticamente mediante DHCP.

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

### Medida 3: Aislar las impresoras
- Qué problema resuelve y cómo lo sabemos: Reducir posibles envíos de paquetes desde la impresora, acceso no autorizados a la misma.
- Qué hacemos: Endurecer y acotar
- Qué cambiamos y en qué equipo: Impresoras (contraseña de admin, servicios innecesarios apagados), router (solo impresión desde VLAN 10)
- A quién afecta: No afecta a nadie
- Cómo comprobaremos: Se imprime desde ambos puestos. El panel de la impresora ya no es accesible desde Wi-Fi ni exige contraseña

### Medida 4: Endurecer el servidor
- Qué problema resuelve y cómo lo sabemos: accesos no autorizados al servidor
- Qué hacemos: desactivar los servicios que sobran, revisión de privilegios, reforzar la seguridad de los servicios que se mantienen y configurar samba.
- Qué cambiamos y en qué equipo: en el servidor, desactivamos los servicios innecesarios y configuramos los que se mantienen para mejorar su seguridad
- A quién afecta: A nadie.
- Cómo comprobaremos: escaneo de puertos antes/después y prueba de trabajo normal desde los puestos

### Medida 5: Comunicación Asesoría fiscal
- Qué problema resuelve y cómo lo sabemos: La comunicación segura con el servidor de la empresa.
- Qué hacemos: Mantener la IP que ya tiene el equipo de asesoria fiscal y restringir los accesos que necesitan al minimo con samba.
- Qué cambiamos y en qué equipo: En samba restringir accesos.
- A quién afecta: Al equipo de asesoria fiscal. 
- Cómo comprobaremos: La asesoría sigue accediendo a lo que necesita y nada más.

### Medida 6: Renovación Rotativa Inventario y plan de contingencia.
- Qué problema resuelve y cómo lo sabemos: Permite identificar los equipos esenciales de la red y conocer las consecuencias de una posible avería. 
- Qué hacemos:  Identificar los equipos y servicios, analizar qué pasaría si alguno falla,  establecer prioridades de recuperación, y documentarlo.
- Qué cambiamos y en qué equipo: En principio no se modifica ningún equipo. 
- A quién afecta: A nadie, simplemente hay que realizar la documentación.
- Cómo comprobaremos: Revisaremos que el inventario esté completo cada 3 meses (Rotativa porque cada 3 meses le toca hacerlo a alguien diferente de la plantilla), hacemos una simulación controlada de fallos, y vemos si está bien la documentación.

### Medida 7: Cifrado completo del disco y arranque seguro
- Qué problema resuelve y cómo lo sabemos: Si alguien roba el servidor o extrae sus discos, no podría acceder a los documentos de los clientes. Además, no se podría arrancar el equipo desde un USB para modificar el sistema.
- Qué hacemos: Endurecer la seguridad mediante el cifrado completo del disco y activar Secure Boot para impedir el arranque de componentes no autorizados.
- Qué cambiamos y en qué equipo: En el servidor, activamos  LUKS para cifrar sus discos y configuramos Secure Boot. Protegemos también la configuración de la BIOS con contraseña y restringimos el arranque desde USB. 
- A quién afecta: A los empleados de la gestoría que acceden a los documentos y al administrador informático encargado del mantenimiento del servidor.
- Cómo comprobaremos: Verificamos que, al extraer el disco y conectarlo a otro equipo, los datos no sean legibles sin la clave de recuperación. Comprobamos que el servidor solo arranca con componentes autorizados y que los empleados pueden seguir accediendo a sus documentos y aplicaciones con normalidad.

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

  
