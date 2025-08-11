type About = string[]

type Paragraph = {
  type: string
  children: {
    type: string
    text: string
  }[]
}

export const defaultIntroData: About = [
  ` I am always looking for new challenges and opportunities to grow as a
web developer.`,
  ` In my free time, I enjoy playing the guitar, watching movies, and
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
natoque penatibus et magnis dis parturient montes, nascetur
ridiculus mus. Duis at vehicula justo. Nulla facilisi. In hac
habitasse platea dictumst.`,
  ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
nulla auctor, vestibulum magna sed, convallis ex. Cum sociis
natoque penatibus et magnis dis parturient montes, nascetur
ridiculus mus. Duis at vehicula justo. Nulla facilisi. In hac
habitasse platea dictumst.`
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
