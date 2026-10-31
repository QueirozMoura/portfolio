import { useMemo } from 'react'
import { detectCompact, detectMotionMode, detectProfile } from './lib/capabilities'
import { MotionContext } from './lib/motion-context'
import { Navbar } from './components/Navbar'
import { ProgressBar } from './components/ProgressBar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Tech } from './sections/Tech'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

export default function App() {
  const motion = useMemo(() => ({ mode: detectMotionMode(), profile: detectProfile(), compact: detectCompact() }), [])
  return (
    <MotionContext.Provider value={motion}>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-full bg-frost px-4 py-2 text-sm font-semibold text-ink focus:translate-y-0"
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
    </MotionContext.Provider>
  )
}
