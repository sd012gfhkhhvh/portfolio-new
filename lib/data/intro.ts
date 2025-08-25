type About = string[]

type Paragraph = {
  type: string
  children: {
    type: string
    text: string
  }[]
}

export const defaultIntroData: About = [
  `I am a Full Stack Developer based in Kolkata, India, with experience building scalable web applications, cloud-native systems, and AI-powered tools. I specialize in React, Next.js, Node.js, Laravel, Docker, and AWS, with a strong foundation in both frontend and backend engineering.`,
  `I’ve worked at VortexWeb, where I built a property listing engine, automated CRM workflows, and deployed analytics dashboards on AWS, and at CS FOR ALL, where I developed a microservices-based LMS serving 5K+ users with production-grade reliability.`,
  `Beyond work, I’ve created projects like Artify (AI SaaS for image transformation), Envision (voice-controlled AR app), and Peer.AI (AI accessibility Chrome extension). I’ve also been a Smart India Hackathon runner-up and a mentor at JWOC, contributing actively to the open-source community.`
]

export type Resume = {
  text: string
  src: string
}

export const defaultResumeData: Resume = {
  text: 'Hiring? Check out my resume',
  src: '/resume.pdf'
}

const BASE_API_ENDPOINT = `${process.env.BASE_API_ENDPOINT}`

export const getIntro = async (): Promise<About> => {
  try {
    const response = await fetch(BASE_API_ENDPOINT + '/intro', {
      next: { revalidate: 60 }
    })

    if (response.status !== 200) {
      return defaultIntroData
    }

    const { data } = await response.json()

    const intro: About = data?.paragraphs.map((paragraph: Paragraph) => {
      return paragraph.children[0].text
    })

    return intro
  } catch (err) {
    console.error(err)
    return defaultIntroData
  }
}

export const getResume = async (): Promise<Resume> => {
  try {
    const response = await fetch(BASE_API_ENDPOINT + '/resume?populate=*', {
      next: { revalidate: 60 }
    })

    if (response.status !== 200) {
      return defaultResumeData
    }

    const { data } = await response.json()

    return {
      text: data?.text || defaultResumeData.text,
      src: data?.resume_file?.url
        ? process.env.BASE_URI + data?.resume_file?.url
        : defaultResumeData.src
    }
  } catch (err) {
    console.error(err)
    return defaultResumeData
  }
}
