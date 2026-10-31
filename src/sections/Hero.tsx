import { ArrowDown } from 'lucide-react'
import { Scene } from '../components/Scene'
import { btnGlass, btnPrimary } from '../components/ui'
import { SITE } from '../data/site'
import type { Timing } from '../config/scenes'

function build(tl: gsap.core.Timeline, t: Timing) {
  // a dica some logo no primeiro gesto; o texto fica legível enquanto a escultura gira e só sai perto do fim
  tl.to('[data-fx="hint"]', { opacity: 0, duration: t.at(0.3) }, 0)
  tl.to('[data-fx="hero-text"]', { opacity: 0, y: -90, duration: t.at(0.9) }, t.at(t.tailStart - 1.0))
}

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties

export function Hero() {
  return (
    <Scene id="hero" label="Início" focusX={0.5} build={build} first>
      {/* leitura: degradê lateral (desktop) + base escura (mobile), sem cobrir a escultura */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-ink/90 via-ink/60 to-transparent md:hidden" />
      {/* bloco ancorado na base; o respiro superior vem do espaço que sobra, nunca de margem fixa */}
      <div className="scene-pad relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-[clamp(2rem,10svh,6rem)] md:px-10">
        <div data-fx="hero-text" className="flex max-w-xl flex-col items-start lg:max-w-2xl">
          <p className="intro text-sm text-frost/70 sm:text-base" style={delay(0)}>
            {SITE.role} • {SITE.location}
          </p>
          <h1 className="intro t-name font-display mt-[1.5svh] font-bold uppercase text-chrome" style={delay(1)}>
            Gustavo
            <br />
            Moura
          </h1>
          <p className="intro t-lead font-display mt-[2.5svh] max-w-[22ch] font-light" style={delay(2)}>
            Transformo ideias em experiências digitais.
          </p>
          <p className="intro t-body mt-[1.6svh] max-w-md text-frost/65 short:hidden" style={delay(3)}>
            Desenvolvedor Full Stack criando interfaces, APIs e produtos digitais que unem tecnologia, desempenho e experiência.
          </p>
          <div className="intro mt-[3svh] flex flex-wrap gap-3" style={delay(4)}>
            <a href="#projetos" className={btnPrimary}>
              Explorar projetos
            </a>
            <a href="#contato" className={btnGlass}>
              Vamos conversar
            </a>
          </div>
        </div>
        <div data-fx="hint" className="absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-frost/50 md:flex">
          Role para explorar <ArrowDown className="nudge h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </Scene>
  )
}
