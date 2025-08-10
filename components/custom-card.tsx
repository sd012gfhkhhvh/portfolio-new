'use client'
import { MagicCard } from './magicui/magic-card'
import { Card } from './ui/card'
import { useTheme } from 'next-themes'
import React from 'react'

export const CustomCard = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()

  return (
    <Card className='rounded-sm border-none p-0 shadow-none'>
      <MagicCard
        gradientColor={theme.theme !== 'light' ? '#262626' : '#D9D9D955'}
        className='p-0'
      >
        <div className='p-4'>{children}</div>
      </MagicCard>
    </Card>
  )
}
