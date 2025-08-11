import { getAllPosts } from '@/lib/posts'
import { BlogPostCard } from './post-card'
import { CustomBoxReveal } from './custom-boxreveal'

export const BlogPosts = async ({
  limit = 10,
  intro = true,
  title = 'Posts'
}: {
  limit?: number
  intro?: boolean
  title: string
}) => {
  const posts = await getAllPosts({ limit })
  
  return (
    <main className='w-full py-4'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold text-(--foreground) sm:text-2xl'>
          {title}
        </h2>
      </CustomBoxReveal>
      {/* intro */}
      {intro && (
        <CustomBoxReveal>
          <p className='py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            I share my thoughts and insights on technology and personal
            development through my writing.
          </p>
        </CustomBoxReveal>
      )}

      <section className='flex flex-col gap-2 py-4'>
        {posts ? (
          posts.map(post => (
            <BlogPostCard key={post.metadata.slug} post={post} />
          ))
        ) : (
          <NoPostFound />
        )}
      </section>
    </main>
  )
}

export const NoPostFound = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-24 w-24 text-(--muted-foreground)'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <p className='py-2 text-center text-(--muted-foreground) sm:text-lg'>
        No post found
      </p>
    </div>
  )
}
