export interface WORK {
  role: string
  timelineTitle: string
  company: {
    name: string
    link?: string
  }
  location: string
  startDate: string
  endDate: string
  description: string
  stack: string[]
  contributions: string[]
  badge?: {
    title: string
    description: string
  }
}

export type WORK_EXPERIENCES = WORK[]

export const defaultWorkTitle: string = 'Work Experience'
export const defaultWorkDescription: string = `I have been fortunate to work with some amazing teams. I have worked
            mostly with startups but also with some large enterprises. Here is a
            brief overview of my employment history.`

export const defaultWorkExperiences: WORK_EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    timelineTitle: '2024',
    company: {
      name: 'VortexWeb',
      link: 'https://vortexweb.ae/'
    },
    location: 'Remote, Dubai',
    startDate: 'Oct 2024',
    endDate: 'Dec 2024',
    description:
      'Built and optimized a property listing platform, automated CRM workflows, and developed a secure analytics dashboard using modern cloud-native and full-stack technologies.',
    stack: [
      'Laravel Breeze',
      'React',
      'MySQL',
      'Redis',
      'Bitrix24',
      'Cloudflare Workers',
      'AWS ECS (EC2)',
      'Docker',
      'Nginx',
      'GitHub Actions'
    ],
    contributions: [
      'Built a property listing engine with Laravel Breeze and React, integrated XML/REST APIs (Bayut, Dubizzle, Property Finder) with Redis caching and cron-based sync, reducing listing lag by 95%.',
      'Automated Bitrix24 CRM workflows using webhooks, Cloudflare Workers, and AWS SQS, enabling real-time lead routing, chatbot triggers, and email/SMS automation, cutting manual operations by 30%.',
      'Developed a secure and responsive analytics dashboard using Bitrix APIs, containerized and deployed with Docker and Nginx, automated via GitHub Actions, hosted on AWS ECS with IAM roles.'
    ],
    badge: {
      title: 'Why I left early?',
      description:
        'After 1 year of work, I realized that I was not satisfied with the current state of the platform, and I decided to move on to a new challenge.'
    }
  },
  {
    role: 'Software Engineering Intern',
    timelineTitle: 'Mid 2022',
    company: {
      name: 'CS FOR ALL',
    },
    location: 'Remote, India',
    startDate: 'Oct 2022',
    endDate: 'May 2023',
    description:
      'Contributed to building a scalable LMS platform using microservices, implemented secure authentication, scalable asset delivery, and ensured production-grade reliability.',
    stack: [
      'Node.js',
      'React',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'JWT/OAuth2',
      'AWS S3',
      'GitHub Actions',
      'Jest',
      'Prisma',
      'Winston'
    ],
    contributions: [
      'Built a microservices-based LMS using Node.js, React, PostgreSQL, and Redis for 5K+ users; deployed with Docker and Kubernetes with autoscaling and zero-downtime rollouts.',
      'Implemented JWT/OAuth2 authentication, role-based modules, and integrated S3-compatible storage with CDNs and serverless functions for async operations like email and certificate generation.',
      'Ensured production reliability with 80%+ test coverage using Jest, managed database with Prisma migrations, implemented centralized logging (Winston + ELK), and set up CI/CD via GitHub Actions.'
    ],
    badge: {
      title: 'Why I left early?',
      description:
        'After 1 year of work, I realized that I was not satisfied with the current state of the platform, and I decided to move on to a new challenge.'
    }
  }
]

const endpoint: string = `${process.env.BASE_API_ENDPOINT}/works`

export async function getWorkExperiences(): Promise<WORK_EXPERIENCES> {
  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 60 }
    })

    if (response.status !== 200) {
      return defaultWorkExperiences
    }

    const { data } = await response.json()

    return data[0].experiences
  } catch (error) {
    console.error(error)
    return defaultWorkExperiences
  }
}

export async function getWorkExperienceMetadata(): Promise<{
  title: string
  description: string
}> {
  try {
    const response = await fetch(
      `${endpoint}?fields[0]=title&fields[1]=description`,
      {
        next: { revalidate: 60 }
      }
    )

    if (response.status !== 200) {
      return { title: defaultWorkTitle, description: defaultWorkDescription }
    }

    const { data } = await response.json()

    return {
      title: data[0].title,
      description: data[0].description
    }
  } catch (error) {
    console.log(error)
    return { title: defaultWorkTitle, description: defaultWorkDescription }
  }
}
