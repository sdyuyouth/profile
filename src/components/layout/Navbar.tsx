import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "关于" },
  { href: "#ideal-positions", label: "理想职位" },
  { href: "#experience", label: "经历" },
  { href: "#projects", label: "项目" },
  { href: "#skills", label: "技能" },
  { href: "#contact", label: "联系" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          LYS<span className="gradient-text">.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
