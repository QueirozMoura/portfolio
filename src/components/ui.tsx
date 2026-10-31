import type { ReactNode } from 'react'
import { siGithub } from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'
import type { TechIcon } from '../data/stack'

export function BrandIcon({ icon, className = 'h-4 w-4' }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export const GithubIcon = (p: { className?: string }) => <BrandIcon icon={siGithub} {...p} />
export const LinkedinIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

export function TechGlyph({ icon, className = 'h-4 w-4' }: { icon: TechIcon; className?: string }) {
  if (icon.kind === 'brand') return <BrandIcon icon={icon.icon} className={className} />
  const Lucide = icon.icon
  return <Lucide className={className} aria-hidden="true" strokeWidth={1.75} />
}

/** Link externo seguro. */
export function ExtLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

export const btnPrimary =
  'inline-flex min-h-12 items-center gap-2 rounded-full bg-frost px-6 text-sm font-semibold text-ink transition duration-300 hover:bg-cyan hover:shadow-[0_0_40px_-6px_var(--color-cyan)]'
export const btnGlass =
  'glass inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-frost transition duration-300 hover:border-cyan/60 hover:bg-white/10'
