import Link from 'next/link'
import { CustomBoxReveal } from './custom-boxreveal'
import { RiExternalLinkFill } from 'react-icons/ri'
import { FiArrowUpRight } from 'react-icons/fi'

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
            <div className='h-12 w-full cursor-pointer rounded-sm bg-gradient-to-r from-(--background) to-(--navbar-background) px-4 py-2 text-start text-base text-(--foreground) hover:bg-gradient-to-r hover:from-(--navbar-background) hover:to-(--navbar-background) sm:text-lg'>
              <Link
                key={index}
                href={'https://github.com/0xshubham'}
                target='_blank'
                className='inline-block w-full'
              >
                <FiArrowUpRight className='me-2 inline text-xl sm:text-2xl' />
                <span className=''>{project.title}</span>
                <span className='text-(--muted-foreground)'>
                  {' '}
                  - {project.description}
                </span>
              </Link>
            </div>
          </CustomBoxReveal>
        ))}
      </section>
    </div>
  )
}
