/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent browsers from guessing MIME types
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Block the site from being framed (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Enable legacy XSS filter in older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Control how much referrer info is shared
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not used by this app
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Force HTTPS for 1 year (only takes effect over HTTPS)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // Content Security Policy
  // - default: only same origin
  // - scripts: same origin (Next.js runtime) + 'unsafe-inline' needed by GSAP/Next hydration
  // - styles: same origin + 'unsafe-inline' (Tailwind CSS-in-JS)
  // - images: same origin + Cloudinary CDN + data URIs (blur placeholders)
  // - connect: same origin (internal API)
  // - font/media/object: locked down
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https://res.cloudinary.com data: blob:",
      "connect-src 'self'",
      "font-src 'self'",
      "media-src 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
