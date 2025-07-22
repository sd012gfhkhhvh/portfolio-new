import { useTheme } from 'next-themes'
import { BoxReveal } from './magicui/box-reveal'
import { JSX } from 'react'

export const CustomBoxReveal = ({
  children,
  ...props
}: {
  children: JSX.Element
} & React.ComponentProps<typeof BoxReveal>) => {
  const { theme } = useTheme()
  return (
    <BoxReveal
      boxColor={theme === 'dark' ? '#27272A' : '#f5f5f5'}
      duration={0.5}
      {...props}
    >
      {children}
    </BoxReveal>
  )
}
