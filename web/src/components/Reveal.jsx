import { useEffect, useRef, useState } from 'react'

// Muestra sus hijos con una transición cuando entran en pantalla al hacer scroll.
export default function Reveal({ children, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`${className} ${visible ? 'in' : ''}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
