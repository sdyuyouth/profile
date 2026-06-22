import { profile } from "@/data/resume"

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 text-center md:px-12">
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()} {profile.name} · Built with Vibe Coding
      </p>
    </footer>
  )
}
