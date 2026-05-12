import { GitBranch, Link, Mail, Menu, MessageCircle, Terminal, X } from 'lucide-react'
import { useState } from 'react'
import { socialLinks } from '../../data/socialLinks'
import { Button } from '../ui/Button'

const navLinks = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Tecnologias', href: '#tecnologias' },
  { label: 'Jornada', href: '#jornada' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const iconMap = {
    github: GitBranch,
    linkedin: Link,
    mail: Mail,
    'message-circle': MessageCircle,
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-surfaceContainerLowest/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="inline-flex items-center gap-2 text-sm font-semibold text-onSurface">
          <Terminal className="h-4 w-4 text-secondary" aria-hidden="true" />
          <span>GM DevWeb</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-onSurfaceVariant transition-colors hover:text-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="#contato" aria-label="Contrate-me">
            Contrate-me
          </Button>

          <div className="flex items-center gap-1 border-l border-outlineVariant/30 pl-3">
            {socialLinks
              .filter((link) => link.showInHeaderDesktop)
              .map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap]
                const isExternal = link.type === 'external' || link.type === 'whatsapp' || link.type === 'calendly'

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    title={link.label}
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-onSurfaceVariant transition-all duration-300 hover:bg-white/5 hover:text-secondary"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                  </a>
                )
              })}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-onSurface md:hidden"
          aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileOpen ? (
        <nav
          className="border-t border-white/10 bg-surfaceContainerLowest/95 px-4 py-4 backdrop-blur-xl md:hidden"
          aria-label="Navegação mobile"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-onSurfaceVariant transition-colors hover:bg-surfaceContainer hover:text-secondary"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                href="#contato"
                className="w-full"
                aria-label="Contrate-me"
                onClick={() => setIsMobileOpen(false)}
              >
                Contrate-me
              </Button>
            </li>
            <li className="border-t border-white/10 pt-3">
              <p className="mb-2 px-1 text-xs uppercase tracking-wide text-onSurfaceVariant/80">
                Contato rápido
              </p>
              <ul className="space-y-2">
                {socialLinks
                  .filter((link) => link.showInMobileMenu)
                  .map((link) => {
                    const Icon = iconMap[link.icon as keyof typeof iconMap]
                    const isExternal =
                      link.type === 'external' || link.type === 'whatsapp' || link.type === 'calendly'

                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          aria-label={link.label}
                          title={link.label}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-onSurfaceVariant transition-all duration-300 hover:bg-surfaceContainer hover:text-secondary"
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                          <span>{link.label}</span>
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
