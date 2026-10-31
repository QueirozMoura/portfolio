import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../lib/motion-context'
import { Scene } from '../components/Scene'
import { ExtLink, GithubIcon } from '../components/ui'
import { PROJECTS, type Project } from '../data/projects'
import type { Timing } from '../config/scenes'

function build(tl: gsap.core.Timeline, t: Timing) {
  tl.to('[data-fx="proj-head"]', { opacity: 0, y: -60, duration: t.at(0.8) }, t.at(t.tailStart - 1.1))
}

/** Reflexo que segue o ponteiro + leve inclinação 3D da moldura (só mouse; sem hover no toque). */
function onShotMove(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.setProperty('--ry', `${((x - 0.5) * 5).toFixed(2)}deg`)
  el.style.setProperty('--rx', `${((0.5 - y) * 4).toFixed(2)}deg`)
}
function onShotLeave(e: React.PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function hostOf(url?: string) {
  try {
    return url ? new URL(url).host : undefined
  } catch {
    return undefined
  }
}

function Shot({ p, priority }: { p: Project; priority: boolean }) {
  const img = p.image!
  const host = hostOf(p.demo)
  const picture = (
    <img
      src={`/projects/${img.base}-1440.webp`}
      srcSet={`/projects/${img.base}-800.webp 800w, /projects/${img.base}-1440.webp 1440w`}
      sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, calc(100vw - 3rem)"
      width={1440}
      height={810}
      alt={img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className="shot-img block h-auto w-full"
    />
  )
  return (
    <div className="shot-stage" data-fx="shot">
      <div className="shot" onPointerMove={onShotMove} onPointerLeave={onShotLeave}>
        <div className="shot-border">
          <div className="shot-window">
            <div className="shot-bar" aria-hidden="true">
              <span className="shot-dot" />
              <span className="shot-dot" />
              <span className="shot-dot" />
              {host && <span className="shot-url">{host}</span>}
            </div>
            {p.demo ? (
              <ExtLink href={p.demo} className="block" aria-hidden="true" tabIndex={-1}>
                {picture}
              </ExtLink>
            ) : (
              picture
            )}
            <span className="shot-gloss" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ p, flip, priority }: { p: Project; flip: boolean; priority: boolean }) {
  const hasImage = !!p.image
  return (
    <article
      data-fx="card"
      className={`proj-card glass-dense grid w-full gap-6 rounded-[1.75rem] p-3 sm:p-4 lg:items-center lg:gap-10 lg:p-5 ${
        hasImage ? 'lg:grid-cols-12' : ''
      }`}
    >
      {hasImage && (
        <div className={`min-w-0 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <Shot p={p} priority={priority} />
        </div>
      )}
      <div className={`min-w-0 px-2 pb-3 sm:px-3 lg:py-4 ${hasImage ? `lg:col-span-5 ${flip ? 'lg:order-1 lg:pl-4' : 'lg:pr-4'}` : 'lg:px-6'}`}>
        <h3 className="font-display text-2xl font-semibold sm:text-3xl">{p.name}</h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-frost/80 sm:text-base">{p.summary}</p>
        {p.stack && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Stack de ${p.name}`}>
            {p.stack.map((s) => (
              <li key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-frost/85">
                {s}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-4 space-y-1.5 text-sm text-frost/80">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
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
      </div>
    </article>
  )
}

function Gallery() {
  const { mode } = useMotion()
  const ref = useRef<HTMLUListElement>(null)

  // entrada discreta, uma vez por card; o scroll da galeria é o nativo (sem pin)
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || mode !== 'sequence') return
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-fx="card"]').forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
        tl.from(card, { opacity: 0, y: 44, duration: 0.9, ease: 'power3.out', clearProps: 'opacity,transform' })
        const shot = card.querySelector('[data-fx="shot"]')
        if (shot) tl.from(shot, { scale: 0.965, duration: 1.1, ease: 'power3.out', clearProps: 'transform' }, 0.08)
      })
    }, root)
    return () => ctx.revert()
  }, [mode])

  let n = 0
  return (
    <ul ref={ref} className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
      {PROJECTS.map((p) => {
        const flip = !!p.image && n++ % 2 === 1
        return (
          <li key={p.name}>
            <Card p={p} flip={flip} priority={false} />
          </li>
        )
      })}
    </ul>
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
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-8 sm:px-6 md:px-10" style={{ paddingBottom: 'calc(100svh + 4rem)' }}>
          <Gallery />
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
