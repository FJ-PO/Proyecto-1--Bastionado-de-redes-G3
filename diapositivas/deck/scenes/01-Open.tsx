import { Reveal, Scene, useScene } from 'beatdeck';
import { config } from '../deck.config';

function Open_() {
  const { here, b } = useScene();
  const title = here && b === 1;
  return (
    <>
      {/* 01.1 standby: una marca tranquila */}
      <div style={{ position: 'absolute', left: 952, top: 532, width: 16, height: 16, background: 'var(--accent)', opacity: here && b === 0 ? 1 : 0, transition: 'opacity 400ms' }} />

      {/* 01.2 título */}
      <Reveal on={title} x={168} y={300}>
        <div className="t-eyebrow">// Mareas Asesores · «La maldición de la gestoría»</div>
      </Reveal>
      <Reveal on={title} x={150} y={372} delay={120} ms={1100}>
        <div className="t-statement" style={{ fontSize: 116, maxWidth: 1620 }}>{config.title}</div>
      </Reveal>
      {config.subtitle && (
        <Reveal on={title} x={168} y={732} delay={320}>
          <div className="t-editorial" style={{ fontSize: 40 }}>{config.subtitle}</div>
        </Reveal>
      )}
      {config.author && (
        <Reveal on={title} x={168} y={900} delay={460}>
          <div className="t-meta" style={{ fontSize: 24 }}>{config.author}</div>
        </Reveal>
      )}
    </>
  );
}

/** 01 INICIO — standby y título. */
export const Open = () => <Scene index={0}><Open_ /></Scene>;
