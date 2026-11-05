import { useSpotlight } from '../hooks/useSpotlight'
import { TECH_GROUPS, type TechGroup } from '../data/stack'

/**
 * Composição (desktop, 12 colunas): 7/5 na primeira linha, 4/8 na segunda — tamanhos diferentes e
 * três formas de apresentar os itens (lista em grade, tipografia grande, tags), para os cards não se repetirem.
 */
type Variant = 'list' | 'large' | 'tags'
const LAYOUT: Record<TechGroup['id'], { span: string; variant: Variant; wide?: boolean }> = {
  front: { span: 'lg:col-span-7', variant: 'list', wide: true },
  back: { span: 'lg:col-span-5', variant: 'list' },
  data: { span: 'lg:col-span-4', variant: 'large' },
  tools: { span: 'lg:col-span-8', variant: 'tags' },
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Símbolos geométricos de linha (SVG inline, ~300 bytes cada). `.tglyph-accent` se move no hover. */
function Glyph({ id }: { id: TechGroup['id'] }) {
  const common = { className: 'tglyph', viewBox: '0 0 48 48', fill: 'none', 'aria-hidden': true, focusable: false } as const
  switch (id) {
    case 'front':
      return (
        <svg {...common}>
          <rect x="5.5" y="9.5" width="37" height="29" rx="2" stroke="currentColor" />
          <path d="M5.5 16.5h37M12 24h14M12 29h9" stroke="currentColor" />
          <rect className="tglyph-accent" x="30" y="23" width="7" height="7" fill="#6496E8" />
        </svg>
      )
    case 'back':
      return (
        <svg {...common}>
          <path d="M24 24 10 12M24 24l14-12M24 24v14" stroke="currentColor" />
          <circle cx="10" cy="12" r="3.5" stroke="currentColor" />
          <circle cx="38" cy="12" r="3.5" stroke="currentColor" />
          <circle cx="24" cy="38" r="3.5" stroke="currentColor" />
          <circle className="tglyph-accent" cx="24" cy="24" r="5" fill="#6496E8" />
        </svg>
      )
    case 'data':
      return (
        <svg {...common}>
          <path d="M9 12v24c0 3 6.7 5.5 15 5.5S39 39 39 36V12" stroke="currentColor" />
          <path d="M9 20c0 3 6.7 5.5 15 5.5S39 23 39 20M9 28c0 3 6.7 5.5 15 5.5S39 31 39 28" stroke="currentColor" />
          <ellipse className="tglyph-accent" cx="24" cy="12" rx="15" ry="5.5" stroke="#6496E8" strokeWidth="1.5" />
        </svg>
      )
    case 'tools':
      return (
        <svg {...common}>
          <rect x="7.5" y="7.5" width="14" height="14" stroke="currentColor" />
          <rect x="26.5" y="26.5" width="14" height="14" stroke="currentColor" />
          <rect x="7.5" y="26.5" width="14" height="14" stroke="currentColor" />
          <rect className="tglyph-accent" x="26.5" y="7.5" width="14" height="14" fill="#6496E8" />
        </svg>
      )
  }
}

function Card({ g, index }: { g: TechGroup; index: number }) {
  const { span, variant, wide } = LAYOUT[g.id]
  const titleId = `stack-${g.id}`
  return (
    <li className={`tcard-slot ${span}`}>
      <article className={`tcard tcard-${variant} ${wide ? 'tcard-wide' : ''}`} aria-labelledby={titleId}>
        <span className="card-glow" aria-hidden="true" />
        <div className="tcard-head">
          <p className="tcard-index" aria-hidden="true">
            <span className="text-glow">{pad(index + 1)}</span> / {pad(TECH_GROUPS.length)}
          </p>
          <Glyph id={g.id} />
        </div>
        <h3 id={titleId} className="tcard-title font-grotesk">
          {g.title}
        </h3>
        <p className="tcard-desc">{g.description}</p>
        <ul className="tcard-items" aria-label={`Tecnologias de ${g.title}`}>
          {g.items.map((item) => (
            <li key={item} className={variant === 'large' ? 'font-grotesk' : undefined}>
              {item}
            </li>
          ))}
        </ul>
      </article>
    </li>
  )
}

/**
 * Seção estática (sem Scene, canvas, frames nem GSAP). Entrada por scroll-driven animation em CSS,
 * só onde há suporte e sem prefers-reduced-motion; caso contrário o conteúdo já aparece.
 */
export function Tech() {
  const spot = useSpotlight<HTMLUListElement>('.tcard')
  return (
    <section id="tecnologias" aria-labelledby="tecnologias-title" className="tech relative isolate">
      <div className="mx-auto w-full max-w-[90rem] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-6">
        <header className="tech-in grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="tech-eyebrow">
              <span className="text-glow">02</span>
              <span className="tech-eyebrow-sep" aria-hidden="true">/</span>
              Tecnologias
            </p>
            <h2 id="tecnologias-title" className="tech-title font-grotesk">
              Ferramentas que transformam <span className="text-glow">ideias em produtos.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="tech-desc">
              Do desenvolvimento de interfaces à construção de APIs e bancos de dados, utilizo tecnologias modernas para
              criar aplicações completas.
            </p>
          </div>
        </header>

        <ul ref={spot} className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {TECH_GROUPS.map((g, i) => (
            <Card key={g.id} g={g} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
