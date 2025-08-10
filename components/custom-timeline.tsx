import { getWorkExperiences } from '@/lib/data/work'
import { Timeline } from './ui/timeline'
import { WorkCard } from './work-card'

export const CustomTimelineComponent = async ({
  workId,
  showDescription,
  showStack,
  showDetails
}: {
  workId?: number
  showDescription?: boolean
  showStack?: boolean
  showDetails?: boolean
}) => {
  const works = await getWorkExperiences()
  
  if (!works) {
    return <div>Works not found!</div>
  }

  const data = works.map((work, index) => {
    return {
      id: index + 1,
      title: work.timelineTitle,
      content: (
        <WorkCard
          id={index + 1}
          open={index + 1 === workId}
          showDescription={showDescription}
          showStack={showStack}
          showDetails={showDetails}
          role={work.role}
          company={work.company}
          location={work.location}
          startDate={work.startDate}
          endDate={work.endDate}
          description={work.description}
          stack={work.stack}
          contributions={work.contributions}
          badge={work.badge}
        />
      )
    }
  })

  return (
    <div className='relative w-full overflow-clip'>
      <Timeline data={data} />
    </div>
  )
}
