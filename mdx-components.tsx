import { MDXRemote } from 'next-mdx-remote-client/rsc'
import type { MDXComponents } from 'mdx/types'
import { highlight } from 'sugar-high'
import { JSX } from 'react'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

function Code({ children, ...props }: any) {
  let codeHTML = highlight(children)
  return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />
}

const Components = {
  code: Code
}

export function MDXComponent({ source }: { source: string }): JSX.Element {
  return <MDXRemote source={source} components={Components} />
}
