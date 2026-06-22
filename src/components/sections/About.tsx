import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function About() {
  const contentRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        filter: "blur(8px)",
        opacity: 0.3,
        y: 40,
      })
    },
    { scope: contentRef, dependencies: [reduced] },
  )

  const infoItems = [
    { label: "年龄", value: `${profile.age} 岁` },
    { label: "籍贯", value: profile.location },
    { label: "政治面貌", value: profile.politicalStatus },
    { label: "邮箱", value: profile.email },
    { label: "电话", value: profile.phone },
  ]

  return (
    <Section id="about" label="About" title="关于我" subtitle="从外贸业务到 AI Agent 全栈交付">
      <div ref={contentRef} className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        <div className="flex flex-col items-center md:items-start">
          <div className="glass-card-highlight relative flex h-48 w-48 items-center justify-center rounded-2xl">
            <div className="font-display text-5xl font-bold gradient-text">LYS</div>
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl" />
          </div>
          <div className="mt-6 w-full space-y-3">
            {infoItems.map((item) => (
              <div key={item.label} className="flex justify-between border-b border-white/5 pb-2 text-sm">
                <span className="text-slate-500">{item.label}</span>
                <span className="text-slate-300">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg leading-relaxed text-slate-300 md:text-xl">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "外贸 B2B",
              "AI Agent",
              "Vibe Coding",
              "全栈工程",
              "SEO 建站",
              "Serverless",
              "RPA 自动化",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
