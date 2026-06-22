import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"

export function Contact() {
  return (
    <Section id="contact" label="Contact" title="联系我" subtitle="期待与你交流 Vibe Coding 与外贸 AI">
      <div className="glass-card-highlight mx-auto max-w-2xl rounded-2xl p-8 text-center md:p-12">
        <p className="text-lg text-slate-300">
          如果你在小满科技或任何外贸 AI 团队，欢迎通过以下方式联系
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="rounded-full border border-white/15 px-8 py-3 text-sm text-slate-300 transition hover:border-cyan-400/50"
          >
            {profile.phone}
          </a>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm text-purple-400 transition hover:text-purple-300"
        >
          GitHub → {profile.github.replace("https://github.com/", "")}
        </a>
      </div>
    </Section>
  )
}
