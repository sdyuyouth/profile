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
      opacity: 0, y: 8, duration: 0.15,
      onComplete: () => {
        setSelectedId(id)
        setActivePositionId(id)
        gsap.fromTo(detailRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3 })
      },
    })
  }

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".position-tab", {
        scrollTrigger: { trigger: "#ideal-positions", start: "top 75%" },
        opacity: 0, x: -20, stagger: 0.08, duration: 0.5,
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
        <div className="flex flex-col gap-2 lg:w-72 shrink-0">
          {positions.map((pos) => {
            const isActive = pos.id === selectedId
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => handleSelect(pos.id as PositionRelevance)}
                className={`position-tab text-left rounded-xl p-4 transition-all duration-200 ${
                  isActive ? "glass-card-highlight" : "glass-card hover:border-white/12"
                } ${pos.priority > 1 ? "opacity-80" : ""}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-[10px] font-medium ${
                      pos.priority === 1
                        ? "bg-white text-zinc-900"
                        : "bg-white/8 text-zinc-500"
                    }`}
                  >
                    0{pos.priority}
                  </span>
                  {pos.salary && (
                    <span className="font-mono text-[10px] text-zinc-500">{pos.salary}</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white">{pos.title}</h3>
                <p className="mt-1 font-mono text-[10px] text-zinc-600">
                  {pos.company}{pos.location ? ` · ${pos.location}` : ""}
                </p>
              </button>
            )
          })}
        </div>

        <div ref={detailRef} className="glass-card-highlight flex-1 rounded-2xl p-7 md:p-8">
          <p className="text-sm leading-relaxed text-zinc-400">{selected.tagline}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                岗位亮点
              </h4>
              <ul className="space-y-3">
                {selected.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <span className="shrink-0 text-zinc-600">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                我的匹配
              </h4>
              <ul className="space-y-3">
                {selected.matchPoints.map((m) => (
                  <li key={m} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <span className="shrink-0 text-zinc-500">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-6">
            <a href="mailto:jobs@xiaoman.cn" className="btn-ghost text-xs">
              投递小满 · jobs@xiaoman.cn
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
