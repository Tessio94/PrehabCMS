import { createHmac } from 'node:crypto'
import { Pool } from 'pg'
const globalForPool = globalThis as unknown as { prehabRatePool?: Pool }
function pool() {
  return globalForPool.prehabRatePool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3 })
}
export class PublicError extends Error {
  constructor(public status: number, message: string) { super(message) }
}
export const hash = (value: string) => createHmac('sha256', process.env.PAYLOAD_SECRET!).update(value).digest('hex')
export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store, private', 'X-Robots-Tag': 'noindex' } })
}
export function requireSameOrigin(request: Request) {
  const expected = new URL(process.env.SERVER_URL || 'http://localhost:3000').origin
  if (request.headers.get('origin') !== expected) throw new PublicError(403, 'Zahtjev nije dopušten.')
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new PublicError(415, 'Očekivan je JSON zahtjev.')
}
export async function readJSON(request: Request, maxBytes = 8192) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new PublicError(413, 'Zahtjev je prevelik.')
  const reader = request.body?.getReader()
  if (!reader) throw new PublicError(400, 'Nedostaju podaci.')
  const chunks: Uint8Array[] = []; let length = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > maxBytes) { await reader.cancel(); throw new PublicError(413, 'Zahtjev je prevelik.') }
      chunks.push(value)
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch (e) { if (e instanceof PublicError) throw e; throw new PublicError(400, 'Neispravan zahtjev.') }
}
export async function limitRequest(request: Request, scope: string, limit: number, seconds: number, identity?: string) {
  const trusted = process.env.TRUSTED_IP_HEADER?.toLowerCase()
  const ip = trusted ? request.headers.get(trusted)?.split(',')[0]?.trim() : undefined
  const key = hash(`${scope}:${identity || ip || 'global'}`)
  const result = await pool().query<{ hits: number }>(`
    INSERT INTO public.request_limits (key, hits, expires_at) VALUES ($1, 1, now() + $2 * interval '1 second')
    ON CONFLICT (key) DO UPDATE SET
      hits = CASE WHEN request_limits.expires_at <= now() THEN 1 ELSE request_limits.hits + 1 END,
      expires_at = CASE WHEN request_limits.expires_at <= now() THEN now() + $2 * interval '1 second' ELSE request_limits.expires_at END
    RETURNING hits`, [key, seconds])
  if (result.rows[0].hits > limit) throw new PublicError(429, 'Previše zahtjeva. Pokušajte ponovno kasnije.')
}
export function hasDBCode(error: unknown, code: string): boolean {
  if (!error || typeof error !== 'object') return false
  const e = error as { code?: string; cause?: unknown }
  return e.code === code || (e.cause !== error && hasDBCode(e.cause, code))
}
export function publicFailure(error: unknown) {
  if (error instanceof PublicError) return json({ error: error.message }, error.status)
  if (hasDBCode(error, '23P01') || hasDBCode(error, '23505') || (error as { status?: number })?.status === 409)
    return json({ error: 'Termin je upravo zauzet. Odaberite drugi termin.' }, 409)
  // Never return database messages, SQL parameters, names, phone numbers or emails.
  console.error('Public endpoint failed', { type: error instanceof Error ? error.name : 'UnknownError' })
  return json({ error: 'Usluga trenutačno nije dostupna. Pokušajte ponovno ili nas nazovite.' }, 503)
}
/** Used by CLI integration tests during graceful teardown. */
export async function closeRatePool() { await globalForPool.prehabRatePool?.end(); globalForPool.prehabRatePool = undefined }
