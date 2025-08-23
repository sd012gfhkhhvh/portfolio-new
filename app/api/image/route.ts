// Image proxy route: fetches external images and serves them from same-origin so
// MDX content can reference any remote image without adding each domain to
// next.config images.remotePatterns. Provides simple caching.
// NOTE: This does NOT transform/resize images. (Next/Image optimization only
// works for configured remote domains or static imports.) You can extend this
// to integrate a custom loader or on-the-fly resizing later.

export const runtime = 'nodejs'

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:'])

// Max bytes to stream before aborting (simple safeguard) - optional.
const MAX_BYTES = 15 * 1024 * 1024 // 15MB

export async function GET(req: Request) {    
  const reqUrl = new URL(req.url)
  const target = reqUrl.searchParams.get('url')
  if (!target) {
    return new Response('Missing url param', { status: 400 })
  }

  let remote: URL
  try {
    remote = new URL(target)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  if (!ALLOWED_PROTOCOLS.has(remote.protocol)) {
    return new Response('Unsupported protocol', { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const upstream = await fetch(remote.toString(), {
      // Rely on caching headers set below; allow CDN to cache.
      headers: { 'Accept': 'image/avif,image/webp,image/*,*/*;q=0.8' },
      signal: controller.signal,
      cache: 'no-store'
    })

    clearTimeout(timeout)

    if (!upstream.ok || !upstream.body) {
      return new Response('Upstream error', { status: 502 })
    }

    // Optional byte limit stream wrapper
    const reader = upstream.body.getReader()
    let bytesRead = 0
    const stream = new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read()
        if (done) {
          controller.close()
          return
        }
        bytesRead += value.byteLength
        if (bytesRead > MAX_BYTES) {
          controller.error(new Error('Image too large'))
          return
        }
        controller.enqueue(value)
      },
      cancel(reason) {
        reader.cancel(reason)
      }
    })

    const contentType = upstream.headers.get('content-type') || 'image/jpeg'

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache for a day, allow stale for a week.
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        // Allow usage only from same origin (basic protection; adjust if needed)
        'Access-Control-Allow-Origin': reqUrl.origin
      }
    })
  } catch (e) {
    return new Response('Fetch failed', { status: 500 })
  }
}
