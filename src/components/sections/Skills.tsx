import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const skillGroups = [
  { key: "agent" as const, label: "Agent / AI" },
  { key: "fullstack" as const, label: "全栈工程" },
  { key: "automation" as const, label: "自动化 / RPA" },
  { key: "seo" as const, label: "SEO / Cloudflare" },
]

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".skill-bento", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        opacity: 0, y: 30, stagger: 0.08, duration: 0.6,
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <Section id="skills" index="05" label="Skills" title="技能栈" subtitle="Vibe Coding 全链路覆盖">
      <div ref={gridRef} className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map(({ key, label }) => (
          <div key={key} className="skill-bento glass-card rounded-xl p-5">
            <h3 className="mb-4 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              {label}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills[key].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-400 ring-1 ring-white/[0.05] transition hover:text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skill-bento mt-3 glass-card rounded-xl p-5 md:p-6">
        <h3 className="mb-4 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
          Honors & Certifications
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {profile.honors.map((honor) => (
            <span key={honor} className="text-sm text-zinc-500">{honor}</span>
          ))}
        </div>
      </div>
    </Section>
  )
}
