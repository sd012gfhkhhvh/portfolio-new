import { MDXComponent } from '@/mdx-components'
import { getPost } from '@/lib/data/post'
import { BackButton } from '@/components/back-button'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ImgLoader } from '@/components/image-loader'

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className='flex min-h-[400px] flex-col items-center justify-center text-center'>
        <h1 className='mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100'>
          Post Not Found
        </h1>
        <p className='mb-4 text-gray-600 dark:text-gray-400'>
          The blog post you're looking for doesn't exist.
        </p>
        <BackButton />
      </div>
    )
  }

  const { content, metadata } = post

  return (
    <article className='max-w-none'>
      {/* Header Section */}
      <header className='mb-8'>
        <div className='mt-6 mb-6 text-lg sm:mt-0 sm:text-xl'>
          <BackButton />
        </div>

        {/* Title */}
        <h1 className='mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl dark:text-gray-100'>
          {metadata?.title}
        </h1>

        {/* Metadata Row */}
        <div className='mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
          {/* Author */}
          {metadata?.author && (
            <div className='flex items-center gap-1.5'>
              <ImgLoader
                src='https://avatars.githubusercontent.com/u/91667720?v=4'
                className='my-0 h-8 w-8 rounded-full'
                alt='Soham Das'
              />
              <span className='font-medium'>{metadata.author}</span>
            </div>
          )}

          {/* Publish Date */}
          {metadata?.date && (
            <div className='flex items-center gap-1.5'>
              <Calendar className='h-4 w-4' />
              <time dateTime={metadata.date.toISOString()}>
                {formatDate(metadata.date)}
              </time>
            </div>
          )}

          {/* Update Date (if different from publish date) */}
          {metadata?.updateDate &&
            metadata.updateDate.getTime() !== metadata.date?.getTime() && (
              <div className='flex items-center gap-1.5'>
                <Clock className='h-4 w-4' />
                <span>Updated {formatDate(metadata.updateDate)}</span>
              </div>
            )}
        </div>

        {/* Tags */}
        {metadata?.tags && metadata.tags.length > 0 && (
          <div className='mb-6 flex items-center gap-2'>
            <Tag className='h-4 w-4 text-gray-500' />
            <div className='flex flex-wrap gap-2'>
              {metadata.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant='secondary'
                  className='bg-gray-100 px-2 py-1 text-xs transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className='mb-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700' />
      </header>

      {/* Content */}
      <div className='prose prose-gray dark:prose-invert prose-lg max-w-none'>
        <MDXComponent source={content} />
      </div>

      {/* Footer */}
      <footer className='mt-12 border-t border-gray-200 pt-8 dark:border-gray-800'>
        <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-4'>
            {metadata?.author && <span>Written by {metadata.author}</span>}
            {metadata?.date && (
              <span>Published on {formatDate(metadata.date)}</span>
            )}
          </div>

          <BackButton />
        </div>
      </footer>
    </article>
  )
}
