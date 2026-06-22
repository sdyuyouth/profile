import { useReducedMotion } from "@/hooks/useReducedMotion"

export function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="grid-bg absolute inset-0" />

      {!reduced && (
        <>
          <div
            className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[100px]"
            style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
          />
          <div
            className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[90px]"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
          />
        </>
      )}
    </div>
  )
}
