import { MDXComponent } from '@/mdx-components'
import matter from 'gray-matter'
import { getPost } from '@/lib/posts'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

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
      <div className='mb-6 text-lg sm:text-xl'>
        <Link
          href={'/posts'}
          className='cursor-pointer text-(--muted-foreground) no-underline hover:text-(--foreground) hover:underline'
        >
          <span>
            <FaArrowLeft className='mr-1 inline text-sm sm:text-base' /> Back
          </span>
        </Link>
      </div>
      <MDXComponent source={content} />
    </main>
  )
}
