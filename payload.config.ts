import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { clinicEmail } from './lib/email'
import { en } from '@payloadcms/translations/languages/en'
import { hr } from '@payloadcms/translations/languages/hr'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Locations } from './collections/Locations'
import { Inquiries } from './collections/Inquiries'
import { Reservations } from './collections/Reservations'
import { ClinicSettings } from './globals/ClinicSettings'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const serverURL = new URL(process.env.SERVER_URL || 'http://localhost:3000').origin
const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.length < 32 || secret.startsWith('replace-')) throw new Error('PAYLOAD_SECRET must contain at least 32 characters. See .env.example.')
if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL. See .env.example.')

export default buildConfig({
  serverURL, secret,
  admin: {
    user: 'users', importMap: { baseDir: dirname },
    meta: { titleSuffix: ' | Prehab administracija' },
    timezones: { defaultTimezone: 'Europe/Zagreb', supportedTimezones: [{ label: 'Hrvatska (Zagreb)', value: 'Europe/Zagreb' }] },
    components: { beforeDashboard: ['/components/admin/Welcome#Welcome'] },
  },
  i18n: { supportedLanguages: { en, hr }, fallbackLanguage: 'hr' },
  collections: [Users, Posts, Media, Services, Locations, Reservations, Inquiries],
  globals: [ClinicSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL, max: Number(process.env.DATABASE_POOL_SIZE || 10) }, push: false, migrationDir: path.resolve(dirname, 'migrations') }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
  upload: { limits: { fileSize: 10 * 1024 * 1024 } },
  cors: [serverURL], csrf: [serverURL],
  graphQL: { disable: true },
  telemetry: false,
  email: clinicEmail,
})
