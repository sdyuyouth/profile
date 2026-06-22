import type { ReactNode } from "react"

type SectionProps = {
  id: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ id, label, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative px-6 py-24 md:px-12 lg:px-20 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="section-reveal mb-12 md:mb-16">
          <p className="section-label mb-3">{label}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-slate-400 md:text-lg">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
