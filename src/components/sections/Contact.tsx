import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"

export function Contact() {
  return (
    <Section id="contact" index="06" label="Contact" title="联系我" subtitle="期待与你交流 Vibe Coding 与外贸 AI">
      <div className="glass-card-highlight mx-auto max-w-2xl rounded-2xl p-10 text-center md:p-14">
        <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          一起构建外贸 AI 的未来
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          如果你在小满科技或任何外贸 AI 团队，欢迎联系
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href={`mailto:${profile.email}`} className="btn-primary">{profile.email}</a>
          <a href={`tel:${profile.phone}`} className="btn-ghost">{profile.phone}</a>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-mono text-xs text-zinc-500 transition hover:text-zinc-300"
        >
          github.com/sdyuyouth →
        </a>
      </div>
    </Section>
  )
}
