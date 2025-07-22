'use client'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { skillData } from '@/lib/data/skill'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { TextAnimate } from './magicui/text-animate'
import { CustomBoxReveal } from './custom-boxreveal'

export const Skills = () => {
  const minimumSkillsToShow = skillData.length / 2
  const theme = useTheme()
  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <div className='w-full py-4'>
      <TextAnimate
        animation='blurInUp'
        as='h2'
        by='character'
        once
        className='text-left text-xl font-semibold sm:text-2xl'
      >
        Skills
      </TextAnimate>{' '}
      <div
        className={`relative overflow-hidden rounded-2xl ${!showMore ? `bg-gradient-to-b from-transparent ${theme.theme === 'dark' ? 'to-[#1c1c1f]' : 'to-[#f5f5f5]'}` : ''}`}
      >
        <div className='flex flex-wrap items-center gap-2 py-4'>
          {skillData
            .map((skill, index) => (
              <CustomBoxReveal key={index} duration={index * 0.1}>
                <InteractiveHoverButton
                  className='text-sm'
                  key={index}
                  trailingIcon={skill.icon}
                >
                  {skill.name}
                </InteractiveHoverButton>
              </CustomBoxReveal>
            ))
            .slice(0, minimumSkillsToShow)}
          {showMore &&
            skillData
              .map((skill, index) => (
                <CustomBoxReveal key={index}>
                  <InteractiveHoverButton
                    className='text-sm'
                    trailingIcon={skill.icon}
                  >
                    {skill.name}
                  </InteractiveHoverButton>
                </CustomBoxReveal>
              ))
              .slice(minimumSkillsToShow)}
        </div>
      </div>
      <CustomBoxReveal width='100%'>
        <p className='text-center text-sm text-(--muted-foreground)'>
          <span
            className='hover:text-primary underline hover:cursor-pointer'
            onClick={() => setShowMore(showMore === true ? false : true)}
          >
            {showMore === true ? 'Show less !' : 'Show more !'}
          </span>
        </p>
      </CustomBoxReveal>
    </div>
  )
}
