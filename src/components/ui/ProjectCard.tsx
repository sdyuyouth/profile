import { useRef, useState } from "react"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  highlighted?: boolean
}

export function ProjectCard({ project, highlighted = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)")

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(
      `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(8px)`,
    )
  }

  const handleLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)")
  }

  return (
    <div
      ref={cardRef}
      className={`project-card group relative rounded-2xl p-6 transition-all duration-300 ${
        highlighted ? "glass-card-highlight scale-[1.02]" : "glass-card hover:border-white/15"
      }`}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-cyan-400/80">
          {project.category}
        </span>
        {highlighted && (
          <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-300">
            匹配
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm leading-relaxed text-slate-400">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
            {h}
          </li>
        ))}
      </ul>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              Live Demo →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 transition hover:text-purple-300"
            >
              GitHub →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
