/**
 * Peça gráfica da seção Sobre: SVG estático (≈2 KB) — órbitas concêntricas, um arco em azul,
 * um losango sobreposto e um plano em perspectiva que dá profundidade. Marcas técnicas nas bordas.
 * Os elementos com `.ag-detail` somem no mobile (versão simplificada). O arco azul fica numa camada própria
 * (mesmo viewBox) e percorre a órbita devagar só por transform; sem animação, o desenho é o original.
 */
const VIEW = '0 0 580 640'
const CX = 290
const CY = 250

// plano em perspectiva: linhas que convergem para um ponto de fuga + horizontais cada vez mais próximas
const HORIZON = 455
const VP_Y = 330
const RAYS = Array.from({ length: 13 }, (_, i) => {
  const xBottom = i * (580 / 12)
  const t = (HORIZON - VP_Y) / (640 - VP_Y)
  return `M${xBottom} 640L${(CX + (xBottom - CX) * t).toFixed(1)} ${HORIZON}`
})
const FLOOR = [0, 1, 2, 3, 4, 5].map((i) => +(HORIZON + (640 - HORIZON) * (1 - Math.pow(0.62, i + 0.4))).toFixed(1))

// arco azul sobre a órbita r=170, de -110° a 25°
const arc = (r: number, a0: number, a1: number) => {
  const p = (a: number) => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)].map((v) => v.toFixed(1)).join(' ')
  return `M${p(a0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`
}
const ARC = arc(170, -110, 25)
const ARC_END = [CX + 170 * Math.cos((25 * Math.PI) / 180), CY + 170 * Math.sin((25 * Math.PI) / 180)]

export function AboutGraphic({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg className="ag-layer" viewBox={VIEW} preserveAspectRatio="xMidYMin slice" fill="none" focusable="false">
        <defs>
          <radialGradient id="ag-sphere" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(258 214) rotate(52) scale(150)">
            <stop offset="0" stopColor="#22355A" />
            <stop offset="0.65" stopColor="#16233B" />
            <stop offset="1" stopColor="#0D1526" />
          </radialGradient>
          <linearGradient id="ag-floor" x1="0" y1={HORIZON} x2="0" y2="640" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E8F0FF" stopOpacity="0" />
            <stop offset="1" stopColor="#E8F0FF" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="ag-rim" x1="200" y1="150" x2="360" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E8F0FF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#E8F0FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* plano em perspectiva (profundidade) */}
        <g className="ag-detail" stroke="url(#ag-floor)">
          {RAYS.map((d) => (
            <path key={d} d={d} />
          ))}
          {FLOOR.map((y) => (
            <path key={y} d={`M0 ${y}H580`} />
          ))}
        </g>
        <path d={`M0 ${HORIZON}H580`} stroke="#E8F0FF" strokeOpacity="0.12" />

        {/* órbitas concêntricas */}
        <g stroke="#E8F0FF">
          <circle cx={CX} cy={CY} r="230" strokeOpacity="0.06" />
          <circle cx={CX} cy={CY} r="170" strokeOpacity="0.12" />
          <circle cx={CX} cy={CY} r="125" strokeOpacity="0.08" strokeDasharray="2 6" />
        </g>

        {/* esfera sólida com borda de luz */}
        <circle cx={CX} cy={CY} r="92" fill="url(#ag-sphere)" />
        <circle cx={CX} cy={CY} r="92" stroke="url(#ag-rim)" />

        {/* losango sobreposto (gira levemente no hover da seção) */}
        <g className="ag-diamond">
          <rect x={CX + 18} y={CY + 18} width="128" height="128" transform={`rotate(45 ${CX + 82} ${CY + 82})`} stroke="#4878C8" strokeOpacity="0.8" />
        </g>


        {/* mira no centro */}
        <g stroke="#E8F0FF" strokeOpacity="0.4">
          <path d={`M${CX - 9} ${CY}H${CX + 9}M${CX} ${CY - 9}V${CY + 9}`} />
        </g>

        {/* marcas técnicas: cantos, cota e legendas */}
        <g className="ag-detail" stroke="#E8F0FF" strokeOpacity="0.28">
          <path d="M8 28V8H28M552 8H572V28M572 612V632H552M28 632H8V612" />
          <path d={`M548 ${CY - 170}V${CY + 170}M540 ${CY - 170}H556M540 ${CY + 170}H556`} strokeDasharray="3 4" />
        </g>
        <g className="ag-detail" fill="#A8B7CF" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontSize="11" letterSpacing="1.6">
          <text x="28" y="44">GM — 01</text>
          <text x="28" y="604">SÃO PAULO · BR</text>
          <text x="536" y={CY + 4} textAnchor="end">
            R 170
          </text>
        </g>
        <rect className="ag-detail" x="530" y="596" width="12" height="12" fill="#6496E8" />
      </svg>


      {/* arco de destaque + ponto: percorre a órbita r=170 */}
      <div className="ag-layer ag-spin ag-spin-arc fx">
        <svg viewBox={VIEW} preserveAspectRatio="xMidYMin slice" fill="none" focusable="false">
          <path d={ARC} stroke="#6496E8" strokeWidth="3" strokeLinecap="round" />
          <circle cx={ARC_END[0]} cy={ARC_END[1]} r="6" fill="#6496E8" />
          <circle className="ag-pulse" cx={ARC_END[0]} cy={ARC_END[1]} r="15" stroke="#6496E8" strokeOpacity="0.3" />
        </svg>
      </div>
    </div>
  )
}
