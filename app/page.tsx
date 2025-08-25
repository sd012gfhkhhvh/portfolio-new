import { Intro } from '@/components/intro'
import { Skills } from '@/components/skills'
import { WorkExperience } from '@/components/work'
import { ArrowBigDown } from 'lucide-react'
import { ProjectWrapper } from '@/components/project-wrapper'
import { RiExternalLinkFill } from 'react-icons/ri'
import Link from 'next/link'
import { BlogPosts } from '@/components/post'

export default async function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center pt-8 sm:pt-0'>
        <Intro />
        <WorkExperience
          showIntro={false}
          showStack={false}
          showDetails={false}
        />
        <Skills />
        <section className='w-full'>
          <ProjectWrapper
            showOtherProjects={false}
            showIntro={false}
            showDescription={false}
            showStack={true}
            showHighlight={false}
          />
          <div className='flex justify-center'>
            <Link
              href={'/projects'}
              className='cursor-pointer text-sm text-(--muted-foreground) underline hover:text-(--foreground) sm:text-base'
            >
              Show more projects
              <RiExternalLinkFill className='mx-1 inline' />
            </Link>
          </div>
        </section>
        <section className='mb-6 w-full'>
          <BlogPosts title='Recent Posts' limit={5} isIntro={false} />
          <div className='flex justify-center'>
            <Link
              href={'/posts'}
              className='cursor-pointer text-sm text-(--muted-foreground) underline hover:text-(--foreground) sm:text-base'
            >
              Show more posts
              <RiExternalLinkFill className='mx-1 inline' />
            </Link>
          </div>
        </section>
        {/* <Contacts /> */}
        <svg className='size-6 animate-bounce'>
          <ArrowBigDown />
        </svg>
      </div>
    </>
  )
}
