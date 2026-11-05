import { ArrowRight } from 'lucide-react'
import { HeroRibbon } from '../components/HeroRibbon'

const STATS = [
  { value: '5+', label: 'Projetos reais' },
  { value: 'Full Stack', label: 'Do frontend ao backend' },
  { value: 'ADS', label: 'Em formação' },
]

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties

/**
 * Hero estática: HTML + CSS + um SVG leve. Sem canvas, frames, vídeo nem GSAP.
 * A entrada é uma animação CSS única (opacity/transform) e respeita prefers-reduced-motion.
 */
export function Hero() {
  return (
    <>
      <section id="hero" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden bg-base text-paper">
        <div className="hero-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <HeroRibbon className="hero-ribbon pointer-events-none absolute -z-10" />

        <div className="hero-grid relative mx-auto grid min-h-svh grid-rows-[1fr_auto] lg:grid-rows-1 w-full max-w-[90rem] px-4 pb-8 pt-24 sm:px-6 sm:pb-10 md:pt-28 lg:grid-cols-12 lg:gap-x-8 lg:px-10 lg:pb-12">
          <div className="flex flex-col justify-end lg:col-span-8 lg:justify-center">
            <p className="hero-in hero-eyebrow" style={delay(0)}>
              <span className="hero-eyebrow-line" aria-hidden="true" />
              Desenvolvedor Full Stack
            </p>

            <h1 id="hero-title" className="font-grotesk mt-5 sm:mt-6">
              <span className="hero-in hero-name block" style={delay(1)}>
                Gustavo <span className="whitespace-nowrap">Moura</span>
              </span>
              <span className="hero-in hero-tagline mt-4 block sm:mt-6" style={delay(2)}>
                Desenvolvendo <span className="text-glow">soluções reais</span> com tecnologia.
              </span>
            </h1>

            <p className="hero-in hero-desc mt-5 sm:mt-6" style={delay(3)}>
              Transformo ideias em aplicações completas, performáticas e com foco na experiência do usuário.
            </p>

            <div className="hero-in mt-7 flex flex-wrap gap-3 sm:mt-9" style={delay(4)}>
              <a href="#projetos" className="btn-primary">
                Ver Projetos
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contato" className="btn-outline">
                Entrar em Contato
              </a>
            </div>
          </div>

          <ul className="hero-in hero-stats mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end" style={delay(5)} aria-label="Resumo">
            {STATS.map(({ value, label }) => (
              <li key={value} className="hero-stat">
                <strong className="font-grotesk hero-stat-value">{value}</strong>
                <span className="hero-stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
