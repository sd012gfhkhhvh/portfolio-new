import Link from 'next/link'
import { CustomBoxReveal } from './custom-boxreveal'
import { RiExternalLinkFill } from 'react-icons/ri'
import { FiArrowUpRight } from 'react-icons/fi'
import { PROJECTS } from '@/lib/data/project'
import { MY_GITHUB_PROFILE } from '@/lib/data/static'

export const OtherProjects = ({ projects }: { projects: PROJECTS }) => {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div className='py-6 text-base text-(--muted-foreground) sm:text-lg'>
      <CustomBoxReveal>
        <p>
          Here are some more projects that I have worked on. You can find the
          complete list of projects on my{' '}
          <Link
            href={MY_GITHUB_PROFILE}
            target='_blank'
            className='underline hover:text-(--foreground)'
          >
            GitHub Profile
            <RiExternalLinkFill className='ml-1 inline sm:text-lg' />
          </Link>
        </p>
      </CustomBoxReveal>
      <section className='flex flex-col gap-2 py-8'>
        {projects.map((project, index) => (
          <CustomBoxReveal width='100%' key={index}>
            <div className='w-full cursor-pointer rounded-sm bg-gradient-to-r from-(--background) to-(--navbar-background) px-2 py-3 text-start text-base text-(--foreground) hover:bg-gradient-to-r hover:from-(--navbar-background) hover:to-(--navbar-background) sm:text-lg'>
              <Link
                key={index}
                href={project.githubLink}
                target='_blank'
                className='flex items-start justify-start gap-1 text-(--foreground)'
              >
                <span className='mt-0.5'>
                  <FiArrowUpRight className='text-xl sm:text-2xl' />
                </span>
                <span>{project.title}</span>
                <span>{' - '}</span>
                <span className='text-(--muted-foreground)'>
                  {project.description}
                </span>
              </Link>
            </div>
          </CustomBoxReveal>
        ))}
      </section>
    </div>
  )
}
