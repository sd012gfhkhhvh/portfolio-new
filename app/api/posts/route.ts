// Alternative: Create an API route for client-side access
import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, getPost } from '@/lib/data/post'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    if (slug) {
      // Get single post
      const post = await getPost(slug)
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      return NextResponse.json(post)
    } else {
      // Get all posts
      const posts = await getAllPosts({ limit })
      return NextResponse.json(posts)
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    )
  }
}
