import { Scene, useScene } from 'beatdeck';
import { Bullet, Header } from './_ui';

const OPEN = '#d98a2b';

function Falta_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="Lo que te pedimos decidir" title="Lo que queda abierto." />
      <Bullet on={here && b >= 1} y={430} tone={OPEN} size={48}>
        Falta un manual para rehacer el servidor si se rompe del todo.
      </Bullet>
      <Bullet on={here && b >= 2} y={590} tone={OPEN} size={48}>
        El servidor se quedó sin cifrar: hacerlo ahora obligaba a reinstalarlo y rehacer lo hecho.
      </Bullet>
      <Bullet on={here && b >= 3} y={780} tone={OPEN} size={48}>
        Las copias están en el mismo servidor; convendría llevar una fuera.
      </Bullet>
    </>
  );
}

/** 05 LO QUE QUEDA ABIERTO — los riesgos que la jefa tiene que aceptar o decidir. */
export const Falta = () => <Scene index={4}><Falta_ /></Scene>;
