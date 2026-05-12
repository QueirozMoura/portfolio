import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-secondary ${className}`}
    >
      {children}
    </span>
  )
}
