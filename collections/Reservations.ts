import type { CollectionConfig } from 'payload'
import { isStaff, isAdmin } from '@/lib/access'
import { validateReservation } from '@/lib/booking/hooks'
export const Reservations: CollectionConfig = {
  slug: 'reservations', labels: { singular: 'Rezervacija / blokada', plural: 'Rezervacije' },
  admin: { useAsTitle: 'reference', group: 'Rezervacije', defaultColumns: ['reference','location','startTime','duration','fullName','status'], description: 'Vrijeme prikazano u Europe/Zagreb. Jedan istovremeni termin po lokaciji. Za godišnji odmor ili pauzu dodajte Blokadu. Otkazivanje oslobađa termin.' },
  defaultSort: 'startTime',
  access: { read: isStaff, create: isStaff, update: isStaff, delete: isAdmin },
  hooks: { beforeValidate: [validateReservation] },
  fields: [
    { name: 'reference', label: 'Oznaka', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'kind', label: 'Vrsta', type: 'select', required: true, defaultValue: 'appointment', options: [{ label: 'Rezervacija', value: 'appointment' }, { label: 'Blokada / odsutnost', value: 'blocked' }] },
    { name: 'location', label: 'Lokacija', type: 'select', required: true, index: true, options: [{ label: 'Zadar', value: 'zadar' }, { label: 'Biograd', value: 'biograd' }] },
    { name: 'service', label: 'Usluga', type: 'relationship', relationTo: 'services', admin: { condition: data => data.kind !== 'blocked' } },
    { name: 'startTime', label: 'Početak (hrvatsko vrijeme)', type: 'date', timezone: { defaultTimezone: 'Europe/Zagreb', required: true }, required: true, index: true, admin: { date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm', timeIntervals: 30 } } },
    { name: 'duration', label: 'Trajanje', type: 'select', defaultValue: '30', options: [{ label: '30 minuta', value: '30' }, { label: '60 minuta', value: '60' }], admin: { condition: data => data.kind !== 'blocked' } },
    { name: 'endTime', label: 'Kraj blokade', type: 'date', timezone: { defaultTimezone: 'Europe/Zagreb', required: true }, required: true, admin: { condition: data => data.kind === 'blocked', date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm', timeIntervals: 30 } } },
    { name: 'status', label: 'Status', type: 'select', required: true, defaultValue: 'confirmed', options: [{ label: 'Potvrđeno / aktivno', value: 'confirmed' }, { label: 'Završeno', value: 'completed' }, { label: 'Nije došao/la', value: 'no-show' }, { label: 'Otkazano', value: 'cancelled' }] },
    { name: 'fullName', label: 'Ime i prezime', type: 'text', maxLength: 120, admin: { condition: data => data.kind !== 'blocked' } },
    { name: 'phone', label: 'Telefon', type: 'text', maxLength: 30, admin: { condition: data => data.kind !== 'blocked' } },
    { name: 'email', label: 'E-pošta (neobavezno)', type: 'email', admin: { condition: data => data.kind !== 'blocked' } },
    { name: 'source', label: 'Izvor', type: 'select', defaultValue: 'admin', options: ['admin','website'], admin: { readOnly: true } },
    { name: 'privacyVersion', label: 'Verzija prikazane obavijesti', type: 'text', admin: { readOnly: true } },
    { name: 'privacyAcknowledgedAt', label: 'Vrijeme potvrde informiranosti', type: 'date', admin: { readOnly: true } },
    { name: 'requestKey', type: 'text', unique: true, hidden: true, access: { read: () => false } },
    { name: 'requestHash', type: 'text', hidden: true, access: { read: () => false } },
  ],
}
