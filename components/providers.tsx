'use client'
import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class'>
      <HeroUIProvider>
        {' '}
        <ProgressProvider
          height='4px'
          color='#3b82f6'
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}{' '}
        </ProgressProvider>
      </HeroUIProvider>
    </ThemeProvider>
  )
}
