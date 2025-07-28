'use client'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import {
  BookIcon,
  BriefcaseBusiness,
  FileCodeIcon,
  HomeIcon
} from 'lucide-react'

import { ShineBorder } from './magicui/shine-border'
import { useRouter } from 'next/navigation'
import ClickSpark from './ui/custom/click-spark'
import { FaMoon, FaSun } from 'react-icons/fa'
import { CustomBoxReveal } from './custom-boxreveal'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export type IconProps = React.HTMLAttributes<SVGElement>

export const navItems = [
  { title: 'Home', href: '/', icon: HomeIcon },
  { title: 'Work', href: '/work', icon: BriefcaseBusiness },
  { title: 'Projects', href: '/projects', icon: FileCodeIcon },
  { title: 'Posts', href: '/posts', icon: BookIcon }
]

export const Header = () => {
  const params = usePathname()

  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    if (!window.localStorage.getItem('theme')) {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className='mt-6 mb-4 md:mb-12'>
        <nav className='relative flex items-center justify-evenly overflow-hidden rounded-4xl bg-white p-1 shadow-md md:justify-between lg:px-3 lg:py-1 dark:bg-(--navbar-background)'>
          <CustomBoxReveal>
            <ClickSpark>
              <div className='flex items-center space-x-2'>
                {navItems.map((item, index) => {
                  return (
                    <Button
                      key={item.href}
                      onClick={() => router.push(item.href)}
                      variant='link'
                      className={`hover:text-primary cursor-pointer text-base ${item.href === params ? 'text-primary' : 'text-(--muted-foreground)'} hover:no-underline`}
                    >
                      <item.icon />
                      <span className='hidden md:inline'>{item.title}</span>
                    </Button>
                  )
                })}
              </div>
            </ClickSpark>
          </CustomBoxReveal>
          {/* theme toggle */}
          <CustomBoxReveal>
            <ClickSpark>
              <div className='flex items-center rounded-full py-1'>
                <Button
                  variant='link'
                  onClick={() => setTheme(theme !== 'light' ? 'light' : 'dark')}
                  className='flex cursor-pointer items-center rounded-full transition-all duration-500'
                >
                  <div className='transform-gpu transition-transform duration-500'>
                    {theme !== 'light' ? (
                      <FaSun className='text-yellow-300' />
                    ) : (
                      <FaMoon />
                    )}
                  </div>
                </Button>
              </div>
            </ClickSpark>
          </CustomBoxReveal>
          <ShineBorder shineColor={theme === 'dark' ? 'white' : 'black'} />
        </nav>
      </div>
    </>
  )
}
