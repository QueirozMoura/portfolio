import { techStack } from '../../data/techStack'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function TechStackSection() {
  return (
    <section id="tecnologias" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="The Engine Room"
          subtitle="Ferramentas de precisão para desafios modernos."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {techStack.map((item) => (
            <GlassCard key={item.name} className="group p-5">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 font-mono text-sm font-bold text-secondary transition-all group-hover:scale-105 group-hover:bg-secondary/25">
                {item.short}
              </div>
              <h3 className="text-base font-semibold text-onSurface">{item.name}</h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-onSurfaceVariant">
                {item.category}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
