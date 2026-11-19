import { MEDIDAS, DESCARTES } from '../data.js'

// Mapa de las medidas: cuánto riesgo reducen (eje vertical) frente a cuánta
// molestia causan (eje horizontal). Incluye las aplicadas, las pendientes y
// las descartadas. Las posiciones son una lectura del equipo: revísalas.

const pos = (v) => 10 + ((v - 1) / 4) * 80 // 1..5 -> 10%..90%

function Dot({ x, y, kind, label, tip }) {
  return (
    <span
      className={`dot dot--${kind}`}
      style={{ left: `${x}%`, bottom: `${y}%` }}
      tabIndex={0}
    >
      {label}
      <span className="dot__tip">{tip}</span>
    </span>
  )
}

export default function RiskMap() {
  return (
    <div className="map-wrap">
      <div className="map">
        <svg className="map__grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="0" y="0" width="100" height="100" fill="#f7fafb" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#e2e9ee" strokeWidth="0.6" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e9ee" strokeWidth="0.6" />
        </svg>

        <span className="map__quad" style={{ top: 6, left: 8 }}>Protege mucho, molesta poco</span>
        <span className="map__quad" style={{ top: 6, right: 8, textAlign: 'right' }}>Protege mucho pero molesta</span>
        <span className="map__quad" style={{ bottom: 44, left: 8 }}>Poco riesgo, poca molestia</span>
        <span className="map__quad" style={{ bottom: 44, right: 8, textAlign: 'right' }}>Molesta sin proteger tanto</span>

        {MEDIDAS.map((m) => (
          <Dot
            key={m.n}
            x={pos(m.molestia)}
            y={pos(m.riesgo)}
            kind={m.estado === 'Pendiente' ? 'todo' : 'applied'}
            label={m.n}
            tip={`${m.n}. ${m.titulo} — ${m.estado}`}
          />
        ))}
        {DESCARTES.map((d, i) => (
          <Dot
            key={`d${i}`}
            x={pos(d.molestia)}
            y={pos(d.riesgo)}
            kind="discarded"
            label={`D${i + 1}`}
            tip={`Descartada: ${d.titulo}`}
          />
        ))}

        <span className="map__axis-x">Molestia que causa →</span>
        <span className="map__axis-y">Riesgo que reduce →</span>
      </div>

      <div className="map-legend">
        <span><i style={{ background: '#2a9d8f' }} /> Aplicada</span>
        <span><i style={{ background: '#0e6e8c' }} /> Pendiente</span>
        <span><i style={{ background: '#b9c4cc', border: '2px dashed #46565f' }} /> Descartada</span>
      </div>
      <p className="map-note">
        Pasa el ratón por cada punto para ver la medida. Las posiciones son la lectura del equipo según
        el riesgo que evita y la molestia que supone; se pueden ajustar.
      </p>
    </div>
  )
}
