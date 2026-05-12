import { socialLinks } from '../../data/socialLinks'
import { Badge } from '../ui/Badge'

const footerLinks = [
  ...socialLinks
    .filter((link) => link.showInFooter)
    .map((link) => ({ label: link.label, href: link.href, external: link.type === 'external' })),
  { label: 'Documentação', href: '#', external: false },
  { label: 'Status', href: '#', external: false },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surfaceContainerLowest/70 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-onSurface">DevEngine Alpha</p>
            <p className="mt-2 text-sm text-onSurfaceVariant">
              © 2024 Engineered by DevEngine. Construído com precisão neural.
            </p>
          </div>
          <Badge>v1.2.0-stable</Badge>
        </div>
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap items-center gap-4">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-onSurfaceVariant transition-colors hover:text-secondary"
                  aria-label={link.label}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
