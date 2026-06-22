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
        scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
        opacity: 0, x: -40, stagger: 0.18, duration: 0.8, ease: "power3.out",
      })
    },
    { scope: timelineRef, dependencies: [reduced] },
  )

  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title="工作经历"
      subtitle="外贸 · Agent · 建站 · 全栈"
    >
      <div ref={timelineRef} className="relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-transparent md:left-[15px]" />

        <div className="space-y-8">
          {profile.experience.map((exp, i) => (
            <div key={exp.id} className="exp-item relative pl-10 md:pl-14">
              <div className="timeline-node absolute left-0 top-5 h-6 w-6 rounded-full border-2 border-cyan-400 bg-[#030014] md:h-7 md:w-7">
                <div className="absolute inset-1 rounded-full bg-cyan-400/20" />
              </div>

              <div className="glass-card rounded-2xl p-6 md:p-7 transition hover:border-white/12">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-1 text-xl font-bold text-white">{exp.role}</h3>
                    <p className="mt-1 text-sm text-cyan-400/80">{exp.company}</p>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-white/40 ring-1 ring-white/8">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-white/50">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400/60" />
                      {h}
                    </li>
                  ))}
                </ul>

                {"links" in exp && exp.links && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                    {exp.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="rounded-lg bg-white/4 px-3 py-1.5 font-mono text-[10px] text-white/45 ring-1 ring-white/8 transition hover:bg-cyan-400/8 hover:text-cyan-400 hover:ring-cyan-400/30"
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
      </div>
    </Section>
  )
}
