import { cache } from 'react'
import type { Post } from '@/payload-types'
import type { HealthArticle } from '@/data/articles'
import { cms } from './cms'
export function articleView(post: Post): HealthArticle {
  const cover = post.coverImage && typeof post.coverImage === 'object' ? post.coverImage : undefined
  return {
    slug: post.slug, title: post.title, category: post.category, excerpt: post.excerpt,
    readTime: post.readTime || '4 min čitanja', visual: post.visual || 'camp', bgColor: post.backgroundColor || '#121a29',
    coverImage: cover?.filename
    ? `/api/media/file/${encodeURIComponent(cover.filename)}`
    : post.visual === 'camp' && post.slug === 'skolioza-kamp'
      ? '/images/skolioza.png'
      : undefined,
    coverAlt: cover?.alt || post.title, publishedAt: post.publishedAt || undefined, authorName: post.authorName || 'Prehab',
    sections: (post.sections || []).map(s => ({ title: s.title, paragraphs: [], body: s.body })),
    sources: (post.sources || []).map(s => ({ label: s.label, url: s.url })), event: post.event || undefined,
  }
}
export const publishedPosts = cache(async () => {
  const payload = await cms()
  const result = await payload.find({ collection: 'posts', overrideAccess: false, draft: false, depth: 1, pagination: false, sort: '-publishedAt' })
  return result.docs
})
export const publishedPost = cache(async (slug: string) => {
  const payload = await cms()
  const result = await payload.find({ collection: 'posts', overrideAccess: false, draft: false, depth: 1, limit: 1, where: { slug: { equals: slug } } })
  return result.docs[0] || null
})
