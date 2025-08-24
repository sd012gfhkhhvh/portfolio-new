'use client'
import { CustomCard } from './custom-card'
import { Badge } from './ui/badge'
import { ChevronsUpDown, EyeIcon } from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/react'
import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

import ClickSpark from './ui/custom/click-spark'
import { CustomBoxReveal } from './custom-boxreveal'
import { type WORK } from '@/lib/data/work'

interface WORK_CARD extends Omit<WORK, 'timelineTitle'> {
  id: number
  open?: boolean
  showDescription?: boolean
  showStack?: boolean
  showDetails?: boolean
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const WorkCard = ({
  id = -1,
  showDescription = true,
  showStack = true,
  showDetails = true,
  location,
  startDate,
  endDate,
  role,
  company,
  badge,
  description,
  stack,
  contributions
}: WORK_CARD) => {
  const searchParams = useSearchParams()
  const currentId = searchParams.get('id')
  const open = currentId ? parseInt(currentId) === id : false

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(open)

  return (
    <CustomBoxReveal>
      <CustomCard>
        {/* location-time */}
        <section className='flex justify-between text-sm text-(--muted-foreground)'>
          <span>{location}</span>
          <span>
            {startDate} - {endDate}
          </span>
        </section>

        {/* job title */}
        <section className='grid grid-cols-3 items-center space-y-2 py-2'>
          <h2 className='col-span-3 text-base text-(--foreground) sm:col-span-2'>
            {role}{' '}
            <span className='text-(--muted-foreground)'>
              at{' '}
              {company.link ? (
                <Link
                  href={company.link}
                  target='_blank'
                  className='text-primary underline'
                >
                  {company.name}
                </Link>
              ) : (
                <span className='text-primary'>{company.name}</span>
              )}
            </span>
          </h2>
          {badge && <WorkBadgeModal badge={badge} />}
        </section>
        {/* description */}
        {showDescription && (
          <section className='space-y-3 py-2 text-sm text-(--muted-foreground) sm:text-base'>
            <p>{description}</p>
          </section>
        )}
        {/* tech stack */}
        {showStack && (
          <section className='flex flex-wrap gap-2 py-2'>
            {stack.map((item, index) => (
              <Badge
                key={index}
                asChild
                variant='outline'
                className='text-sm text-(--muted-foreground)'
              >
                <Link href='' className=''>
                  {item}
                </Link>
              </Badge>
            ))}
          </section>
        )}
        {/* detailed contribution */}
        {showDetails ? (
          <section className='space-y-2 py-2'>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className='flex flex-col gap-2'
            >
              <ClickSpark>
                <CollapsibleTrigger asChild>
                  <div className='flex items-center justify-between rounded-md bg-(--background) px-1 py-2 hover:cursor-pointer'>
                    <h4 className='flex items-center justify-center gap-2 text-base text-(--foreground) sm:text-base'>
                      {/* <CodeIcon size={16} /> */}
                      {isOpen
                        ? 'Hide detailed contribution'
                        : 'Show detailed contribution'}
                    </h4>
                    <ChevronsUpDown size={16} />
                  </div>
                </CollapsibleTrigger>
              </ClickSpark>
              <CollapsibleContent className='flex flex-col gap-2 text-(--muted-foreground)'>
                {contributions.map((contribution, index) => (
                  <CustomBoxReveal key={index} duration={(index + 1) * 0.1}>
                    <div className='rounded-md bg-gradient-to-r from-white to-(--navbar-background) px-4 py-2 text-sm sm:text-base dark:from-neutral-900 dark:to-(--navbar-background)'>
                      {contribution}
                    </div>
                  </CustomBoxReveal>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </section>
        ) : (
          <div className='w-full py-2'>
            <ClickSpark>
              <Button
                onClick={() => {
                  router.push(`/work?id=${id}#experience-${id}`)
                }}
                className='w-full cursor-pointer'
                variant={'outline'}
              >
                Show Details <EyeIcon />
              </Button>
            </ClickSpark>
          </div>
        )}
      </CustomCard>
    </CustomBoxReveal>
  )
}

export const WorkBadgeModal = ({ badge }: { badge: WORK['badge'] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Badge
        asChild
        variant='outline'
        className='text-(--muted-foreground) sm:justify-self-end'
      >
        <a type='button' onClick={onOpen} className='hover:cursor-pointer'>
          {badge?.title}
        </a>
      </Badge>

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
                {badge?.title}
              </ModalHeader>
              <ModalBody className='pb-4 text-(--muted-foreground)'>
                <p>{badge?.description}</p>
              </ModalBody>
              {/* <ModalFooter>
                <HeroButton color='danger' variant='light' onPress={onClose}>
                  Close
                </HeroButton>
                <HeroButton color='primary' onPress={onClose}>
                  Action
                </HeroButton>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
