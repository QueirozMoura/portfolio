import { Briefcase, Cpu, Home, Mail, Orbit } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Início', href: '#inicio', icon: Home },
  { label: 'Projetos', href: '#projetos', icon: Briefcase },
  { label: 'Tecnologias', href: '#tecnologias', icon: Cpu },
  { label: 'Jornada', href: '#jornada', icon: Orbit },
  { label: 'Contato', href: '#contato', icon: Mail },
]

export function SideNav() {
  const [showOnlyOnHero, setShowOnlyOnHero] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowOnlyOnHero(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.35,
      },
    )

    observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  return (
    <aside
      className={`fixed left-6 top-[40%] z-40 hidden -translate-y-1/2 ${
        showOnlyOnHero ? 'lg:block' : 'lg:hidden'
      }`}
    >
      <nav className="glass-panel rounded-2xl p-3" aria-label="Navegação lateral">
        <ul className="space-y-2">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-onSurfaceVariant transition-all duration-300 hover:bg-surfaceContainer hover:text-secondary"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
