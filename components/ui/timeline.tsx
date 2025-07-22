'use client'
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion
} from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import { BoxReveal } from '../magicui/box-reveal'
import { useTheme } from 'next-themes'

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%']
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className='w-full rounded-lg font-sans' ref={containerRef}>
      {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
          a timeline of my journey.
        </p>
      </div> */}

      <div ref={ref} className='relative mx-auto max-w-7xl pb-10'>
        {data.map((item, index) => (
          <div key={index} className='flex justify-start pt-10 md:gap-10'>
            <div className='sticky top-40 z-40 flex max-w-xs flex-col items-center self-start'>
              <div className='absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black'>
                <BoxReveal
                  boxColor={theme.theme === 'dark' ? '#27272A' : '#f5f5f5'}
                  duration={0.5}
                >
                  <div className='h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-700' />
                </BoxReveal>
              </div>
              {/* <h3 className='hidden text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-xl dark:text-neutral-500'>
                {item.title}
              </h3> */}
            </div>

            <div className='relative w-full pl-16 md:pl-10'>
              <BoxReveal
                boxColor={theme.theme === 'dark' ? '#27272A' : '#f5f5f5'}
                duration={0.5}
              >
                <h3 className='mb-4 block text-left text-2xl font-bold text-neutral-500 dark:text-neutral-500'>
                  {item.title}
                </h3>
              </BoxReveal>
              {item.content}{' '}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + 'px'
          }}
          className='absolute top-0 left-5 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-5 dark:via-neutral-700'
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform
            }}
            className='absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent'
          />
        </div>
      </div>
    </div>
  )
}
