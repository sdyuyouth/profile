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
    setSelectedId(id)
    setActivePositionId(id)
    if (!reduced && detailRef.current) {
      gsap.fromTo(detailRef.current, { opacity: 0.4 }, { opacity: 1, duration: 0.35 })
    }
  }

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".role-row", {
        scrollTrigger: { trigger: "#ideal-positions", start: "top 78%" },
        opacity: 0, x: -24, stagger: 0.08, duration: 0.6,
      })
    },
    { dependencies: [reduced] },
  )

  return (
    <Section
      id="ideal-positions"
      index="02"
      label="Roles"
      title="理想职位"
      subtitle="小满科技 · 按优先级"
    >
      <div className="space-y-0">
        {positions.map((pos) => {
          const active = pos.id === selectedId
          return (
            <button
              key={pos.id}
              type="button"
              onClick={() => handleSelect(pos.id as PositionRelevance)}
              className={`role-row group flex w-full items-baseline gap-4 border-t border-white/[0.06] py-5 text-left transition md:gap-8 md:py-6 ${
                active ? "opacity-100" : "opacity-45 hover:opacity-70"
              }`}
            >
              <span className="font-serif text-2xl font-black tabular-nums text-white/20 md:text-3xl">
                0{pos.priority}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg font-semibold text-white md:text-xl">{pos.title}</p>
                <p className="mt-1 font-mono text-[10px] tracking-wider text-neutral-600 uppercase">
                  {pos.company}{pos.salary ? ` · ${pos.salary}` : ""}
                </p>
              </div>
              <span
                className={`hidden shrink-0 font-mono text-[10px] tracking-widest uppercase md:block ${
                  active ? "text-white" : "text-neutral-700"
                }`}
              >
                {active ? "Selected" : "View"}
              </span>
            </button>
          )
        })}

        <div ref={detailRef} className="border-t border-white/[0.06] pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-500">{selected.tagline}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">岗位亮点</h4>
              <ul className="mt-4 space-y-3 border-l border-white/[0.08] pl-4">
                {selected.highlights.map((h) => (
                  <li key={h} className="text-sm leading-relaxed text-neutral-400">{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">我的匹配</h4>
              <ul className="mt-4 space-y-3 border-l border-white/[0.08] pl-4">
                {selected.matchPoints.map((m) => (
                  <li key={m} className="text-sm leading-relaxed text-neutral-400">{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <a href="mailto:jobs@xiaoman.cn" className="btn-ghost mt-8 inline-flex text-xs">
            jobs@xiaoman.cn →
          </a>
        </div>
      </div>
    </Section>
  )
}
