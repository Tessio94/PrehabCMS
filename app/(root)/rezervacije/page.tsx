import type { Metadata } from 'next'
import { DateTime } from 'luxon'
import { cms } from '@/lib/cms'
import BookingForm from '@/components/booking/BookingForm'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Rezervacije | Prehab Zadar i Biograd', description: 'Odaberite lokaciju, uslugu i slobodan termin za fizioterapiju u Zadru ili Biogradu.' }
export default async function Page({ searchParams }: { searchParams: Promise<{ usluga?: string }> }) {
  const payload = await cms()
  const [settings, services, locations, query] = await Promise.all([
    payload.findGlobal({ slug: 'clinic-settings' }),
    payload.find({ collection: 'services', overrideAccess: false, depth: 0, limit: 100, sort: 'sortOrder' }),
    payload.find({ collection: 'locations', overrideAccess: false, depth: 0, limit: 2 }), searchParams,
  ])
  const today = DateTime.now().setZone('Europe/Zagreb').startOf('day')
  return <div className="bg-slate-50 px-6 pt-20 pb-20 text-black_preh sm:px-10 lg:px-16">
    <div className="mx-auto max-w-6xl">
      <header className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-red_preh uppercase">Prehab · Zadar i Biograd</p>
        <h1 className="font-oswald text-5xl font-medium sm:text-6xl">Rezervirajte vrijeme <span className="text-red_preh">za sebe.</span></h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Odaberite lokaciju, uslugu i termin koji vam odgovara. Jednostavan prvi korak prema boljem pokretu.</p>
      </header>
      {settings.bookingEnabled && settings.privacyReviewed && locations.docs.length ? <BookingForm
        services={services.docs.map(s => ({ id: s.id, name: s.name, slug: s.slug, locations: s.locations, durations: s.durations }))}
        locations={locations.docs.map(l => ({ code: l.code, name: l.name, address: l.address }))}
        minDate={today.toISODate()!} maxDate={today.plus({ days: settings.horizonDays }).toISODate()!}
        privacyVersion={settings.privacyVersion} phone={settings.phone} initialService={query.usluga} emailReceipts={Boolean(process.env.SMTP_HOST)}
      /> : <div className="rounded-3xl border border-slate-200 bg-white p-8"><h2 className="font-oswald text-3xl">Dogovorimo vaš termin.</h2><p className="mt-4 leading-7 text-slate-600">Online rezervacije trenutačno nisu dostupne. Za dogovor termina nazovite <a className="font-semibold text-red_preh underline" href={`tel:${settings.phone.replace(/\s/g,'')}`}>{settings.phone}</a>.</p></div>}
    </div>
  </div>
}
