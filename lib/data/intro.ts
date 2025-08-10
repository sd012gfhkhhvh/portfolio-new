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

const endpoint = `${process.env.BASE_API_ENDPOINT}/intro`

export const getIntro = async (): Promise<About> => {
  try {
    const response = await fetch(endpoint, {
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

