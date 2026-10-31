import { GraduationCap, Layers, MapPin, Rocket } from 'lucide-react'
import { Scene } from '../components/Scene'
import type { Timing } from '../config/scenes'

const FACTS = [
  { icon: Layers, text: 'Full Stack' },
  { icon: MapPin, text: 'São Paulo, Brasil' },
  { icon: GraduationCap, text: 'ADS — UNIASSELVI' },
  { icon: Rocket, text: 'Projetos reais em produção' },
]

function build(tl: gsap.core.Timeline, t: Timing) {
  const { at } = t
  tl.fromTo('[data-fx="p1"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: at(0.6) }, at(0.35))
  tl.fromTo('[data-fx="p2"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: at(0.6) }, at(1.0))
  tl.fromTo('[data-fx="fact"]', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: at(0.45), stagger: at(0.2) }, at(1.6))
  // sai durante o crossfade, com leitura completa antes disso
  tl.to('[data-fx="about"]', { opacity: 0, y: -70, duration: at(0.9) }, at(t.tailStart - 0.2))
}

export function About() {
  return (
    <Scene id="sobre" label="Sobre mim" focusX={0.15} build={build}>
      {/* leitura: coluna de texto escurecida (desktop) e véu leve sobre a cena inteira (mobile) */}
      <div className="pointer-events-none absolute inset-0 bg-ink/35 lg:bg-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink/90 via-ink/60 to-transparent lg:via-ink/45 lg:to-transparent" />
      <div className="scene-pad relative mx-auto grid h-full max-w-6xl items-center px-6 pb-6 md:px-10 lg:grid-cols-2">
        <div data-fx="about" className="lg:col-start-2">
          <h2 className="font-display t-title font-semibold">Mais do que código, construo soluções.</h2>
          <div className="t-body mt-[2.2svh] max-w-lg space-y-[1.6svh] text-frost/80">
            <p data-fx="p1">
              Sou Gustavo Moura, desenvolvedor Full Stack e estudante de Análise e Desenvolvimento de Sistemas. Gosto de
              transformar problemas reais em aplicações funcionais, combinando interfaces modernas, APIs, bancos de dados e
              integrações.
            </p>
            <p data-fx="p2">
              Meu foco está em construir produtos completos, aprender continuamente e evoluir por meio de projetos reais.
            </p>
          </div>
          <ul className="mt-[3svh] grid max-w-lg grid-cols-2 gap-2 short:landscape:max-w-none short:landscape:grid-cols-4">
            {FACTS.map(({ icon: Icon, text }) => (
              <li key={text} data-fx="fact" className="glass-dense flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[13px] leading-snug short:py-1.5 sm:px-4 sm:text-sm">
                <Icon className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Scene>
  )
}
