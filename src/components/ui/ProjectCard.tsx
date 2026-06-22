import { useRef, useState } from "react"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  highlighted?: boolean
}

export function ProjectCard({ project, highlighted = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg)")
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
    setTransform(`perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`)
  }

  const handleLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)")
  }

  return (
    <div
      ref={cardRef}
      className={`project-card spotlight-card group relative rounded-xl p-6 transition-all duration-300 ${
        highlighted ? "glass-card-highlight" : "glass-card"
      }`}
      style={{
        transform,
        transformStyle: "preserve-3d",
        ["--mouse-x" as string]: spotlight.x,
        ["--mouse-y" as string]: spotlight.y,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
          {project.category}
        </span>
        {highlighted && (
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-400 ring-1 ring-white/10">
            匹配
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white md:text-xl">{project.title}</h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-500 ring-1 ring-white/[0.05]"
          >
            {tag}
          </span>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="text-sm leading-relaxed text-zinc-500">{h}</li>
        ))}
      </ul>

      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-5 flex flex-wrap gap-4 border-t border-white/[0.06] pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-zinc-400 transition hover:text-white"
            >
              Live Demo →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-zinc-400 transition hover:text-white"
            >
              GitHub →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
