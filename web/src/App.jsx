import Reveal from './components/Reveal.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'
import Measures from './components/Measures.jsx'
import RiskMap from './components/RiskMap.jsx'
import { PROYECTO, PROBLEMAS, MOLESTIAS, RIESGOS_ABIERTOS } from './data.js'

export default function App() {
  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">{PROYECTO.modulo}</p>
          <h1>Le ordenamos la red a una gestoría que lo tenía todo abierto.</h1>
          <p className="sub">
            {PROYECTO.cliente} — «{PROYECTO.lema}». Miramos cómo estaba su red, vimos por dónde
            podía entrar cualquiera y aplicamos las medidas que más protegían sin frenar el trabajo
            del día a día.
          </p>
          <div className="meta">
            <span><b>Equipo:</b> {PROYECTO.equipo.join(' · ')}</span>
            <span><b>Sin comprar hardware:</b> VLAN en el switch y reglas en el router</span>
            <span><b>8 medidas</b> · las 8 comprobadas</span>
          </div>
        </div>
      </header>

      {/* El problema */}
      <section>
        <div className="wrap">
          <p className="eyebrow">Cómo nos la encontramos</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', maxWidth: '18ch' }}>
            Una red donde todos los equipos se veían entre sí.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Puestos, servidor, impresoras y el Wi-Fi de la sala de espera compartían la misma red.
            El servidor tenía servicios abiertos de más y los documentos de los clientes no pedían
            contraseña.
          </p>
          <div className="problem-grid">
            {PROBLEMAS.map((p, i) => (
              <Reveal className="problem-card" key={i}>
                <span className="idx">0{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Antes / Después */}
      <section style={{ background: '#eef3f6' }}>
        <div className="wrap">
          <p className="eyebrow">La red, antes y después</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', maxWidth: '20ch' }}>
            De una sola red plana a cuatro zonas que no se ven entre sí.
          </h2>
          <BeforeAfter />
          <div className="why">
            <div>
              <h3>Sin gastar en equipos</h3>
              <p>No se compra hardware: se usan las VLAN del switch que ya hay y reglas en el router.</p>
            </div>
            <div>
              <h3>Cada cosa en su sitio</h3>
              <p>Puestos, servidor, impresoras y Wi-Fi de clientes quedan separados. El cliente solo sale a Internet.</p>
            </div>
            <div>
              <h3>El trabajo no cambia</h3>
              <p>Desde un puesto se sigue abriendo la gestión, imprimiendo y navegando igual que antes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Las medidas */}
      <section className="measures">
        <div className="wrap">
          <p className="eyebrow">Lo que aplicamos</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', maxWidth: '20ch' }}>
            Las medidas, una a una.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Cada medida en lenguaje sencillo. Dale al interruptor para ver cómo se hizo por dentro.
          </p>
          <Measures />
        </div>
      </section>

      {/* Mapa riesgo / molestia */}
      <section>
        <div className="wrap">
          <p className="eyebrow">Cómo priorizamos</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', maxWidth: '22ch' }}>
            Qué protege mucho y molesta poco, y qué dejamos fuera.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Colocamos cada medida según el riesgo que evita y la molestia que causa. Primero, lo que
            protege mucho sin estorbar; lo que molesta más, se avisa antes. Y dos cosas que decidimos
            no hacer.
          </p>
          <RiskMap />

          <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', marginTop: 56, fontWeight: 600 }}>
            Las molestias que sí asumimos
          </h3>
          <div className="molestias">
            {MOLESTIAS.map((m, i) => (
              <div className="molestia-row" key={i}>
                <span><small>Qué cambia</small><b>{m.molestia}</b></span>
                <span><small>A quién</small>{m.aQuien}</span>
                <span><small>Por qué merece la pena</small>{m.porque}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', marginTop: 56, fontWeight: 600 }}>
            Riesgos que quedan abiertos
          </h3>
          <p className="lead" style={{ marginTop: 10, fontSize: '1rem' }}>
            Con honestidad: esto es lo que no hemos podido cerrar. La jefa tiene que saber qué riesgos
            acepta y qué haría falta para cerrarlos.
          </p>
          <div className="riesgos">
            {RIESGOS_ABIERTOS.map((r, i) => (
              <div className="riesgo-row" key={i}>
                <span><small>Riesgo</small><b>{r.riesgo}</b></span>
                <span><small>Por qué queda abierto</small>{r.porque}</span>
                <span><small>Qué haría falta para cerrarlo</small>{r.cerrar}</span>
                <span className={r.decision === 'Pendiente' ? 'dec dec--todo' : 'dec dec--jefa'}>{r.decision}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diapositivas */}
      <section className="slides">
        <div className="wrap">
          <p className="eyebrow" style={{ color: '#7fd1c4' }}>Para la jefa de la gestoría</p>
          <h2>¿Prefieres que te lo contemos en cinco minutos?</h2>
          <p>
            Preparamos una presentación con lo que hemos hecho, los riesgos que quedan abiertos y las
            decisiones que tomamos por el camino. Sin tecnicismos.
          </p>
          <a className="btn" href={PROYECTO.slidesUrl}>Ver la presentación →</a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          {PROYECTO.cliente} · {PROYECTO.lema} — Proyecto del módulo {PROYECTO.modulo}. {PROYECTO.equipo.join(', ')}.
        </div>
      </footer>
    </>
  )
}
