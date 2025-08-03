import { OtherProjects } from './other-projects'
import { ProjectCard } from './project-card'

export const Projects = async ({
  stack = true,
  description = true,
  otherProjects = true
}: {
  stack?: boolean
  description?: boolean
  otherProjects?: boolean
}) => {
  // fetch projects
  await new Promise(resolve => setTimeout(resolve, 4000))
  return (
    <div>
      {/* Project card */}
      <section className='grid grid-cols-1 gap-4'>
        {[1, 2].map((project, index) => (
          <ProjectCard key={index} stack={stack} description={description} />
        ))}
      </section>
      {/* other projects */}
      {otherProjects && <OtherProjects />}
    </div>
  )
}
