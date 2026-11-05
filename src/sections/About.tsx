import { AboutGraphic } from '../components/AboutGraphic'

const FACTS = [
  { term: 'Formação', value: 'Análise e Desenvolvimento de Sistemas', note: 'UNIASSELVI' },
  { term: 'Especialidade', value: 'Desenvolvimento Full Stack' },
  { term: 'Foco atual', value: 'Projetos reais e evolução profissional' },
]

/**
 * Seção estática (sem Scene, canvas, frames nem GSAP). Entrada por scroll-driven animation em CSS,
 * só onde há suporte e sem prefers-reduced-motion; caso contrário o conteúdo já aparece.
 */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="about relative isolate overflow-clip">
      <div className="about-inner mx-auto w-full max-w-[90rem] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-36">
        <header className="about-in">
          <p className="about-eyebrow">
            <span className="text-glow">01</span>
            <span className="about-eyebrow-sep" aria-hidden="true">/</span>
            Sobre mim
          </p>
          <h2 id="sobre-title" className="about-title font-grotesk">
            Mais do que código, <span className="text-glow">construo soluções.</span>
          </h2>
        </header>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <div className="about-art about-in lg:col-span-5">
            <AboutGraphic className="about-graphic" />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <div className="about-text about-in">
              <p className="about-lead">
                Sou Gustavo Moura, desenvolvedor Full Stack e estudante de Análise e Desenvolvimento de Sistemas. Gosto de
                transformar ideias em aplicações funcionais, unindo interfaces bem construídas, lógica de negócio e boas
                práticas de desenvolvimento.
              </p>
              <p>
                Minha experiência vem principalmente de projetos próprios e aplicações reais. Neles, participo de todas
                as etapas, do planejamento à implementação e à publicação, trabalhando com interfaces, APIs,
                autenticação, bancos de dados, integrações e deploy.
              </p>
              <p>
                Estou em constante evolução e busco oportunidades para aprender com outros profissionais, contribuir com
                soluções e crescer na área de tecnologia.
              </p>
            </div>

            <dl className="about-facts about-in">
              {FACTS.map(({ term, value, note }) => (
                <div key={term} className="about-fact">
                  <dt>{term}</dt>
                  <dd className="font-grotesk">{value}</dd>
                  {note && <dd className="about-fact-note">{note}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
