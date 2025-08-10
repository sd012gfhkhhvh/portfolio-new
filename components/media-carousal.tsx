import React, { useState, useEffect, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Volume2,
  X,
  Download,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export interface MediaItem {
  id: string
  type: 'image' | 'video' | 'youtube' | 'external-video'
  src: string
  thumbnail?: string
  title: string
  description?: string
  alt?: string
  videoId?: string // For YouTube videos
}

interface MediaCarouselProps {
  items: MediaItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
  showProgress?: boolean
  className?: string
}

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'maxres'
): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showProgress = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length)
    setProgress(0)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + items.length) % items.length)
    setProgress(0)
  }, [items.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    setIsPlaying(false) // Pause carousel when lightbox opens
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const nextInLightbox = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const prevInLightbox = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Auto-play functionality with progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && !isHovered && items.length > 1 && !lightboxOpen) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextSlide()
            return 0
          }
          return prev + 100 / (autoPlayInterval / 100)
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, nextSlide, autoPlayInterval, lightboxOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) {
        if (event.key === 'ArrowLeft') {
          prevInLightbox()
        } else if (event.key === 'ArrowRight') {
          nextInLightbox()
        } else if (event.key === 'Escape') {
          closeLightbox()
        }
        return
      }

      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === ' ') {
        event.preventDefault()
        togglePlayPause()
      } else if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    prevSlide,
    nextSlide,
    togglePlayPause,
    isFullscreen,
    lightboxOpen,
    prevInLightbox,
    nextInLightbox,
    closeLightbox
  ])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    const carousel = document.getElementById('media-carousel')
    if (!carousel) return

    if (!document.fullscreenElement) {
      carousel.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  if (!items.length) return null

  const currentItem = items[currentIndex]
  const lightboxItem = items[lightboxIndex]

  // Process items for YouTube URLs
  const processItem = (item: MediaItem) => {
    const processedItem = { ...item }
    if (
      item.type === 'youtube' ||
      item.src.includes('youtube.com') ||
      item.src.includes('youtu.be')
    ) {
      const videoId = getYouTubeVideoId(item.src)
      if (videoId) {
        processedItem.videoId = videoId
        processedItem.type = 'youtube'
        if (!processedItem.thumbnail) {
          processedItem.thumbnail = getYouTubeThumbnail(videoId)
        }
      }
    }
    return processedItem
  }

  const processedCurrentItem = processItem(currentItem)
  const processedLightboxItem = processItem(lightboxItem)

  const renderMedia = (item: MediaItem, isLightbox = false) => {
    const processedItem = processItem(item)

    switch (processedItem.type) {
      case 'youtube':
        return (
          <iframe
            src={`https://www.youtube.com/embed/${processedItem.videoId}?autoplay=${isLightbox ? 1 : 0}&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
            className='h-full w-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            loading='lazy'
          />
        )
      case 'video':
      case 'external-video':
        return (
          <video
            src={processedItem.src}
            controls
            autoPlay={isLightbox}
            className='h-full w-full object-cover'
            poster={processedItem.thumbnail}
            preload='metadata'
          >
            <source src={processedItem.src} type='video/mp4' />
            <source src={processedItem.src} type='video/webm' />
            <source src={processedItem.src} type='video/ogg' />
            Your browser does not support the video tag.
          </video>
        )
      default:
        return (
          <img
            src={processedItem.src}
            alt={processedItem.alt || processedItem.title}
            className={`h-full w-full object-cover transition-all duration-500 ${isLightbox ? 'object-contain' : ''}`}
            loading={isLightbox ? 'eager' : 'lazy'}
          />
        )
    }
  }

  return (
    <>
      <div
        id='media-carousel'
        className={`bg-surface-elevated shadow-elevated relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 max-w-none rounded-none' : ''} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Progress Bar */}
        {showProgress && isPlaying && items.length > 1 && (
          <div className='bg-surface absolute top-0 right-0 left-0 z-20 h-1'>
            <div
              className='h-full bg-gradient-to-r from-[#6c5ce7] to-[#c94b4b] transition-all duration-100 ease-linear'
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Main Display Area */}
        <div className='bg-surface relative aspect-video overflow-hidden'>
          {/* Media Content - Clickable for lightbox */}
          <div
            className='group relative h-full w-full cursor-pointer'
            // onClick={() => openLightbox(currentIndex)}
          >
            {renderMedia(processedCurrentItem)}

            {/* Lightbox indicator overlay */}
            {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3">
                  <Maximize2 className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div> */}

            {/* Glass Morphism Overlay for Title/Description */}
            <div className='pointer-events-none absolute top-4 right-40 left-4 z-10'>
              <div
                className='rounded-xl border p-2 backdrop-blur-xl transition-all duration-300 md:p-4'
                // style={{
                //   backgroundColor: 'hsl(var(--glass-bg))',
                //   borderColor: 'hsl(var(--glass-border))',
                // }}
              >
                <h3 className='text-foreground mb-1 line-clamp-2 text-sm font-semibold md:text-lg'>
                  {processedCurrentItem.title}
                </h3>
                {processedCurrentItem.description && (
                  <p className='text-muted-foreground line-clamp-2 text-sm'>
                    {processedCurrentItem.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Control Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
          >
            {/* Navigation Controls */}
            <div className='absolute inset-y-0 right-0 left-0 flex items-center justify-between p-6'>
              <Button
                variant='ghost'
                size='icon'
                onClick={e => {
                  e.stopPropagation()
                  prevSlide()
                }}
                className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow pointer-events-auto h-12 w-12 rounded-full border backdrop-blur-sm transition-all duration-300'
                disabled={items.length <= 1}
              >
                <ChevronLeft className='h-6 w-6' />
              </Button>

              <Button
                variant='ghost'
                size='icon'
                onClick={e => {
                  e.stopPropagation()
                  nextSlide()
                }}
                className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow pointer-events-auto h-12 w-12 rounded-full border backdrop-blur-sm transition-all duration-300'
                disabled={items.length <= 1}
              >
                <ChevronRight className='h-6 w-6' />
              </Button>
            </div>

            {/* Top Right Controls */}
            <div className='absolute top-6 right-6 flex space-x-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={e => {
                  e.stopPropagation()
                  toggleFullscreen()
                }}
                className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow pointer-events-auto h-10 w-10 rounded-full border backdrop-blur-sm transition-all duration-300'
              >
                <Maximize2 className='h-4 w-4' />
              </Button>

              {items.length > 1 && (
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={e => {
                    e.stopPropagation()
                    togglePlayPause()
                  }}
                  className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow pointer-events-auto h-10 w-10 rounded-full border backdrop-blur-sm transition-all duration-300'
                >
                  {isPlaying ? (
                    <Pause className='h-4 w-4' />
                  ) : (
                    <Play className='h-4 w-4' />
                  )}
                </Button>
              )}
            </div>

            {/* Dots Indicator */}
            {items.length > 1 && (
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2 transform'>
                <div className='flex space-x-3'>
                  {items.map((_, index) => (
                    <button
                      key={index}
                      onClick={e => {
                        e.stopPropagation()
                        goToSlide(index)
                      }}
                      className={`pointer-events-auto h-3 w-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-primary shadow-glow scale-125'
                          : 'bg-muted hover:bg-primary/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Thumbnail Strip */}
        {showThumbnails && items.length > 1 && (
          <div className='bg-surface border-border border-t p-4'>
            <div className='scrollbar-hide flex space-x-3 overflow-x-auto'>
              {items.map((item, index) => {
                const thumbItem = processItem(item)

                return (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(index)}
                    className={`group relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-primary shadow-glow scale-105'
                        : 'border-border hover:border-primary/50 hover:scale-102'
                    }`}
                  >
                    <img
                      src={thumbItem.thumbnail || thumbItem.src}
                      alt={`Thumbnail for ${thumbItem.title}`}
                      className='h-full w-full object-cover transition-all duration-300 group-hover:scale-105'
                    />

                    {/* Type Indicator */}
                    <div className='absolute top-1 right-1'>
                      {thumbItem.type === 'youtube' && (
                        <div className='flex h-5 w-5 items-center justify-center rounded bg-red-600'>
                          <Play className='h-2 w-2 fill-white text-white' />
                        </div>
                      )}
                      {(thumbItem.type === 'video' ||
                        thumbItem.type === 'external-video') && (
                        <div className='bg-primary flex h-5 w-5 items-center justify-center rounded'>
                          <Volume2 className='text-primary-foreground h-2 w-2' />
                        </div>
                      )}
                    </div>

                    {/* Overlay for current item */}
                    {index === currentIndex && (
                      <div className='bg-primary/20 absolute inset-0 flex items-center justify-center'>
                        <div className='bg-primary flex h-6 w-6 items-center justify-center rounded-full'>
                          <Play className='text-primary-foreground fill-primary-foreground h-3 w-3' />
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className='bg-background/95 border-border h-[90vh] w-full max-w-7xl p-0 backdrop-blur-xl'>
          <div className='relative flex h-full w-full flex-col'>
            {/* Lightbox Header */}
            <div className='border-border flex items-center justify-between border-b p-6'>
              <div className='flex-1'>
                <h2 className='text-foreground mb-1 text-xl font-semibold'>
                  {processedLightboxItem.title}
                </h2>
                {processedLightboxItem.description && (
                  <p className='text-muted-foreground text-sm'>
                    {processedLightboxItem.description}
                  </p>
                )}
              </div>

              <div className='flex items-center space-x-2'>
                {processedLightboxItem.type === 'image' && (
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = processedLightboxItem.src
                      link.download = `${processedLightboxItem.title}.jpg`
                      link.click()
                    }}
                    className='h-10 w-10'
                  >
                    <Download className='h-4 w-4' />
                  </Button>
                )}

                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() =>
                    window.open(processedLightboxItem.src, '_blank')
                  }
                  className='h-10 w-10'
                >
                  <ExternalLink className='h-4 w-4' />
                </Button>

                <Button
                  variant='ghost'
                  size='icon'
                  onClick={closeLightbox}
                  className='h-10 w-10'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Lightbox Content */}
            <div className='bg-surface relative flex-1'>
              {renderMedia(processedLightboxItem, true)}

              {/* Navigation in lightbox */}
              {items.length > 1 && (
                <>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={prevInLightbox}
                    className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 transform rounded-full border backdrop-blur-sm transition-all duration-300'
                  >
                    <ChevronLeft className='h-6 w-6' />
                  </Button>

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={nextInLightbox}
                    className='bg-surface-elevated/80 border-border hover:bg-primary hover:border-primary hover:shadow-glow absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 transform rounded-full border backdrop-blur-sm transition-all duration-300'
                  >
                    <ChevronRight className='h-6 w-6' />
                  </Button>
                </>
              )}
            </div>

            {/* Lightbox Footer with thumbnails */}
            {items.length > 1 && (
              <div className='border-border bg-surface-elevated border-t p-4'>
                <div className='scrollbar-hide flex justify-center space-x-2 overflow-x-auto'>
                  {items.map((item, index) => {
                    const thumbItem = processItem(item)
                    return (
                      <button
                        key={item.id}
                        onClick={() => setLightboxIndex(index)}
                        className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          index === lightboxIndex
                            ? 'border-primary shadow-glow'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={thumbItem.thumbnail || thumbItem.src}
                          alt={`Thumbnail ${index + 1}`}
                          className='h-full w-full object-cover'
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MediaCarousel
