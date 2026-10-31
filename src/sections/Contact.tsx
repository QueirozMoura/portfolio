import { Mail } from 'lucide-react'
import { Scene } from '../components/Scene'
import { ExtLink, GithubIcon, LinkedinIcon, btnGlass, btnPrimary } from '../components/ui'
import { SITE } from '../data/site'
import type { Timing } from '../config/scenes'

function build(tl: gsap.core.Timeline, t: Timing) {
  // aparece cedo o bastante para o portal ser contemplado com os botões já acessíveis
  tl.fromTo('[data-fx="contact-cta"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: t.at(0.6) }, t.at(1.0))
}

export function Contact() {
  return (
    <Scene id="contato" label="Contato" build={build} focusX={0.5} last>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      <div className="scene-pad relative mx-auto flex h-full max-w-4xl flex-col items-center justify-end px-6 pb-[clamp(2rem,12svh,7rem)] text-center md:px-10">
        <h2 className="font-display t-title-lg max-w-[18ch] font-semibold">Vamos construir algo extraordinário?</h2>
        <p className="t-body mt-[1.6svh] max-w-md text-frost/80">Tem uma ideia, projeto ou oportunidade? Vamos conversar.</p>
        <div data-fx="contact-cta" className="mt-[3.5svh] flex w-full max-w-sm flex-wrap justify-center gap-3 sm:max-w-none">
          <ExtLink href={SITE.github} className={`${btnPrimary} flex-1 justify-center sm:flex-none`}>
            <GithubIcon className="h-4 w-4" /> GitHub<span className="sr-only"> (abre em nova aba)</span>
          </ExtLink>
          <ExtLink href={SITE.linkedin} className={`${btnGlass} flex-1 justify-center sm:flex-none`}>
            <LinkedinIcon className="h-4 w-4" /> LinkedIn<span className="sr-only"> (abre em nova aba)</span>
          </ExtLink>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className={`${btnGlass} flex-1 justify-center sm:flex-none`}>
              <Mail className="h-4 w-4" aria-hidden="true" /> E-mail<span className="sr-only"> (abre o aplicativo de e-mail)</span>
            </a>
          )}
        </div>
      </div>
    </Scene>
  )
}
