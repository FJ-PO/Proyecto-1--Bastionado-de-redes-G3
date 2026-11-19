// Contenido de la web. Sale de los Markdown del repositorio:
// diagnostico.md, propuesta.md, decisiones.md, verificacion.md, aprendizaje.md,
// responsables.md y "Inventario rotativo y plan de contingencia.md".
// Si cambian esos ficheros, actualiza también este archivo.

export const PROYECTO = {
  cliente: 'Mareas Asesores',
  lema: 'La maldición de la gestoría',
  modulo: 'Bastionado de Redes y Sistemas',
  equipo: ['Fran', 'Judit', 'Paula'],
  slidesUrl: 'diapositivas/',
}

// Lo que nos encontramos (diagnostico.md)
export const PROBLEMAS = [
  {
    titulo: 'Todo en la misma red',
    texto:
      'Una sola red plana (VLAN 1): puestos, servidor, impresoras y el Wi-Fi de los clientes comparten el mismo switch. Desde el móvil de un cliente se llegaba por ping al servidor, a las impresoras y al router.',
  },
  {
    titulo: 'El servidor con la puerta abierta',
    texto:
      'El servidor srv-mareas (Ubuntu 24.04) tenía escuchando Telnet (sin cifrar), FTP, nginx sin ninguna web que servir y MariaDB. Cuantos más servicios abiertos, más por donde entrar.',
  },
  {
    titulo: 'Los documentos, sin contraseña',
    texto:
      'La carpeta de clientes (/srv/gestoria/clientes) se abría sin usuario ni contraseña: cualquiera conectado a la red local entraba, veía, creaba y borraba documentos.',
  },
  {
    titulo: 'El becario seguía siendo administrador',
    texto:
      'El becario ya no trabajaba en la gestoría, pero conservaba permisos de administrador en el servidor. Un acceso que nadie estaba vigilando.',
  },
]

// Las medidas (propuesta.md + estado real en responsables.md + verificacion.md)
// riesgo: cuánto riesgo reduce (1-5). molestia: cuánta molestia causa (1-5).
// Son una propuesta del equipo para el mapa; revísalas.
export const MEDIDAS = [
  {
    n: 1,
    titulo: 'Separar la red en VLAN',
    estado: 'Comprobada',
    responsable: 'Fran · comprueba Judit',
    simple:
      'Dividimos la red en zonas que no se ven entre sí. El Wi-Fi de los clientes queda aparte: navega por Internet, pero no llega al servidor, ni a los puestos, ni a las impresoras.',
    tecnico:
      'VLAN en el switch que ya hay y router-on-a-stick, sin comprar hardware. VLAN 10 Puestos (192.168.2.0/26), VLAN 20 Servidor (192.168.1.0/24), VLAN 30 Impresoras (192.168.2.64/28), VLAN 40 Wi-Fi clientes (192.168.2.128/25). Reglas entre segmentos en el router: clientes solo salen a Internet; puestos llegan al servidor solo por Samba y a impresoras solo para imprimir; las impresoras no inician conexiones.',
    riesgo: 5,
    molestia: 1.5,
  },
  {
    n: 2,
    titulo: 'Aislar y proteger las impresoras',
    estado: 'Comprobada',
    responsable: 'Judit · comprueba Paula',
    simple:
      'Las impresoras dejan de estar al alcance de cualquiera. Se imprime desde los puestos de siempre, pero el móvil de un cliente ya no puede tocarlas.',
    tecnico:
      'IP fija a cada impresora (192.168.2.66 y .67, máscara /28, gateway 192.168.2.65) en la VLAN 30. Se desactivan servicios innecesarios, se cambia la contraseña de administración y el router solo permite imprimir desde la VLAN 10.',
    riesgo: 2.5,
    molestia: 1,
  },
  {
    n: 3,
    titulo: 'Cerrar servicios y puertos del servidor',
    estado: 'Comprobada',
    responsable: 'Paula · comprueba Judit',
    simple:
      'Apagamos en el servidor lo que no se usaba. Menos cosas encendidas, menos por donde puede entrar alguien.',
    tecnico:
      'Se desactivan Telnet (inseguro, sin cifrado), nginx/HTTP (no hay web) y MariaDB (no lo usa ninguna aplicación). Escaneo de puertos antes y después para confirmar que esos puertos quedan cerrados y que los servicios necesarios (SSH, Samba, FTP) siguen funcionando.',
    riesgo: 4,
    molestia: 1,
  },
  {
    n: 4,
    titulo: 'Accesos y carpetas compartidas',
    estado: 'Comprobada',
    responsable: 'Judit · comprueba Fran',
    simple:
      'Para abrir los documentos de clientes ahora hay que identificarse. Se retiró el acceso del becario, que ya no trabaja aquí.',
    tecnico:
      'Samba con valid users = @trabajadores sobre /srv/gestoria/clientes (permisos 2770, root:trabajadores): el acceso anónimo se rechaza con NT_STATUS_ACCESS_DENIED. Se elimina la cuenta del becario (quedaba además una regla sudo huérfana en /etc/sudoers.d/becario, a borrar). La asesoría fiscal lee la carpeta en solo lectura (read only = yes, write list = @trabajadores).',
    riesgo: 5,
    molestia: 3,
  },
  {
    n: 5,
    titulo: 'Separar asesoría fiscal y trabajadores',
    estado: 'Comprobada',
    responsable: 'Fran · comprueba Paula',
    simple:
      'La asesoría externa entra por su propio canal y solo a lo suyo. Los trabajadores de dentro, por el suyo. Cada uno llega únicamente a lo que necesita.',
    tecnico:
      'Samba para los trabajadores internos; FTP con cuenta propia para la asesoría fiscal, restringida a la carpeta de clientes. UFW permite la conexión solo desde la IP de la asesoría (192.168.122.50) y Fail2ban corta los intentos repetidos. Se busca usar SFTP/FTPS siempre que sea posible.',
    riesgo: 3.5,
    molestia: 2.5,
  },
  {
    n: 6,
    titulo: 'Inventario rotativo y plan de contingencia',
    estado: 'Comprobada',
    responsable: 'Paula · comprueba Judit',
    simple:
      'Una lista de qué equipos hay, qué pasa si falla cada uno y cómo se recupera. Cada tres meses la revisa una persona distinta de la plantilla.',
    tecnico:
      'Inventario de los 8 equipos (función, IP, datos), análisis de fallos con prioridad y tiempo objetivo de recuperación (servidor 1 día, router/switch 4 h…), reparto rotativo trimestral con registro y una simulación controlada de fallo por trimestre.',
    riesgo: 2,
    molestia: 1.5,
  },
  {
    n: 7,
    titulo: 'Cifrar el disco y arranque seguro',
    estado: 'Comprobada',
    responsable: 'Judit · comprueba Paula',
    simple:
      'Si roban un equipo, los documentos no se pueden leer sin la clave. Los puestos quedan cifrados; el servidor se decidió dejarlo sin cifrar por falta de tiempo (cifrarlo obligaba a reinstalarlo y rehacer lo ya hecho).',
    tecnico:
      'BitLocker en los dos Windows y LUKS en el portátil Ubuntu, comprobado máquina a máquina (no se pueden extraer los discos para leerlos fuera). Dos decisiones conscientes: el servidor se deja sin cifrar —habría que reinstalar el sistema y rehacer medidas ya aplicadas— y Secure Boot no se pudo terminar en los equipos (los dispositivos no admitían la configuración completa; se llegó al paso más cercano posible).',
    riesgo: 4.5,
    molestia: 4,
  },
  {
    n: 8,
    titulo: 'Copias de seguridad y recuperación',
    estado: 'Comprobada',
    responsable: 'Paula · comprueba Fran',
    simple:
      'Las copias dejan de estar en el mismo sitio que los originales: pasan al segundo disco. Se hacen solas cada día y se probó recuperar los documentos de verdad.',
    tecnico:
      'Segundo disco (vdb) formateado en ext4 y montado en /mnt/backups de forma permanente (/etc/fstab). El script /usr/local/bin/copias-clientes.sh guarda ahí y se ejecuta a diario a las 22:15 (cron), con retención de 14 días. Se comprobó la recuperación restaurando una copia en una carpeta temporal: los documentos de los 6 clientes salen íntegros. Riesgo que queda: las copias siguen en el mismo servidor; sin un disco externo o remoto, una avería total seguiría siendo un problema.',
    riesgo: 3.5,
    molestia: 1,
  },
]

// Lo que se decidió NO hacer (propuesta.md, apartado "Dos descartes")
export const DESCARTES = [
  {
    titulo: 'Comprar un cortafuegos dedicado o un segundo servidor',
    motivo: 'No se puede comprar hardware.',
    riesgoAbierto: 'El filtrado depende de lo que permita el router actual.',
    riesgo: 4,
    molestia: 2,
  },
  {
    titulo: 'Segundo factor (2FA) en todo',
    motivo: 'Demasiada molestia diaria para la plantilla frente a lo que aporta aquí.',
    riesgoAbierto:
      'Alguien con acceso físico a una toma de red de la oficina podría entrar.',
    riesgo: 3,
    molestia: 5,
  },
]

// Las molestias asumidas (propuesta.md, "Las cuatro molestias")
export const MOLESTIAS = [
  {
    molestia: 'Contraseñas nuevas y más largas en equipos y servidor',
    aQuien: 'Toda la plantilla',
    porque: 'Mayor seguridad de los datos de la red interna',
  },
  {
    molestia: 'El personal no usa el Wi-Fi de clientes con sus móviles',
    aQuien: 'Plantilla con móvil propio',
    porque: 'Un móvil en la red de clientes queda fuera de la red interna',
  },
  {
    molestia: 'Se imprime solo desde los puestos autorizados',
    aQuien: 'Quien imprima desde un dispositivo no registrado',
    porque: 'Impresoras cerradas sin tocar el trabajo normal',
  },
]

// Riesgos que quedan abiertos (aprendizaje.md, "Qué riesgos quedan abiertos").
// La jefa tiene que saber qué riesgos acepta.
export const RIESGOS_ABIERTOS = [
  {
    riesgo:
      'No hay documento de recuperación para una avería total del servidor',
    porque: 'No dio tiempo a implementar la medida',
    cerrar:
      'Documentar paso a paso cómo reinstalar el sistema y restaurar los documentos desde la copia',
    decision: 'Pendiente',
  },
  {
    riesgo:
      'La contraseña del recurso va escrita en claro dentro del script de copias',
    porque: 'El script se hizo así en la Medida 8',
    cerrar:
      'Guardar la contraseña en un fichero de credenciales aparte con permisos 600',
    decision: 'Pendiente',
  },
  {
    riesgo:
      'Las copias solo están en el mismo servidor (en el segundo disco), no fuera de él',
    porque: 'No hay un almacenamiento externo o remoto disponible',
    cerrar:
      'Llevar una copia a un disco externo o a otro equipo distinto del servidor',
    decision: 'A decidir por la jefa',
  },
]
