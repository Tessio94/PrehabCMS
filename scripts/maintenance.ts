import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
try {
  const settings = await payload.findGlobal({ slug: 'clinic-settings' })
  const cutoff = new Date(Date.now() - settings.retentionDays * 86400000).toISOString()
  const reservations = await payload.delete({ collection: 'reservations', where: { endTime: { less_than: cutoff } }, overrideAccess: true })
  const inquiries = await payload.delete({ collection: 'inquiries', where: { createdAt: { less_than: cutoff } }, overrideAccess: true })
  await payload.db.pool.query('DELETE FROM public.request_limits WHERE expires_at < now()')
  console.log(JSON.stringify({ deletedReservations: reservations.docs.length, deletedInquiries: inquiries.docs.length }))
} finally { await payload.destroy() }

// Payload keeps its monitor connection alive; this CLI exits after all awaited writes.
process.exit(0)
