import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      title="联系我"
      subtitle="期待与你交流 Vibe Coding 与外贸 AI"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.15), rgba(123,47,255,0.1), transparent)",
          }}
        />
        <div className="glass-card-highlight relative p-10 text-center md:p-16">
          <p className="font-display text-2xl font-bold text-white md:text-3xl">
            一起构建
            <span className="gradient-text"> 外贸 AI </span>
            的未来
          </p>
          <p className="mt-4 text-base text-white/45">
            如果你在小满科技或任何外贸 AI 团队，欢迎联系
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href={`mailto:${profile.email}`} className="btn-primary" data-cursor>
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="btn-ghost" data-cursor>
              {profile.phone}
            </a>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-purple-400 transition hover:text-purple-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            github.com/sdyuyouth
          </a>
        </div>
      </div>
    </Section>
  )
}
