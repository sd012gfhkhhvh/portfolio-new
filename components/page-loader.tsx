import React from 'react'
import { LoaderFive } from './ui/loader'

const DefaultPageLoader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      {' '}
      <LoaderFive text='Loading...' />
    </div>
  )
}

export default DefaultPageLoader
