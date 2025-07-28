'use server'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootPath = path.join(process.cwd(), 'content', 'posts')

export async function getServerSideProps() {
  return {
    props: {}
  }
}

export async function getPost(slug: string) {
  try {
    const filePath = path.join(rootPath, `${slug}.mdx`)
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch (err) {
    console.error(err)
    return null
  }
}

export type Post = {
  metadata: { [key: string]: any }
  fileUpdateDate: Date
}

export type Posts = Post[]

export async function getAllPosts({
  limit = 0
}: {
  limit?: number
}): Promise<Posts | null> {
  try {
    const files = await fs.readdir(rootPath)
    let result: Post[] = await Promise.all(
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
    result = result
      .filter((post): post is Post => post !== null)
      .sort((a, b) => b.fileUpdateDate.getTime() - a.fileUpdateDate.getTime())

    if (limit === 0) {
      return result
    }

    return result.slice(0, limit)
  } catch (err) {
    console.error(err)
    return null
  }
}
