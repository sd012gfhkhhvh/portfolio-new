import { CustomCard } from './custom-card'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { SiGithub } from 'react-icons/si'
import { FaGlobe } from 'react-icons/fa'
import { CustomBoxReveal } from './custom-boxreveal'
import { ProjectHighlightsModal } from './project-highlight-modal'
import { type PROJECT } from '@/lib/data/project'
import Image from 'next/image'
import ClickSpark from './ui/custom/click-spark'
import { Button } from './ui/button'
import { EyeIcon } from 'lucide-react'

export const ProjectCard = ({
  id = -1,
  showDescription = true,
  showHighlight = true,
  showStack = true,
  project = null
}: {
  id?: number
  showDescription?: boolean
  showHighlight?: boolean
  showStack?: boolean
  project: PROJECT | null
}) => {
  if (!project) return <div>Project not found!</div>

  return (
    <CustomBoxReveal width='100%'>
      <CustomCard>
        <section
          id={`project-${id}`}
          className='grid grid-flow-col-dense items-center gap-2 py-2'
        >
          {/* peoject title */}
          <h2 className='text-base text-(--foreground) sm:text-lg'>
            {project.title}
            {' - '}
            {project.shortDescription}
          </h2>

          {/* logo */}
          {project.logoLink && (
            <div className='self-start justify-self-end text-(--muted-foreground)'>
              <Image src={project.logoLink} width={20} height={20} alt='logo' />
            </div>
          )}
        </section>

        {/* description */}
        {showDescription && (
          <section className='space-y-3 py-2 text-sm text-(--muted-foreground) sm:text-base'>
            <p>{project.description}</p>
          </section>
        )}

        {/* tech stack */}
        {showStack && (
          <section className='flex flex-wrap gap-2 py-2'>
            {project.stack.map((badge, index) => (
              <Badge
                key={index}
                className='text-sm text-(--muted-foreground) hover:text-(--foreground) sm:text-base'
                variant='outline'
              >
                {badge}
              </Badge>
            ))}
          </section>
        )}

        {/* project highlights */}
        <section className='py-2'>
          <div className='flex items-center justify-between'>
            {/* project highlights modal */}
            {showHighlight ? (
              project.highlights && (
                <ProjectHighlightsModal
                  modalTitle={'Highlights for ' + project.title}
                  highlights={project.highlights}
                />
              )
            ) : (
              <ClickSpark>
                <Link href={`/projects/#project-${id}`}>
                  <Button className='cursor-pointer' variant={'outline'}>
                    Show Details <EyeIcon />
                  </Button>
                </Link>
              </ClickSpark>
            )}

            {/* site links */}
            <div className='flex gap-4 text-sm text-(--muted-foreground)'>
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target='_blank'
                  className='flex items-center gap-1 hover:text-(--foreground)'
                >
                  <SiGithub />
                  <span>Github</span>
                </Link>
              )}
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target='_blank'
                  className='flex items-center gap-1 hover:text-(--foreground)'
                >
                  <FaGlobe />
                  <span>Website</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </CustomCard>
    </CustomBoxReveal>
  )
}
