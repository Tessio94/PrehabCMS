import { z } from 'zod'
import { cms } from '@/lib/cms'
import { json, limitRequest, PublicError, publicFailure, readJSON, requireSameOrigin } from '@/lib/booking/http'
const schema = z.object({ user: z.string().trim().min(2).max(120), email: z.email().max(254), location: z.string().max(60), message: z.string().trim().min(5).max(3000), botfield: z.literal(''), privacyAcknowledged: z.literal(true) }).strict()
export async function POST(request: Request) {
  try {
    requireSameOrigin(request)
    await limitRequest(request, 'contact', 5, 600)
    const data = schema.safeParse(await readJSON(request, 14000))
    if (!data.success) throw new PublicError(400, 'Provjerite ime, e-poštu, poruku i potvrdu obavijesti o privatnosti.')
    const payload = await cms()
    const settings = await payload.findGlobal({ slug: 'clinic-settings' })
    if (!settings.privacyReviewed) throw new PublicError(503, 'Obrazac je trenutačno nedostupan. Kontaktirajte nas telefonom.')
    await payload.create({ collection: 'inquiries', overrideAccess: true, data: { name: data.data.user, email: data.data.email, location: data.data.location, message: data.data.message, privacyVersion: settings.privacyVersion } })
    return json({ message: 'Hvala! Vaša poruka je spremljena. Javit ćemo vam se.' }, 201)
  } catch (e) { return publicFailure(e) }
}
