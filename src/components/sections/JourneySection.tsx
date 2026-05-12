import { education, timeline } from '../../data/timeline'
import { Badge } from '../ui/Badge'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function JourneySection() {
  return (
    <section id="jornada" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Jornada & Experiência"
          subtitle="Uma trajetória focada na construção de sistemas escaláveis, arquiteturas resilientes e na intersecção entre engenharia de software e inteligência artificial."
        />

        <div className="relative mt-10 space-y-8 before:absolute before:left-3 before:top-0 before:h-full before:w-px before:bg-white/15 sm:before:left-1/2">
          {timeline.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="relative pl-10 sm:w-1/2 sm:pl-0 sm:pr-10 sm:odd:ml-auto sm:odd:pl-10 sm:odd:pr-0"
            >
              <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-secondary shadow-neon sm:left-auto sm:right-[-6px] sm:odd:left-[-6px] sm:odd:right-auto" />
              <GlassCard>
                <p className="text-xs font-mono uppercase tracking-wider text-secondary">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold text-onSurface">{item.role}</h3>
                <p className="text-sm text-onSurfaceVariant">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-onSurfaceVariant">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </GlassCard>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <GlassCard key={item.title} className="p-5">
              <h4 className="text-base font-semibold text-onSurface">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-onSurfaceVariant">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
