import { Reveal, Scene, useScene } from 'beatdeck';
import { Header, Zona } from './_ui';

function Idea_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="La idea, sin comprar equipos nuevos" title="Separar la red en zonas." />
      <Zona on={here && b >= 1} x={170} y={420} color="#4aa3c7" label="Los puestos y el portátil" sub="El trabajo diario con los datos de clientes" />
      <Zona on={here && b >= 2} x={990} y={420} color="#2a9d8f" label="El servidor" sub="Donde están los documentos" />
      <Zona on={here && b >= 3} x={170} y={640} color="#d6a93a" label="Las impresoras" sub="Solo para imprimir" />
      <Zona on={here && b >= 4} x={990} y={640} color="#8a9aa4" label="El wifi de los clientes" sub="Solo sale a Internet, nada más" />
      <Reveal on={here && b >= 5} x={170} y={900}>
        <div className="t-editorial" style={{ fontSize: 40, maxWidth: 1580, color: 'var(--ink)' }}>
          Cada zona llega solo a lo que necesita. El trabajo del día no cambia.
        </div>
      </Reveal>
    </>
  );
}

/** 03 LA IDEA — cuatro zonas separadas. */
export const Idea = () => <Scene index={2}><Idea_ /></Scene>;
