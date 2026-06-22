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
        opacity: 0, x: -30, stagger: 0.15, duration: 0.7, ease: "power3.out",
      })
    },
    { scope: timelineRef, dependencies: [reduced] },
  )

  return (
    <Section id="experience" index="03" label="Experience" title="工作经历" subtitle="外贸 · Agent · 建站 · 全栈">
      <div ref={timelineRef} className="relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/10 md:left-[15px]" />

        <div className="space-y-6">
          {profile.experience.map((exp, i) => (
            <div key={exp.id} className="exp-item relative pl-10 md:pl-14">
              <div className="timeline-node absolute left-0 top-5 h-6 w-6 rounded-full border border-white/20 bg-[#09090b] md:h-7 md:w-7" />

              <div className="glass-card rounded-xl p-6 transition hover:border-white/12">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-white">{exp.role}</h3>
                    <p className="mt-0.5 text-sm text-zinc-500">{exp.company}</p>
                  </div>
                  <span className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-500 ring-1 ring-white/[0.06]">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="text-sm leading-relaxed text-zinc-500">{h}</li>
                  ))}
                </ul>

                {"links" in exp && exp.links && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                    {exp.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-zinc-500 ring-1 ring-white/[0.06] transition hover:bg-white/[0.06] hover:text-zinc-300"
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
