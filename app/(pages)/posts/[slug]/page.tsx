import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { useMDXComponents } from '@/mdx-components'
import matter from 'gray-matter'
import { getPost } from '@/lib/posts'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const overriddenComponents = useMDXComponents({})
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return <div>Post not found</div>
  }

  const { content, data } = matter(post)
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
      <MDXRemote source={content} components={overriddenComponents} />
    </main>
  )
}
