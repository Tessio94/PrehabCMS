import type { CollectionConfig } from 'payload'
import { isStaff, isAdmin } from '@/lib/access'
export const Inquiries: CollectionConfig = {
  slug: 'inquiries', labels: { singular: 'Upit', plural: 'Kontakt upiti' },
  admin: { useAsTitle: 'name', group: 'Rezervacije', defaultColumns: ['name','email','status','createdAt'] },
  access: { read: isStaff, create: () => false, update: isStaff, delete: isAdmin },
  fields: [
    { name: 'name', label: 'Ime', type: 'text', required: true }, { name: 'email', type: 'email', required: true },
    { name: 'location', label: 'Lokacija', type: 'text' }, { name: 'message', label: 'Poruka', type: 'textarea', required: true },
    { name: 'status', label: 'Status', type: 'select', defaultValue: 'new', options: [{ label: 'Novi', value: 'new' }, { label: 'Odgovoreno', value: 'answered' }] },
    { name: 'privacyVersion', type: 'text', admin: { readOnly: true } },
  ],
}
