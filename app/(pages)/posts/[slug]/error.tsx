'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { FaSadTear } from 'react-icons/fa'

const ErrorPage = () => {
  useEffect(() => {
    // set document title for client rendered fallback pages
    const prev = document.title
    document.title = 'Post not found — 404'
    return () => {
      document.title = prev
    }
  })
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 z-100 flex flex-col items-center justify-center bg-(--background) px-4 text-(--foreground) md:px-0`}
    >
      <FaSadTear size={48} className='mb-4 md:mb-6 md:size-64' />
      <h1 className='mb-2 text-2xl font-bold md:text-3xl'>
        Oops! Something went wrong.
      </h1>
      <p className='mb-4 text-center md:text-left'>
        We couldn't find the post you're looking for. It's possible that the
        post has been removed or is temporarily unavailable.
      </p>
      <Button variant={'outline'} onClick={() => (window.location.href = '/')}>
        Return Home
      </Button>
    </div>
  )
}

export default ErrorPage
