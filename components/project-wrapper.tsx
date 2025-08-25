import { Suspense } from 'react'
import { CustomBoxReveal } from './custom-boxreveal'
import { Projects } from './projects'
import { getProjectMetadata } from '@/lib/data/project'

export const ProjectWrapper = async ({
  showIntro = true,
  showStack = true,
  showDescription = true,
  showHighlight = true,
  showOtherProjects = true
}: {
  showIntro?: boolean
  showStack?: boolean
  showDescription?: boolean
  showHighlight?: boolean
  showOtherProjects?: boolean
}) => {
  const projectMetaData = await getProjectMetadata()

  if (!projectMetaData) {
    return <div>Project metadata not found!</div>
  }

  return (
    <main className='w-full py-4'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold text-(--foreground) sm:text-2xl'>
          {projectMetaData.title}
        </h2>
      </CustomBoxReveal>

      {/* intro */}
      {showIntro && (
        <CustomBoxReveal>
          <p className='py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            {projectMetaData.description}
          </p>
        </CustomBoxReveal>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Projects
          showStack={showStack}
          showDescription={showDescription}
          showHighlight={showHighlight}
          showOtherProjects={showOtherProjects}
        />
      </Suspense>
    </main>
  )
}
