import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotion } from '../lib/motion-context'
import { CROSSFADE, SMOOTHING, SNAP_DISTANCE, getTiming, type SceneId, type Timing } from '../config/scenes'
import { ScrollSequence } from './ScrollSequence'

/** Executa `fn` depois do evento load da página (ou já, se ele passou). Devolve um cancelador. */
function afterPageLoad(fn: () => void) {
  if (document.readyState === 'complete') {
    const t = setTimeout(fn, 0)
    return () => clearTimeout(t)
  }
  window.addEventListener('load', fn, { once: true })
  return () => window.removeEventListener('load', fn)
}

interface SceneProps {
  id: SceneId
  label: string
  /** Conteúdo fixo sobre o canvas durante a cena (texto sincronizado). */
  children: ReactNode
  /** Conteúdo de fluxo normal depois da cena (ex.: cards de projetos), ainda sobre o canvas. */
  after?: ReactNode
  /** Constrói a timeline sincronizada ao scroll. Posições em progresso 0–1; use `t.at(vh)`. */
  build?: (tl: gsap.core.Timeline, t: Timing) => void
  focusX?: number
  /** Escurecimento final do canvas, para leitura do conteúdo que vem depois. */
  endDim?: number
  /** Primeira cena: já visível, sem crossfade de entrada. */
  first?: boolean
  /** Última cena: o degradê inferior funde com o rodapé. */
  last?: boolean
}

/**
 * Uma cena = faixa de scroll de `scroll` vh. O stage (canvas) é sticky e fica fixo do primeiro
 * ao último pixel dessa faixa. A cena seguinte sobe SOBRE os últimos CROSSFADE vh (margem negativa)
 * e entra com fade, então a transição é um crossfade real entre dois canvases, sem tela preta.
 *
 * Um único sistema de suavização: o ScrollTrigger só informa o alvo; o ticker interpola
 * e alimenta tanto a timeline dos textos quanto o frame do canvas.
 */
export function Scene({ id, label, children, after, build, focusX = 0.5, endDim = 0, first = false, last = false }: SceneProps) {
  const { mode, profile, compact } = useMotion()
  const sequence = mode === 'sequence'
  const timing = useMemo(() => getTiming(id, compact), [id, compact])
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0) // progresso suavizado (lido pelo canvas)
  const [active, setActive] = useState(first)
  const [load, setLoad] = useState(first)

  // janela de renderização (perto do viewport) e de pré-carregamento (próximas telas)
  useEffect(() => {
    const root = rootRef.current
    if (!sequence || !root) return
    const near = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '100% 0px 100% 0px' })
    // a pré-carga dos frames só começa depois do evento load: não disputa banda com a primeira pintura (LCP da Hero)
    let cancelLoadWait = () => {}
    const far = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        cancelLoadWait()
        cancelLoadWait = afterPageLoad(() => setLoad(true))
      },
      { rootMargin: '300% 0px 300% 0px' },
    )
    near.observe(root)
    far.observe(root)
    return () => {
      near.disconnect()
      far.disconnect()
      cancelLoadWait()
    }
  }, [sequence, first])

  useLayoutEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!sequence || !root || !track) return
    let target = 0
    let current = 0
    let enterTarget = first ? 1 : 0
    let enter = enterTarget
    let shownProgress = -1
    let shownEnter = -1

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
      build?.(tl, timing)
      if (endDim && dimRef.current) tl.to(dimRef.current, { opacity: endDim, duration: timing.at(1) }, timing.at(timing.tailStart - 1.2))
      tl.set({}, {}, 1) // garante duração 1 → posições = progresso

      // progresso da cena: do 1º pixel fixo até o fim da faixa (sem zona morta)
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => (target = self.progress),
        onRefresh: (self) => {
          target = self.progress
        },
      })
      // entrada (crossfade): enquanto a cena sobe sobre a anterior
      if (!first) {
        ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'top top',
          onUpdate: (self) => (enterTarget = self.progress),
          onRefresh: (self) => (enterTarget = self.progress),
        })
      }

      const tick = (_t: number, dtMs: number) => {
        const k = 1 - Math.exp(-SMOOTHING * (dtMs / 1000))
        const diff = target - current
        current = Math.abs(diff) > SNAP_DISTANCE ? target : current + diff * k
        if (Math.abs(target - current) < 0.0002) current = target
        progressRef.current = current
        // cinco cenas rodam este tick: só mexe no DOM quando o valor mudou (cena parada = custo ~zero)
        if (current !== shownProgress) {
          shownProgress = current
          tl.progress(current)
        }
        if (!first) {
          enter = Math.abs(enterTarget - enter) > SNAP_DISTANCE ? enterTarget : enter + (enterTarget - enter) * k
          if (Math.abs(enterTarget - enter) < 0.0005) enter = enterTarget
          if (enter !== shownEnter) {
            shownEnter = enter
            root.style.opacity = String(Math.min(1, Math.max(0, enter)))
          }
        }
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    }, root)
    return () => {
      ctx.revert()
      root.style.opacity = ''
    }
  }, [sequence, build, timing, endDim, first])

  const stagePad = sequence ? { height: `${(timing.scroll + 1) * 100}svh`, marginTop: first ? undefined : `-${CROSSFADE * 100}svh` } : undefined

  return (
    <section id={id} ref={rootRef} aria-label={label} className="relative isolate" style={sequence ? { marginTop: stagePad?.marginTop } : undefined}>
      <div
        className={
          sequence
            ? 'sticky top-0 z-0 -mb-[100svh] h-svh overflow-hidden bg-ink'
            : 'absolute inset-0 z-0 overflow-hidden bg-ink'
        }
      >
        <picture>
          <source media="(min-width: 768px)" srcSet={`/posters/${id}.webp`} />
          <img
            src={`/posters/${id}-m.webp`}
            alt=""
            width={1600}
            height={894}
            decoding="async"
            loading={first ? 'eager' : 'lazy'}
            fetchPriority={first ? 'high' : 'auto'}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: `${focusX * 100}% 50%` }}
          />
        </picture>
        {sequence && (
          <ScrollSequence
            id={id}
            key={`${id}-${profile}`}
            progressRef={progressRef}
            frameEnd={timing.frameEnd}
            focusX={focusX}
            load={load}
            active={active && load}
            className="absolute inset-0 h-full w-full"
          />
        )}
        <div className="scene-vignette pointer-events-none absolute inset-0" />
        <div ref={dimRef} className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: sequence ? 0 : endDim }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-ink/80 to-transparent" />
        {last && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-ink to-transparent" />}
      </div>
      <div ref={trackRef} className="relative z-10" style={stagePad && { height: stagePad.height }}>
        <div className={sequence ? 'sticky top-0 h-svh' : 'flex min-h-svh flex-col justify-center py-28'}>{children}</div>
      </div>
      {after}
    </section>
  )
}
