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
import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement>

export const navItems = [
  { title: 'Home', href: '/', icon: HomeIcon },
  { title: 'Work', href: '/work', icon: BriefcaseBusiness },
  { title: 'Projects', href: '/projects', icon: FileCodeIcon },
  { title: 'Posts', href: '/posts', icon: BookIcon }
]

export const Header = () => {
  const pathName = usePathname()

  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const localTheme = window.localStorage.getItem('theme')
    const isValidLocalTheme = localTheme
      ? ['light', 'dark'].includes(localTheme)
      : false
    if (!isValidLocalTheme) {
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
    <div className='fixed bottom-0 z-100 mt-6 mb-4 w-[90%] sm:static sm:block sm:w-full md:mb-12'>
      <nav className='relative flex items-center justify-evenly overflow-hidden rounded-4xl bg-white p-1 shadow-md md:justify-between lg:px-3 lg:py-1 dark:bg-(--navbar-background)'>
        <CustomBoxReveal>
          <ClickSpark>
            <div className='flex items-center space-x-2'>
              {navItems.map((item, index) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`hover:text-primary justify-center items-center flex gap-1 mx-4 cursor-pointer text-base ${item.href === pathName ? 'text-primary' : 'text-(--muted-foreground)'} hover:no-underline`}
                  >
                    <item.icon size={16}/>
                    <span className='hidden md:inline'>{item.title}</span>
                  </Link>
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
  )
}
