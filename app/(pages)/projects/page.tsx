'use client'
import { CustomBoxReveal } from '@/components/custom-boxreveal'
import { BoxReveal } from '@/components/magicui/box-reveal'
import { Projects } from '@/components/projects'
import { Button } from '@/components/ui/button'
import { Link2, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FaExternalLinkAlt,
  FaExternalLinkSquareAlt,
  FaLocationArrow
} from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { GoArrowUpRight } from 'react-icons/go'
import { RiExternalLinkFill, RiExternalLinkLine } from 'react-icons/ri'

const ProjectsPage = () => {
  const router = useRouter()
  return (
    <div>
      <Projects />
    </div>
  )
}

export default ProjectsPage
