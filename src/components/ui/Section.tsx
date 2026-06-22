import type { ReactNode } from "react"

type SectionProps = {
  id: string
  index: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  asideExtra?: ReactNode
}

export function Section({
  id,
  index,
  label,
  title,
  subtitle,
  children,
  className = "",
  asideExtra,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 lg:py-32 ${className}`}>
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16 xl:gap-24">
          <aside className="section-aside">
            <span className="section-index-big" aria-hidden>
              {index}
            </span>
            <p className="section-label">{label}</p>
            <h2 className="section-heading mt-3">{title}</h2>
            {subtitle && (
              <p className="mt-4 text-sm leading-relaxed text-neutral-500 md:text-base">
                {subtitle}
              </p>
            )}
            {asideExtra && <div className="mt-6 hidden lg:block">{asideExtra}</div>}
            <div className="divider-rule mt-8 hidden lg:block" />
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
