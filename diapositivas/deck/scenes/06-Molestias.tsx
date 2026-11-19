import { Scene, useScene } from 'beatdeck';
import { Bullet, Header } from './_ui';

function Molestias_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="Pequeñas molestias que pedimos asumir" title="Tres cambios en el día a día." />
      <Bullet on={here && b >= 1} y={440} size={48}>Contraseñas nuevas y más largas.</Bullet>
      <Bullet on={here && b >= 2} y={580} size={48}>El personal no usa el wifi de clientes con su móvil.</Bullet>
      <Bullet on={here && b >= 3} y={720} size={48}>Se imprime solo desde los puestos de la oficina.</Bullet>
    </>
  );
}

/** 06 A TENER EN CUENTA — las tres molestias asumidas. */
export const Molestias = () => <Scene index={5}><Molestias_ /></Scene>;
