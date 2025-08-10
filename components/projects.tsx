import { getProjects } from '@/lib/data/project'
import { OtherProjects } from './other-projects'
import { ProjectCard } from './project-card'

export const Projects = async ({
  showStack = true,
  showDescription = true,
  showHighlight = true,
  otherProjects = true
}: {
  showStack?: boolean
  showDescription?: boolean
  showHighlight?: boolean
  otherProjects?: boolean
}) => {
  const projects = await getProjects()

  if (!projects) {
    return <div>Projects not found!</div>
  }

  return (
    <div>
      {/* Project card */}
      <section className='grid grid-cols-1 gap-4'>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            id={index + 1}
            showStack={showStack}
            showDescription={showDescription}
            showHighlight={showHighlight}
            project={project}
          />
        ))}
      </section>
      {/* other projects */}
      {otherProjects && <OtherProjects />}
    </div>
  )
}
