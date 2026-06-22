import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { getSortedProjects } from "@/data/projects"
import { Section } from "@/components/ui/Section"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { useActivePosition } from "@/context/PositionContext"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const { activePositionId } = useActivePosition()
  const projects = getSortedProjects()
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      })
    },
    { scope: gridRef, dependencies: [reduced] },
  )

  return (
    <Section
      id="projects"
      label="Projects"
      title="精选项目"
      subtitle="从 D:\code 60+ 项目中筛选，与小满三岗对口展示"
    >
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            highlighted={project.relevance.includes(activePositionId)}
          />
        ))}
      </div>
    </Section>
  )
}
