'use client'
import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class'>
      <HeroUIProvider>{children}</HeroUIProvider>
    </ThemeProvider>
  )
}
