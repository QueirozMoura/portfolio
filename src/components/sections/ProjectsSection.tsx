import { ArrowUpRight, GitBranch } from 'lucide-react'
import { projects } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Projetos em Destaque"
          subtitle="Aplicações de alta performance onde código, design e arquitetura se encontram."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <GlassCard key={project.title} className="flex h-full flex-col">
              <h3 className="text-xl font-semibold text-onSurface">{project.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-onSurfaceVariant">{project.description}</p>
              <div className="mt-6 flex gap-3">
                <Button
                  href={project.demoUrl}
                  rel={project.demoTarget === '_blank' ? 'noopener noreferrer' : undefined}
                  target={project.demoTarget}
                  variant="ghost"
                >
                  Demo <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button href={project.codeUrl} variant="ghost">
                  Código <GitBranch className="h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="glass-card mt-10 text-center">
          <h3 className="text-2xl font-bold text-onSurface">Vamos construir algo de alto impacto?</h3>
          <p className="mx-auto mt-4 max-w-2xl text-onSurfaceVariant">
            Estou disponível para projetos seletivos envolvendo engenharia full stack, arquitetura cloud
            e soluções com IA.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#contato">Agendar conversa</Button>
            <Button href="https://github.com/QueirozMoura" variant="ghost" target="_blank">
              Ver GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
