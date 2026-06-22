import { Suspense, useRef, lazy } from "react"
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
          opacity: 0,
          y: 80,
          rotateX: -40,
          stagger: 0.08,
          duration: 0.9,
          transformOrigin: "50% 100%",
        }, "-=0.2")
        .from(".hero-sub", { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
        .from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.5 }, "-=0.3")
        .from(".hero-cta > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.2")
        .from(".hero-tag", { opacity: 0, scale: 0.7, stagger: 0.06, duration: 0.4 }, "-=0.3")
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

      {/* Mobile fallback gradient orb */}
      {(mobile || reduced) && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,240,255,0.12) 0%, rgba(123,47,255,0.08) 40%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-5xl text-center">
        <p className="hero-eyebrow font-mono mb-6 text-xs tracking-[0.35em] text-cyan-400/70 uppercase">
          Portfolio · 2026
        </p>

        <h1
          className="font-display flex justify-center gap-1 md:gap-2"
          style={{ perspective: "600px" }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className="hero-char hero-name-outline inline-block text-7xl font-black text-white md:text-9xl lg:text-[10rem]"
              style={{
                textShadow: "0 0 60px rgba(0,240,255,0.3), 0 0 120px rgba(123,47,255,0.2)",
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-6 text-xl font-light md:text-2xl lg:text-3xl">
          <span className="gradient-text font-display font-semibold">{profile.title}</span>
        </p>

        <div className="hero-badge mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </span>
          <span className="text-sm text-white/60">
            意向公司 · <span className="font-medium text-white/90">{profile.targetCompany}</span>
          </span>
        </div>

        <div className="hero-cta mt-10 flex flex-wrap justify-center gap-4">
          <a href="#projects" className="btn-primary" data-cursor>
            查看项目
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#ideal-positions" className="btn-ghost" data-cursor>
            理想职位
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {floatingTags.map((tag) => (
            <span key={tag} className="hero-tag tag-pill font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/20">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
