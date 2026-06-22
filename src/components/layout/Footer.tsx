import { profile } from "@/data/resume"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="page-shell flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="font-serif text-sm text-neutral-500">
          {profile.name} · Vibe Coding Portfolio
        </p>
        <p className="font-mono text-[10px] tracking-widest text-neutral-700 uppercase">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
