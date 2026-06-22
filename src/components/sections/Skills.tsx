import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const skillGroups = [
  { key: "agent", label: "Agent / AI", color: "from-cyan-500/20 to-cyan-500/5" },
  { key: "fullstack", label: "全栈工程", color: "from-purple-500/20 to-purple-500/5" },
  { key: "automation", label: "自动化 / RPA", color: "from-blue-500/20 to-blue-500/5" },
  { key: "seo", label: "SEO / Cloudflare", color: "from-emerald-500/20 to-emerald-500/5" },
] as const

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".skill-group", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        opacity: 0,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.6,
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <Section id="skills" label="Skills" title="技能栈" subtitle="按领域分组，覆盖 Vibe Coding 全链路">
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map(({ key, label, color }) => (
          <div
            key={key}
            className={`skill-group glass-card rounded-2xl bg-gradient-to-br ${color} p-6`}
          >
            <h3 className="font-display mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              {label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills[key].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                  style={{ transform: "translateZ(0)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card rounded-2xl p-6">
        <h3 className="font-display mb-4 text-sm font-semibold tracking-wider text-slate-400 uppercase">
          荣誉证书
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.honors.map((honor) => (
            <span key={honor} className="text-sm text-slate-400">
              · {honor}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
