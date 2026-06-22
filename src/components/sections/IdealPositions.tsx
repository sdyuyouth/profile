import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { getActivePositions } from "@/data/idealPositions"
import type { PositionRelevance } from "@/data/idealPositions"
import { Section } from "@/components/ui/Section"
import { useActivePosition } from "@/context/PositionContext"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function IdealPositions() {
  const positions = getActivePositions()
  const { activePositionId, setActivePositionId } = useActivePosition()
  const [selectedId, setSelectedId] = useState<PositionRelevance>(activePositionId)
  const detailRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const selected = positions.find((p) => p.id === selectedId) ?? positions[0]

  const handleSelect = (id: PositionRelevance) => {
    if (reduced) {
      setSelectedId(id)
      setActivePositionId(id)
      return
    }
    gsap.to(detailRef.current, {
      opacity: 0, y: 12, duration: 0.18,
      onComplete: () => {
        setSelectedId(id)
        setActivePositionId(id)
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        )
      },
    })
  }

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".position-tab", {
        scrollTrigger: { trigger: "#ideal-positions", start: "top 75%" },
        opacity: 0, x: -30, stagger: 0.1, duration: 0.6,
      })
    },
    { dependencies: [reduced] },
  )

  return (
    <Section
      id="ideal-positions"
      index="02"
      label="Target Roles"
      title="理想职位"
      subtitle="小满科技 · Vibe Coding 优先"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-3 lg:w-72 shrink-0">
          {positions.map((pos) => {
            const isActive = pos.id === selectedId
            const priorityStyles = [
              "opacity-100 scale-100",
              "opacity-85 scale-[0.98]",
              "opacity-70 scale-[0.96]",
            ]

            return (
              <button
                key={pos.id}
                type="button"
                data-cursor
                onClick={() => handleSelect(pos.id as PositionRelevance)}
                className={`position-tab text-left rounded-2xl p-5 transition-all duration-300 ${priorityStyles[pos.priority - 1]} ${
                  isActive ? "glass-card-highlight" : "glass-card hover:border-white/15"
                }`}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-xs font-bold ${
                      pos.priority === 1
                        ? "bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-[0_0_16px_rgba(0,240,255,0.4)]"
                        : "bg-white/8 text-white/50"
                    }`}
                  >
                    0{pos.priority}
                  </span>
                  {pos.salary && (
                    <span className="font-mono text-[10px] text-cyan-400/80">{pos.salary}</span>
                  )}
                </div>
                <h3 className="font-display text-sm font-bold leading-snug text-white">
                  {pos.title}
                </h3>
                <p className="mt-1.5 font-mono text-[10px] text-white/35">
                  {pos.company}{pos.location ? ` · ${pos.location}` : ""}
                </p>
              </button>
            )
          })}
        </div>

        <div
          ref={detailRef}
          className="glass-card-highlight flex-1 rounded-2xl p-7 md:p-9"
        >
          <p className="text-base leading-relaxed text-white/55">{selected.tagline}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
                <span className="h-px w-4 bg-cyan-400/60" />
                岗位亮点
              </h4>
              <ul className="space-y-3">
                {selected.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/65">
                    <span className="mt-0.5 shrink-0 font-mono text-cyan-400">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-widest text-purple-400 uppercase">
                <span className="h-px w-4 bg-purple-400/60" />
                我的匹配
              </h4>
              <ul className="space-y-3">
                {selected.matchPoints.map((m) => (
                  <li key={m} className="flex gap-3 text-sm leading-relaxed text-white/65">
                    <span className="mt-0.5 shrink-0 text-purple-400">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-6">
            <a
              href="mailto:jobs@xiaoman.cn"
              className="btn-ghost text-xs"
              data-cursor
            >
              投递小满 · jobs@xiaoman.cn
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
