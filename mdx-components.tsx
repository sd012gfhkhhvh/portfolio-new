import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { highlight } from 'sugar-high'
import React, { JSX, ReactNode } from 'react'
import { ImgLoader } from '@/components/image-loader'

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

// Custom paragraph component to handle images
function Paragraph({
  children,
  ...props
}: {
  children: ReactNode
  [key: string]: any
}): JSX.Element {
  // Check if the paragraph only contains an image
  const hasOnlyImage =
    React.Children.count(children) === 1 &&
    React.Children.toArray(children).every(
      child =>
        React.isValidElement(child) &&
        (child.type === ImgLoader || (child.props as any)?.src)
    )

  // If paragraph only contains an image, render without <p> wrapper
  if (hasOnlyImage) {
    return <>{children}</>
  }

  // Otherwise render as normal paragraph
  return <p {...props}>{children}</p>
}

const Components = {
  code: Code,
  img: ImgLoader,
  Image: ImgLoader,
  p: Paragraph
}

export function MDXComponent({ source }: { source: string }): JSX.Element {
  return <MDXRemote source={source} components={Components} />
}
