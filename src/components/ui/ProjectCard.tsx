import { useRef, useState } from "react"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  highlighted?: boolean
}

export function ProjectCard({ project, highlighted = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)")
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setSpotlight({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    })
    setTransform(
      `perspective(900px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`,
    )
  }

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)")
  }

  return (
    <div
      ref={cardRef}
      className={`project-card spotlight-card group relative rounded-2xl p-6 transition-shadow duration-300 ${
        highlighted ? "glass-card-highlight" : "glass-card"
      }`}
      style={{
        transform,
        transformStyle: "preserve-3d",
        ["--mouse-x" as string]: spotlight.x,
        ["--mouse-y" as string]: spotlight.y,
        boxShadow: highlighted
          ? "0 0 40px rgba(0,240,255,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : undefined,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor
    >
      {/* Corner accent */}
      <div className="absolute right-4 top-4 h-8 w-8 opacity-20">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M32 0H32V32H0" stroke="url(#corner-grad)" strokeWidth="1"/>
          <defs>
            <linearGradient id="corner-grad" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#00f0ff"/>
              <stop offset="1" stopColor="#7b2fff"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] font-medium tracking-widest text-cyan-400/70 uppercase">
          {project.category}
        </span>
        {highlighted && (
          <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-300 ring-1 ring-cyan-400/30">
            ✦ 匹配
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-white md:text-2xl">{project.title}</h3>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40 ring-1 ring-white/5"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-white/50">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
            {h}
          </li>
        ))}
      </ul>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-4 border-t border-white/5 pt-5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyan-400 transition hover:text-cyan-300"
              data-cursor
            >
              LIVE DEMO →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-purple-400 transition hover:text-purple-300"
              data-cursor
            >
              GITHUB →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
