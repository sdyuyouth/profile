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
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setSelectedId(id)
        setActivePositionId(id)
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, y: -10, rotateX: 5 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.4, ease: "power2.out" },
        )
      },
    })
  }

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".position-tab", {
        scrollTrigger: { trigger: "#ideal-positions", start: "top 75%" },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
      })
    },
    { dependencies: [reduced] },
  )

  return (
    <Section
      id="ideal-positions"
      label="Target Roles"
      title="理想职位"
      subtitle="小满科技 · 按优先级排序，改 idealPositions.ts 即可调整"
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-3 lg:w-80">
          {positions.map((pos) => {
            const isActive = pos.id === selectedId
            const scale = pos.priority === 1 ? "lg:scale-100" : pos.priority === 2 ? "lg:scale-[0.98]" : "lg:scale-[0.96]"
            const opacity = pos.priority === 1 ? "opacity-100" : pos.priority === 2 ? "opacity-90" : "opacity-80"

            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => handleSelect(pos.id as PositionRelevance)}
                className={`position-tab text-left rounded-xl p-4 transition-all duration-300 ${scale} ${opacity} ${
                  isActive ? "glass-card-highlight" : "glass-card hover:border-white/15"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      pos.priority === 1
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    #{pos.priority}
                  </span>
                  {pos.salary && (
                    <span className="text-xs text-cyan-400/80">{pos.salary}</span>
                  )}
                </div>
                <h3 className="font-display text-base font-semibold text-white">{pos.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{pos.company}{pos.location ? ` · ${pos.location}` : ""}</p>
              </button>
            )
          })}
        </div>

        <div
          ref={detailRef}
          className="glass-card-highlight flex-1 rounded-2xl p-6 md:p-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-sm text-slate-400">{selected.tagline}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                岗位亮点
              </h4>
              <ul className="space-y-3">
                {selected.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-cyan-400">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold tracking-wider text-purple-400 uppercase">
                我的匹配
              </h4>
              <ul className="space-y-3">
                {selected.matchPoints.map((m) => (
                  <li key={m} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-purple-400">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-6">
            <a
              href="mailto:jobs@xiaoman.cn"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              投递小满 → jobs@xiaoman.cn
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
