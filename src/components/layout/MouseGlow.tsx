import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useMousePosition } from "@/hooks/useMouseGlow"

export function MouseGlow() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
      aria-hidden
    >
      <div
        className="absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl transition-transform duration-75"
        style={{
          left: x,
          top: y,
          background: "radial-gradient(circle, #22d3ee 0%, #a855f7 50%, transparent 70%)",
        }}
      />
    </div>
  )
}
