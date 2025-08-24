'use client'
import Link from 'next/link'
import { RiExternalLinkFill } from 'react-icons/ri'
import { CustomBoxReveal } from './custom-boxreveal'
import { POST_METADATA } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export const BlogPostCard = ({ metadata }: { metadata: POST_METADATA }) => {
  return (
    <CustomBoxReveal width={'100%'}>
      <div className='grid grid-cols-1 space-y-1 sm:grid-cols-3 sm:space-y-0'>
        {/* date published */}
        <div className='col-span-1 text-sm text-(--muted-foreground) sm:text-base'>
          {formatDate(metadata.date)}
        </div>
        {/* title */}
        <div className='col-span-2'>
          <Link
            href={`/posts/${metadata.slug}`}
            className='text-(--foreground) hover:underline'
          >
            <span>{metadata.title}</span>
          </Link>
          <RiExternalLinkFill className='ml-1 inline' />
        </div>
      </div>
    </CustomBoxReveal>
  )
}
