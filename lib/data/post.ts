import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateMetaData, slugify } from '../utils'
import { POST, POST_SOURCE, POST_METADATA_LIST } from '../types'

// Ensure this module only runs on the server
if (typeof window !== 'undefined') {
  throw new Error('This module can only be used on the server side')
}

const rootPath = path.join(process.cwd(), 'content', 'posts')
const BASE_API_ENDPOINT = process.env.BASE_API_ENDPOINT
const fileSlugMap = new Map<string, string>()

export async function fetchPostFromCrm(slug: string): Promise<POST> {
  try {
    const response = await fetch(
      BASE_API_ENDPOINT + `/posts?filters[slug][$eq]=${slug}&populate=*`,
      {
        next: { revalidate: 60 }
      }
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

    const postMetadata = generateMetaData(POST_SOURCE.CRM, data[0])

    return { content, metadata: postMetadata }
  } catch (err: any) {
    console.error(`Failed to fetch post: ${err.message}`)
    throw err
  }
}

export async function getPostFromFile(slug: string): Promise<POST> {
  try {
    // Populate the map if it's empty
    if (fileSlugMap.size === 0) {
      const files = await fs.readdir(rootPath)
      files.forEach(file => {
        const fileSlug = slugify(file.replace('.mdx', ''))
        fileSlugMap.set(fileSlug, file)
      })
    }

    const fileName = fileSlugMap.get(slug)

    if (!fileName) {
      throw new Error(`Post not found: ${slug}`)
    }

    const filePath = path.join(rootPath, `${fileName}`)
    const post = await fs.readFile(filePath, 'utf-8')
    const { content, data } = matter(post) // extract the content from the markdown instead of frontmatter

    const stats = await fs.stat(filePath)

    const postMetadata = generateMetaData(POST_SOURCE.FILE, {
      slug,
      stats,
      ...data
    })

    return { content, metadata: postMetadata }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`Post not found: ${slug}`)
      throw new Error(`Post not found: ${slug}`)
    }

    console.error(`Failed to read post file: ${err.message}`)
    throw err
  }
}

export async function getPost(slug: string): Promise<POST | null> {
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

export async function fetchALlPostsFromCrm({
  start = 0,
  limit = 10
}: {
  start?: number
  limit?: number
}): Promise<POST_METADATA_LIST> {
  try {
    const response = await fetch(
      BASE_API_ENDPOINT +
        `/posts?pagination[start]=0&pagination[limit]=${limit}&populate=*`,
      {
        next: { revalidate: 60 }
      }
    )

    if (response.status !== 200) {
      const error = await response.json()
      throw new Error(
        `Failed to fetch post: ${error.message} (${response.status})`
      )
    }

    const { data } = await response.json()

    const posts = data.map((post: any, index: number) => {
      return generateMetaData(POST_SOURCE.CRM, post)
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
}): Promise<POST_METADATA_LIST> {
  try {
    const files = await fs.readdir(rootPath)
    const result = await Promise.all(
      files.map(async file => {
        const filePath = path.join(rootPath, file)
        const { data } = matter(await fs.readFile(filePath, 'utf-8'))
        const stats = await fs.stat(filePath)
        const slug = slugify(file.replace('.mdx', ''))

        fileSlugMap.set(slug, file) // Cache the slug for later use

        const rawPostMetadata = { slug, stats, ...data } // Ensure slug is part of data

        return generateMetaData(POST_SOURCE.FILE, rawPostMetadata)
      })
    )

    // Filter out null values and sort according to the publish date
    return result.slice(start, start + limit)
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
}): Promise<POST_METADATA_LIST | null> {
  try {
    const [crmResult, fileResult] = await Promise.allSettled([
      fetchALlPostsFromCrm({ start, limit }),
      getAllPostsFromFile({ start, limit })
    ])

    let posts: POST_METADATA_LIST = []

    if (crmResult.status === 'fulfilled' && crmResult.value.length) {
      posts = crmResult.value
    } else if (fileResult.status === 'fulfilled' && fileResult.value.length) {
      posts = fileResult.value
    }

    if (posts.length) {
      posts.sort((a, b) => b.date.getTime() - a.date.getTime())
      return posts
    }

    return null
  } catch (err: any) {
    console.error(`Failed to fetch posts: ${err.message}`)
    return null
  }
}
