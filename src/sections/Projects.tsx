import { ArrowUpRight, Check } from 'lucide-react'
import { Scene } from '../components/Scene'
import { ExtLink, GithubIcon } from '../components/ui'
import { PROJECTS, type Project } from '../data/projects'
import type { Timing } from '../config/scenes'

function build(tl: gsap.core.Timeline, t: Timing) {
  tl.to('[data-fx="proj-head"]', { opacity: 0, y: -60, duration: t.at(0.8) }, t.at(t.tailStart - 1.1))
}

function onMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Card({ p }: { p: Project }) {
  return (
    <article onPointerMove={onMove} className="glass-dense sheen flex w-full flex-col rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{p.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-frost/75">{p.summary}</p>
      {p.stack && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Stack de ${p.name}`}>
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-frost/80">
              {s}
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-4 space-y-1.5 text-sm text-frost/75">
        {p.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {p.demo && (
          <ExtLink
            href={p.demo}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-frost px-4 text-sm font-semibold text-ink transition hover:bg-cyan"
          >
            Ver demo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> de {p.name} (abre em nova aba)</span>
          </ExtLink>
        )}
        <ExtLink
          href={p.code}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-4 text-sm text-frost transition hover:border-cyan/60 hover:bg-white/5"
        >
          <GithubIcon className="h-4 w-4" /> Código
          <span className="sr-only"> de {p.name} no GitHub (abre em nova aba)</span>
        </ExtLink>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Scene
      id="projetos"
      label="Projetos"
      build={build}
      endDim={0.62}
      after={
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-8 md:px-10" style={{ paddingBottom: 'calc(100svh + 4rem)' }}>
          <ul className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <li key={p.name} className="flex">
                <div className="flex w-full">
                  <Card p={p} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
      <div className="scene-pad relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-[clamp(2rem,10svh,6rem)] md:px-10">
        <div data-fx="proj-head" className="max-w-2xl">
          <h2 className="font-display t-title-lg font-semibold">Projetos que saíram do papel.</h2>
          <p className="t-body mt-[1.6svh] max-w-lg text-frost/75">
            Aplicações reais, desafios técnicos e soluções construídas do zero.
          </p>
        </div>
      </div>
    </Scene>
  )
}
