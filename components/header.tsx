'use client'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import {
  BookIcon,
  BriefcaseBusiness,
  FileCodeIcon,
  HomeIcon,
} from 'lucide-react'

import { ShineBorder } from './magicui/shine-border'
import { useRouter } from 'next/navigation'
import { BoxReveal } from './magicui/box-reveal'
import ClickSpark from './ui/custom/click-spark'
import { FaMoon, FaSun } from 'react-icons/fa'

export type IconProps = React.HTMLAttributes<SVGElement>

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  return (
    <>
      <div className='mt-6 mb-4 md:mb-12'>
        <nav className='relative flex items-center justify-evenly overflow-hidden rounded-4xl bg-white p-1 shadow-md md:justify-between lg:px-3 lg:py-1 dark:bg-(--navbar-background)'>
          <BoxReveal
            boxColor={theme === 'dark' ? '#27272A' : '#f5f5f5'}
            duration={0.5}
          >
            <ClickSpark>
              <div className='flex items-center space-x-2'>
                <Button
                  onClick={() => router.push('/')}
                  variant='link'
                  className='hover:text-primary cursor-pointer text-base text-(--muted-foreground) hover:no-underline'
                >
                  <HomeIcon />
                  <span className='hidden md:inline'>Home</span>
                </Button>
                <Button
                  onClick={() => router.push('/work')}
                  variant='link'
                  className='hover:text-primary cursor-pointer text-base text-(--muted-foreground) hover:no-underline'
                >
                  <BriefcaseBusiness />
                  <span className='hidden md:inline'>Work</span>
                </Button>
                <Button
                  onClick={() => router.push('/projects')}
                  variant='link'
                  className='hover:text-primary cursor-pointer text-base text-(--muted-foreground) hover:no-underline'
                >
                  <FileCodeIcon />
                  <span className='hidden md:inline'>Project</span>
                </Button>
                <Button
                  onClick={() => router.push('/posts')}
                  variant='link'
                  className='hover:text-primary cursor-pointer text-base text-(--muted-foreground) hover:no-underline'
                >
                  <BookIcon />
                  <span className='hidden md:inline'>Posts</span>
                </Button>
              </div>
            </ClickSpark>
          </BoxReveal>
          {/* theme toggle */}
          <BoxReveal
            boxColor={theme === 'dark' ? '#27272A' : '#f5f5f5'}
            duration={0.5}
          >
            <ClickSpark>
              <div className='flex items-center rounded-full py-1'>
                <Button
                  variant='link'
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className='flex cursor-pointer items-center rounded-full transition-all duration-500'
                >
                  <div className='transform-gpu transition-transform duration-500'>
                    {theme === 'dark' ? (
                      <FaSun className='text-yellow-300' />
                    ) : (
                      <FaMoon />
                    )}
                  </div>
                </Button>
              </div>
            </ClickSpark>
          </BoxReveal>
          <ShineBorder shineColor={theme === 'dark' ? 'white' : 'black'} />
        </nav>
      </div>
    </>
  )
}
