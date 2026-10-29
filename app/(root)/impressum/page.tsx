import { cms } from '@/lib/cms'
import LegalPage from '@/components/LegalPage'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Impressum | Prehab' }
export default async function Page() {
  const payload = await cms()
  const [s, locations] = await Promise.all([payload.findGlobal({ slug: 'clinic-settings' }), payload.find({ collection: 'locations', depth: 0, limit: 2 })])
  const rows = [['Naziv', s.legalName], ['Sjedište', s.registeredAddress], ['OIB', s.oib], ['Registar', s.registry], ['Profesionalni podaci i nadzor', s.professionalDetails], ['Porezni podaci', s.vatInformation]]
  return <LegalPage title="Impressum" draft={!s.privacyReviewed}>
    <dl className="grid gap-5">{rows.filter(([label,value]) => label !== 'Porezni podaci' || value).map(([label,value]) => <div key={label}><dt className="font-semibold text-black_preh">{label}</dt><dd className="whitespace-pre-line">{value || 'Podatak je u pripremi.'}</dd></div>)}</dl>
    <section><h2>Kontakt</h2><p><a href={`mailto:${s.email}`}>{s.email}</a><br /><a href={`tel:${s.phone.replace(/\s/g,'')}`}>{s.phone}</a></p></section>
    <section><h2>Lokacije pružanja usluga</h2>{locations.docs.map(l => <p key={l.id}>{l.name}: {l.address}</p>)}</section>
    <section><h2>Informacije na stranici</h2><p>Sadržaj članaka služi općem informiranju i ne zamjenjuje individualnu stručnu procjenu. Za pitanja o uslugama, cijenama i prigovore obratite se na navedeni kontakt. Za promjenu ili otkazivanje rezervacije navedite oznaku rezervacije.</p></section>
  </LegalPage>
}
