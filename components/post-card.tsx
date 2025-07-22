'use client'
import Link from 'next/link'
import { RiExternalLinkFill } from 'react-icons/ri'
import { CustomBoxReveal } from './custom-boxreveal'
import { Post } from '@/lib/posts'

export const BlogPostCard = ({ post }: { post: Post }) => {
  console.log('posts', post)

  return (
    <CustomBoxReveal>
      <div className='flex items-center gap-2 text-sm sm:text-base'>
        {/* date pyublished */}
        <div className='text-(--muted-foreground)'>
          {post.metadata?.date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}{' '}
          :
        </div>
        {/* title */}
        <Link
          href={`/posts/${post.metadata.slug}`}
          className='text-(--foreground) hover:underline'
        >
          <span>{post.metadata.title}</span>
        </Link>
        <RiExternalLinkFill className='ml-1 inline' />
      </div>
    </CustomBoxReveal>
  )
}
