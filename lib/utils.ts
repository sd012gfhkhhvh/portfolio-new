import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { POST_SOURCE, POST_METADATA } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function unslugify(slug: string): string {
  return slug
    .toString()
    .replace(/-/g, ' ') // Replace - with space
    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
    .trim()
}
export const formatDate = (date: Date, locale = 'en-US'): string => {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const parseDate = (
  value: unknown,
  fallback: Date = new Date()
): Date => {
  if (value instanceof Date) return value
  if (typeof value === 'string' && !isNaN(Date.parse(value)))
    return new Date(value)
  return fallback
}

export const getValidDate = (...dates: (Date | string | undefined)[]): Date => {
  for (const d of dates) {
    const date = parseDate(d)
    if (date.getTime() > 0 && date.getFullYear() > 1970) return date
  }
  return new Date()
}

export function generateMetaData(
  source: POST_SOURCE,
  data: Record<string, unknown>
): POST_METADATA {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data')
  }

  const slug = typeof data.slug === 'string' ? data.slug.trim() : undefined
  if (!slug) throw new Error('Missing or invalid slug in data')

  const title =
    typeof data.title === 'string' && data.title.trim()
      ? data.title.trim()
      : unslugify(slug)

  const author =
    typeof data.author === 'string' && data.author.trim()
      ? data.author.trim()
      : 'Soham Das'

  const tags: string[] = Array.isArray(data.tags)
    ? data.tags.map(tag => String(tag).trim())
    : typeof data.tags === 'string'
      ? data.tags.split(',').map(tag => tag.trim())
      : []

  try {
    if (source === POST_SOURCE.CRM) {
      if (!data.createdAt || !data.updatedAt)
        throw new Error('Missing createdAt or updatedAt in CRM data')

      return {
        title,
        slug,
        author,
        tags,
        date: getValidDate(
          data.publishDate as string | Date | undefined,
          data.createdAt as string | Date | undefined
        ),
        updateDate: parseDate(data.updatedAt)
      }
    }

    if (source === POST_SOURCE.FILE) {
      const stats = data.stats as
        | { mtime?: Date | string; birthtime?: Date | string }
        | undefined
      if (!stats?.mtime)
        throw new Error('Missing or invalid stats in file data')

      return {
        title,
        slug,
        author,
        tags,
        date: getValidDate(
          data.date as string | Date | undefined,
          stats.birthtime as string | Date | undefined,
          stats.mtime as string | Date | undefined
        ),
        updateDate: parseDate(stats.mtime)
      }
    }

    throw new Error('Unknown post source')
  } catch (err: any) {
    console.error(`Failed to generate metadata: ${err?.message ?? err}`)
    throw err
  }
}
