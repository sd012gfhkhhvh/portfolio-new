'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import { useEffect, useState } from 'react'
import './globals.css'
import Providers from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { LoaderFive } from '@/components/ui/loader'
import { Metadata } from 'next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const metadata: Metadata = {
  metadataBase: new URL('https://soham.today'),
  title: { default: 'Soham Das', template: '%s | Soham Das' },
  description:
    'Welcome to my portfolio site, showcasing my skills and projects.',
  alternates: {
    canonical: 'https://soham.today',
    languages: {
      'en-US': 'https://soham.today/en-US'
    }
  },
  openGraph: {
    title: 'Soham Das',
    description:
      'Welcome to my portfolio site, showcasing my skills and projects.',
    url: 'https://soham.today',
    siteName: 'Soham Das',
    images: [{ url: 'https://soham.today/og.png' }]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <html suppressHydrationWarning lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {!isMounted ? (
            <div className='flex h-screen items-center justify-center'>
              {' '}
              {/* <Loader className='animate-spin' />{' '} */}
              <LoaderFive text='Loading...' />
            </div>
          ) : (
            <div className='flex min-h-screen flex-col antialiased'>
              <main className='mx-auto w-[90%] grow md:w-[60%] lg:w-[40%]'>
                <ScrollProgress />{' '}
                <div className='hidden sm:block'>
                  {' '}
                  <Header />
                </div>
                {children}
                <div className='fixed bottom-0 z-100 w-[90%] sm:hidden'>
                  <Header />
                </div>
              </main>
              <Footer />
            </div>
          )}
        </Providers>
      </body>
    </html>
  )
}
