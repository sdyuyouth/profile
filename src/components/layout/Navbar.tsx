import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "关于" },
  { href: "#ideal-positions", label: "职位" },
  { href: "#experience", label: "经历" },
  { href: "#projects", label: "项目" },
  { href: "#skills", label: "技能" },
  { href: "#contact", label: "联系" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })

    const sections = links.map((l) => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sections.forEach((s) => s && observer.observe(s))

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6">
      <nav
        className={`mx-auto flex max-w-4xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled
            ? "border border-white/8 bg-[#030014]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className="font-display text-base font-bold tracking-tight text-white"
          data-cursor
        >
          LYS<span className="gradient-text">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor
              className={`relative rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                active === link.href
                  ? "bg-white/8 text-cyan-300"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute bottom-0.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-cyan-400" />
              )}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          data-cursor
          className="hidden rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-1.5 text-xs font-medium text-cyan-300 ring-1 ring-cyan-400/30 transition hover:ring-cyan-400/60 md:block"
        >
          联系我
        </a>
      </nav>
    </header>
  )
}
