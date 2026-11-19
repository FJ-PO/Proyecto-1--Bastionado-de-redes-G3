import { Reveal, Scene, useScene } from 'beatdeck';
import { Header } from './_ui';

function Carta({ on, y, titulo, motivo }: { on: boolean; y: number; titulo: string; motivo: string }) {
  return (
    <Reveal on={on} x={170} y={y}>
      <div style={{ maxWidth: 1560, padding: '30px 38px', borderRadius: 18, background: 'var(--surface)', border: '2px dashed var(--hair-strong)' }}>
        <div className="t-editorial" style={{ fontSize: 46, color: 'var(--ink)' }}>{titulo}</div>
        <div className="t-meta" style={{ fontSize: 28, marginTop: 12, textTransform: 'none', letterSpacing: '0.01em', color: 'var(--ink-2)' }}>{motivo}</div>
      </div>
    </Reveal>
  );
}

function Descartes_() {
  const { here, b } = useScene();
  return (
    <>
      <Header on={here} eyebrow="Lo que hemos decidido no hacer" title="Dos cosas, fuera de alcance." />
      <Carta on={here && b >= 1} y={420} titulo="No comprar un cortafuegos nuevo" motivo="No hay presupuesto para equipos. Usamos el router que ya hay." />
      <Carta on={here && b >= 2} y={660} titulo="No poner doble contraseña en todo" motivo="Demasiada molestia diaria para lo que aporta en este caso." />
    </>
  );
}

/** 07 FUERA DE ALCANCE — los dos descartes y su motivo. */
export const Descartes = () => <Scene index={6}><Descartes_ /></Scene>;
