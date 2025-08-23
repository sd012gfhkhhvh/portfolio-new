// app/not-found.tsx
'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // set document title for client rendered fallback pages
    const prev = document.title
    document.title = '404 - Page not found'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <main
      className={`fixed top-0 right-0 bottom-0 left-0 z-100 flex flex-col items-center justify-center bg-(--background) px-4 text-(--foreground) md:px-0`}
    >
      <div className='container mx-auto px-6 py-16'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='inline-flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700/80 shadow-lg backdrop-blur-sm dark:from-indigo-400/20 dark:to-indigo-600/30'>
            {/* Elegant "broken compass" / location SVG */}
            <span className='text-4xl font-bold text-indigo-600 dark:text-indigo-400'>
              404
            </span>
          </div>

          <h1 className='mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100'>
            Oops — page not found
          </h1>
          <p className='mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-300'>
            We couldn’t find the page you were looking for. It might have been
            removed, had its name changed or is temporarily unavailable.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/'
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'
            >
              ← Back to home
            </Link>

            {/* <Link
              href='/search'
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2 text-sm text-slate-700 transition hover:bg-slate-100/60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60'
            >
              Search the site
            </Link> */}
          </div>

          <p className='mt-8 text-xs text-slate-500 dark:text-slate-400'>
            404 · Not found
          </p>
        </div>
      </div>
    </main>
  )
}
