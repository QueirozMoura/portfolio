interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionTitle({ title, subtitle, align = 'left' }: SectionTitleProps) {
  return (
    <header className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <h2 className="text-3xl font-bold tracking-tight text-onSurface sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-onSurfaceVariant sm:text-lg">{subtitle}</p>
      ) : null}
    </header>
  )
}
