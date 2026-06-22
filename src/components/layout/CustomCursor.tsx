import { useEffect, useState } from "react"
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile) return

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest("a, button, [data-cursor]"))
    }

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mouseover", over, { passive: true })
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
    }
  }, [reduced, mobile])

  if (reduced || mobile) return null

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
        }}
      >
        <div
          className="rounded-full border border-white transition-all duration-200"
          style={{
            width: hovering ? 48 : 24,
            height: hovering ? 48 : 24,
            opacity: hovering ? 0.8 : 0.5,
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[9999] h-1.5 w-1.5 rounded-full bg-cyan-400"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 8px #00f0ff, 0 0 16px #00f0ff",
        }}
      />
    </>
  )
}
