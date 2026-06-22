import { lazy, Suspense, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { useIsMobile, useReducedMotion } from "@/hooks/useReducedMotion"

const HeroScene = lazy(() =>
  import("@/components/canvas/HeroScene").then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useGSAP(
    () => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-label", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-name", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
        .from(".hero-company", { opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
    },
    { scope: containerRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center md:px-12"
    >
      {!mobile && !reduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      <div className="relative z-10 max-w-4xl">
        <p className="hero-label mb-4 text-sm tracking-[0.3em] text-slate-500 uppercase">
          Portfolio · 2026
        </p>
        <h1 className="hero-name font-display text-6xl font-extrabold tracking-tight text-white md:text-8xl lg:text-9xl">
          {profile.name}
        </h1>
        <p className="hero-title mt-6 text-lg text-slate-300 md:text-2xl">
          <span className="gradient-text font-medium">{profile.title}</span>
        </p>
        <div className="hero-company mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          意向 · {profile.targetCompany}
        </div>
        <div className="hero-cta mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            查看项目
          </a>
          <a
            href="#ideal-positions"
            className="rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-400"
          >
            理想职位
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
