import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const skillGroups = [
  {
    key: "agent" as const,
    label: "Agent / AI",
    icon: "⬡",
    gradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    accent: "text-cyan-400",
    ring: "ring-cyan-400/20",
  },
  {
    key: "fullstack" as const,
    label: "全栈工程",
    icon: "◈",
    gradient: "from-purple-500/15 via-purple-500/5 to-transparent",
    accent: "text-purple-400",
    ring: "ring-purple-400/20",
  },
  {
    key: "automation" as const,
    label: "自动化 / RPA",
    icon: "◎",
    gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
    accent: "text-blue-400",
    ring: "ring-blue-400/20",
  },
  {
    key: "seo" as const,
    label: "SEO / Cloudflare",
    icon: "◉",
    gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    accent: "text-emerald-400",
    ring: "ring-emerald-400/20",
  },
]

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".skill-bento", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: "power3.out",
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <Section
      id="skills"
      index="05"
      label="Skills"
      title="技能栈"
      subtitle="Vibe Coding 全链路覆盖"
    >
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map(({ key, label, icon, gradient, accent, ring }) => (
          <div
            key={key}
            className={`skill-bento glass-card rounded-2xl bg-gradient-to-br ${gradient} p-6 ring-1 ${ring}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className={`text-xl ${accent}`}>{icon}</span>
              <h3 className="font-display text-sm font-bold text-white">{label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills[key].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-black/30 px-3 py-1.5 font-mono text-xs text-white/55 ring-1 ring-white/6 transition hover:text-white/90 hover:ring-white/15"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skill-bento mt-5 glass-card rounded-2xl p-6 md:p-7">
        <h3 className="mb-5 font-mono text-[10px] tracking-widest text-white/30 uppercase">
          Honors & Certifications
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {profile.honors.map((honor) => (
            <span key={honor} className="flex items-center gap-2 text-sm text-white/45">
              <span className="h-1 w-1 rounded-full bg-purple-400/60" />
              {honor}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
