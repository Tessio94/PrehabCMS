import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { articleView, publishedPost } from '@/lib/posts'
import ConnectedArticles from '@/components/article/ConnectedArticles'
import Content from '@/components/article/Content'
import Cover from '@/components/article/Cover'
import HealthArticleContent from '@/components/article/HealthArticleContent'
export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await publishedPost((await params).slug)
  if (!post) return {}
  const url = `${process.env.SERVER_URL}/zdravlje/${post.slug}`
  return { title: `${post.title} | Prehab`, description: post.excerpt, alternates: { canonical: url }, openGraph: { title: post.title, description: post.excerpt, url, type: 'article', locale: 'hr_HR' } }
}
export default async function Page({ params }: Props) {
  const post = await publishedPost((await params).slug)
  if (!post) notFound()
  const article = articleView(post)
  return <>{article.event?.dateLabel ? <><Cover article={article} /><Content article={article} /></> : <HealthArticleContent article={article} />}<ConnectedArticles currentSlug={post.slug} /></>
}
