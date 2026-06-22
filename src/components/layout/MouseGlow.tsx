import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion"
import { useMousePosition } from "@/hooks/useMouseGlow"

export function MouseGlow() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  if (reduced || mobile) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen" aria-hidden>
      <div
        className="absolute rounded-full"
        style={{
          left: x,
          top: y,
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(123,47,255,0.05) 40%, transparent 70%)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />
    </div>
  )
}
