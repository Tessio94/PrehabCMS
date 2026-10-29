import type { HealthArticle } from "@/data/articles";
import { CgCalendar } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const MainArticle = ({ article }: { article: HealthArticle }) => {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-16">
      <div className="px-10 max-md:px-0">
        <Link
          href={`/zdravlje/${article.slug}`}
          style={{ backgroundImage: article.coverImage ? `linear-gradient(90deg,rgba(18,26,41,.92),rgba(18,26,41,.1)), url(${JSON.stringify(article.coverImage)})` : undefined }}
          className="border-black_preh shadow-black_preh/30 group/main hover:shadow-black_preh/80 relative block h-[540px] rounded-xl border-2 bg-black_preh bg-cover shadow-xl transition-all duration-300 hover:shadow-xl max-[1650px]:bg-position-[30%] max-[900px]:bg-position-[70%]! max-xl:bg-position-[50%]"
        >
          <div className="absolute top-0 left-0 flex h-full flex-col items-start gap-5 p-10 text-xl font-medium lg:w-1/2">
            <p className="bg-red_preh font-oswald w-fit rounded-xl px-3 py-1 text-slate-100 uppercase">
              Istaknuto
            </p>
            <p className="font-oswald mt-2 text-4xl font-medium text-slate-100 underline transition-colors duration-300 group-hover/main:text-slate-100/70 lg:text-5xl">
              {article.title}
            </p>
            <p className="font-inter mt-2 line-clamp-3 text-2xl text-slate-100 transition-colors duration-300 group-hover/main:text-slate-100/70">
              {article.excerpt}
            </p>
            <div className="mt-auto flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="text-red_preh flex flex-row items-center gap-3">
                <CgCalendar className="text-3xl" />
                <time dateTime={article.publishedAt}>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("hr-HR", { timeZone: "Europe/Zagreb" }) : ""}</time>
              </div>
              <div className="font-oswald bg-red_preh group-hover/main:border-red_preh group-hover/main:text-red_preh focus:ring-red_preh flex !w-[190px] w-fit items-center justify-center gap-1 rounded-lg border-2 px-4 py-2 text-lg font-medium tracking-wide text-stone-50 shadow-lg transition-colors duration-300 outline-none group-hover/main:border-2 group-hover/main:bg-stone-50 group-hover/main:shadow-lg group-hover/main:shadow-red-300 focus:ring focus:ring-offset-2 disabled:cursor-not-allowed max-[850px]:px-3 max-[850px]:py-1">
                <span className="text-nowrap">Pročitajte više</span>{" "}
                <FaArrowRight className="transition-all duration-300 group-hover/main:translate-x-3" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MainArticle;
