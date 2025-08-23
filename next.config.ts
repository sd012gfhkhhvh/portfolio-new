import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/u/**?v=4'),
      new URL('http://localhost:1337/**'),
      new URL('https://picsum.photos/**')
    ]
  },
  turbopack: {
    rules: {
      '*.mdx': {
        loaders: ['@mdx-js/loader'],
        as: '*.tsx'
      }
    }
  }
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
