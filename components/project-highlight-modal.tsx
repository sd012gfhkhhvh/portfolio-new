'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  useDisclosure
} from '@heroui/react'
import { ShinyButton } from './magicui/shiny-button'
import { SparklesText } from './magicui/sparkles-text'
import { FaBullseye } from 'react-icons/fa'
import ClickSpark from './ui/custom/click-spark'
import { type PROJECT } from '@/lib/data/project'
import MediaCarousel, { MediaItem } from './media-carousal'

export const ProjectHighlightsModal = ({
  highlights,
  modalTitle = 'Highlights'
}: {
  highlights: PROJECT['highlights']
  modalTitle?: string
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  if (!highlights) return null

  return (
    <>
      <ShinyButton
        onClick={onOpen}
        className='hover:border-(--muted-foreground) hover:bg-(--navbar-background)'
      >
        <div className='flex items-center justify-between gap-2 text-(--muted-foreground)'>
          <FaBullseye className='text-sx text-yellow-300 sm:text-sm' />
          <span className=''>
            <ClickSpark>
              <SparklesText className='text-xs sm:text-sm' sparklesCount={10}>
                Highlights
              </SparklesText>
            </ClickSpark>
          </span>
        </div>
      </ShinyButton>
      <Modal
        backdrop='opaque'
        classNames={{
          backdrop:
            'bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='max-w-4xl'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {modalTitle}
              </ModalHeader>
              <ModalBody className=''>
                <MediaCarousel
                  items={highlights}
                  autoPlay={true}
                  autoPlayInterval={7000}
                  showThumbnails={true}
                  showProgress={true}
                  className='hover:shadow-glow/50 shadow-2xl transition-all duration-500'
                />
              </ModalBody>
              <ModalFooter>
                <HeroButton color='danger' variant='light' onPress={onClose}>
                  Close
                </HeroButton>
                {/* <HeroButton color='primary' onPress={onClose}>
                  Action
                </HeroButton> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const portfolioItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Analytics Dashboard',
    description:
      'A comprehensive data analytics platform with real-time insights, interactive visualizations, and modern dark theme design.',
    alt: 'Modern analytics dashboard interface'
  },
  {
    id: '2',
    type: 'youtube',
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Demo Video Tutorial',
    description:
      'Step-by-step guide showcasing the key features and functionality of our latest application.',
    alt: 'YouTube demo video'
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'E-Commerce Mobile App',
    description:
      'Full-featured shopping experience with seamless checkout, payment integration, and user-friendly design.',
    alt: 'E-commerce mobile application design'
  },
  {
    id: '4',
    type: 'youtube',
    src: 'https://youtu.be/9bZkp7q19f0',
    title: 'Component Showcase',
    description:
      'Interactive demonstration of our custom React components and design system in action.',
    alt: 'YouTube component demo'
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Creative Portfolio',
    description:
      'A stunning portfolio website showcasing creative work with modern layouts, animations, and responsive design.',
    alt: 'Creative portfolio website design'
  },
  {
    id: '6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'SaaS Landing Page',
    description:
      'Professional landing page design optimized for conversions, user engagement, and brand storytelling.',
    alt: 'SaaS landing page design'
  }
]
