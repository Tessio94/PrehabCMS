import { randomUUID } from 'node:crypto'
import type { CollectionBeforeValidateHook } from 'payload'
import { APIError } from 'payload'
import { validateInterval, isLocation } from './time'

export const validateReservation: CollectionBeforeValidateHook = async ({ data, originalDoc, req, operation }) => {
  const next = { ...originalDoc, ...data }
  const fail = (message: string): never => { throw new APIError(message, 400, undefined, true) }
  if (!isLocation(next.location)) fail('Odaberite lokaciju.')
  if (!next.startTime) fail('Odaberite početak termina.')
  const changed = operation === 'create' || ['kind','location','service','startTime','duration','endTime'].some(k => data?.[k] !== undefined && data[k] !== originalDoc?.[k]) || (originalDoc?.status === 'cancelled' && next.status !== 'cancelled')
  let endTime = next.endTime
  if (next.kind !== 'blocked') {
    let interval
    try { interval = validateInterval(next.startTime, Number(next.duration)) } catch (e) { fail((e as Error).message) }
    endTime = interval!.endTime
    if (!next.fullName?.trim() || !next.phone?.trim()) fail('Unesite ime i telefon.')
    if (changed && next.status !== 'cancelled') {
      if (Date.parse(next.startTime) < Date.now()) fail('Nije moguće dodati ili premjestiti rezervaciju u prošlost.')
      const serviceId = typeof next.service === 'object' ? next.service?.id : next.service
      const service = serviceId ? await req.payload.findByID({ collection: 'services', id: serviceId, req, depth: 0 }) : null
      if (!service?.active || !service.locations?.includes(next.location) || !service.durations?.includes(String(next.duration) as '30' | '60')) fail('Usluga, trajanje ili lokacija nisu dostupni.')
      const location = await req.payload.find({ collection: 'locations', where: { code: { equals: next.location } }, limit: 1, depth: 0, req })
      if (!location.docs[0]?.active || !(location.docs[0].openingDays as string[])?.includes(String(interval!.local.weekday % 7))) fail('Lokacija ne radi odabranog dana.')
    }
  } else {
    if (!endTime || !Number.isFinite(Date.parse(endTime)) || Date.parse(endTime) <= Date.parse(next.startTime)) fail('Kraj blokade mora biti nakon početka.')
    if (changed && Date.parse(endTime) <= Date.now()) fail('Blokada mora završiti u budućnosti.')
  }
  if (changed && next.status !== 'cancelled') {
    const conflicts = await req.payload.find({ collection: 'reservations', req, depth: 0, limit: 1, where: { and: [
      { location: { equals: next.location } }, { status: { not_equals: 'cancelled' } },
      { startTime: { less_than: endTime } }, { endTime: { greater_than: next.startTime } },
      ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
    ] } })
    if (conflicts.docs.length) throw new APIError('Odabrani termin je zauzet.', 409, undefined, true)
  }
  return { ...data, endTime, ...(operation === 'create' ? { reference: `PREH-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}` } : {}) }
}
