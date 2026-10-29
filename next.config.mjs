import { withPayload } from '@payloadcms/next/withPayload'
import { hostname } from 'node:os'
const nextConfig = {
  ...(process.env.BUILD_STANDALONE === '1' ? { output: 'standalone' } : {}),
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }]
  },
}
export default withPayload(nextConfig)
