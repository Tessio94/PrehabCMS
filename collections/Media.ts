import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { isEditor } from '@/lib/access'
export const Media: CollectionConfig = {
  slug: 'media', labels: { singular: 'Slika', plural: 'Slike' },
  admin: { group: 'Sadržaj', description: 'Javne fotografije za članke. Ne učitavajte medicinske nalaze ni fotografije pacijenata bez odgovarajuće pravne osnove.' },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  upload: { staticDir: path.resolve(process.env.MEDIA_DIR || 'media'), mimeTypes: ['image/jpeg','image/png','image/webp'], imageSizes: [{ name: 'card', width: 900, height: 560, position: 'centre' }] },
  fields: [{ name: 'alt', label: 'Opis slike (pristupačnost)', type: 'text', required: true }],
}
