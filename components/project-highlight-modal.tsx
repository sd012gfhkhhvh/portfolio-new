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

export const ProjectHighlightsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <HeroButton color='danger' variant='light' onPress={onClose}>
                  Close
                </HeroButton>
                <HeroButton color='primary' onPress={onClose}>
                  Action
                </HeroButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
