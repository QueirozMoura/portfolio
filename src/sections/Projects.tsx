import { ArrowUpRight } from 'lucide-react'
import { ExtLink, GithubIcon } from '../components/ui'
import { PROJECTS, type Project } from '../data/projects'
import { SITE } from '../data/site'

/** Ordem de exibição (os dados ficam intactos em data/projects.ts; projetos fora da lista vão para o fim). */
const ORDER = ['Agendly', 'JFQ Assistência Técnica', 'SyncLab', 'Garantia+', 'Pulse', 'ServiceFlow']
const rank = (p: Project) => {
  const i = ORDER.indexOf(p.name)
  return i === -1 ? ORDER.length : i
}
const ITEMS = [...PROJECTS].sort((a, b) => rank(a) - rank(b))

/**
 * Composição editorial (desktop, 12 colunas): destaque largo → 7/5 → 5/7 → destaque largo invertido.
 * Os cards menores à direita descem um pouco (offset), quebrando a grade de forma controlada.
 */
type Layout = { variant: 'feature' | 'card'; span: string; flip?: boolean; offset?: boolean; sizes: string }
const FEATURE_SIZES = '(min-width: 1440px) 780px, (min-width: 1024px) 55vw, (min-width: 768px) calc(100vw - 3rem), calc(100vw - 2rem)'
const LAYOUT: Layout[] = [
  { variant: 'feature', span: 'md:col-span-2 lg:col-span-12', sizes: FEATURE_SIZES },
  { variant: 'card', span: 'lg:col-span-7', sizes: '(min-width: 1440px) 780px, (min-width: 1024px) 54vw, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)' },
  { variant: 'card', span: 'lg:col-span-5', offset: true, sizes: '(min-width: 1440px) 550px, (min-width: 1024px) 38vw, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)' },
  { variant: 'card', span: 'lg:col-span-5', sizes: '(min-width: 1440px) 550px, (min-width: 1024px) 38vw, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)' },
  { variant: 'card', span: 'lg:col-span-7', offset: true, sizes: '(min-width: 1440px) 780px, (min-width: 1024px) 54vw, (min-width: 768px) calc(50vw - 2rem), calc(100vw - 2rem)' },
  { variant: 'feature', span: 'md:col-span-2 lg:col-span-12', flip: true, sizes: FEATURE_SIZES },
]
const layoutOf = (i: number): Layout => LAYOUT[i] ?? { variant: 'card', span: 'lg:col-span-6', sizes: '(min-width: 768px) 50vw, calc(100vw - 2rem)' }

const pad = (n: number) => String(n).padStart(2, '0')

function Media({ p, sizes }: { p: Project; sizes: string }) {
  const img = p.image
  const inner = img ? (
    <picture>
      <source
        type="image/avif"
        srcSet={`/projects/${img.base}-640.avif 640w, /projects/${img.base}-960.avif 960w, /projects/${img.base}-1440.avif 1440w`}
        sizes={sizes}
      />
      <img
        src={`/projects/${img.base}-800.webp`}
        srcSet={`/projects/${img.base}-800.webp 800w, /projects/${img.base}-1440.webp 1440w`}
        sizes={sizes}
        width={1440}
        height={810}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="pcard-img"
      />
    </picture>
  ) : (
    // sem screenshot real: placeholder neutro (nunca simula a interface do projeto)
    <div className="pcard-placeholder" role="img" aria-label={`${p.name} — imagem indisponível`}>
      <span className="font-grotesk">{p.name}</span>
    </div>
  )
  const href = p.demo ?? p.code
  // a imagem também leva ao projeto, mas fica fora do leitor de tela e do Tab (os links nomeados estão abaixo)
  return (
    <ExtLink href={href} className="pcard-media" aria-hidden="true" tabIndex={-1}>
      {inner}
    </ExtLink>
  )
}

function Links({ p }: { p: Project }) {
  return (
    <div className="pcard-links">
      {p.demo && (
        <ExtLink href={p.demo} className="plink plink-demo">
          Ver demo
          <ArrowUpRight className="plink-arrow h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> de {p.name} (abre em nova aba)</span>
        </ExtLink>
      )}
      <ExtLink href={p.code} className="plink plink-code">
        <GithubIcon className="h-4 w-4" />
        GitHub
        <ArrowUpRight className="plink-arrow h-4 w-4" aria-hidden="true" />
        <span className="sr-only"> — código de {p.name} (abre em nova aba)</span>
      </ExtLink>
    </div>
  )
}

function Card({ p, index, layout }: { p: Project; index: number; layout: Layout }) {
  const feature = layout.variant === 'feature'
  return (
    <li className={`pcard-slot ${layout.span} ${layout.offset ? 'pcard-offset' : ''}`}>
      <article className={`pcard ${feature ? 'pcard-feature' : ''} ${layout.flip ? 'pcard-flip' : ''}`} aria-labelledby={`proj-${index}`}>
        <Media p={p} sizes={layout.sizes} />
        <div className="pcard-body">
          <p className="pcard-index" aria-hidden="true">
            <span className="text-lime">{pad(index + 1)}</span> / {pad(ITEMS.length)}
          </p>
          <h3 id={`proj-${index}`} className="pcard-title font-grotesk">
            {p.name}
          </h3>
          <p className="pcard-summary">{p.summary}</p>
          {feature && p.highlights.length > 0 && (
            <ul className="pcard-highlights">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {p.stack && (
            <ul className="pcard-stack" aria-label={`Tecnologias de ${p.name}`}>
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
          <Links p={p} />
        </div>
      </article>
    </li>
  )
}

/**
 * Seção estática (sem Scene, canvas, frames nem GSAP). A entrada dos cards é CSS puro
 * (scroll-driven animation, só onde há suporte); sem suporte ou sem JS, tudo já aparece.
 */
export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="projects relative isolate pb-8 sm:pb-12 lg:pb-16">
      <div className="mx-auto w-full max-w-[90rem] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-10 lg:pt-32">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="projects-eyebrow">
              <span className="projects-eyebrow-line" aria-hidden="true" />
              Trabalhos selecionados <span className="projects-eyebrow-sep">/</span> 2026
            </p>
            <h2 id="projetos-title" className="projects-title font-grotesk">
              Aplicações que resolvem <span className="text-lime">problemas reais.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="projects-desc">
              Uma seleção dos meus principais projetos, desenvolvidos com foco em usabilidade, desempenho e soluções reais.
            </p>
          </div>
        </header>

        <ul className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {ITEMS.map((p, i) => (
            <Card key={p.name} p={p} index={i} layout={layoutOf(i)} />
          ))}
        </ul>

        <div className="projects-more">
          <p>Mais experimentos e código aberto no GitHub.</p>
          <ExtLink href={SITE.github} className="plink plink-code">
            <GithubIcon className="h-4 w-4" />
            Ver perfil no GitHub
            <ArrowUpRight className="plink-arrow h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </ExtLink>
        </div>
      </div>
    </section>
  )
}
