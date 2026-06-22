import { profile } from "@/data/resume"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-10 text-center md:px-10">
      <p className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
