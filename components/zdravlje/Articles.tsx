import type { HealthArticle } from '@/data/articles'
import Article from './Article'
export default function Articles({ articles }: { articles: HealthArticle[] }) {
  return <section aria-labelledby="articles-heading" className="px-6 py-14 md:px-10 lg:px-26">
    <h2 id="articles-heading" className="font-oswald mb-8 text-3xl font-semibold">Svi članci</h2>
    {articles.length ? <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">{articles.map(article => <Article key={article.slug} article={article} />)}</div> : <p className="text-slate-600">Novi članci stižu uskoro.</p>}
  </section>
}
