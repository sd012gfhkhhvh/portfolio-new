import type { MDXComponents } from 'mdx/types'
import { highlight } from 'sugar-high'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

function Code({ children, ...props }: any) {
  let codeHTML = highlight(children)
  return (
    <code
      {...props}
      dangerouslySetInnerHTML={{ __html: codeHTML }}
    />
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    code: Code,
    ...components
  }
}
