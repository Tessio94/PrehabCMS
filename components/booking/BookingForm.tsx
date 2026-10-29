'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiClock, FiMapPin, FiPhone } from 'react-icons/fi'

type Service = { id: number; name: string; slug: string; locations: string[]; durations: string[] }
type Location = { code: 'zadar' | 'biograd'; name: string; address: string }
type Receipt = { reference: string; date: string; time: string; endTime: string; status: string }
const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-black_preh outline-none focus:border-red_preh focus:ring-2 focus:ring-red_preh/15 disabled:bg-slate-100'
export default function BookingForm({ services, locations, minDate, maxDate, privacyVersion, phone, initialService, emailReceipts }: {
  services: Service[]; locations: Location[]; minDate: string; maxDate: string; privacyVersion: string; phone: string; initialService?: string; emailReceipts: boolean
}) {
  const preselected = services.find(s => s.slug === initialService)
  const initialLocation = locations.find(l => preselected?.locations.includes(l.code))?.code || locations[0]?.code || 'zadar'
  const [location, setLocation] = useState<string>(initialLocation)
  const [serviceId, setServiceId] = useState(preselected?.id ? String(preselected.id) : '')
  const [duration, setDuration] = useState(preselected?.durations[0] || '30')
  const [date, setDate] = useState(minDate)
  const [time, setTime] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [slotError, setSlotError] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [receipt, setReceipt] = useState<Receipt | null>(null)
  const [bookedLocation, setBookedLocation] = useState('')
  const [bookedService, setBookedService] = useState('')
  const attempt = useRef<{ signature: string; key: string } | null>(null)
  const service = services.find(s => String(s.id) === serviceId)
  const eligible = services.filter(s => s.locations.includes(location))
  const selectedLocation = locations.find(l => l.code === location)

  useEffect(() => {
    if (!serviceId || !date) return
    const controller = new AbortController()
    const query = new URLSearchParams({ location, service: serviceId, duration, date })
    const run = async () => {
      setLoading(true); setSlotError(''); setSlots([])
      try {
        const response = await fetch(`/api/availability?${query}`, { signal: controller.signal, cache: 'no-store' })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Termini se ne mogu učitati.')
        if (!controller.signal.aborted) setSlots(result.slots)
      } catch (e) { if (!controller.signal.aborted) setSlotError(e instanceof Error ? e.message : 'Greška pri učitavanju.') }
      finally { if (!controller.signal.aborted) setLoading(false) }
    }
    void run()
    return () => controller.abort()
  }, [location, serviceId, duration, date, refresh])

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!time || sending || loading) return
    const form = new FormData(event.currentTarget)
    const body = { location, service: Number(serviceId), duration: Number(duration), date, time,
      fullName: String(form.get('fullName') || ''), phone: String(form.get('phone') || ''), email: String(form.get('email') || ''),
      website: String(form.get('website') || ''), privacyAcknowledged: form.get('privacy') === 'on', privacyVersion }
    const signature = JSON.stringify(body)
    if (attempt.current?.signature !== signature) attempt.current = { signature, key: crypto.randomUUID() }
    setSending(true); setError('')
    try {
      const response = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, requestKey: attempt.current.key }) })
      const result = await response.json()
      if (!response.ok) {
        if (response.status === 409) { setTime(''); setRefresh(v => v + 1) }
        throw new Error(result.error || 'Rezervacija nije spremljena.')
      }
      setBookedLocation(selectedLocation?.name || location); setBookedService(service?.name || '')
      setReceipt(result)
    } catch (e) { setError(e instanceof Error ? e.message : 'Greška pri rezervaciji. Pokušajte ponovno.') }
    finally { setSending(false) }
  }
  if (receipt) return <section aria-live="polite" className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-12">
    <span className="mb-7 inline-flex size-16 items-center justify-center rounded-2xl bg-green-50 text-green-700"><FiCheck size={32} /></span>
    <p className="text-red_preh mb-3 text-xs font-semibold tracking-widest uppercase">{receipt.reference}</p>
    <h2 className="font-oswald text-4xl">{receipt.status === 'cancelled' ? 'Rezervacija je otkazana.' : 'Vaš termin je rezerviran.'}</h2>
    <dl className="my-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-slate-600">
      <dt>Lokacija</dt><dd className="font-semibold text-black_preh">{bookedLocation}</dd>
      <dt>Usluga</dt><dd className="font-semibold text-black_preh">{bookedService}</dd>
      <dt>Datum</dt><dd className="font-semibold text-black_preh">{receipt.date}</dd>
      <dt>Vrijeme</dt><dd className="font-semibold text-black_preh">{receipt.time}–{receipt.endTime}</dd>
    </dl>
    <p className="text-sm leading-7 text-slate-600">Sačuvajte oznaku rezervacije. Za promjenu ili otkazivanje nazovite <a className="text-red_preh underline" href={`tel:${phone.replace(/\s/g,'')}`}>{phone}</a>. {emailReceipts ? 'Ako ste unijeli e-poštu, pokušat ćemo poslati i potvrdu. Ova potvrda na zaslonu vrijedi i ako e-pošta ne stigne.' : 'Ova potvrda na zaslonu potvrđuje spremanje termina.'}</p>
    <Link className="mt-8 inline-flex rounded-xl bg-black_preh px-6 py-3 font-semibold text-white" href="/">Povratak na naslovnicu</Link>
  </section>
  return <form onSubmit={submit} className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
    <div className="space-y-6">
      <fieldset disabled={sending} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
        <legend className="sr-only">Lokacija i usluga</legend>
        <h2 className="font-oswald mb-7 text-2xl"><span className="text-red_preh mr-3">01</span>Odaberite lokaciju i uslugu</h2>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">{locations.map(l => <label key={l.code} className={`cursor-pointer rounded-2xl border-2 p-5 transition ${location === l.code ? 'border-red_preh bg-red-50/40' : 'border-slate-200 hover:border-slate-400'}`}>
          <span className="flex items-center justify-between"><span className="font-oswald text-2xl">{l.name}</span><input aria-label={l.name} type="radio" name="location" checked={location === l.code} onChange={() => { setLocation(l.code); setTime(''); if (!service?.locations.includes(l.code)) setServiceId('') }} className="size-4 accent-red_preh" /></span>
          <span className="mt-2 block text-sm text-slate-500">{l.address}</span>
        </label>)}</div>
        <label htmlFor="service" className="mb-2 block text-sm font-semibold">Usluga</label>
        <select id="service" required className={inputClass} value={serviceId} onChange={e => { setServiceId(e.target.value); setTime(''); setDuration(services.find(s => String(s.id) === e.target.value)?.durations[0] || '30') }}>
          <option value="">Odaberite uslugu</option>{eligible.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <label htmlFor="duration" className="mt-6 mb-2 block text-sm font-semibold">Trajanje termina</label>
        <select id="duration" className={inputClass} disabled={!serviceId} value={duration} onChange={e => { setDuration(e.target.value); setTime('') }}>
          {(service?.durations || ['30','60']).map(d => <option key={d} value={d}>{d} minuta</option>)}
        </select>
      </fieldset>
      <fieldset disabled={sending} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
        <legend className="sr-only">Datum i vrijeme</legend>
        <h2 className="font-oswald mb-7 text-2xl"><span className="text-red_preh mr-3">02</span>Pronađite svoj termin</h2>
        <label htmlFor="date" className="mb-2 block text-sm font-semibold">Datum</label>
        <input id="date" type="date" required min={minDate} max={maxDate} value={date} onChange={e => { setDate(e.target.value); setTime('') }} className={inputClass} />
        <p className="mt-3 text-sm text-slate-500">Sva vremena su u hrvatskom vremenu. Termin završava najkasnije u 19:00.</p>
        <div className="mt-6" aria-live="polite" aria-busy={loading}>
          {!serviceId ? <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Najprije odaberite uslugu.</p> : loading ? <p className="py-5 text-sm text-slate-600">Tražimo slobodne termine…</p> : slotError ? <div role="alert" className="rounded-xl bg-red-50 p-5 text-sm text-red-800">{slotError}<button type="button" className="ml-3 underline" onClick={() => setRefresh(v => v + 1)}>Pokušaj ponovno</button></div> : slots.length ? <fieldset><legend className="mb-3 text-sm font-semibold">Slobodni termini</legend><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{slots.map(slot => <label key={slot} className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-semibold focus-within:ring-2 focus-within:ring-red_preh ${time === slot ? 'border-red_preh bg-red_preh text-white' : 'border-slate-200 hover:border-red_preh'}`}>
            <input type="radio" name="slot" value={slot} checked={time === slot} onChange={() => setTime(slot)} className="sr-only" required />{slot}
          </label>)}</div></fieldset> : <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Za odabrani dan nema slobodnih termina. Odaberite drugi datum ili lokaciju.</p>}
        </div>
      </fieldset>
      <fieldset disabled={sending} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9">
        <legend className="sr-only">Kontakt podaci</legend>
        <h2 className="font-oswald mb-3 text-2xl"><span className="text-red_preh mr-3">03</span>Vaši kontakt podaci</h2>
        <p className="mb-7 text-sm leading-6 text-slate-500">Podatke koristimo za organizaciju termina. Ne unosite dijagnoze, nalaze ni druge zdravstvene podatke.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Ime i prezime<input name="fullName" autoComplete="name" required minLength={2} maxLength={120} className={`${inputClass} mt-2`} /></label>
          <label className="text-sm font-semibold">Telefon<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={`${inputClass} mt-2`} /></label>
          <label className="text-sm font-semibold sm:col-span-2">E-pošta <span className="font-normal text-slate-500">(neobavezno)</span><input name="email" type="email" autoComplete="email" maxLength={254} className={`${inputClass} mt-2`} /></label>
        </div>
        <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-slate-600"><input name="privacy" type="checkbox" required className="mt-1 size-4 shrink-0 accent-red_preh" /><span>Upoznat/a sam s <Link href="/politika-privatnosti" target="_blank" rel="noopener noreferrer" className="text-red_preh underline">obavijesti o privatnosti</Link> i obradom podataka za organizaciju rezervacije.</span></label>
      </fieldset>
      {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">{error}</p>}
      <button type="submit" disabled={sending || loading || !time || !serviceId || !slots.includes(time)} className="w-full rounded-2xl bg-red_preh px-6 py-4 font-semibold text-white transition hover:bg-black_preh focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red_preh disabled:cursor-not-allowed disabled:opacity-50">{sending ? 'Spremamo rezervaciju…' : 'Potvrdi rezervaciju'}</button>
    </div>
    <aside className="rounded-3xl bg-black_preh p-7 text-white lg:sticky lg:top-8">
      <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Vaš sljedeći korak</p>
      <h2 className="font-oswald mb-7 text-3xl">Vrijeme za bolji pokret.</h2>
      <div className="space-y-5 border-y border-white/15 py-6 text-sm leading-6">
        <p className="flex gap-3"><FiMapPin className="mt-1 shrink-0 text-red-400" /><span>{selectedLocation?.name}<br /><span className="text-white/60">{selectedLocation?.address}</span></span></p>
        <p className="flex gap-3"><FiClock className="mt-1 shrink-0 text-red-400" /><span>{duration} minuta<br /><span className="text-white/60">{service?.name || 'Odaberite uslugu'}</span></span></p>
      </div>
      <p className="mt-6 text-sm leading-6 text-white/70">Trebate pomoć ili želite promijeniti postojeći termin?</p>
      <a href={`tel:${phone.replace(/\s/g,'')}`} className="mt-4 inline-flex items-center gap-3 font-semibold"><FiPhone className="text-red-400" />{phone}</a>
    </aside>
  </form>
}
