import { Intro } from '@/components/intro'
import { Skills } from '@/components/skills'
import { WorkExperience } from '@/components/work'
import { ArrowBigDown } from 'lucide-react'
import { Projects } from '@/components/projects'
import { RiExternalLinkFill } from 'react-icons/ri'
import Link from 'next/link'
import { Contacts } from '@/components/contact'
import PostsPage from './(pages)/posts/page'
import { BlogPosts } from '@/components/post'

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center pt-8 sm:pt-0'>
        <Intro />
        <WorkExperience intro={false} stack={false} showDetails={false} />
        <Skills />
        <section className='w-full text-center'>
          <Projects otherProjects={false} intro={false} description={false} />
          <div>
            <Link
              href={'/projects'}
              className='cursor-pointer text-sm text-(--muted-foreground) underline hover:text-(--foreground) sm:text-base'
            >
              Show more projects
              <RiExternalLinkFill className='mx-1 inline' />
            </Link>
          </div>
        </section>
        <section className='mb-6 w-full text-center'>
          <BlogPosts title='Recent Posts' limit={5} intro={false} />
          <Link
            href={'/posts'}
            className='cursor-pointer text-sm text-(--muted-foreground) underline hover:text-(--foreground) sm:text-base'
          >
            Show more posts
            <RiExternalLinkFill className='mx-1 inline' />
          </Link>
        </section>
        {/* <Contacts /> */}
        <svg className='size-6 animate-bounce'>
          <ArrowBigDown />
        </svg>
      </div>
    </>
  )
}
