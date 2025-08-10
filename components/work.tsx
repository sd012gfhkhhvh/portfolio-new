import { Suspense } from 'react'
import { CustomBoxReveal } from './custom-boxreveal'
import { CustomTimelineComponent } from './custom-timeline'
import { getWorkExperienceMetadata } from '@/lib/data/work'

export const WorkExperience = async ({
  workId = -1,
  showIntro = true,
  showDescription = true,
  showStack = true,
  showDetails = true
}: {
  workId?: number
  showIntro?: boolean
  showDescription?: boolean
  showStack?: boolean
  showDetails?: boolean
}) => {
  const { title: workTitle, description: workDescription } =
    await getWorkExperienceMetadata()
    
  return (
    <div className='w-full py-4'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold sm:text-2xl'>
          {workTitle}
        </h2>
      </CustomBoxReveal>

      {/* intro */}
      {showIntro && (
        <CustomBoxReveal>
          <p className='sm:max-w- py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            {workDescription}
          </p>
        </CustomBoxReveal>
      )}

      {/* WorkExperience */}
      <Suspense fallback={<div>Loading...</div>}>
        <CustomTimelineComponent
          workId={workId}
          showDescription={showDescription}
          showStack={showStack}
          showDetails={showDetails}
        />
      </Suspense>
    </div>
  )
}
