import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import type { HealthArticle } from "@/data/articles";

type Props = {
  article: HealthArticle;
  image?: string;
  description?: string;
  date?: { value: string; label: string };
  location?: string;
};

export default function ArticleHeader({
  article,
  image,
  description,
  date,
  location,
}: Props) {

  return (
    <header
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundColor: article.bgColor ?? "#121a29",
      }}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[65%_center] lg:object-center"
        />
      )}
      <div
        aria-hidden="true"
        className="from-black_preh/95 via-black_preh/80 to-black_preh/30 pointer-events-none absolute inset-0 -z-10 bg-linear-to-r"
      />
      <div className="relative z-[999] mx-auto flex min-h-[560px] max-w-7xl flex-col items-start px-6 pt-40 pb-12 sm:px-10 sm:pb-16 lg:min-h-[620px] lg:px-16 lg:pt-48">
        <Link
          href="/zdravlje"
          className="mb-7 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <FiArrowLeft aria-hidden="true" /> Svi članci
        </Link>
        <div className="w-full max-w-3xl">
          <p className="bg-red_preh mb-5 inline-flex rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase">
            {article.category}
          </p>
          <h1 className="font-oswald text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="font-inter mt-5 max-w-2xl text-base leading-relaxed text-pretty text-slate-200 sm:text-lg lg:text-xl">
            {description ?? article.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-1 pt-5 text-sm text-slate-200">
            {date && (
              <span className="inline-flex items-center gap-2">
                <FiCalendar aria-hidden="true" className="shrink-0" />
                <time dateTime={date.value}>{date.label}</time>
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-2">
                <FiMapPin aria-hidden="true" className="shrink-0" />
                {location}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <FiClock aria-hidden="true" className="shrink-0" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
