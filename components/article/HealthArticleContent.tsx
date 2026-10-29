import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { HealthArticle } from "@/data/articles";
import ArticleHeader from "./ArticleHeader";

export default function HealthArticleContent({
  article,
}: {
  article: HealthArticle;
}) {
  return (
    <article className="text-black_preh bg-white">
      <ArticleHeader article={article} image={article.coverImage} location={article.event?.location || undefined} date={article.publishedAt ? { value: article.publishedAt, label: new Date(article.publishedAt).toLocaleDateString("hr-HR", { timeZone: "Europe/Zagreb" }) } : undefined} />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-6 lg:py-20">
        <nav
          aria-label="Sadržaj članka"
          className="h-fit rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-28"
        >
          <p className="font-oswald mb-4 text-xl font-medium">U ovom članku</p>
          <ol className="space-y-4">
            {article.sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#odjeljak-${index + 1}`}
                  className="hover:text-red_preh text-sm leading-relaxed text-slate-600 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="min-w-0">
          {article.event?.dateLabel && <aside className="mb-10 rounded-2xl bg-slate-50 p-6"><h2 className="font-oswald mb-4 text-2xl">Detalji događaja</h2><p>{article.event.dateLabel} · {article.event.duration} · {article.event.location}</p><p className="mt-3 whitespace-pre-line">{article.event.contact}</p></aside>}
          <div className="space-y-12">
            {article.sections.map((section, index) => (
              <section
                key={section.title}
                id={`odjeljak-${index + 1}`}
                className="scroll-mt-28"
              >
                <h2 className="font-oswald mb-5 text-3xl font-medium">
                  {section.title}
                </h2>
                <div className="font-inter article-richtext space-y-4 text-base leading-8 text-slate-600">
                  {section.body && <RichText data={section.body} />}
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.sources && (
                  <p className="mt-3 text-xs text-slate-500">
                    Izvori:{" "}
                    {section.sources.map((source) => (
                      <a
                        key={source}
                        href={`#izvor-${source}`}
                        aria-label={`Pogledajte izvor ${source}`}
                        className="text-red_preh mr-2 underline underline-offset-4"
                      >
                        [{source}]
                      </a>
                    ))}
                  </p>
                )}
              </section>
            ))}
          </div>
          <aside className="border-red_preh mt-12 rounded-2xl border-l-4 bg-slate-50 p-6">
            <p className="font-oswald text-xl font-medium">
              Vaše potrebe određuju plan terapije.
            </p>
            <p className="font-inter mt-3 text-sm leading-relaxed text-slate-600">
              Članak je informativnog karaktera i ne zamjenjuje pregled. Za
              procjenu tegoba i razgovor o primjerenim postupcima obratite se
              zdravstvenom stručnjaku.
            </p>
            <Link
              href="/rezervacije"
              className="text-red_preh mt-5 inline-flex items-center gap-3 font-semibold hover:underline"
            >
              Rezervirajte termin
              <FiArrowRight aria-hidden="true" />
            </Link>
          </aside>
          {article.sources.length > 0 && <section
            aria-labelledby="sources-heading"
            className="mt-12 border-t border-slate-200 pt-8"
          >
            <h2
              id="sources-heading"
              className="font-oswald mb-5 text-2xl font-medium"
            >
              Izvori i dodatno čitanje
            </h2>
            <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-slate-600">
              {article.sources.map((source, index) => (
                <li
                  id={`izvor-${index + 1}`}
                  key={source.url}
                  className="scroll-mt-28"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red_preh break-words underline decoration-slate-300 underline-offset-4"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>}
        </div>
      </div>
    </article>
  );
}
