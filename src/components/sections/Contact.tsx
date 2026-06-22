import { profile } from "@/data/resume"
import { Section } from "@/components/ui/Section"

export function Contact() {
  return (
    <Section id="contact" index="06" label="Contact" title="联系我">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <p className="font-serif text-3xl font-bold leading-snug text-white md:text-4xl">
            一起构建
            <br />
            外贸 AI 的未来
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            小满科技或任何外贸 AI 团队，欢迎联系
          </p>
        </div>

        <div className="flex flex-col justify-end gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="group border-b border-white/[0.08] pb-4 transition hover:border-white/20"
          >
            <span className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">Email</span>
            <span className="mt-2 block font-serif text-lg text-white group-hover:text-neutral-300">
              {profile.email}
            </span>
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="group border-b border-white/[0.08] pb-4 transition hover:border-white/20"
          >
            <span className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">Phone</span>
            <span className="mt-2 block font-serif text-lg text-white group-hover:text-neutral-300">
              {profile.phone}
            </span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-b border-white/[0.08] pb-4 transition hover:border-white/20"
          >
            <span className="font-mono text-[10px] tracking-widest text-neutral-600 uppercase">GitHub</span>
            <span className="mt-2 block font-serif text-lg text-white group-hover:text-neutral-300">
              sdyuyouth →
            </span>
          </a>
        </div>
      </div>
    </Section>
  )
}
