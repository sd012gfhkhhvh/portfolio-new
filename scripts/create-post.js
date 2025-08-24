#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

function createPost(title) {
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  const date = new Date().toISOString().split('T')[0]
  
  const frontmatter = `---
title: "${title}"
author: "Soham Das"
date: ${date}
tags: []
---

Write your content here...
`

  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.mdx`)
  fs.writeFileSync(filePath, frontmatter)
  console.log(`Created post: ${filePath}`)
}

const title = process.argv[2]
if (!title) {
  console.log('Usage: node create-post.js "Post Title"')
  process.exit(1)
}

createPost(title)
