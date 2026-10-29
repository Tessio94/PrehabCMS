import { cms } from '@/lib/cms'
import { availability } from '@/lib/booking/availability'
import { availabilitySchema } from '@/lib/booking/validation'
import { json, limitRequest, PublicError, publicFailure } from '@/lib/booking/http'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  try {
    await limitRequest(request, 'availability', 120, 60)
    const parsed = availabilitySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams))
    if (!parsed.success) throw new PublicError(400, 'Provjerite lokaciju, uslugu, trajanje i datum.')
    const { slots } = await availability(await cms(), parsed.data)
    return json({ slots: slots.map(s => s.time), timezone: 'Europe/Zagreb' })
  } catch (e) { return publicFailure(e) }
}
