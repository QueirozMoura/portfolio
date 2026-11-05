import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { ExtLink, GithubIcon, LinkedinIcon } from '../components/ui'
import { SITE } from '../data/site'

/** Identificador legível a partir das URLs reais (sem inventar handles). */
const handle = (url: string) => url.replace(/\/+$/, '').split('/').pop() ?? url

const SOCIAL = [
  { label: 'GitHub', detail: `@${handle(SITE.github)}`, href: SITE.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', detail: `in/${handle(SITE.linkedin)}`, href: SITE.linkedin, Icon: LinkedinIcon, external: true },
  ...(SITE.email
    ? [{ label: 'E-mail', detail: SITE.email, href: `mailto:${SITE.email}`, Icon: (p: { className?: string }) => <Mail {...p} aria-hidden="true" />, external: false }]
    : []),
]

/**
 * Seção estática de encerramento (sem Scene, canvas, frames nem GSAP).
 * Entrada por scroll-driven animation em CSS, só onde há suporte e sem prefers-reduced-motion.
 */
export function Contact() {
  // destino principal: o e-mail configurado; sem e-mail, o LinkedIn (ambos reais, de data/site.ts)
  const primary = SITE.email ? { href: `mailto:${SITE.email}`, hint: ' (abre o aplicativo de e-mail)' } : { href: SITE.linkedin, hint: ' no LinkedIn (abre em nova aba)' }
  return (
    <section id="contato" aria-labelledby="contato-title" className="contact relative isolate overflow-clip">
      <svg className="contact-mark pointer-events-none absolute" viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false">
        <circle cx="400" cy="0" r="120" stroke="#E8F0FF" strokeOpacity="0.08" />
        <circle cx="400" cy="0" r="220" stroke="#E8F0FF" strokeOpacity="0.06" />
        <circle cx="400" cy="0" r="320" stroke="#E8F0FF" strokeOpacity="0.04" strokeDasharray="2 7" />
        <path d="M400 220A220 220 0 0 1 180 0" stroke="#6496E8" strokeOpacity="0.7" strokeWidth="2" />
        <rect x="174" y="0" width="12" height="12" fill="#6496E8" />
      </svg>

      <div className="mx-auto w-full max-w-[90rem] px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="contact-in contact-top">
          <p className="contact-eyebrow">
            <span className="text-glow">04</span>
            <span className="contact-eyebrow-sep" aria-hidden="true">/</span>
            Contato
          </p>
          <p className="contact-kicker">Tem alguma ideia em mente?</p>
        </div>

        <h2 id="contato-title" className="contact-in contact-title font-grotesk">
          Vamos construir algo <span className="text-glow">incrível?</span>
        </h2>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <div className="contact-in lg:col-span-5">
            <p className="contact-desc">
              Estou aberto a oportunidades, colaborações e novos desafios. Se você tem um projeto em mente ou quer
              conversar sobre tecnologia, vamos nos conectar.
            </p>
            <a href={primary.href} className="contact-cta">
              Vamos conversar
              <span className="contact-cta-icon" aria-hidden="true">
                <ArrowRight className="h-5 w-5" />
              </span>
              <span className="sr-only">{primary.hint}</span>
            </a>
          </div>

          <ul className="contact-in contact-links lg:col-span-6 lg:col-start-7" aria-label="Redes e contato">
            {SOCIAL.map(({ label, detail, href, Icon, external }) => {
              const inner = (
                <>
                  <Icon className="contact-link-icon h-5 w-5" />
                  <span className="contact-link-label font-grotesk">{label}</span>
                  <span className="contact-link-detail">{detail}</span>
                  <ArrowUpRight className="contact-link-arrow h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{external ? ' (abre em nova aba)' : ' (abre o aplicativo de e-mail)'}</span>
                </>
              )
              return (
                <li key={label}>
                  {external ? (
                    <ExtLink href={href} className="contact-link">
                      {inner}
                    </ExtLink>
                  ) : (
                    <a href={href} className="contact-link">
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
