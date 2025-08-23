'use client'
import Image from 'next/image'
import { useState, useRef, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface ImgLoaderProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

// Hosts we explicitly trust to render through next/image (must also be in next.config images.remotePatterns)
const ALLOWED_NEXT_IMAGE_HOSTS = new Set([
  'picsum.photos',
  'localhost', // for local dev CMS
  '127.0.0.1'
])

const IMAGE_PROXY_PREFIX = '/api/image?url='

function parseHost(src: string): string | null {
  try {
    if (src.startsWith('/')) return null // local path
    return new URL(src).hostname
  } catch {
    return null
  }
}

export function ImgLoader({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false
}: ImgLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const host = useMemo(() => parseHost(src), [src])

  const canUseNextImage = useMemo(() => {
    return host === null || ALLOWED_NEXT_IMAGE_HOSTS.has(host)
  }, [host])

  const finalSrc = useMemo(() => {
    if (canUseNextImage) return src
    return `${IMAGE_PROXY_PREFIX}${encodeURIComponent(src)}`
  }, [canUseNextImage, src])

  // Intersection Observer for lazy loading container
  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )
    observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative my-6 overflow-hidden rounded-lg border border-gray-200/60 bg-gray-50 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
      style={{ aspectRatio: `${width}/${height}` }}
      aria-busy={isLoading}
    >
      {!isInView && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100/60 dark:bg-gray-800/60'>
          <div className='h-full w-full animate-pulse rounded-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700' />
        </div>
      )}
      {isInView && (
        <>
          {isLoading && !hasError && (
            <div className='absolute inset-0 z-10 flex items-center justify-center'>
              <div className='relative h-full w-full'>
                <div className='absolute inset-0 animate-pulse rounded-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700' />
                <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-lg'>
                  <div className='absolute inset-y-0 w-1/2 -translate-x-full animate-[slide_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10' />
                </div>
              </div>
            </div>
          )}
          {hasError && (
            <div className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-gray-100/80 p-4 text-center dark:bg-gray-800/70'>
              <div className='text-2xl'>⚠️</div>
              <p className='text-xs font-medium text-gray-600 dark:text-gray-300'>
                Failed to load image
              </p>
              <code className='max-w-[90%] truncate text-[10px] text-gray-400'>
                {alt}
              </code>
            </div>
          )}
          {!hasError && (
            <Image
              src={finalSrc}
              alt={alt}
              fill
              priority={priority}
              style={{ margin: 0 }}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw'
              className={cn(
                'object-cover transition-all duration-700 ease-out',
                isLoading
                  ? 'scale-[1.02] opacity-0 blur-sm'
                  : 'blur-0 scale-100 opacity-100'
              )}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
              placeholder={canUseNextImage ? 'blur' : undefined}
              blurDataURL={
                canUseNextImage
                  ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=='
                  : undefined
              }
            />
          )}
        </>
      )}
    </div>
  )
}

// Keyframe for shimmer slide (can live here since this is a client file)
// Using a style tag injection pattern if not already in global CSS.
if (
  typeof document !== 'undefined' &&
  !document.getElementById('mdx-image-shimmer')
) {
  const style = document.createElement('style')
  style.id = 'mdx-image-shimmer'
  style.innerHTML = `@keyframes slide { 0% { transform: translateX(-100%); } 50% { transform: translateX(50%); } 100% { transform: translateX(100%); } }`
  document.head.appendChild(style)
}
