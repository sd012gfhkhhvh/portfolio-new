import { MDXComponent } from '@/mdx-components'
import { getPost } from '@/lib/posts'
import { BackButton } from '@/components/back-button'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main>
      <div className='mt-6 mb-6 text-lg sm:mt-0 sm:text-xl'>
        <BackButton />
      </div>
      <MDXComponent source={post} />
    </main>
  )
}
