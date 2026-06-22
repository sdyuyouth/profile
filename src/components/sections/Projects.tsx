import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { getSortedProjects } from "@/data/projects"
import { Section } from "@/components/ui/Section"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { useActivePosition } from "@/context/PositionContext"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const bentoClass = [
  "bento-featured",
  "bento-tall",
  "bento-half",
  "bento-half",
  "bento-third",
  "bento-third",
]

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { activePositionId } = useActivePosition()
  const projects = getSortedProjects()
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".project-card", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        opacity: 0, y: 36, stagger: 0.08, duration: 0.7, ease: "power3.out",
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <Section id="projects" index="04" label="Projects" title="精选项目">
      <div ref={gridRef} className="grid grid-cols-12 gap-3 md:gap-4">
        {projects.map((project, i) => (
          <div key={project.id} className={bentoClass[i] ?? "col-span-12"}>
            <ProjectCard
              project={project}
              featured={i === 0}
              highlighted={project.relevance.includes(activePositionId)}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}
