import { ArrowRight, Circle, Download } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { socialLinks } from '../../data/socialLinks'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

const linkedinHref = socialLinks.find((link) => link.icon === 'linkedin')?.href ?? '#'
const githubHref = socialLinks.find((link) => link.icon === 'github')?.href ?? '#'

export function HeroSection() {
  return (
    <section id="inicio" className="bg-gradient-hero relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24">
        <div>
          <Badge className="gap-2">
            <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400 animate-pulse" />
            DISPONÍVEL PARA NOVOS PROJETOS
          </Badge>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-onSurface sm:text-5xl lg:text-6xl">
            Gustavo <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Moura</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-onSurfaceVariant sm:text-lg">
            Desenvolvedor Full Stack focado em criar experiências digitais modernas, performáticas e
            visualmente marcantes. Especializado em Front-End premium, interfaces inteligentes e
            aplicações escaláveis com IA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#projetos">
              Ver Projetos <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#contato" variant="ghost">
              Entrar em Contato
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <Button
              href={linkedinHref}
              variant="ghost"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Abrir LinkedIn em nova aba"
              className="h-10 rounded-xl border-white/10 bg-surfaceContainerHigh/45 px-4 py-2 text-sm text-onSurfaceVariant backdrop-blur-md hover:-translate-y-0.5 hover:border-secondary/45 hover:bg-surfaceContainerHigh/55 hover:text-onSurface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
            >
              <FaLinkedin className="h-4 w-4" /> LinkedIn
            </Button>
            <Button
              href={githubHref}
              variant="ghost"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Abrir GitHub em nova aba"
              className="h-10 rounded-xl border-white/10 bg-surfaceContainerHigh/45 px-4 py-2 text-sm text-onSurfaceVariant backdrop-blur-md hover:-translate-y-0.5 hover:border-secondary/45 hover:bg-surfaceContainerHigh/55 hover:text-onSurface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
            >
              <FaGithub className="h-4 w-4" /> GitHub
            </Button>
            <Button
              href={`${import.meta.env.BASE_URL}curriculo.pdf`}
              variant="ghost"
              download
              aria-label="Baixar currículo em PDF"
              className="h-10 rounded-xl border-secondary/30 bg-gradient-to-r from-secondary/20 to-tertiary/20 px-4 py-2 text-sm text-onSurface backdrop-blur-md hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
            >
              <Download className="h-4 w-4" /> Baixar Currículo
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="glass-card font-mono text-sm leading-relaxed text-onSurfaceVariant">
            <p className="mb-3 text-secondary">{'>'} terminal://devengine-alpha</p>
            <pre className="overflow-x-auto text-onSurface">
{`const deploy = () => {
  status: 'online',
  stack: 'React + IA'
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
