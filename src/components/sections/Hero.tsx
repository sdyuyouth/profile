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
      tl.from(".hero-line", { opacity: 0, y: 48, stagger: 0.12, duration: 0.9 })
        .from(".hero-meta > *", { opacity: 0, x: 20, stagger: 0.08, duration: 0.6 }, "-=0.5")
        .from(".hero-panel", { opacity: 0, y: 24, duration: 0.7 }, "-=0.4")
    },
    { scope: containerRef, dependencies: [reduced] },
  )

  const nameLines = profile.name.split("")

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-24 pb-10 md:pt-28"
    >
      {!mobile && !reduced && (
        <Suspense fallback={null}>
          <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]">
            <HeroScene />
          </div>
        </Suspense>
      )}

      <div className="page-shell relative z-10 flex min-h-[calc(100svh-7rem)] flex-col justify-end">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
          {/* 主标题区 — 左对齐竖排大字 */}
          <div className="lg:col-span-7">
            <p className="hero-line font-mono text-[10px] tracking-[0.35em] text-neutral-600 uppercase">
              Portfolio / 2026
            </p>

            <h1 className="mt-6 flex flex-col">
              {nameLines.map((char, i) => (
                <span
                  key={i}
                  className="hero-line font-serif text-[clamp(4.5rem,14vw,9rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
                >
                  {char}
                </span>
              ))}
            </h1>

            <p className="hero-line mt-8 max-w-md text-base leading-relaxed text-neutral-400 md:text-lg">
              {profile.title}
            </p>

            <div className="hero-line mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">查看项目</a>
              <a href="#ideal-positions" className="btn-ghost">理想职位</a>
            </div>
          </div>

          {/* 右侧信息面板 */}
          <div className="hero-panel lg:col-span-5 lg:col-start-8">
            <div className="glass-card grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/[0.06]">
              {[
                { k: "意向", v: profile.targetCompany },
                { k: "籍贯", v: profile.location },
                { k: "年龄", v: `${profile.age} 岁` },
                { k: "面貌", v: profile.politicalStatus },
              ].map(({ k, v }) => (
                <div key={k} className="bg-[#080808] p-4 md:p-5">
                  <p className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">{k}</p>
                  <p className="mt-2 text-sm font-medium text-neutral-200">{v}</p>
                </div>
              ))}
            </div>

            <div className="hero-meta mt-4 space-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="block font-mono text-xs text-neutral-500 transition hover:text-white"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="block font-mono text-xs text-neutral-500 transition hover:text-white"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>

        {/* 底部技能跑马灯 */}
        <div className="marquee-wrap mt-16 border-t border-white/[0.06] pt-6">
          <div className="marquee-track gap-8">
            {[...profile.skills.agent, ...profile.skills.fullstack, ...profile.skills.seo].map((s) => (
              <span key={s} className="shrink-0 font-mono text-[11px] tracking-wider text-neutral-600 uppercase">
                {s}
              </span>
            ))}
            {[...profile.skills.agent, ...profile.skills.fullstack, ...profile.skills.seo].map((s) => (
              <span key={`${s}-dup`} className="shrink-0 font-mono text-[11px] tracking-wider text-neutral-600 uppercase">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
