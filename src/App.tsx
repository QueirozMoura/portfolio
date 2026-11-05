import { Navbar } from './components/Navbar'
import { ProgressBar } from './components/ProgressBar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Tech } from './sections/Tech'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

/**
 * Página única e estática: todas as seções são HTML + CSS (+ SVG inline). Nenhuma lógica depende do
 * navegador durante a renderização, o que permite pré-renderizar o HTML no build (ver scripts/prerender.mjs).
 */
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <ProgressBar />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Tech />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
