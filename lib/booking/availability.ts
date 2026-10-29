import type { Payload } from 'payload'
import { PublicError } from './http'
import { parseDay, slotsForDay, type LocationCode } from './time'
export async function availability(payload: Payload, input: { location: LocationCode; service: number; date: string; duration: number }) {
  let day
  try { day = parseDay(input.date) } catch { throw new PublicError(400, 'Neispravan datum.') }
  const [settings, service, locations] = await Promise.all([
    payload.findGlobal({ slug: 'clinic-settings', depth: 0 }),
    payload.findByID({ collection: 'services', id: input.service, depth: 0, disableErrors: true }),
    payload.find({ collection: 'locations', where: { code: { equals: input.location } }, depth: 0, limit: 1 }),
  ])
  if (!settings.bookingEnabled || !settings.privacyReviewed) throw new PublicError(503, 'Online rezervacije trenutačno nisu dostupne. Kontaktirajte nas telefonom.')
  const location = locations.docs[0]
  if (!service?.active || !service.locations?.includes(input.location) || !service.durations?.includes(String(input.duration) as '30' | '60') || !location?.active)
    throw new PublicError(400, 'Odabrana usluga, trajanje ili lokacija nisu dostupni.')
  const reservations = await payload.find({ collection: 'reservations', overrideAccess: true, depth: 0, pagination: false,
    select: { startTime: true, endTime: true },
    where: { and: [{ location: { equals: input.location } }, { status: { not_equals: 'cancelled' } },
      { startTime: { less_than: day.plus({ days: 1 }).toUTC().toISO()! } }, { endTime: { greater_than: day.toUTC().toISO()! } }] },
  })
  const slots = slotsForDay({ ...input, days: location.openingDays, busy: reservations.docs.map(row => { if (!row.endTime) throw new PublicError(503, 'Raspored trenutačno nije dostupan.'); return { startTime: row.startTime, endTime: row.endTime } }), leadMinutes: settings.leadMinutes, horizonDays: settings.horizonDays })
  return { slots, settings, service, location }
}
