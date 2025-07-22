'use client'
import { useTheme } from 'next-themes'
import { CustomCard } from './custom-card'
import { useRouter } from 'next/navigation'
import { Badge } from './ui/badge'
import Link from 'next/link'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  useDisclosure
} from '@heroui/react'
import { EyeIcon } from 'lucide-react'
import { Button } from './ui/button'
import { SiGithub } from 'react-icons/si'
import { ShinyButton } from './magicui/shiny-button'
import { SparklesText } from './magicui/sparkles-text'
import { FaBullseye, FaGlobe } from 'react-icons/fa'
import ClickSpark from './ui/custom/click-spark'
import { CustomBoxReveal } from './custom-boxreveal'
import { RiExternalLinkFill } from 'react-icons/ri'
import { FiArrowUpRight } from 'react-icons/fi'

export const Projects = ({
  intro = true,
  stack = true,
  description = true,
  otherProjects = true
}: {
  intro?: boolean
  stack?: boolean
  description?: boolean
  otherProjects?: boolean
}) => {
  const theme = useTheme()
  return (
    <main className='w-full py-4'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold text-(--foreground) sm:text-2xl'>
          Projects
        </h2>
      </CustomBoxReveal>

      {/* intro */}
      {intro && (
        <CustomBoxReveal>
          <p className='py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            I have been fortunate to work with some amazing teams. I have worked
            mostly with startups but also with some large enterprises. Here is a
            brief overview of my employment history.
          </p>
        </CustomBoxReveal>
      )}

      {/* Project card */}
      <section className='grid grid-cols-1 gap-4'>
        {[1, 2].map((project, index) => (
          <CustomBoxReveal key={index} duration={index * 0.1}>
            <ProjectCard stack={stack} description={description} />
          </CustomBoxReveal>
        ))}
      </section>

      {/* other projects */}
      {otherProjects && <OtherProjects />}
    </main>
  )
}

export const ProjectCard = ({
  id = -1,
  open = false,
  description = true,
  stack = true,
  showDetails = true
}: {
  id?: number
  open?: boolean
  description?: boolean
  stack?: boolean
  showDetails?: boolean
}) => {
  const router = useRouter()

  return (
    <CustomBoxReveal>
      <CustomCard>
        <ClickSpark>
          {/* peoject title */}
          <section className='flex items-start justify-between py-2'>
            <h2 className='text-lg font-medium text-(--foreground) sm:text-xl'>
              Artify.air | AI powered art generator qewervqerb
            </h2>
            <div className='text-(--muted-foreground) sm:justify-self-end'>
              <svg
                width='25'
                height='25'
                viewBox='0 0 40 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M33.724 36.5809C37.7426 32.5622 40.0003 27.1118 40.0003 21.4286C40.0003 15.7454 37.7426 10.2949 33.724 6.27629C29.7054 2.25765 24.2549 1.02188e-06 18.5717 0C12.8885 -1.02188e-06 7.43807 2.25764 3.41943 6.27628L10.4905 13.3473C11.6063 14.4631 13.4081 14.4074 14.8276 13.7181C15.9836 13.1568 17.2622 12.8571 18.5717 12.8571C20.845 12.8571 23.0252 13.7602 24.6326 15.3677C26.2401 16.9751 27.1431 19.1553 27.1431 21.4286C27.1431 22.7381 26.8435 24.0167 26.2822 25.1727C25.5929 26.5922 25.5372 28.394 26.6529 29.5098L33.724 36.5809Z'
                  fill='#297AFF'
                ></path>
                <path
                  d='M30 40H19.5098C17.9943 40 16.5408 39.398 15.4692 38.3263L1.67368 24.5308C0.60204 23.4592 0 22.0057 0 20.4902V10L30 40Z'
                  fill='#34C2FF'
                ></path>
                <path
                  d='M10.7143 39.9999H4.28571C1.91878 39.9999 0 38.0812 0 35.7142V29.2856L10.7143 39.9999Z'
                  fill='#34C2FF'
                ></path>
              </svg>
            </div>
          </section>
          {/* description */}
          {description && (
            <section className='space-y-3 py-2 text-sm text-(--muted-foreground) sm:text-base'>
              <p>
                Artify is a platform that allows users to create and share their
                own art. The platform includes a web application and a mobile
                application.
              </p>
            </section>
          )}
          {/* tech stack */}
          {stack && (
            <section className='flex flex-wrap gap-2 py-2'>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
            </section>
          )}
          {/* project highlights */}
          {showDetails ? (
            <section className='py-2'>
              <div className='flex items-center justify-between'>
                {/* project highlights modal */}
                <ProjectHighlightsModal />
                {/* site links */}
                <div className='flex gap-4 text-sm text-(--muted-foreground)'>
                  <Link
                    href='/'
                    className='flex items-center gap-1 hover:text-(--foreground)'
                  >
                    <SiGithub />
                    <span>Github</span>
                  </Link>
                  <Link
                    href='/'
                    className='flex items-center gap-1 hover:text-(--foreground)'
                  >
                    <FaGlobe />
                    <span>Website</span>
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <div className='w-full py-2'>
              <Button
                onClick={() => {
                  router.push(`/work?id=${id}#experience-${id}`)
                }}
                className='w-full cursor-pointer'
                variant={'outline'}
              >
                Show Details <EyeIcon />
              </Button>
            </div>
          )}
        </ClickSpark>
      </CustomCard>
    </CustomBoxReveal>
  )
}

export const ProjectHighlightsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <ShinyButton
        onClick={onOpen}
        className='hover:border-(--muted-foreground) hover:bg-(--navbar-background)'
      >
        <div className='flex items-center justify-between gap-2 text-(--muted-foreground)'>
          <FaBullseye className='text-sx text-yellow-300 sm:text-sm' />
          <span className=''>
            <ClickSpark>
              <SparklesText className='text-xs sm:text-sm' sparklesCount={10}>
                Highlights
              </SparklesText>
            </ClickSpark>
          </span>
        </div>
      </ShinyButton>
      <Modal
        backdrop='opaque'
        classNames={{
          backdrop:
            'bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <HeroButton color='danger' variant='light' onPress={onClose}>
                  Close
                </HeroButton>
                <HeroButton color='primary' onPress={onClose}>
                  Action
                </HeroButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export const OtherProjects = () => {
  return (
    <div className='py-4 text-base text-(--muted-foreground) sm:text-lg'>
      <CustomBoxReveal>
        <p>
          Here are some more projects that I have worked on. You can find the
          complete list of projects on my{' '}
          <Link
            href={'https://github.com/0xshubham'}
            target='_blank'
            className='underline hover:text-(--foreground)'
          >
            GitHub Profile
            <RiExternalLinkFill className='ml-1 inline sm:text-lg' />
          </Link>
        </p>
      </CustomBoxReveal>
      <section className='flex flex-col gap-2 py-10'>
        {[
          { title: 'Project -1', description: 'Description -1' },
          { title: 'Project -2', description: 'Description -2' },
          { title: 'Project -3', description: 'Description -3' },
          { title: 'Project -4', description: 'Description -4' },
          { title: 'Project -5', description: 'Description -5' }
        ].map((project, index) => (
          <CustomBoxReveal width='100%' key={index}>
            <button
              key={index}
              onClick={() => {
                window.open('https://github.com/0xshubham', '_blank')
              }}
              className='h-12 w-full cursor-pointer rounded-sm bg-gradient-to-r from-(--background) to-(--navbar-background) px-4 py-2 text-start text-base text-(--foreground) hover:bg-gradient-to-r hover:from-(--navbar-background) hover:to-(--navbar-background) sm:text-lg'
            >
              <FiArrowUpRight className='me-2 inline text-xl sm:text-2xl' />
              <span className=''>{project.title}</span>
              <span className='text-(--muted-foreground)'>
                {' '}
                - {project.description}
              </span>
            </button>
          </CustomBoxReveal>
        ))}
      </section>
    </div>
  )
}
