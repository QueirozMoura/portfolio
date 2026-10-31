import { useEffect, useMemo, useState } from 'react'
import { detectCompact, detectMotionMode, detectProfile } from './lib/capabilities'
import { MotionContext } from './lib/motion-context'
import { useAnchorLanding } from './lib/anchors'
import { usePerfGovernor } from './lib/perf'
import { Navbar } from './components/Navbar'
import { ProgressBar } from './components/ProgressBar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Tech } from './sections/Tech'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'

/** O perfil muda se o celular girar (retrato ↔ paisagem); só então os frames são trocados. */
function useProfile() {
  const [profile, setProfile] = useState(detectProfile)
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const on = () => setProfile(detectProfile())
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return profile
}

export default function App() {
  const profile = useProfile()
  const [mode] = useState(detectMotionMode)
  const [compact] = useState(detectCompact)
  const motion = useMemo(() => ({ mode, profile, compact }), [mode, profile, compact])
  usePerfGovernor(mode === 'sequence' && profile !== 'd')
  useAnchorLanding(motion.mode, motion.compact)
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
