import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonProps = BaseProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseClass =
    variant === 'primary'
      ? 'btn-primary-gradient'
      : 'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-surfaceContainerHigh/50 px-5 py-3 font-medium text-onSurface transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:text-secondary'

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${baseClass} ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
