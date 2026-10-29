import { type HealthArticle } from "@/data/articles";
import ArticleHeader from "./ArticleHeader";

export default function Cover({ article }: { article: HealthArticle }) {
  return (
    <ArticleHeader
      article={article}
      image={article.coverImage}
      description={article.excerpt}
      date={article.publishedAt ? { value: article.publishedAt, label: new Date(article.publishedAt).toLocaleDateString("hr-HR", { timeZone: "Europe/Zagreb" }) } : undefined}
      location={article.event?.location || undefined}
    />
  );
}
