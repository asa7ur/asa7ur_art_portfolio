import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const CLOUD  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const KEY    = process.env.CLOUDINARY_API_KEY
const SECRET = process.env.CLOUDINARY_API_SECRET

if (!CLOUD || !KEY || !SECRET) {
  console.error('Missing Cloudinary env vars: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET')
  process.exit(1)
}

const auth = Buffer.from(`${KEY}:${SECRET}`).toString('base64')

async function fetchAll() {
  const resources = []
  let cursor = null

  do {
    const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUD}/resources/image`)
    url.searchParams.set('max_results', '100')
    url.searchParams.set('type', 'upload')
    if (cursor) url.searchParams.set('next_cursor', cursor)

    const res  = await fetch(url.toString(), { headers: { Authorization: `Basic ${auth}` } })
    const data = await res.json()
    resources.push(...data.resources)
    cursor = data.next_cursor ?? null
  } while (cursor)

  return resources
}

const all = await fetchAll()

// Filter only the ones from our folder
const portfolio = all.filter(r => r.asset_folder === 'asa7ur_art_portfolio')

console.log(`Total images found: ${portfolio.length}\n`)

// Generate clean name from display_name (remove trailing _xxxxxx random suffix added by Cloudinary)
function cleanName(displayName) {
  return displayName
    .replace(/_[a-z0-9]{6,8}$/, '')  // remove Cloudinary random suffix
    .replace(/_Custom$/, '')           // remove _Custom suffix
    .replace(/_/g, ' ')               // underscores to spaces
    .toLowerCase()
}

// Print SQL
console.log('-- Paste this into database/seed.sql\n')
console.log('USE art_portfolio;\n')
console.log('TRUNCATE TABLE products;\n')
console.log('INSERT INTO products (name, image, store_link, ig_link) VALUES')

const lines = portfolio.map((r, i) => {
  const name  = cleanName(r.display_name)
  const pubId = r.public_id
  const comma = i < portfolio.length - 1 ? ',' : ';'
  return `  ('${name}', '${pubId}', 'https://www.etsy.com/shop/ASA7URSHOP', 'https://www.instagram.com/byasa7ur/')${comma}`
})

console.log(lines.join('\n'))
