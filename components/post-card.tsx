'use client'
import Link from 'next/link'
import { RiExternalLinkFill } from 'react-icons/ri'
import { CustomBoxReveal } from './custom-boxreveal'
import { Post } from '@/lib/posts'

export const BlogPostCard = ({ post }: { post: Post }) => {
  
  return (
    <CustomBoxReveal width={'100%'}>
      <div className='grid grid-cols-1 space-y-1 sm:grid-cols-3 sm:space-y-0'>
        {/* date pyublished */}
        <div className='col-span-1 text-(--muted-foreground)'>
          {post.metadata?.date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        {/* title */}
        <div className='col-span-2'>
          <Link
            href={`/posts/${post.metadata.slug}`}
            className='text-(--foreground) hover:underline'
          >
            <span>{post.metadata.title}</span>
          </Link>
          <RiExternalLinkFill className='ml-1 inline' />
        </div>
      </div>
    </CustomBoxReveal>
  )
}
