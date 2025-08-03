import { MDXComponent } from '@/mdx-components'
import matter from 'gray-matter'
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

  const { content } = matter(post)

  return (
    <main>
      <div className='mt-6 mb-6 text-lg sm:mt-0 sm:text-xl'>
        <BackButton />
      </div>
      <MDXComponent source={content} />
    </main>
  )
}
