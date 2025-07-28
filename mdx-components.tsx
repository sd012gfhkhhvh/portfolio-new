import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { highlight } from 'sugar-high'
import React, { JSX } from 'react'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

function Code({
  children,
  ...props
}: {
  children: string
  [key: string]: any
}) {
  const codeHTML = highlight(children)
  return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />
}

const Components = {
  code: Code
}

export function MDXComponent({ source }: { source: string }): JSX.Element {
  return <MDXRemote source={source} components={Components} />
}
