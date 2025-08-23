import { Skeleton } from '@/components/ui/skeleton'

const BlogPostSkeleton = () => (
  <div className='mx-auto max-w-3xl px-4 py-10'>
    {/* Title */}
    <Skeleton className='mb-3 h-12 w-3/4 rounded' />

    {/* Author section */}
    <div className='mb-6 flex items-center gap-3'>
      <Skeleton className='h-10 w-10 rounded-full' /> {/* Author image */}
      <div>
        <Skeleton className='mb-1 h-4 w-24 rounded' /> {/* Author name */}
        <Skeleton className='h-3 w-16 rounded' /> {/* Date */}
      </div>
    </div>

    {/* Cover image */}
    <Skeleton className='mb-8 h-64 w-full rounded-lg' />

    {/* Content placeholders */}
    <div className='space-y-5'>
      <Skeleton className='h-6 w-full rounded' />
      <Skeleton className='h-6 w-5/6 rounded' />
      <Skeleton className='h-6 w-4/6 rounded' />
      <Skeleton className='h-6 w-5/6 rounded' />
      <Skeleton className='h-6 w-4/6 rounded' />
    </div>
  </div>
)

export default BlogPostSkeleton
