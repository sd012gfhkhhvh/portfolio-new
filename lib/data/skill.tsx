import React from 'react'
import {
  SiTypescript as TypeScriptIcon,
  SiJavascript as JavascriptIcon,
  SiPython as PythonIcon,
  SiCplusplus as CplusplusIcon,
  SiPhp as PhpIcon,
  SiReact as ReactIcon,
  SiNextdotjs as NextjsIcon,
  SiExpress as ExpressIcon,
  SiLaravel as LaravelIcon,
  SiDocker as DockerIcon,
  SiKubernetes as KubernetesIcon,
  SiCloudflare as CloudflareIcon,
  SiGithub as GithubIcon,
  SiPostgresql as PostgresqlIcon,
  SiMysql as MysqlIcon,
  SiMongodb as MongodbIcon,
  SiRedis as RedisIcon,
  SiPrisma as PrismaIcon,
  SiOpenai as OpenaiIcon,
  SiGit as GitIcon,
  SiJest as JestIcon
} from 'react-icons/si'

import { FaAws as AwsIcon } from 'react-icons/fa'
import { RiGeminiFill as GeminiIcon } from 'react-icons/ri'

interface Skill {
  name: string
  icon: React.ReactNode
  type: string
}

export const skillData: Skill[] = [
  {
    name: 'TypeScript',
    icon: <TypeScriptIcon />,
    type: 'language'
  },
  {
    name: 'JavaScript',
    icon: <JavascriptIcon />,
    type: 'language'
  },
  {
    name: 'Python',
    icon: <PythonIcon />,
    type: 'language'
  },
  {
    name: 'C++',
    icon: <CplusplusIcon />,
    type: 'language'
  },
  {
    name: 'PHP',
    icon: <PhpIcon />,
    type: 'language'
  },
  {
    name: 'React',
    icon: <ReactIcon />,
    type: 'framework'
  },
  {
    name: 'Next.js',
    icon: <NextjsIcon />,
    type: 'framework'
  },
  {
    name: 'Express (Node.js)',
    icon: <ExpressIcon />,
    type: 'framework'
  },
  {
    name: 'Laravel',
    icon: <LaravelIcon />,
    type: 'framework'
  },
  {
    name: 'Docker',
    icon: <DockerIcon />,
    type: 'cloud'
  },
  {
    name: 'Kubernetes',
    icon: <KubernetesIcon />,
    type: 'cloud'
  },
  {
    name: 'AWS (EC2, S3, ECS, SQS)',
    icon: <AwsIcon />,
    type: 'cloud'
  },
  {
    name: 'Cloudflare Workers',
    icon: <CloudflareIcon />,
    type: 'cloud'
  },
  {
    name: 'GitHub Actions (CI/CD)',
    icon: <GithubIcon />,
    type: 'cloud'
  },
  {
    name: 'PostgreSQL',
    icon: <PostgresqlIcon />,
    type: 'database'
  },
  {
    name: 'MySQL',
    icon: <MysqlIcon />,
    type: 'database'
  },
  {
    name: 'MongoDB',
    icon: <MongodbIcon />,
    type: 'database'
  },
  {
    name: 'Redis',
    icon: <RedisIcon />,
    type: 'database'
  },
  {
    name: 'Prisma ORM',
    icon: <PrismaIcon />,
    type: 'database'
  },
  {
    name: 'OpenAI',
    icon: <OpenaiIcon />,
    type: 'ai'
  },
  {
    name: 'Gemini',
    icon: <GeminiIcon />,
    type: 'ai'
  },
  {
    name: 'Git & GitHub',
    icon: <GitIcon />,
    type: 'other'
  },
  {
    name: 'Jest',
    icon: <JestIcon />,
    type: 'other'
  }
]
