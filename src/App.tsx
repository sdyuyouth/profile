import { useState } from "react"
import type { PositionRelevance } from "@/data/idealPositions"
import { PositionContext } from "@/context/PositionContext"
import { useLenis } from "@/hooks/useLenis"
import { AmbientBackground } from "@/components/layout/AmbientBackground"
import { CustomCursor } from "@/components/layout/CustomCursor"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { MouseGlow } from "@/components/layout/MouseGlow"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { IdealPositions } from "@/components/sections/IdealPositions"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"

function AppContent() {
  useLenis()

  return (
    <>
      <AmbientBackground />
      <div className="noise-overlay" aria-hidden />
      <CustomCursor />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <IdealPositions />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [activePositionId, setActivePositionId] =
    useState<PositionRelevance>("vibe-coding")

  return (
    <PositionContext.Provider value={{ activePositionId, setActivePositionId }}>
      <AppContent />
    </PositionContext.Provider>
  )
}
