import { getProjects } from '@/lib/data/project'
import { OtherProjects } from './other-projects'
import { ProjectCard } from './project-card'

export const Projects = async ({
  showStack = true,
  showDescription = true,
  showHighlight = true,
  projectsToShow = 3,
  showOtherProjects = true
}: {
  showStack?: boolean
  showDescription?: boolean
  showHighlight?: boolean
  projectsToShow?: number
  showOtherProjects?: boolean
}) => {
  const projects = await getProjects()

  if (!projects || projects.length === 0) {
    return <div>Projects not found!</div>
  }

  const mainProjects = projects.slice(0, projectsToShow) // Show only first 3 projects
  const otherProjects =
    projects.length > projectsToShow ? projects.slice(projectsToShow) : []

  return (
    <div>
      {/* Project card */}
      <section className='grid grid-cols-1 gap-4 py-4'>
        {mainProjects.map((project, index) => (
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
      {showOtherProjects && <OtherProjects projects={otherProjects} />}
    </div>
  )
}
