import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { campArticle, type HealthArticle } from "@/data/articles";
import ArticleVisual from "./ArticleVisual";

export default function Article({
  article = campArticle,
}: {
  article?: HealthArticle;
}) {
  return (
    <Link
      href={`/zdravlje/${article.slug}`}
      className="group text-black_preh hover:border-red_preh/30 focus-visible:outline-red_preh flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none"
    >
      {article.coverImage ? <div className="relative aspect-[16/9]"><Image src={article.coverImage} alt={article.coverAlt || article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div> : <ArticleVisual visual={article.visual} />}
      <div className="flex grow flex-col items-start p-6 sm:p-7">
        <p className="text-red_preh mb-3 text-xs font-semibold tracking-wider uppercase">
          {article.category}
        </p>
        <h3 className="font-oswald text-2xl leading-snug font-medium">
          {article.title}
        </h3>
        <p className="font-inter mt-3 text-sm leading-relaxed text-slate-600">
          {article.excerpt}
        </p>
        <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-3 pt-7 text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <FiClock aria-hidden="true" />
            {article.readTime}
          </span>
          <span className="text-red_preh inline-flex items-center gap-2 font-semibold">
            Pročitajte više
            <FiArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
