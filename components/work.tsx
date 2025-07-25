'use client'
import { CustomCard } from './custom-card'
import { Badge } from './ui/badge'
import { ChevronsUpDown, EyeIcon } from 'lucide-react'

import Link from 'next/link'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import React, { useState } from 'react'
import { BoxReveal } from './magicui/box-reveal'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

import { Timeline } from '@/components/ui/timeline'
import ClickSpark from './ui/custom/click-spark'
import { CustomBoxReveal } from './custom-boxreveal'

export const WorkExperience = ({
  intro = true,
  description = true,
  stack = true,
  showDetails = true
}: {
  intro?: boolean
  description?: boolean
  stack?: boolean
  showDetails?: boolean
}) => {
  const theme = useTheme()
  const searchParams = useSearchParams()

  let workId: string | number | null = searchParams.get('id')
  workId = workId ? parseInt(workId) : -1

  const data = [
    {
      title: '2024',
      content: (
        <WorkCard
          id={1}
          open={1 === workId}
          description={description}
          stack={stack}
          showDetails={showDetails}
        />
      )
    },
    {
      title: 'Early 2023',
      content: (
        <WorkCard
          id={2}
          open={2 === workId}
          description={description}
          stack={stack}
          showDetails={showDetails}
        />
      )
    }
  ]

  return (
    <div className='w-full py-4'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold sm:text-2xl'>
          Employment History
        </h2>
      </CustomBoxReveal>

      {/* intro */}
      {intro && (
        <CustomBoxReveal>
          <p className='sm:max-w- py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            I have been fortunate to work with some amazing teams. I have worked
            mostly with startups but also with some large enterprises. Here is a
            brief overview of my employment history.
          </p>
        </CustomBoxReveal>
      )}

      {/* WorkExperience */}
      <div className='relative w-full overflow-clip'>
        <Timeline data={data} />
      </div>
    </div>
  )
}

export const WorkCard = ({
  id = -1,
  open = false,
  description = true,
  stack = true,
  showDetails = true
}: {
  id?: number
  open?: boolean
  description?: boolean
  stack?: boolean
  showDetails?: boolean
}) => {
  const router = useRouter()
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(open)

  return (
    <CustomBoxReveal>
      <CustomCard>
        <ClickSpark>
          {/* location-time */}
          <section
            id={`experience-${id}`}
            className='flex justify-between text-sm text-(--muted-foreground)'
          >
            <span>Remote, Dubai</span>
            <span>2022 - Present</span>
          </section>

          {/* job title */}
          <section className='grid grid-cols-3 items-center space-y-2 py-2'>
            <h2 className='col-span-3 text-base text-(--foreground) sm:col-span-2'>
              Full Stack Developer{' '}
              <span className='text-(--muted-foreground)'>
                at{' '}
                <a
                  href='https://www.egyptianairways.com/en/'
                  target='_blank'
                  className='text-primary underline'
                >
                  Egyptian Airways
                </a>
              </span>
            </h2>
            <Badge
              asChild
              variant='outline'
              className='text-(--muted-foreground) sm:justify-self-end'
            >
              <Link href='/' className=''>
                Why I left early?
              </Link>
            </Badge>
          </section>
          {/* description */}
          {description && (
            <section className='space-y-3 py-2 text-sm text-(--muted-foreground) sm:text-base'>
              <p>
                I joined Egyptian Airways in 2022 as a Frontend Developer. I was
                in charge of the development of the company&apos;s website and
                applications. I was responsible for the development of the
                company&apos;s website and applications.
              </p>
            </section>
          )}
          {/* tech stack */}
          {stack && (
            <section className='flex flex-wrap gap-2 py-2'>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                React
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
              <Badge
                className='text-sm text-(--muted-foreground) sm:text-base'
                variant='outline'
              >
                Typescript
              </Badge>
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
                <CollapsibleContent className='flex flex-col gap-2 text-(--muted-foreground)'>
                  <BoxReveal
                    boxColor={theme.theme === 'dark' ? '#27272A' : '#f5f5f5'}
                    duration={0.2}
                  >
                    <div className='rounded-md bg-gradient-to-r from-white to-(--navbar-background) px-4 py-2 text-sm sm:text-base dark:from-neutral-900 dark:to-(--navbar-background)'>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      In, debitis quaerat nostrum consectetur perferendis velit
                      quos quidem numquam fuga. Provident voluptate quis cum
                      dolorum dicta illo quia beatae officia nesciunt.
                    </div>
                  </BoxReveal>
                  <BoxReveal
                    boxColor={theme.theme === 'dark' ? '#27272A' : '#f5f5f5'}
                    duration={0.2}
                  >
                    <div className='rounded-md bg-gradient-to-r from-white to-(--navbar-background) px-4 py-2 text-sm sm:text-base dark:from-neutral-900 dark:to-(--navbar-background)'>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Doloremque illum veritatis fugit unde, optio dolore
                    </div>
                  </BoxReveal>
                </CollapsibleContent>
              </Collapsible>
            </section>
          ) : (
            <div className='w-full py-2'>
              <Button
                onClick={() => {
                  router.push(`/work?id=${id}#experience-${id}`)
                }}
                className='w-full cursor-pointer'
                variant={'outline'}
              >
                Show Details <EyeIcon />
              </Button>
            </div>
          )}
        </ClickSpark>
      </CustomCard>
    </CustomBoxReveal>
  )
}
