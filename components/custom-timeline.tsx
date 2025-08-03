import { Timeline } from './ui/timeline'
import { WorkCard } from './work-card'

export const CustomTimelineComponent = async ({
  workId,
  description,
  stack,
  showDetails
}: {
  workId?: number
  description?: boolean
  stack?: boolean
  showDetails?: boolean
}) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const data = [
    {
      title: '2024',
      content: (
        <WorkCard
          id={1}
          open={1 === workId}
          description={description}
          stack={stack}
          showDetails={showDetails}
        />
      )
    },
    {
      title: 'Early 2023',
      content: (
        <WorkCard
          id={2}
          open={2 === workId}
          description={description}
          stack={stack}
          showDetails={showDetails}
        />
      )
    }
  ]
  if (!data) {
    return <div>Data not found!</div>
  }
  return (
      <div className='relative w-full overflow-clip'>
        <Timeline data={data} />
      </div>
  )
}
