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
      gsap.from(".about-block", {
        scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
        opacity: 0, y: 32, stagger: 0.1, duration: 0.7, ease: "power3.out",
      })
    },
    { scope: contentRef, dependencies: [reduced] },
  )

  const tags = ["外贸 B2B", "AI Agent", "Vibe Coding", "全栈工程", "SEO 建站", "Serverless", "RPA"]

  return (
    <Section id="about" index="01" label="About" title="关于我">
      <div ref={contentRef} className="space-y-8">
        <blockquote className="about-block relative">
          <span className="font-serif text-6xl leading-none text-white/10 md:text-7xl" aria-hidden>
            "
          </span>
          <p className="-mt-8 font-serif text-xl leading-[1.75] text-neutral-300 md:text-2xl md:leading-[1.75]">
            {profile.summary}
          </p>
        </blockquote>

        <div className="about-block flex flex-wrap gap-2 border-y border-white/[0.06] py-6">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        <dl className="about-block grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/[0.06] sm:grid-cols-3">
          {[
            { label: "邮箱", value: profile.email },
            { label: "电话", value: profile.phone },
            { label: "GitHub", value: "sdyuyouth" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#080808] p-4 md:p-5">
              <dt className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">{label}</dt>
              <dd className="mt-2 truncate text-sm text-neutral-300">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
