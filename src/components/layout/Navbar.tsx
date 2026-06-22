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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="page-shell flex h-14 items-center justify-between md:h-16">
        <a href="#" className="font-serif text-sm font-bold tracking-tight text-white">
          鲁越森
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.15em] text-neutral-600 uppercase transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-primary py-2 text-[11px] md:py-2.5">
          联系
        </a>
      </div>
    </header>
  )
}
