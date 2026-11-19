import { useCallback, useRef, useState } from 'react'
import { AntesDiagram, DespuesDiagram } from './NetworkDiagrams.jsx'

// Deslizador para comparar la red antes y después.
export default function BeforeAfter() {
  const ref = useRef(null)
  const [split, setSplit] = useState(50)
  const dragging = useRef(false)

  const move = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pct = ((clientX - r.left) / r.width) * 100
    setSplit(Math.min(100, Math.max(0, pct)))
  }, [])

  const onDown = (e) => {
    dragging.current = true
    move(e.clientX ?? e.touches?.[0]?.clientX)
  }
  const onMove = (e) => {
    if (!dragging.current) return
    move(e.clientX ?? e.touches?.[0]?.clientX)
  }
  const onUp = () => { dragging.current = false }

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setSplit((s) => Math.max(0, s - 4))
    if (e.key === 'ArrowRight') setSplit((s) => Math.min(100, s + 4))
  }

  return (
    <>
      <div
        className="ba"
        ref={ref}
        style={{ '--split': `${split}%` }}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        <div className="ba__layer ba__before"><AntesDiagram /></div>
        <div className="ba__layer ba__after"><DespuesDiagram /></div>

        <span className="ba__tag ba__tag--before">Antes</span>
        <span className="ba__tag ba__tag--after">Después</span>

        <div
          className="ba__divider"
          role="slider"
          tabIndex={0}
          aria-label="Comparar la red antes y después"
          aria-valuenow={Math.round(split)}
          aria-valuemin={0}
          aria-valuemax={100}
          onMouseDown={onDown}
          onTouchStart={onDown}
          onKeyDown={onKey}
        >
          <span className="ba__handle">⟺</span>
        </div>
      </div>
      <p className="ba__hint">Arrastra la línea para comparar · izquierda, cómo estaba · derecha, cómo quedó</p>
    </>
  )
}
