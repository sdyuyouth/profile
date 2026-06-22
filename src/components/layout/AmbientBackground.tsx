import { useReducedMotion } from "@/hooks/useReducedMotion"

export function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="grid-bg absolute inset-0" />

      {!reduced && (
        <>
          <div
            className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
              animation: "float-orb 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full opacity-25 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #7b2fff 0%, transparent 70%)",
              animation: "float-orb 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-20 blur-[90px]"
            style={{
              background: "radial-gradient(circle, #ff006e 0%, transparent 70%)",
              animation: "float-orb 12s ease-in-out infinite 2s",
            }}
          />
        </>
      )}

      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
      `}</style>
    </div>
  )
}
