
#### Aprendizaje

## Que hemos aprendido

- A dividir la red en varias VLAN y conectarlas con un router usando una sola conexion troncal. Lo aprendimos al principio del proyecto, montando el switch y el router.
- A entender que cada VLAN tiene su propia puerta de enlace, que es la direccion del router dentro de esa red. Lo vimos claro cuando una impresora tenia mal la puerta de enlace y no conseguia salir de su red.
- A saber por que dos equipos de la misma red no se hacian ping aunque estaban bien configurados. Era el cortafuegos de Windows, que bloquea el ping por defecto. Lo descubrimos al probar la conexion entre dos puestos.
- A separar el acceso de la asesoria fiscal por FTP del acceso de los trabajadores por Samba, dejando a la asesoria solo lectura sobre la carpeta de clientes. Lo aprendimos haciendo la Medida 5.
- A redirigir un puerto desde la red de fuera hasta el servidor usando NAT de destino en el router, para que la asesoria pudiera entrar por FTP. Tambien en la Medida 5.
- A usar fail2ban para bloquear a quien falla la contrasena varias veces seguidas. Lo probamos al asegurar el FTP en la Medida 5.
- A comprobar de verdad una copia de seguridad. No basta con que exista el script. Hay que ver que se ejecuta a diario, que guarda en el disco correcto y que se puede recuperar un documento. Lo aprendimos revisando la Medida 8.
- A entender que un disco solo se vuelve a montar despues de reiniciar si esta puesto en el fichero fstab, y que puede estar puesto por su UUID o por su etiqueta, no solo por el nombre del disco. Medida 8.
- A ver que una regla de permisos de administrador olvidada, de una cuenta que ya ni existe, sigue siendo un agujero de seguridad. Lo vimos al revisar la cuenta del becario en la Medida 4.

## Que hariamos de otra forma

- Al principio mezclamos la configuracion antigua del router con la nueva de las VLAN y aparecieron direcciones IP repetidas y reglas de cortafuegos duplicadas. La proxima vez empezariamos con el router limpio antes de crear las VLAN.
- Perdimos tiempo buscandoFalta escribirlo, es parte de la Medida 8 por que no habia ping entre dos puestos cuando el problema no estaba en la red sino en el cortafuegos de Windows. La proxima vez mirariamos antes el cortafuegos del propio equipo.
- La copia de seguridad de la Medida 8 necesita la cuenta asesores de la Medida 4 para poder leer la carpeta de clientes. Al hacer las medidas en mal orden aparecieron fallos de acceso denegado. Primero habria que dar el acceso y despues montar la copia.
- Hariamos las capturas de pantalla ordenadas y numeradas desde el principio, para no tener que buscarlas despues al escribir los informes.

## Que riesgos quedan abiertos

Esta tabla es la base de la entrega. La jefa tiene que saber que riesgos acepta.

| Riesgo                                                       | Por que queda abierto                                        | Que haria falta para cerrarlo                                | Lo acepta la jefa     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------- |
| No hay documento de recuperacion para una averia total del servidor | No da tiempo a implementar la medida                          | Documentar paso a paso como reinstalar el sistema y restaurar los documentos desde la copia | Pendiente             |
| La contrasena del recurso va escrita en claro dentro del script de copias | El script se hizo asi en la Medida 8                         | Guardar la contrasena en un fichero de credenciales aparte con permisos 600 | Pendiente             |
| Las copias solo estan en el mismo servidor, en el segundo disco, no fuera de el | No hay un almacenamiento externFalta escribirlo, es parte de la Medida 8o o remoto disponible | Llevar una copia a un disco externo o a otro equipo distinto del servidor | A decidir por la jefa |
