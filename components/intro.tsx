import { WordRotate } from '@/components/magicui/word-rotate'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { DownloadIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getIntro, getResume } from '@/lib/data/intro'
import { TypewriterEffect } from './ui/typewriter-effect'
import { CustomBoxReveal } from './custom-boxreveal'
import Image from 'next/image'
import Link from 'next/link'

export const Intro = async () => {
  const intro = await getIntro()
  const resume = await getResume()

  if (!intro || !resume) {
    return null
  }

  return (
    <>
      <section className='flex w-full items-center space-x-4 py-4 sm:flex-row sm:justify-start sm:space-x-6'>
        <CustomBoxReveal>
          <Image
            width={200}
            height={200}
            src='https://avatars.githubusercontent.com/u/91667720?v=4'
            className='h-20 w-20 rounded-full'
            alt='Soham Das'
          />
        </CustomBoxReveal>
        <CustomBoxReveal>
          <div className='text-left'>
            <h1 className='mb-1 flex items-end justify-start gap-2 text-2xl font-bold tracking-tight text-(--muted-foreground) sm:text-3xl'>
              <span> Hi, I&lsquo;m</span>
              <TypewriterEffect
                className=''
                cursorClassName='bg-yellow-300'
                words={[
                  {
                    text: 'Soham',
                    className:
                      'text-3xl font-semibold tracking-tight text-(--foreground) md:text-4xl'
                  },
                  {
                    text: 'Das',
                    className:
                      'text-3xl font-semibold tracking-tight text-(--foreground) md:text-4xl'
                  }
                ]}
              />
            </h1>
            <div className='text-(--muted-foreground) sm:text-lg'>
              <WordRotate
                words={['Software Engineer', 'Full Stack Web Developer']}
              />
            </div>
          </div>
        </CustomBoxReveal>
      </section>

      {/* resume button */}
      <section className='pb-3 text-center text-(--muted-foreground)'>
        <CustomBoxReveal>
          <Link
            href={resume.src}
            target='_blank'
            className='z-10 flex items-center justify-center'
          >
            <div
              className={cn(
                'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                <span>✨ {resume.text}</span>
                <DownloadIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
              </AnimatedShinyText>
            </div>
          </Link>
        </CustomBoxReveal>
      </section>

      {/* About section */}
      <section className='space-y-4 text-left text-(--muted-foreground) sm:mx-auto sm:max-w-2xl sm:py-4 sm:text-lg'>
        {intro.map((item, index) => (
          <CustomBoxReveal key={index} duration={(index + 1) * 0.1}>
            <p key={index}>{item}</p>
          </CustomBoxReveal>
        ))}
      </section>
    </>
  )
}
