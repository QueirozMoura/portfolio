import { Scene } from '../components/Scene'
import { TechGlyph } from '../components/ui'
import { TECH_GROUPS } from '../data/stack'
import type { Timing } from '../config/scenes'

function build(tl: gsap.core.Timeline, t: Timing) {
  const { at } = t
  tl.fromTo('[data-fx="tech-head"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: at(0.5) }, at(0.1))
  // um grupo por vez, alternando os lados enquanto a câmera atravessa o núcleo
  // no mobile (coluna única) mantém a ordem natural; no desktop intercala esquerda/direita
  const wide = window.matchMedia('(min-width: 1024px)').matches
  const ORDER = wide ? [0, 3, 1, 4, 2, 5] : [0, 1, 2, 3, 4, 5]
  ORDER.forEach((group, n) => {
    const side = !wide ? 0 : group < 3 ? -1 : 1
    tl.fromTo(`[data-fx="group-${group}"]`, { opacity: 0, x: side * 70, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: at(0.5) }, at(0.7 + n * 0.4))
  })
  tl.to('[data-fx="tech"]', { opacity: 0, y: -70, duration: at(0.9) }, at(t.tailStart - 0.2))
}

export function Tech() {
  return (
    <Scene id="tecnologias" label="Tecnologias" build={build}>
      <div className="pointer-events-none absolute inset-0 bg-ink/30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_30%,rgb(3_3_8/0.6),transparent)]" />
      <div className="scene-pad relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pb-4 short:justify-start md:px-10">
        <div data-fx="tech">
          <div data-fx="tech-head" className="mx-auto max-w-2xl text-center">
            <h2 className="font-display t-title font-semibold">Tecnologia com propósito.</h2>
            <p className="t-body mx-auto mt-[1.2svh] max-w-md text-frost/75 short:hidden">
              Do frontend à infraestrutura, conectando cada parte da solução.
            </p>
          </div>
          <div className="mt-[2svh] grid gap-2 short:gap-1.5 sm:gap-3 short:landscape:grid-cols-2 lg:mt-[4svh] lg:grid-cols-[1fr_minmax(8rem,16rem)_1fr] lg:gap-x-6">
            {[0, 1].map((col) => (
              <div key={col} className={`grid content-start gap-2 short:gap-1.5 sm:gap-3 ${col === 1 ? 'lg:col-start-3' : 'lg:col-start-1'} lg:row-start-1`}>
                {TECH_GROUPS.slice(col * 3, col * 3 + 3).map((g, k) => {
                  const i = col * 3 + k
                  return (
                    <div key={g.title} data-fx={`group-${i}`} className="glass-dense rounded-2xl px-4 py-2.5 short:py-1 sm:py-3">
                      <h3 className="text-sm font-medium text-frost short:text-[13px]">{g.title}</h3>
                      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 short:mt-0.5 sm:gap-x-4 sm:gap-y-1">
                        {g.items.map((t) => (
                          <li key={t.name} className="flex items-center gap-1.5 text-xs text-frost/80 short:text-[11px] sm:text-[13px]">
                            <TechGlyph icon={t.icon} className="h-3.5 w-3.5 shrink-0 text-cyan" />
                            {t.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  )
}
