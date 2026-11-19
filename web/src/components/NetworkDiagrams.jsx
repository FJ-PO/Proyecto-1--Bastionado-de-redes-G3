// Dos diagramas de la red, dibujados a partir de diagnostico.md y propuesta.md.
// Mismo viewBox para que encajen en el deslizador antes/después.

const VB = '0 0 820 520'

function Node({ x, y, w = 118, h = 46, label, sub, fill = '#13384a', stroke = '#2f5c70', text = '#dceaf0' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 5} textAnchor="middle" fill={text} fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fill="#8fb0bd" fontSize="11" fontFamily="Inter, sans-serif">{sub}</text>
      )}
    </g>
  )
}

const line = (x1, y1, x2, y2, props = {}) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3f6b7f" strokeWidth="2" {...props} />
)

export function AntesDiagram() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Antes: una sola red plana donde todo se ve entre sí">
      <rect x="0" y="0" width="820" height="520" fill="#0c2432" />

      {/* Internet + router */}
      <Node x={40} y={70} w={120} h={44} label="Internet" sub="192.168.122.1" fill="#102e3d" />
      <Node x={40} y={150} w={120} h={44} label="Router" sub="sin filtrado" />
      {line(100, 114, 100, 150)}

      {/* Switch central */}
      <Node x={350} y={236} w={130} h={50} label="Switch" sub="todos los puertos en VLAN 1" fill="#1a4a5f" stroke="#3f8aa3" />
      {line(100, 194, 100, 261)}
      {line(100, 261, 350, 261)}

      {/* Dispositivos alrededor, todos a la misma red */}
      <Node x={560} y={80} w={150} h={46} label="Servidor" sub="srv-mareas ·.10" fill="#13384a" />
      <Node x={560} y={150} w={150} h={46} label="Puesto 1 / 2" sub="Windows" />
      <Node x={560} y={300} w={150} h={46} label="Portátil Laura" sub=".200" />
      <Node x={560} y={370} w={150} h={46} label="Impresoras" sub=".20 / .21" />
      <Node x={110} y={370} w={170} h={46} label="Wi-Fi + móvil cliente" sub="misma red" fill="#3a2630" stroke="#8a4a48" text="#f3cfc6" />

      {line(480, 259, 560, 103)}
      {line(480, 259, 560, 173)}
      {line(480, 262, 560, 323)}
      {line(480, 262, 560, 393)}
      {line(350, 262, 280, 393)}

      {/* Peligro: el móvil del cliente llega al servidor */}
      {line(195, 370, 600, 126, { stroke: '#e07a5f', strokeWidth: '2.5', strokeDasharray: '7 5' })}
      <text x="430" y="212" textAnchor="middle" fill="#f0a08c" fontSize="12.5" fontWeight="600" fontFamily="Inter, sans-serif" transform="rotate(-21 430 212)">el móvil del cliente llega al servidor</text>
    </svg>
  )
}

export function DespuesDiagram() {
  const zone = (x, y, w, h, color) => (
    <rect x={x} y={y} width={w} height={h} rx="14" fill="none" stroke={color} strokeWidth="2" strokeDasharray="2 6" />
  )
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Después: la red separada en cuatro VLAN que no se ven entre sí">
      <rect x="0" y="0" width="820" height="520" fill="#0b2a22" />

      {/* Router central (router-on-a-stick) */}
      <Node x={345} y={232} w={130} h={54} label="Router" sub="reglas entre zonas" fill="#12463a" stroke="#2a9d8f" text="#dff3ee" />
      <Node x={345} y={150} w={130} h={40} label="Internet" fill="#0e3a30" />
      {line(410, 190, 410, 232, { stroke: '#2a9d8f' })}

      {/* VLAN 10 Puestos */}
      {zone(30, 70, 250, 120, '#4aa3c7')}
      <text x="46" y="92" fill="#8fd0e6" fontSize="12.5" fontWeight="700" fontFamily="Inter, sans-serif">VLAN 10 · Puestos · /26</text>
      <Node x={46} y={104} w={110} h={40} label="Puesto 1 / 2" fill="#13384a" stroke="#4aa3c7" />
      <Node x={166} y={104} w={100} h={40} label="Portátil" fill="#13384a" stroke="#4aa3c7" />
      {line(230, 258, 155, 190, { stroke: '#4aa3c7' })}

      {/* VLAN 20 Servidor */}
      {zone(540, 70, 250, 120, '#2a9d8f')}
      <text x="556" y="92" fill="#7fd1c4" fontSize="12.5" fontWeight="700" fontFamily="Inter, sans-serif">VLAN 20 · Servidor · /24</text>
      <Node x={590} y={104} w={150} h={46} label="srv-mareas" sub="solo Samba/FTP" fill="#12463a" stroke="#2a9d8f" text="#dff3ee" />
      {line(590, 258, 660, 190, { stroke: '#2a9d8f' })}

      {/* VLAN 30 Impresoras */}
      {zone(540, 330, 250, 120, '#e9c46a')}
      <text x="556" y="352" fill="#ecd08a" fontSize="12.5" fontWeight="700" fontFamily="Inter, sans-serif">VLAN 30 · Impresoras · /28</text>
      <Node x={590} y={364} w={150} h={46} label="Impresoras" sub="solo imprimir" fill="#3a3520" stroke="#e9c46a" text="#f3e6c2" />
      {line(590, 262, 660, 330, { stroke: '#e9c46a' })}

      {/* VLAN 40 Wi-Fi clientes */}
      {zone(30, 330, 250, 120, '#9aabb5')}
      <text x="46" y="352" fill="#b7c6cf" fontSize="12.5" fontWeight="700" fontFamily="Inter, sans-serif">VLAN 40 · Wi-Fi clientes · /25</text>
      <Node x={46} y={364} w={220} h={46} label="AP + móviles de clientes" sub="solo salida a Internet" fill="#223038" stroke="#9aabb5" text="#cdd8de" />
      {line(230, 262, 155, 330, { stroke: '#9aabb5' })}

      {/* Candado: clientes no entran al resto */}
      <circle cx="410" cy="400" r="19" fill="#0b2a22" stroke="#e9c46a" strokeWidth="2" />
      <text x="410" y="406" textAnchor="middle" fill="#ecd08a" fontSize="18" fontFamily="Inter, sans-serif">⦸</text>
      <text x="410" y="446" textAnchor="middle" fill="#9fd8cc" fontSize="12" fontFamily="Inter, sans-serif">los clientes no ven al resto</text>
    </svg>
  )
}
