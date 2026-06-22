import { profile } from "@/data/resume"

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 text-center md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <span className="font-display text-sm font-bold text-white/30">
          LYS<span className="gradient-text">.</span>
        </span>
        <p className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
          © {new Date().getFullYear()} {profile.name} · Built with Vibe Coding
        </p>
      </div>
    </footer>
  )
}
