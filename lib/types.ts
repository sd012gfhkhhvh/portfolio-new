// types
export type POST_METADATA = {
  title: string
  slug: string
  author: string
  date: Date
  tags?: string[]
  updateDate: Date
}

export type POST = {
  metadata?: POST_METADATA
  content: string
}

export type POST_METADATA_LIST = POST_METADATA[]
export type POSTS = POST[]

export enum POST_SOURCE {
  CRM = 'CRM',
  FILE = 'FILE'
}