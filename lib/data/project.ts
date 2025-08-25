import { title } from 'process'

export interface PROJECT {
  title: string
  shortDescription: string
  description: string
  logoLink?: string
  stack: string[]
  githubLink: string
  liveLink?: string
  highlights?: {
    id: string
    type: highlightMediaType
    src: string
    thumbnail?: string
    title: string
    description?: string
    alt?: string
    videoId?: string // For YouTube videos
  }[]
}

enum highlightMediaType {
  image = 'image',
  video = 'video',
  youtybe = 'youtube',
  externalVideo = 'external-video'
}

export type PROJECTS = PROJECT[]

export const defaultProjectTitle: string = 'Projects'
export const defaultProjectDescription: string = `These are some of the projects I've worked on. They are a mix of
            personal projects, freelance work, and work I've done for clients.
            They are all things I'm proud of and I hope you enjoy them.`

export const defaultProjects: PROJECTS = [
  {
    title: 'Artify',
    shortDescription: 'AI-powered SaaS Image Transformation Tool',
    description:
      'Built a scalable SaaS platform using Next.js 14, integrated AI image APIs with Cloudinary for media storage, containerized with Docker, and deployed on AWS (EC2, S3) with CI/CD via GitHub Actions.',
    logoLink: '/vercel.svg',
    stack: [
      'Next.js 14',
      'Stripe',
      'AWS EC2',
      'AWS S3',
      'Docker',
      'Cloudinary',
      'TypeScript',
      'Prisma',
      'Jest',
      'GitHub Actions'
    ],
    githubLink: 'https://github.com/sd012gfhkhhvh/Artifyai', // Replace with actual link if different
    liveLink: 'https://artifyai-sd012gfhkhhvhs-projects.vercel.app/', // Replace with actual live link if available
    highlights: [
      {
        id: '1',
        type: highlightMediaType.image,
        title: 'Home Page',
        description: 'Artify Home Page',
        src: '/assets/highlights/artify-1.png',
        alt: 'Artify Home Page'
      },
      {
        id: '2',
        type: highlightMediaType.image,
        title: 'Pricing Page',
        description: 'Artify Pricing Page',
        src: '/assets/highlights/artify-2.png',
        alt: 'Artify Pricing Page'
      }
    ]
  },
  {
    title: 'Envision',
    shortDescription: 'Voice-Controlled AR Application',
    description:
      'Developed a real-time AR application using Unity 3D, Vuforia, and Wit.ai. Enabled voice-activated 3D interactions with natural language support and real-world object tracking, optimized for cross-device AR experiences.',
    logoLink: '/vercel.svg',
    stack: ['Unity 3D', 'Vuforia', 'Wit.ai'],
    githubLink: 'https://github.com/sd012gfhkhhvh/Envision', // Replace with actual link if different
    highlights: [
      {
        id: '1',
        type: highlightMediaType.video,
        title: 'Demo Video',
        description: 'Envision Demo Video',
        src: 'youtu.be/mEVDG8bo8Jo',
        alt: 'Envision Demo Video'
      }
    ]
  },
  {
    title: 'PEER.AI',
    shortDescription:
      'AI-Powered Voice-Controlled Chrome Accessibility Extension',
    description:
      'Engineered a Chrome extension with React and GPT-3.5 API to provide seamless voice navigation across browser tabs. Focused on accessibility-first design with modular architecture and Webpack/Babel setup.',
    stack: [
      'React',
      'JavaScript',
      'Chrome Extension API',
      'Webpack',
      'GPT-3.5',
      'Babel'
    ],
    githubLink: 'https://github.com/sd012gfhkhhvh/Peer.AI', // Replace with actual link if different
    highlights: [
      {
        id: '1',
        type: highlightMediaType.video,
        title: 'Demo Video',
        description: 'Peer.AI Demo Video',
        src: 'https://www.youtube.com/watch?v=txWAGhqS834',
        alt: 'Peer.AI Demo Video'
      }
    ]
  }
]

const projectEndPoint: string = `${process.env.BASE_API_ENDPOINT}/projects`

export async function getProjects(): Promise<PROJECTS> {
  try {
    const response = await fetch(
      projectEndPoint +
        '?populate[0]=projects.logo&populate[1]=projects.highlights',
      {
        next: { revalidate: 60 }
      }
    )

    if (response.status !== 200) {
      return defaultProjects
    }

    const { data } = await response.json()

    const projects = data[0].projects.map((project: any) => {
      const stack = project.stack.split(',').map((stack: any) => stack.trim())
      return {
        title: project.title,
        shortDescription: project.shortDescription,
        description: project.description,
        stack,
        githubLink: project.githubLink,
        liveLink: project?.liveLink,
        highlights: project?.highlights,
        logoLink:
          project.logo &&
          process.env.BASE_URI + project.logo.formats.thumbnail.url
      }
    })

    return projects
  } catch (error) {
    console.error(error)
    return defaultProjects
  }
}

export async function getProjectMetadata(): Promise<{
  title: string
  description: string
}> {
  try {
    const response = await fetch(
      `${projectEndPoint}?fields[0]=title&fields[1]=description`,
      {
        next: { revalidate: 60 }
      }
    )

    if (response.status !== 200) {
      return {
        title: defaultProjectTitle,
        description: defaultProjectDescription
      }
    }

    const { data } = await response.json()

    return {
      title: data[0].title,
      description: data[0].description
    }
  } catch (error) {
    console.log(error)
    return {
      title: defaultProjectTitle,
      description: defaultProjectDescription
    }
  }
}
