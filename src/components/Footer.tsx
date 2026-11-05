import { useSyncExternalStore } from 'react'
import { ExtLink } from './ui'
import { SITE } from '../data/site'

const noSubscribe = () => () => {}
const currentYear = () => new Date().getFullYear()
/** O HTML pré-renderizado leva o ano do build; na hidratação o React usa esse valor e depois corrige, se mudou. */
const buildYear = () => __BUILD_YEAR__

/** Rodapé contínuo à seção Contato: identidade, local, links compactos e ano corrente. */
export function Footer() {
  const year = useSyncExternalStore(noSubscribe, currentYear, buildYear)
  return (
    <footer className="site-footer">
      <div className="mx-auto w-full max-w-[90rem] px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-10 lg:pb-10">
        <div className="footer-inner grid gap-8 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex items-center gap-4">
            <a href="#hero" className="footer-logo font-grotesk" aria-label="Gustavo Moura — voltar ao início">
              GM<span className="text-lime" aria-hidden="true">•</span>
            </a>
            <p className="footer-id">
              <span className="text-paper">{SITE.name}</span>
              <span className="footer-dot" aria-hidden="true" />
              {SITE.location}
            </p>
          </div>

          <div className="footer-meta">
            <ul className="footer-links" aria-label="Redes">
              <li>
                <ExtLink href={SITE.github} className="footer-link">
                  GitHub<span className="sr-only"> (abre em nova aba)</span>
                </ExtLink>
              </li>
              <li>
                <ExtLink href={SITE.linkedin} className="footer-link">
                  LinkedIn<span className="sr-only"> (abre em nova aba)</span>
                </ExtLink>
              </li>
            </ul>
            <p className="footer-note">© {year} · Desenvolvido com atenção aos detalhes.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
