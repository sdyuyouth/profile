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
      gsap.from(".about-left", {
        scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        opacity: 0, x: -40, duration: 0.8, ease: "power3.out",
      })
      gsap.from(".about-right", {
        scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        opacity: 0, x: 40, duration: 0.8, ease: "power3.out", delay: 0.15,
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

  const tags = ["外贸 B2B", "AI Agent", "Vibe Coding", "全栈工程", "SEO 建站", "Serverless", "RPA 自动化"]

  return (
    <Section
      id="about"
      index="01"
      label="About"
      title="关于我"
      subtitle="从外贸业务到 AI Agent 全栈交付"
    >
      <div ref={contentRef} className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-20">
        <div className="about-left flex flex-col items-center md:items-start">
          <div className="avatar-ring relative flex h-52 w-52 items-center justify-center rounded-3xl bg-[#030014]">
            <div className="relative flex h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center rounded-[22px] bg-[#0a0520]">
              <span className="font-display text-6xl font-black gradient-text">LYS</span>
              <div
                className="absolute inset-0 rounded-[22px] opacity-30"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(0,240,255,0.2), transparent 60%)",
                }}
              />
            </div>
          </div>

          <div className="mt-8 w-full space-y-0 overflow-hidden rounded-2xl glass-card">
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                className={`flex justify-between px-4 py-3 text-sm ${
                  i !== infoItems.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <span className="font-mono text-[11px] tracking-wider text-white/35 uppercase">
                  {item.label}
                </span>
                <span className="text-white/75">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right">
          <blockquote className="relative border-l-2 border-cyan-400/40 pl-6">
            <p className="text-xl leading-[1.8] text-white/75 md:text-2xl md:leading-[1.8]">
              {profile.summary}
            </p>
          </blockquote>

          <div className="mt-10">
            <p className="font-mono mb-4 text-[10px] tracking-widest text-white/30 uppercase">
              Core Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
