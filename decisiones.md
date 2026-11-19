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

### Decisión 4: Permitir la edición de la carpeta clientes a los trabajadores de la gestoría y limitar el acceso de los empleados de la asesoría al mínimo permitiendo solo lectura.
- Fecha: 16/11/2026
- Contexto: Intentando implementar la medida 4 nos hemos dado cuenta que la carpeta de clientes está en /srv/gestoria/clientas, porque lo que hemos supuesto que los clientes son de la gestoría no de la asesoría, pero en esa carpeta los trabajadores de la gestoria no tenían permisos nada más que para leer, y no de modificación mientras la asesoría si tenía todos los permisos (Sin ser sus clientes).
- Opciones que valoramos:
  1. Mantener los permisos a la carpeta tal y como están.
  2. (Revertir los papeles) Cambiar los permisos de la carpeta para que los empleados de la gestoría tengan acceso total a la carpeta, mientras que la asesoría solo pueda leerlos.
- Qué decidimos y por qué: Elegimos hacer la opción 2 porque hemos supuesto que los clientes son de la gestoría y hemos visto más lógico que si son sus clientes los que deben poder modificar los archivos son los mismo trabajadores de la gestoría, y la asesoría únicamente pueda leer estos archivos si los necesita.
- Consecuencias: Los asesores dejarían de poder modificar dichos archivos, cosa que los gestores  si podrían hacer.

### Decisión 5: No cifrar el servidor.
- Fecha 17/11/2026
- Contexto: Hemos dejado esta medida para el final y no nos va a dar tiempo de implementarla en su totalidad, ya que implica reinstalar el sistema operativo del servidor, cosa que ya por sí sola tarda bastante, y las configuraciones ya realizadas anteriores se borrarían y tendríamos que empezar de nuevo.
- Opciones que valoramos:
1. Cifrar el servidor y hacer todo lo que se borre de nuevo.
2. Intentar cifrar el ordenador intentando no tener que reinstalar el sistema operativo.
3. No cifrarlo.
- Qué decidimos y por qué: Elegimos hacer la opción 3, no cifrarlo. Todavía nos quedaban medidas que implementar en el servidor, varios integrantes del grupo necesitaban libre el servidor para implementar sus medidas, y no teníamos tiempo tampoco para rehacer las medidas que ya estaban hechas. 
- Consecuencias: Menos seguridad en el servidor, especialmente si alguien se conecta físicamente al mismo.

### Decisión 6: No terminar de implementar Secure Boot en los equipos.
- Fecha 18/11/2026
- Contexto: Tras batallar con los equipos windows para instalar SecureBoot parece que no se podía configurar bien, muchos comandos puestos los equipos no los reconocían aunque deberían de hacerlo, y al final nos dimos cuenta de que también nos sería complicado comprobar que funciona.
- Opciones que valoramos: 
1. Configurarlo y dejarlo hecho aunque no se pueda comprobar.
2. No implementar nada de SecureBoot.
3. Intentar implementarlo, y llegar hasta el paso más próximo a la implementación permitido por los dispositivos.
- Qué decidimos y por qué: Elegimos hacer la opción 3 ya que entendemos que para la empresa probablemente que esta medida se pudiera implementar completamente le habría beneficiado bastante, así que intentamos implementarla, y llegamos lo más cercano posible a la implementación completa de SecureBoot, aprendiendo a su vez como se debería implementar en caso de que si se hubiera podido hacer.
- Consecuencias: Menos seguridad en los equipos.
