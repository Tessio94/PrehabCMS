import type { CollectionConfig } from 'payload'
import { activeOrStaff, isAdmin } from '@/lib/access'
export const Locations: CollectionConfig = {
  slug: 'locations', labels: { singular: 'Lokacija', plural: 'Lokacije' },
  admin: { useAsTitle: 'name', group: 'Rezervacije' },
  access: { read: activeOrStaff, create: isAdmin, update: isAdmin, delete: () => false },
  fields: [
    { name: 'name', label: 'Naziv', type: 'text', required: true },
    { name: 'code', label: 'Lokacija', type: 'select', required: true, unique: true, options: ['zadar', 'biograd'], admin: { readOnly: true } },
    { name: 'address', label: 'Adresa', type: 'text', required: true },
    { name: 'active', label: 'Prima rezervacije', type: 'checkbox', defaultValue: true },
    { name: 'openingDays', label: 'Radni dani (08:00–19:00)', type: 'select', hasMany: true, required: true, defaultValue: ['1','2','3','4','5'], options: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak','Subota'].map((label, i) => ({ label, value: String(i) })) },
  ],
}
