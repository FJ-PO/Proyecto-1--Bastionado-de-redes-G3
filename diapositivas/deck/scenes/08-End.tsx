import { QR, Reveal, Scene, qrConfigured, useScene } from 'beatdeck';
import { config } from '../deck.config';

function End_() {
  const { here } = useScene();
  const qr = qrConfigured(config.qrUrl);
  return (
    <>
      <Reveal on={here} x={168} y={300}>
        <div className="t-eyebrow">// Gracias</div>
      </Reveal>
      <Reveal on={here} x={150} y={372}>
        <div className="t-statement" style={{ fontSize: 200 }}>¿Lo vemos<span style={{ color: 'var(--accent)' }}>?</span></div>
      </Reveal>
      <Reveal on={here} x={170} y={720} delay={160}>
        <div className="t-editorial" style={{ fontSize: 38, maxWidth: 1100, color: 'var(--ink)' }}>
          El detalle completo, con la red antes y después y cada medida, está en la web del proyecto.
        </div>
      </Reveal>
      {config.author && (
        <Reveal on={here} x={170} y={900} delay={240}>
          <div className="t-meta" style={{ fontSize: 24 }}>{config.author}</div>
        </Reveal>
      )}
      {qr && (
        <Reveal on={here} x={1440} y={330} delay={300}>
          <QR url={config.qrUrl} size={320} />
          {config.qrLabel && (
            <div className="t-meta" style={{ fontSize: 20, marginTop: 24, width: 320, textAlign: 'center', textTransform: 'none', letterSpacing: '0.02em' }}>{config.qrLabel}</div>
          )}
        </Reveal>
      )}
    </>
  );
}

/** 08 CIERRE — preguntas y QR a la web del proyecto. */
export const End = () => <Scene index={7}><End_ /></Scene>;
