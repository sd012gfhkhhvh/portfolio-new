'use client'
import { CustomBoxReveal } from '@/components/custom-boxreveal'

export default function PageLayout({
  children,
  title,
  intro = true,
  introText
}: {
  children: React.ReactNode
  title: string
  intro?: boolean
  introText?: string
}) {
  return (
    <main className='w-full'>
      <CustomBoxReveal>
        <h2 className='py-4 text-left text-xl font-semibold text-(--foreground) sm:text-2xl'>
          {title}
        </h2>
      </CustomBoxReveal>

      {/* intro */}
      {intro && introText && (
        <CustomBoxReveal>
          <p className='py-2 text-left text-(--muted-foreground) sm:mx-auto sm:py-4 sm:text-lg'>
            {introText}
          </p>
        </CustomBoxReveal>
      )}
      {children}
    </main>
  )
}
