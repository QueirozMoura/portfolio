import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV } from '../data/site'

export function Navbar() {
  const [active, setActive] = useState<string>('hero')
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)

  // Seção ativa = a última cujo topo já passou do centro da tela. As cenas se sobrepõem no crossfade,
  // então um IntersectionObserver (que só avisa mudanças) deixaria o estado preso na seção anterior.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let current: string = NAV[0].id
      for (const { id } of NAV) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) current = id
      }
      setActive(current)
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav aria-label="Principal" className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2">
        <a href="#hero" className="font-display text-lg font-semibold" aria-label="Gustavo Moura — início">
          GM<span className="text-cyan">.</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className="relative block rounded-full px-4 py-2 text-sm text-frost/60 transition-colors hover:text-frost aria-[current=true]:text-frost"
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-cyan to-violet transition-opacity duration-300 ${active === id ? 'opacity-100' : 'opacity-0'}`}
                />
              </a>
            </li>
          ))}
        </ul>
        <button
          ref={menuBtn}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul id="menu-mobile" className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-2 md:hidden">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? 'true' : undefined}
                className="flex min-h-12 items-center rounded-2xl px-4 text-base text-frost/70 aria-[current=true]:bg-white/10 aria-[current=true]:text-frost"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
