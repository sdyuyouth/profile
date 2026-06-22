import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".exp-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      })
    },
    { scope: timelineRef, dependencies: [reduced] },
  )

  return (
    <Section id="experience" label="Experience" title="工作经历" subtitle="外贸 · Agent · 建站 · 全栈">
      <div ref={timelineRef} className="relative space-y-0">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent md:left-[11px]" />

        {profile.experience.map((exp, i) => (
          <div
            key={exp.id}
            className={`exp-item relative pb-12 pl-8 md:pl-12 ${
              i !== profile.experience.length - 1 ? "" : "pb-0"
            }`}
          >
            <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-cyan-400 bg-[#050508] md:h-5 md:w-5" />

            <div className="glass-card rounded-xl p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="text-sm text-cyan-400/80">{exp.company}</p>
                </div>
                <span className="text-xs text-slate-500">{exp.period}</span>
              </div>

              <ul className="mt-4 space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-slate-400">
                    {h}
                  </li>
                ))}
              </ul>

              {"links" in exp && exp.links && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-400 transition hover:bg-cyan-400/10 hover:text-cyan-400"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
