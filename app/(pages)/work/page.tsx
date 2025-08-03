import { WorkExperience } from '@/components/work'

const WorkExperiencePage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const id = (await searchParams).id
  const workCardId = id ? parseInt(id as string) : -1
  return (
    <div>
      <WorkExperience workId={workCardId} />
    </div>
  )
}
export default WorkExperiencePage
