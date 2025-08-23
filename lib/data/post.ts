import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootPath = path.join(process.cwd(), 'content', 'posts')

// export async function getServerSideProps() {
//   return {
//     props: {}
//   }
// }

const BASE_API_ENDPOINT = process.env.BASE_API_ENDPOINT

export async function fetchPostFromCrm(slug: string): Promise<string> {
  try {
    const response = await fetch(
      BASE_API_ENDPOINT + `/posts?filters[slug][$eq]=${slug}&populate=*`
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        `Failed to fetch post: ${error.message} (${response.status})`
      )
    }

    const { data } = await response.json()

    const { content } = matter(data[0]?.content) // extract the content from the markdown instead of frontmatter

    if (!content) {
      throw new Error('Post content not found')
    }

    return content
  } catch (err: any) {
    console.error(`Failed to fetch post: ${err.message}`)
    throw err
  }
}

export async function getPostFromFile(slug: string): Promise<string> {
  try {
    const filePath = path.join(rootPath, `${slug}.mdx`)
    const post = await fs.readFile(filePath, 'utf-8')
    const { content } = matter(post) // extract the content from the markdown instead of frontmatter
    return content
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`Post not found: ${slug}`)
      throw new Error(`Post not found: ${slug}`)
    }

    console.error(`Failed to read post file: ${err.message}`)
    throw err
  }
}

export async function getPost(slug: string): Promise<string | null> {
  try {
    const postFromCrm = await fetchPostFromCrm(slug)
    if (postFromCrm) {
      return postFromCrm
    }
  } catch (err: any) {
    console.error(`Failed to fetch post from CRM: ${err.message}`)
  }

  try {
    return await getPostFromFile(slug)
  } catch (err: any) {
    console.error(`Failed to fetch post from file: ${err.message}`)
    throw err
  }
}

export type Post = {
  metadata: { [key: string]: any }
  fileUpdateDate: Date
}

export type Posts = Post[]

export async function fetchALlPostsFromCrm({
  start = 0,
  limit = 10
}: {
  start?: number
  limit?: number
}): Promise<Posts> {
  try {
    const response = await fetch(
      BASE_API_ENDPOINT +
        `/posts?pagination[start]=0&pagination[limit]=${limit}&populate=*`
    )

    if (response.status !== 200) {
      const error = await response.json()
      throw new Error(
        `Failed to fetch post: ${error.message} (${response.status})`
      )
    }

    const { data } = await response.json()

    const posts = data.map((post: any, index: number) => {
      return {
        metadata: {
          title: post?.title,
          slug: post?.slug,
          author: post?.author,
          date: new Date(post?.publishDate),
          tags: post?.tags?.split(',').map((tag: string) => tag.trim())
        },
        fileUpdateDate: new Date(post.updatedAt)
      }
    })

    return posts
  } catch (err: any) {
    console.error(`Failed to fetch post: ${err.message}`)
    throw err
  }
}

export async function getAllPostsFromFile({
  start = 0,
  limit = 10
}: {
  start?: number
  limit?: number
}): Promise<Posts> {
  try {
    const files = await fs.readdir(rootPath)
    const result = await Promise.all(
      files.map(async file => {
        const filePath = path.join(rootPath, file)
        const { data } = matter(await fs.readFile(filePath, 'utf-8'))
        const stats = await fs.stat(filePath)
        const slug = file.replace('.mdx', '')
        return {
          metadata: { ...data, slug: slug },
          fileUpdateDate: stats.mtime
        }
      })
    )

    // Filter out null values and sort according to the file modified date
    return result
      .filter(post => post !== null)
      .sort((a, b) => b.fileUpdateDate.getTime() - a.fileUpdateDate.getTime())
      .slice(0, limit)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function getAllPosts({
  start = 0,
  limit = 10
}: {
  start?: number
  limit?: number
}): Promise<Posts | null> {
  try {
    const postsFromCrm = await fetchALlPostsFromCrm({ limit })
    if (postsFromCrm.length > 0) {
      return postsFromCrm
    }
  } catch (err: any) {
    console.error(`Failed to fetch posts from CRM: ${err.message}`)
  }

  try {
    return await getAllPostsFromFile({ limit })
  } catch (err: any) {
    console.error(`Failed to fetch posts from file: ${err.message}`)
    return null
  }
}