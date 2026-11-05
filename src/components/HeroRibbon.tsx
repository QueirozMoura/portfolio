/**
 * Fita fluida da Hero: SVG estático gerado uma única vez no carregamento do módulo.
 * São duas curvas-guia (bordas da fita) que se cruzam; as linhas intermediárias são interpolações
 * entre elas, o que cria a torção e a sensação de profundidade sem WebGL, canvas ou imagem.
 * O movimento contínuo (flutuação e órbitas) é CSS de transform sobre camadas separadas (ver .ribbon-* no CSS).
 */
type Pt = readonly [number, number]
// cada borda: P0, C1, C2, P1, C3, C4, P2 (duas cúbicas encadeadas)
const EDGE_A: readonly Pt[] = [
  [-60, 700], [150, 640], [210, 300], [430, 250], [640, 200], [700, 520], [900, 470],
]
const EDGE_B: readonly Pt[] = [
  [-60, 560], [190, 760], [330, 470], [470, 330], [610, 190], [760, 90], [900, 250],
]
const LINES = 30

const lerp = (a: Pt, b: Pt, t: number) => `${(a[0] + (b[0] - a[0]) * t).toFixed(1)} ${(a[1] + (b[1] - a[1]) * t).toFixed(1)}`

function strand(t: number) {
  const p = EDGE_A.map((a, i) => lerp(a, EDGE_B[i], t))
  return `M${p[0]}C${p[1]} ${p[2]} ${p[3]}C${p[4]} ${p[5]} ${p[6]}`
}

// frente da fita (t baixo) mais clara e opaca; o verso some no escuro
const STRANDS = Array.from({ length: LINES }, (_, i) => {
  const t = i / (LINES - 1)
  return { d: strand(t), o: +(0.95 - t * 0.75).toFixed(2) }
})
const EDGE_FRONT = strand(0)
const EDGE_BACK = strand(1)

const VIEW = '0 0 840 840'

/**
 * Duas camadas sobrepostas com o mesmo viewBox: a fita (flutua devagar) e o ponto de foco (orbita a r=300). Separar as partes móveis em <svg> próprios faz o navegador só transformar camadas
 * já pintadas, em vez de repintar o SVG inteiro a cada quadro. Sem animação, o desenho é o mesmo de sempre.
 */
export function HeroRibbon({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="ribbon-layer ribbon-main fx">
        <svg viewBox={VIEW} fill="none" focusable="false" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rb-stroke" x1="0" y1="0" x2="840" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#4878C8" stopOpacity="0" />
              <stop offset="0.22" stopColor="#4878C8" stopOpacity="0.9" />
              <stop offset="0.55" stopColor="#B4CCF5" />
              <stop offset="0.82" stopColor="#4878C8" stopOpacity="0.85" />
              <stop offset="1" stopColor="#4878C8" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="rb-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(470 360) rotate(-25) scale(360 220)">
              <stop offset="0" stopColor="#4878C8" stopOpacity="0.3" />
              <stop offset="1" stopColor="#4878C8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* halo de luz atrás da torção (gradiente, sem filtro de blur) */}
          <ellipse cx="470" cy="360" rx="360" ry="220" transform="rotate(-25 470 360)" fill="url(#rb-glow)" />

          {/* órbitas (fixas) */}
          <circle cx="455" cy="380" r="300" stroke="#E8F0FF" strokeOpacity="0.07" />
          <circle cx="455" cy="380" r="210" stroke="#E8F0FF" strokeOpacity="0.05" strokeDasharray="2 7" />

          <g stroke="url(#rb-stroke)" strokeWidth="1.1" strokeLinecap="round">
            {STRANDS.map(({ d, o }) => (
              <path key={d} d={d} strokeOpacity={o} />
            ))}
          </g>
          <path d={EDGE_BACK} stroke="url(#rb-stroke)" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d={EDGE_FRONT} stroke="url(#rb-stroke)" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>


      {/* ponto de foco, ecoando o ponto do logo: percorre a órbita externa */}
      <div className="ribbon-layer ribbon-orbit ribbon-orbit-sat fx">
        <svg viewBox={VIEW} fill="none" focusable="false">
          <circle cx="755" cy="380" r="5" fill="#6496E8" />
          <circle className="ribbon-sat-ring" cx="755" cy="380" r="14" stroke="#6496E8" strokeOpacity="0.35" />
        </svg>
      </div>
    </div>
  )
}
