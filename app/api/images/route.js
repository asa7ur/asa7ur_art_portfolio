import sql from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'

export async function GET(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const { limited } = rateLimit(ip)
  if (limited) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  try {
    const rows = await sql`
      SELECT id, name, image, store_link, ig_link
      FROM products
      ORDER BY id
    `
    return Response.json(rows, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      },
    })
  } catch {
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
