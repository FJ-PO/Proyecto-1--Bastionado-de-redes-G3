import { Scene, useScene } from 'beatdeck';
import { Bullet, Header } from './_ui';

const DONE = '#2a9d8f';

function Hecho_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="Lo que ya está aplicado y comprobado" title="Las ocho, ya hechas." />
      <Bullet on={here && b >= 1} y={388} tone={DONE} size={36}>La red, separada en zonas.</Bullet>
      <Bullet on={here && b >= 2} y={472} tone={DONE} size={36}>Las impresoras, protegidas.</Bullet>
      <Bullet on={here && b >= 3} y={556} tone={DONE} size={36}>El servidor, con menos puertas abiertas.</Bullet>
      <Bullet on={here && b >= 4} y={640} tone={DONE} size={36}>Los documentos, con contraseña; el becario, fuera.</Bullet>
      <Bullet on={here && b >= 5} y={724} tone={DONE} size={36}>La asesoría externa y los trabajadores, por caminos distintos.</Bullet>
      <Bullet on={here && b >= 6} y={808} tone={DONE} size={36}>Un inventario y un plan por si algo falla.</Bullet>
      <Bullet on={here && b >= 7} y={892} tone={DONE} size={36}>Los puestos, cifrados: si roban uno, no se leen.</Bullet>
      <Bullet on={here && b >= 8} y={976} tone={DONE} size={36}>Copias en un disco aparte, a diario, y probamos recuperar.</Bullet>
    </>
  );
}

/** 04 YA HECHO — las ocho medidas aplicadas. */
export const Hecho = () => <Scene index={3}><Hecho_ /></Scene>;
