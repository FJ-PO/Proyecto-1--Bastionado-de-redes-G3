import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { MEDIDAS } from '../data.js'

const badgeClass = {
  Comprobada: 'badge--ok',
  Implantada: 'badge--done',
  Pendiente: 'badge--todo',
}

function Measure({ m }) {
  const [tech, setTech] = useState(false)
  return (
    <Reveal className="measure">
      <div className="measure__top">
        <span className="measure__n">{String(m.n).padStart(2, '0')}</span>
        <h3 className="measure__title">{m.titulo}</h3>
        <span className={`badge ${badgeClass[m.estado]}`}>{m.estado}</span>
      </div>

      <p className={`measure__body ${tech ? 'tech' : ''}`}>{tech ? m.tecnico : m.simple}</p>

      <div
        className="switch"
        role="switch"
        aria-checked={tech}
        tabIndex={0}
        onClick={() => setTech((t) => !t)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTech((t) => !t) } }}
      >
        <span className={tech ? '' : 'switch__label-strong'}>En sencillo</span>
        <span className={`switch__track ${tech ? 'on' : ''}`}><span className="switch__knob" /></span>
        <span className={tech ? 'switch__label-strong' : ''}>En técnico</span>
      </div>

      <p className="measure__resp">{m.responsable}</p>
    </Reveal>
  )
}

export default function Measures() {
  return (
    <div>
      {MEDIDAS.map((m) => (
        <Measure key={m.n} m={m} />
      ))}
    </div>
  )
}
