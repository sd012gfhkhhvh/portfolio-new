'use client'
import { FaArrowLeft } from 'react-icons/fa'

export const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className='cursor-pointer text-(--muted-foreground) no-underline hover:text-(--foreground) hover:underline'
    >
      <span>
        <FaArrowLeft className='mr-1 inline text-sm sm:text-base' /> Back
      </span>
    </button>
  )
}
