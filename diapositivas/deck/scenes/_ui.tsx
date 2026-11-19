import { Reveal } from 'beatdeck';
import type { ReactNode } from 'react';

/** Cabecera de escena: etiqueta pequeña + titular grande. */
export function Header({ on, eyebrow, title, y = 150 }: { on: boolean; eyebrow: string; title: string; y?: number }) {
  return (
    <>
      <Reveal on={on} x={168} y={y}>
        <div className="t-eyebrow">// {eyebrow}</div>
      </Reveal>
      <Reveal on={on} x={150} y={y + 70} delay={80} ms={900}>
        <div className="t-statement" style={{ fontSize: 96, maxWidth: 1620 }}>{title}</div>
      </Reveal>
    </>
  );
}

/** Línea que aparece con un punto de acento. */
export function Bullet({
  on, x = 170, y, children, tone = 'var(--accent)', size = 48, delay = 0,
}: { on: boolean; x?: number; y: number; children: ReactNode; tone?: string; size?: number; delay?: number }) {
  return (
    <Reveal on={on} x={x} y={y} delay={delay}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, maxWidth: 1560 }}>
        <span style={{ flex: 'none', width: 18, height: 18, borderRadius: 999, background: tone, transform: 'translateY(-6px)' }} />
        <span className="t-editorial" style={{ fontSize: size, lineHeight: 1.2 }}>{children}</span>
      </div>
    </Reveal>
  );
}

/** Caja de zona (para la escena de la idea): recuadro con color y etiqueta. */
export function Zona({
  on, x, y, color, label, sub,
}: { on: boolean; x: number; y: number; color: string; label: string; sub: string }) {
  return (
    <Reveal on={on} x={x} y={y}>
      <div style={{
        width: 740, padding: '34px 40px', borderRadius: 20,
        background: 'var(--surface)', border: `2px solid ${color}`,
        borderLeft: `14px solid ${color}`, boxShadow: '0 10px 30px rgba(12,36,50,0.08)',
      }}>
        <div className="t-editorial" style={{ fontSize: 46, lineHeight: 1.1 }}>{label}</div>
        <div className="t-meta" style={{ fontSize: 24, marginTop: 10, textTransform: 'none', letterSpacing: '0.01em', color: 'var(--ink-2)' }}>{sub}</div>
      </div>
    </Reveal>
  );
}
