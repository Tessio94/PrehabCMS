import type { CollectionConfig } from 'payload'
import { isEditor, publishedOrEditor } from '@/lib/access'
export const Posts: CollectionConfig = {
  slug: 'posts', labels: { singular: 'Članak', plural: 'Članci' },
  admin: { useAsTitle: 'title', group: 'Sadržaj', defaultColumns: ['title','_status','publishedAt'], description: 'Spremite nacrt ili objavite članak na stranici Zdravlje.' },
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publishedOrEditor, readVersions: isEditor, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: 'title', label: 'Naslov', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, validate: (v: unknown) => typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'Koristite mala slova, brojeve i crtice.' },
    { name: 'excerpt', label: 'Kratki opis / SEO opis', type: 'textarea', required: true, maxLength: 320 },
    { name: 'category', label: 'Kategorija', type: 'text', required: true },
    { name: 'readTime', label: 'Vrijeme čitanja', type: 'text', defaultValue: '4 min čitanja' },
    { name: 'authorName', label: 'Autor', type: 'text', defaultValue: 'Prehab' },
    { name: 'publishedAt', label: 'Datum objave', type: 'date', defaultValue: () => new Date().toISOString() },
    { name: 'featured', label: 'Istaknuti članak', type: 'checkbox', defaultValue: false },
    { name: 'coverImage', label: 'Naslovna slika', type: 'upload', relationTo: 'media' },
    { name: 'visual', label: 'Grafika bez slike', type: 'select', options: ['pemf','robot','camp'], defaultValue: 'camp' },
    { name: 'backgroundColor', label: 'Boja zaglavlja', type: 'text', defaultValue: '#121a29', validate: (v: unknown) => !v || (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v)) || 'Unesite boju poput #121a29.' },
    { name: 'sections', label: 'Odjeljci članka', type: 'array', minRows: 1, required: true, fields: [
      { name: 'title', label: 'Podnaslov', type: 'text', required: true },
      { name: 'body', label: 'Tekst', type: 'richText', required: true },
    ] },
    { name: 'sources', label: 'Izvori', type: 'array', fields: [
      { name: 'label', label: 'Naziv', type: 'text', required: true },
      { name: 'url', label: 'Poveznica', type: 'text', required: true, validate: (v: unknown) => typeof v === 'string' && /^https?:\/\//.test(v) || 'Unesite http(s) poveznicu.' },
    ] },
    { name: 'event', label: 'Detalji događaja (neobavezno)', type: 'group', fields: [
      { name: 'location', label: 'Lokacija', type: 'text' }, { name: 'dateLabel', label: 'Datum (opis)', type: 'text' },
      { name: 'duration', label: 'Trajanje', type: 'text' }, { name: 'contact', label: 'Kontakt i informacije', type: 'textarea' },
    ] },
  ],
}
