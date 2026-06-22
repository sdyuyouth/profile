import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".exp-row", {
        scrollTrigger: { trigger: listRef.current, start: "top 78%" },
        opacity: 0, y: 40, stagger: 0.15, duration: 0.75, ease: "power3.out",
      })
    },
    { scope: listRef, dependencies: [reduced] },
  )

  return (
    <Section id="experience" index="03" label="Experience" title="工作经历">
      <div ref={listRef} className="space-y-0">
        {profile.experience.map((exp, i) => {
          const alignRight = i % 2 === 1
          return (
            <article
              key={exp.id}
              className={`exp-row border-t border-white/[0.06] py-8 md:py-10 ${
                alignRight ? "md:ml-auto md:max-w-[88%]" : "md:max-w-[88%]"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] tabular-nums tracking-widest text-neutral-600">
                    {String(i + 1).padStart(2, "0")} / {String(profile.experience.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif mt-2 text-xl font-bold text-white md:text-2xl">{exp.role}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{exp.company}</p>
                </div>
                <time className="font-mono text-[10px] tracking-wider text-neutral-600">{exp.period}</time>
              </div>

              <ul className="mt-5 space-y-2">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-neutral-500">{h}</li>
                ))}
              </ul>

              {"links" in exp && exp.links && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag-pill hover:bg-white/[0.03]"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
