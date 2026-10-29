import { cms } from '@/lib/cms'
import { availability } from '@/lib/booking/availability'
import { bookingSchema } from '@/lib/booking/validation'
import { hash, json, limitRequest, PublicError, publicFailure, readJSON, requireSameOrigin, hasDBCode } from '@/lib/booking/http'
import { DateTime } from 'luxon'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    requireSameOrigin(request)
    await limitRequest(request, 'booking', 10, 600)
    const parsed = bookingSchema.safeParse(await readJSON(request))
    if (!parsed.success) throw new PublicError(400, 'Provjerite unesene podatke i potvrdu obavijesti o privatnosti.')
    const input = parsed.data
    const requestHash = hash(JSON.stringify({ ...input, website: undefined }))
    const payload = await cms()
    const findExisting = async () => (await payload.find({ collection: 'reservations', overrideAccess: true, showHiddenFields: true, depth: 0, limit: 1,
      where: { requestKey: { equals: input.requestKey } },
    })).docs[0]
    const receipt = (doc: { reference?: string | null; startTime: string; endTime?: string | null; status: string }) => {
      if (!doc.endTime) throw new PublicError(503, 'Rezervacija se ne može prikazati. Kontaktirajte kliniku.')
      return ({
      reference: doc.reference, date: DateTime.fromISO(doc.startTime).setZone('Europe/Zagreb').toFormat('dd.MM.yyyy.'),
      time: DateTime.fromISO(doc.startTime).setZone('Europe/Zagreb').toFormat('HH:mm'),
      endTime: DateTime.fromISO(doc.endTime).setZone('Europe/Zagreb').toFormat('HH:mm'), status: doc.status,
    })
    }
    const previous = await findExisting()
    if (previous) {
      if (previous.requestHash !== requestHash) throw new PublicError(409, 'Zahtjev je promijenjen. Osvježite stranicu.')
      return json(receipt(previous))
    }
    await limitRequest(request, 'booking-contact', 5, 3600, input.phone.replace(/\D/g,''))
    const { slots, settings } = await availability(payload, input)
    if (settings.privacyVersion !== input.privacyVersion) throw new PublicError(409, 'Obavijest o privatnosti je ažurirana. Osvježite stranicu prije rezervacije.')
    const slot = slots.find(s => s.time === input.time)
    if (!slot) throw new PublicError(409, 'Termin više nije dostupan. Odaberite drugi termin.')
    let reservation
    try {
      reservation = await payload.create({ collection: 'reservations', overrideAccess: true, depth: 0, data: {
        kind: 'appointment', location: input.location, service: input.service, duration: String(input.duration) as '30' | '60',
        startTime: slot.startTime, endTime: slot.endTime, startTime_tz: 'Europe/Zagreb', endTime_tz: 'Europe/Zagreb', status: 'confirmed',
        fullName: input.fullName, phone: input.phone, email: input.email || undefined, source: 'website',
        privacyVersion: settings.privacyVersion, privacyAcknowledgedAt: new Date().toISOString(), requestKey: input.requestKey, requestHash,
      } })
    } catch (e) {
      if (hasDBCode(e, '23505')) {
        const existing = await findExisting()
        if (existing?.requestHash === requestHash) return json(receipt(existing))
      }
      throw e
    }
    // Commit has completed before sending; mail failure must not undo a valid booking.
    if (input.email && process.env.SMTP_HOST) {
      try {
        const summary = receipt(reservation)
        await payload.sendEmail({ to: input.email, subject: 'Prehab – potvrda rezervacije', text:
          `Vaša rezervacija ${summary.reference} je potvrđena.\n${summary.date} ${summary.time}–${summary.endTime}, ${input.location === 'zadar' ? 'Zadar' : 'Biograd'}.\nZa promjenu ili otkazivanje nazovite ${settings.phone}.\nNe šaljite zdravstvene nalaze e-poštom.` })
      } catch { console.warn('Booking receipt delivery failed; reservation is saved.') }
    }
    return json(receipt(reservation), 201)
  } catch (e) { return publicFailure(e) }
}
