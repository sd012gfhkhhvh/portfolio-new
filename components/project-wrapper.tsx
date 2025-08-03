import { Suspense } from 'react'
import { CustomBoxReveal } from './custom-boxreveal'
import { Projects } from './projects'

export const ProjectWrapper = ({
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

      <Suspense fallback={<div>Loading...</div>}>
        <Projects
          stack={stack}
          description={description}
          otherProjects={otherProjects}
        />
      </Suspense>
    </main>
  )
}
