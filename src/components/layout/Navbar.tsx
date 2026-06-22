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
            ? "border border-white/[0.06] bg-[#09090b]/85 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="font-display text-sm font-semibold tracking-tight text-white">
          LYS<span className="text-zinc-500">.</span>
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                active === link.href
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white md:block"
        >
          联系我
        </a>
      </nav>
    </header>
  )
}
