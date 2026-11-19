import type { SceneDef } from 'beatdeck';

/**
 * The talk's beat map: scenes → beats. One click = one beat.
 * Presentación para la jefa de la gestoría: lenguaje sencillo, poco texto.
 * `note` = apunte para quien presenta (solo se ve en la vista de presentador).
 */
export const SCENES: SceneDef[] = [
  {
    id: '01', title: 'INICIO',
    beats: [
      { name: 'standby', note: 'Pantalla en calma mientras se sientan. El primer clic empieza.' },
      { name: 'titulo', note: 'Buenos días. Os contamos cómo estaba la red y qué hemos hecho.' },
    ],
  },
  {
    id: '02', title: 'EL PROBLEMA',
    beats: [
      { name: 'intro', note: 'El punto de partida: todo estaba conectado a todo.' },
      { name: 'misma-red', note: 'Puestos, servidor, impresoras y el wifi de la sala, en la misma red.' },
      { name: 'sala-espera', note: 'Desde el móvil de un cliente se llegaba al servidor y a las impresoras.' },
      { name: 'documentos', note: 'La carpeta de clientes se abría sin contraseña.' },
      { name: 'becario', note: 'El becario, que ya no trabaja, seguía teniendo acceso de administrador.' },
    ],
  },
  {
    id: '03', title: 'LA IDEA',
    beats: [
      { name: 'intro', note: 'La idea de fondo, sin gastar en equipos nuevos.' },
      { name: 'zona-puestos', note: 'Los puestos y el portátil, en su zona.' },
      { name: 'zona-servidor', note: 'El servidor, con los documentos, aparte.' },
      { name: 'zona-impresoras', note: 'Las impresoras, en la suya.' },
      { name: 'zona-clientes', note: 'El wifi de clientes: solo Internet, nada más.' },
      { name: 'cierre', note: 'Cada zona solo llega a lo que necesita. El trabajo del día no cambia.' },
    ],
  },
  {
    id: '04', title: 'YA HECHO',
    beats: [
      { name: 'intro', note: 'Lo que ya está aplicado y comprobado.' },
      { name: 'm1', note: 'Red separada en zonas.' },
      { name: 'm2', note: 'Impresoras protegidas.' },
      { name: 'm3', note: 'Servidor con menos puertas abiertas.' },
      { name: 'm4', note: 'Documentos con contraseña; becario fuera.' },
      { name: 'm5', note: 'Asesoría externa y trabajadores, por caminos distintos.' },
      { name: 'm6', note: 'Inventario y plan por si algo falla.' },
      { name: 'm7', note: 'Los puestos, cifrados: si roban uno, no se leen. (El servidor se dejó sin cifrar; lo vemos luego.)' },
      { name: 'm8', note: 'Copias en un disco aparte, a diario, y probamos recuperar.' },
    ],
  },
  {
    id: '05', title: 'LO QUE QUEDA ABIERTO',
    beats: [
      { name: 'intro', note: 'Con honestidad: lo que no hemos podido cerrar y necesitamos que decidas.' },
      { name: 'manual', note: 'Falta un manual para rehacer el servidor si se rompe del todo.' },
      { name: 'servidor', note: 'El servidor se quedó sin cifrar: cifrarlo ahora obligaba a reinstalarlo y rehacer lo hecho.' },
      { name: 'copias', note: 'Las copias están en el mismo servidor; convendría llevar una fuera.' },
    ],
  },
  {
    id: '06', title: 'A TENER EN CUENTA',
    beats: [
      { name: 'intro', note: 'Tres pequeñas molestias que pedimos asumir.' },
      { name: 'passwords', note: 'Contraseñas nuevas y más largas.' },
      { name: 'wifi', note: 'El personal no usa el wifi de clientes con su móvil.' },
      { name: 'impresion', note: 'Se imprime solo desde los puestos de la oficina.' },
    ],
  },
  {
    id: '07', title: 'FUERA DE ALCANCE',
    beats: [
      { name: 'intro', note: 'Dos cosas que hemos decidido NO hacer, y por qué.' },
      { name: 'hardware', note: 'No comprar un cortafuegos nuevo: no hay presupuesto de equipos.' },
      { name: 'dosfactores', note: 'No poner doble contraseña en todo: demasiada molestia para lo que aporta aquí.' },
    ],
  },
  {
    id: '08', title: 'CIERRE',
    beats: [
      { name: 'preguntas', note: '¿Lo vemos? El QR lleva a la web con el detalle.' },
    ],
  },
];
