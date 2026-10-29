import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
import { allArticles } from '../data/articles'
import services from '../data/data.js'
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
const richText = (paragraphs: string[]) => ({ root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: null, children: paragraphs.map(text => ({ type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: null, textFormat: 0, textStyle: '', children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal' as const, style: '' }] })) } })
const slugify = (text: string) => text.toLowerCase().replace(/đ/g,'d').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
try {
  const users = await payload.count({ collection: 'users' })
  if (!users.totalDocs) {
    const email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD
    if (!email || !password || password.length < 16 || password.startsWith('replace-')) throw new Error('Set a real ADMIN_EMAIL and a unique ADMIN_PASSWORD (at least 16 characters).')
    await payload.create({ collection: 'users', overrideAccess: true, context: { seedAdmin: true }, data: { email, password, role: 'admin', name: process.env.ADMIN_NAME || 'Prehab administrator' } })
    console.log('Administrator created. Credentials are not printed.')
  }
  for (const location of [
    { code: 'zadar' as const, name: 'Zadar', address: 'Splitska ulica 3, 23000 Zadar' },
    { code: 'biograd' as const, name: 'Biograd', address: 'Bukovačka 15, 23210 Biograd na Moru' },
  ]) {
    if (!(await payload.count({ collection: 'locations', where: { code: { equals: location.code } } })).totalDocs)
      await payload.create({ collection: 'locations', data: { ...location, active: true, openingDays: ['1','2','3','4','5'] } })
  }
  for (const service of services) {
    const slug = slugify(service.name)
    if (!(await payload.count({ collection: 'services', where: { slug: { equals: slug } } })).totalDocs)
      await payload.create({ collection: 'services', data: { name: service.name.trim(), slug, description: service.description, legacyId: service.id, sortOrder: service.id, active: true, locations: ['zadar','biograd'], durations: ['30','60'] } })
  }
  for (const article of allArticles) {
    if ((await payload.count({ collection: 'posts', where: { slug: { equals: article.slug } } })).totalDocs) continue
    const camp = article.slug === 'skolioza-kamp'
    const sections = camp ? [
      { title: 'O kampu', paragraphs: ['Uz stručno vodstvo, vježbe prilagođene vašim potrebama i prekrasan ambijent mora, ovo je prilika za rad na sebi, druženje i edukaciju.', 'Naš 7-dnevni kamp u Biogradu na Moru namijenjen je djeci, adolescentima i odraslima s dijagnozom skolioze te svima koji žele naučiti više o pravilnom držanju, tijelu, jačanju mišića i prevenciji bolova.'] },
      { title: 'Što vas očekuje u kampu', paragraphs: ['Individualizirane vježbe i terapije.', 'Prekrasan morski ambijent i priroda.', 'Stručno vodstvo i cjelovita podrška svima.', 'Lekcije o pravilnom držanju i jačanju mišića.', 'Fokusirani smo na individualni pristup i stvaranje zdravih navika koje možete ponijeti sa sobom kući.'] },
      { title: 'Zašto je važan pravilan pristup skoliozi?', paragraphs: ['Skolioza je posturalna deformacija kralježnice koja često uzrokuje bolove, loše držanje i smanjenu funkcionalnost tijela. Ranim i pravilnim pristupom može se značajno poboljšati kvaliteta života.', 'Naš cilj je pružiti cjelovitu podršku svima koji se bore s ovim izazovom kroz znanje, pokret i zajedništvo.'] },
    ] : article.sections
    await payload.create({ collection: 'posts', draft: false, data: {
      title: article.title, slug: article.slug, category: article.category, excerpt: article.excerpt, readTime: article.readTime,
      visual: article.visual, backgroundColor: article.bgColor || '#121a29', featured: camp, authorName: 'Prehab', _status: 'published',
      publishedAt: camp ? '2025-05-15T08:00:00.000Z' : new Date().toISOString(),
      sections: sections.map(section => ({ title: section.title, body: richText(section.paragraphs) })), sources: article.sources,
      ...(camp ? { event: { location: 'Biograd na Moru', dateLabel: 'Lipanj 2025.', duration: '7 dana', contact: 'Ridesanum / Balboa Gym / Prehab Centar · 091/9355-858 · www.ridesanum.hr' } } : {}),
    } })
  }
  console.log('Seed complete: 12 original services, 3 original articles and 2 locations. Existing records were preserved. Review Clinic settings before enabling bookings.')
} finally { await payload.destroy() }

// Payload keeps its monitor connection alive; this CLI exits after all awaited writes.
process.exit(0)
