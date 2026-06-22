import { useRef, useState } from "react"
import type { Project } from "@/data/projects"

type ProjectCardProps = {
  project: Project
  highlighted?: boolean
  featured?: boolean
}

export function ProjectCard({ project, highlighted = false, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("none")
  const [spotlight, setSpotlight] = useState({ x: "50%", y: "50%" })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (featured) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setSpotlight({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    })
    setTransform(`perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`)
  }

  return (
    <article
      ref={cardRef}
      className={`project-card spotlight-card flex h-full flex-col transition-transform duration-300 ${
        highlighted ? "glass-card-highlight" : "glass-card"
      } ${featured ? "p-8 md:p-10" : "p-5 md:p-6"}`}
      style={{
        transform,
        ["--mouse-x" as string]: spotlight.x,
        ["--mouse-y" as string]: spotlight.y,
      }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform("none")}
    >
      <header className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
          {project.category}
        </span>
        {highlighted && (
          <span className="font-mono text-[10px] text-neutral-500">MATCH</span>
        )}
      </header>

      <h3
        className={`font-serif mt-4 font-bold text-white ${
          featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl"
        }`}
      >
        {project.title}
      </h3>

      {featured && project.highlights[0] && (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500 md:text-base">
          {project.highlights[0]}
        </p>
      )}

      <div className={`flex flex-wrap gap-1.5 ${featured ? "mt-6" : "mt-4"}`}>
        {project.stack.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>

      {!featured && (
        <ul className="mt-4 flex-1 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm leading-relaxed text-neutral-500">{h}</li>
          ))}
        </ul>
      )}

      {featured && project.highlights.length > 1 && (
        <ul className="mt-4 flex-1 space-y-2 border-t border-white/[0.06] pt-4">
          {project.highlights.slice(1).map((h) => (
            <li key={h} className="text-sm text-neutral-500">{h}</li>
          ))}
        </ul>
      )}

      {(project.demoUrl || project.repoUrl) && (
        <footer className={`flex gap-4 ${featured ? "mt-8" : "mt-5 border-t border-white/[0.06] pt-4"}`}>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-neutral-400 hover:text-white">
              DEMO →
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-neutral-400 hover:text-white">
              REPO →
            </a>
          )}
        </footer>
      )}
    </article>
  )
}
