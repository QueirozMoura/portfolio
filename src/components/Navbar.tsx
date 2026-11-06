import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { NAV, SITE } from '../data/site'

function ResumeButton({ className = '' }: { className?: string }) {
  if (SITE.resume) {
    return (
      <a href={SITE.resume} download="Curriculo_Gustavo_Moura.pdf" type="application/pdf" className={`nav-cta ${className}`}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Baixar Currículo
      </a>
    )
  }
  // sem arquivo publicado: o botão fica visível, mas desativado (nenhum caminho é inventado)
  return (
    <button type="button" disabled title="Currículo em breve" className={`nav-cta ${className}`}>
      <Download className="h-4 w-4" aria-hidden="true" />
      Baixar Currículo
      <span className="sr-only"> (em breve)</span>
    </button>
  )
}

export function Navbar() {
  const [active, setActive] = useState<string>('hero')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  // Seção ativa = a que tem o topo mais baixo entre as que já passaram do centro da tela.
  // O menu não segue a ordem da página, por isso a comparação é pela posição, não pela ordem do NAV.
  // Só roda em resposta a eventos de scroll (1× por quadro, via rAF), nunca em loop.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let current: string = NAV[0].id
      let best = -Infinity
      for (const { id } of NAV) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= mid && top > best) {
          best = top
          current = id
        }
      }
      setActive(current)
      setScrolled(window.scrollY > 8)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // menu mobile: Esc fecha e devolve o foco; abrir move o foco para o primeiro link; fecha ao virar desktop
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector<HTMLElement>('a, button:not([disabled])')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50" data-scrolled={scrolled || open ? 'true' : undefined}>
      <nav aria-label="Principal" className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-10">
        <a href="#hero" className="nav-logo font-grotesk" aria-label="Gustavo Moura — início">
          GM<span className="text-glow" aria-hidden="true">•</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'location' : undefined} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ResumeButton className="hidden sm:inline-flex" />
          <button
            ref={menuBtn}
            type="button"
            className="nav-toggle lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div ref={panel} id="menu-mobile" hidden={!open} className="nav-panel lg:hidden">
        <ul className="mx-auto max-w-[90rem] px-4 pb-5 pt-2 sm:px-6">
          {NAV.map(({ id, label }, i) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined} className="nav-panel-link font-grotesk">
                <span className="nav-panel-index" aria-hidden="true">
                  0{i + 1}
                </span>
                {label}
              </a>
            </li>
          ))}
          <li className="mt-4 sm:hidden">
            <ResumeButton className="w-full justify-center" />
          </li>
        </ul>
      </div>
    </header>
  )
}
