import { lazy, Suspense, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { useIsMobile, useReducedMotion } from "@/hooks/useReducedMotion"

const HeroScene = lazy(() =>
  import("@/components/canvas/HeroScene").then((m) => ({ default: m.HeroScene })),
)

const floatingTags = [
  "AI Agent",
  "Vibe Coding",
  "B2B 外贸",
  "Full-Stack",
  "Cloudflare",
  "OpenClaw",
]

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useGSAP(
    () => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
        .from(".hero-char", {
          opacity: 0, y: 60, stagger: 0.07, duration: 0.8,
        }, "-=0.2")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-badge", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.3")
        .from(".hero-cta > *", { opacity: 0, y: 16, stagger: 0.08, duration: 0.45 }, "-=0.2")
        .from(".hero-tag", { opacity: 0, y: 10, stagger: 0.05, duration: 0.35 }, "-=0.2")
    },
    { scope: containerRef, dependencies: [reduced] },
  )

  const chars = profile.name.split("")

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 md:px-10"
    >
      {!mobile && !reduced && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}

      {(mobile || reduced) && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-5xl text-center">
        <p className="hero-eyebrow font-mono mb-6 text-xs tracking-[0.3em] text-zinc-500 uppercase">
          Portfolio · 2026
        </p>

        <h1 className="font-display flex justify-center gap-1 md:gap-2">
          {chars.map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block text-7xl font-bold tracking-tight text-white md:text-8xl lg:text-[7.5rem]"
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-6 text-lg font-light text-zinc-400 md:text-xl lg:text-2xl">
          {profile.title}
        </p>

        <div className="hero-badge mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          <span className="text-sm text-zinc-500">
            意向 · <span className="text-zinc-300">{profile.targetCompany}</span>
          </span>
        </div>

        <div className="hero-cta mt-10 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="btn-primary">查看项目</a>
          <a href="#ideal-positions" className="btn-ghost">理想职位</a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {floatingTags.map((tag) => (
            <span key={tag} className="hero-tag tag-pill font-mono">{tag}</span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-600">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  )
}
