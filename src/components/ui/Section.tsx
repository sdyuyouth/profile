import type { ReactNode } from "react"

type SectionProps = {
  id: string
  index: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({
  id, index, label, title, subtitle, children, className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative px-5 py-28 md:px-10 lg:px-16 ${className}`}>
      <div className="relative mx-auto max-w-6xl">
        <div className="section-reveal relative mb-14 md:mb-20">
          <span className="section-index absolute -top-6 -left-2 md:-top-10 md:-left-4" aria-hidden>
            {index}
          </span>
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="section-label">{label}</span>
              <span className="h-px flex-1 max-w-[60px] bg-white/10" />
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
