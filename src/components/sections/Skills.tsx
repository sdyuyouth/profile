import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const skillGroups = [
  { key: "agent" as const, label: "Agent / AI" },
  { key: "fullstack" as const, label: "全栈" },
  { key: "automation" as const, label: "自动化" },
  { key: "seo" as const, label: "SEO / CF" },
]

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const allSkills = Object.values(profile.skills).flat()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".skill-col", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        opacity: 0, y: 24, stagger: 0.08, duration: 0.6,
      })
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <Section id="skills" index="05" label="Skills" title="技能栈">
      <div ref={ref}>
        <div className="marquee-wrap mb-8 border-y border-white/[0.06] py-4">
          <div className="marquee-track gap-10">
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={`${s}-${i}`} className="shrink-0 font-serif text-lg text-white/25 md:text-xl">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm bg-white/[0.06] sm:grid-cols-2">
          {skillGroups.map(({ key, label }) => (
            <div key={key} className="skill-col bg-[#080808] p-5 md:p-6">
              <h3 className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">{label}</h3>
              <ul className="mt-4 space-y-2">
                {profile.skills[key].map((skill) => (
                  <li key={skill} className="text-sm text-neutral-400">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skill-col mt-4 border border-white/[0.06] p-5 md:p-6">
          <h3 className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">荣誉</h3>
          <p className="mt-4 text-sm leading-loose text-neutral-500">
            {profile.honors.join(" · ")}
          </p>
        </div>
      </div>
    </Section>
  )
}
