import type { CollectionConfig } from 'payload'
import { activeOrStaff, isAdmin } from '@/lib/access'
export const Services: CollectionConfig = {
  slug: 'services', labels: { singular: 'Usluga', plural: 'Usluge' },
  admin: { useAsTitle: 'name', group: 'Rezervacije', defaultColumns: ['name', 'durations', 'locations', 'active'] },
  access: { read: activeOrStaff, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'name', label: 'Naziv', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, validate: (v: unknown) => typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Koristite mala slova, brojeve i crtice.' },
    { name: 'description', label: 'Opis', type: 'textarea', required: true },
    { name: 'legacyId', label: 'Broj ikone (1–12)', type: 'number', min: 1, max: 12 },
    { name: 'active', label: 'Aktivna usluga', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', label: 'Redoslijed', type: 'number', defaultValue: 0 },
    { name: 'durations', label: 'Dopušteno trajanje', type: 'select', hasMany: true, required: true, defaultValue: ['30', '60'], options: [{ label: '30 minuta', value: '30' }, { label: '60 minuta', value: '60' }] },
    { name: 'locations', label: 'Lokacije', type: 'select', hasMany: true, required: true, defaultValue: ['zadar', 'biograd'], options: [{ label: 'Zadar', value: 'zadar' }, { label: 'Biograd', value: 'biograd' }] },
  ],
}
