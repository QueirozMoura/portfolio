import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SideNav } from './components/layout/SideNav'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { JourneySection } from './components/sections/JourneySection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { TechStackSection } from './components/sections/TechStackSection'

function App() {
  return (
    <div className="min-h-screen bg-background text-onSurface">
      <Header />
      <SideNav />
      <main className="overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
