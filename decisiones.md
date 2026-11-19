# Decisiones tomadas frente a la implementación de medidas.
### Decisión 1: Dividir la medida del servidor en 3. 
- Fecha: 26/10/2026
- Contexto: Al principio pensábamos que en el servidor solo habría que quitar servicios que no se utilizaban, y quizás revisar el usuario Becario, pero vimos que teníamos más cosas que hacer.
- Opciones que valoramos:
  1. Añadir cosas que hacer a la misma medida.
  2. Separarla en 2 o 3 medidas dependiendo de lo que hubiera que hacer.
- Qué decidimos y por qué: Elegimos hacer la opción 2 porque sino iba a quedar una medida enorme que se iba a tener que cargar un solo integrante del grupo y que no era fácil ni de implementar ni de verificar. Así dividido en 3 medidas podemos dividir mejor el trabajo, y las verificaciones son más sencillas.
- Consecuencias: Afecta a la carga de trabajo y la implementación de medida. Algo negativo de hacerlo así es que tenemos que esperar a que el compañero implemente su medida en el servidor antes de hacer la siguiente medida, lo que ralentiza la finalización del proyecto. 

### Decisión 2: Eliminar la medida 2 y meterla en la medida 1 con el nombre 1.2.
- Fecha: 27/10/2026
- Contexto: Al principio cuando hicimos la propuesta pusimos como medida 2 aislar el wifi de los clientes de la red interna. Luego al empezar a implementar la medida 1 de segmentación de red nos dimos cuenta que al final la manera de aislar el wifi era con la medida 1 y no había nada que hacer en la medida 2 que no quedara cubierto con la segmentación de la red.
- Opciones que valoramos:
  1. Intentar mantener la medida pero con otro enfoque y otra manera de implementación.
  2. Borrarla, añadirla a la medida 1, y sustituir la medida 2 por otra medida.
- Qué decidimos y por qué: Elegimos hacer la opción 2 porque no había nada que hacer en la medida 2 que no quedara cubierto con la segmentación de la red. Además como el movil es un dispositivo VPCS de GNS3 tampoco teníamos opciones de editar nada en esos dispositivos. 
- Consecuencias: Una medida menos que hacer, pero tuvimos que renombrar todas las medidas, para que no quedara un salto de la medida 1 a la 3, además de reasignar el trabajo de cada integrante del grupo para que estuviera equilibrada la carga de trabajo.

### Decisión 3: Mantener la medida 2.
- Fecha: 3/11/2026
- Contexto: En la medida 2 se intenta que solo quien de verdad necesite la impresora pueda conectarse a ella y además darle más seguridad desactivando los servicios innecesarios, y  cambiando la contraseña de administración. Pero por ser un dispositivo VPCS de GNS3 no se puede hacer mucho más que mostrar y cambiar la ip.
- Opciones que valoramos:
  1. Eliminar la medida al igual que hicimos con la antigua medida 2.
  2. Mantenerla, cambiar las ips manualmente (no por DHCP), y documentar las intenciones en cuanto a la medida y que hemos podido hacer.
- Qué decidimos y por qué: Elegimos hacer la opción 2 porque es un rollo tener que renombrar todas las medidas otra vez, y reasignar los trabajos entre los integrantes del grupo. Además a diferencia de la medida 2 anterior en esta si podemos cambiar las ips dejándolas estáticas y por lo menos hacer algo, no como en la medida anterior.
- Consecuencias: Tenemos una medida que se implementa superficialmente.

