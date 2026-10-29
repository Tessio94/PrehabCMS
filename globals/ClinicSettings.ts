import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/lib/access'
export const ClinicSettings: GlobalConfig = {
  slug: 'clinic-settings', label: 'Postavke klinike i privatnost',
  access: { read: () => true, update: isAdmin },
  admin: { group: 'Upravljanje', description: 'Prije uključivanja rezervacija unesite stvarne pravne podatke i pregledajte politiku privatnosti.' },
  hooks: { beforeValidate: [({ data, originalDoc }) => {
    const merged = { ...originalDoc, ...data }
    if (merged.bookingEnabled || merged.privacyReviewed) {
      for (const field of ['legalName','registeredAddress','oib','registry','professionalDetails','privacyEmail','processors','transfers','healthLegalBasis','privacyVersion']) {
        if (!merged[field]?.trim()) throw new Error(`Prije aktivacije popunite: ${field}.`)
      }
      if (!merged.privacyReviewed) throw new Error('Prije aktivacije pregledajte i potvrdite politiku privatnosti.')
    }
    return data
  }] },
  fields: [
    { name: 'bookingEnabled', label: 'Omogući online rezervacije', type: 'checkbox', defaultValue: false },
    { name: 'leadMinutes', label: 'Najmanje minuta do početka termina', type: 'number', defaultValue: 120, min: 0, max: 10080, required: true },
    { name: 'horizonDays', label: 'Koliko dana unaprijed se može rezervirati', type: 'number', defaultValue: 90, min: 1, max: 365, required: true },
    { name: 'retentionDays', label: 'Brisanje rezervacija nakon završetka (dana)', type: 'number', defaultValue: 180, min: 1, max: 3650, required: true, admin: { description: 'Operativne rezervacije nisu medicinska dokumentacija. Prilagodite rok stvarnoj potrebi. Pokrenite dnevni maintenance zadatak.' } },
    { name: 'legalName', label: 'Puni registrirani naziv', type: 'text' },
    { name: 'registeredAddress', label: 'Sjedište', type: 'text' },
    { name: 'oib', label: 'OIB', type: 'text', validate: (v: unknown) => !v || (typeof v === 'string' && /^\d{11}$/.test(v)) || 'OIB mora imati 11 znamenki.' },
    { name: 'registry', label: 'Registar i registracijski broj', type: 'text' },
    { name: 'professionalDetails', label: 'Nadležno tijelo, strukovna komora, stručni naziv, odobrenje i pravila profesije', type: 'textarea' },
    { name: 'vatInformation', label: 'PDV / porezni podaci ako su primjenjivi', type: 'textarea' },
    { name: 'phone', label: 'Telefon', type: 'text', defaultValue: '+385 95 906 4240', required: true },
    { name: 'email', label: 'Kontakt e-pošta', type: 'email', defaultValue: 'nikola.lukic.993@gmail.com', required: true },
    { name: 'privacyEmail', label: 'Kontakt za zaštitu podataka', type: 'email' },
    { name: 'dpoContact', label: 'Službenik za zaštitu podataka (ako je imenovan)', type: 'textarea' },
    { name: 'processors', label: 'Primatelji i izvršitelji obrade: hosting, baza, e-pošta, lokacije obrade', type: 'textarea' },
    { name: 'transfers', label: 'Prijenosi izvan EGP-a i zaštitne mjere (ili izričito da ih nema nakon provjere)', type: 'textarea' },
    { name: 'healthLegalBasis', label: 'Pravni temelj za zdravstvene podatke i nacionalni okvir', type: 'textarea', admin: { description: 'Provjerite primjenjivost čl. 9. st. 2. (h) i čl. 9. st. 3. GDPR-a za vašu registriranu djelatnost i profesionalnu tajnu. Politika privatnosti nije privola.' } },
    { name: 'privacyExtra', label: 'Dodatne informacije o privatnosti', type: 'textarea' },
    { name: 'privacyVersion', label: 'Verzija obavijesti o privatnosti', type: 'text', defaultValue: '2026-10-28', required: true },
    { name: 'privacyReviewed', label: 'Pravni podaci, rokovi i obavijest provjereni su za naše stvarne procese', type: 'checkbox', defaultValue: false },
  ],
}
