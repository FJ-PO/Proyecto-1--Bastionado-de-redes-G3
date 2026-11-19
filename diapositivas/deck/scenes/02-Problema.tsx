import { Scene, useScene } from 'beatdeck';
import { Bullet, Header } from './_ui';

function Problema_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="El punto de partida" title="Todo estaba conectado a todo." />
      <Bullet on={here && b >= 1} y={400}>Puestos, servidor, impresoras y el wifi de la sala, en la misma red.</Bullet>
      <Bullet on={here && b >= 2} y={520}>Desde el móvil de un cliente se llegaba al servidor y a las impresoras.</Bullet>
      <Bullet on={here && b >= 3} y={640} tone="var(--accent-strong)">Los documentos de los clientes se abrían sin contraseña.</Bullet>
      <Bullet on={here && b >= 4} y={760} tone="var(--accent-strong)">El becario, que ya no trabaja, seguía siendo administrador.</Bullet>
    </>
  );
}

/** 02 EL PROBLEMA — una red donde todo se veía entre sí. */
export const Problema = () => <Scene index={1}><Problema_ /></Scene>;
