import type { HealthArticle } from "@/data/articles";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { CiCalendar, CiClock1, CiLocationOn } from "react-icons/ci";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { IoInformation } from "react-icons/io5";
import Button from "../shared/Button";
import ShareButton from "./ShareButton";

const Content = ({ article }: { article: HealthArticle }) => {
  const articleUrl = encodeURIComponent(
    `${process.env.SERVER_URL || "https://prehabilitationtherapycenter.hr"}/zdravlje/${article.slug}`,
  );
  const articleTitle = encodeURIComponent(article.title);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full flex-col gap-8 xl:flex-row">
        <aside className="order-1 flex flex-col items-start gap-5 xl:sticky xl:top-[110px] xl:max-h-[calc(100vh-110px)] xl:w-fit xl:items-center xl:self-start xl:pb-20">
          <p className="font-inter text-black_preh text-xl font-medium">
            Podijeli članak
          </p>
          <div className="shadow-black_preh/60 w-fit rounded-xl bg-slate-100/80 p-5 shadow-xl">
            <div className="flex w-fit flex-row items-center gap-8 xl:flex-col">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <FaFacebook className="text-black_preh text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <FaInstagram className="text-black_preh text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-pink-600" />
              </a>
              <a
                href={`https://wa.me/?text=${articleTitle}%20${articleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-block"
              >
                <FaWhatsapp className="text-black_preh text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-green-400" />
              </a>
              <ShareButton />
            </div>
          </div>
        </aside>
        <main className="order-3 flex flex-1 flex-col gap-10 xl:order-2">
          <div className="flex flex-col gap-10">
            {article.sections.map((section, index) => <section key={index} className="flex flex-col gap-5">
              <h2 className="font-oswald after:bg-red_preh relative text-2xl font-bold after:absolute after:top-[105%] after:left-0 after:h-1.5 after:w-10 after:rounded-xl">{section.title}</h2>
              <div className="article-richtext font-inter text-lg leading-8">{section.body ? <RichText data={section.body} /> : section.paragraphs.map((text, i) => <p key={i}>{text}</p>)}</div>
            </section>)}
          </div>
        </main>
        <aside className="order-3 flex flex-col gap-5 xl:sticky xl:top-[110px] xl:max-h-[calc(100vh-110px)] xl:w-[280px] xl:self-start">
          <div className="shadow-bg-black_preh/70 flex flex-col items-start gap-8 rounded-xl bg-slate-100/80 p-5 shadow-2xl">
            <p className="font-inter text-black_preh text-xl font-bold">
              Detalji kampa
            </p>
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-row items-stretch gap-2">
                <CiLocationOn className="text-red_preh text-4xl" />
                <div className="flex flex-col items-start justify-between">
                  <span className="font-semibold">Lokacija</span>
                  <span>{article.event?.location}</span>
                </div>
              </div>
              <div className="flex flex-row items-stretch gap-2">
                <CiCalendar className="text-red_preh text-4xl" />
                <div className="flex flex-col items-start justify-between">
                  <span className="font-semibold">Datum</span>
                  <span>{article.event?.dateLabel}</span>
                </div>
              </div>
              <div className="flex flex-row items-stretch gap-2">
                <CiClock1 className="text-red_preh text-4xl" />
                <div className="flex flex-col items-start justify-between">
                  <span className="font-semibold">Trajanje</span>
                  <span>{article.event?.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="mb-3 flex flex-row items-center gap-2">
                <IoInformation className="text-red_preh text-xl" />
                <span>Za više informacija</span>
              </div>
              <p className="whitespace-pre-line text-sm leading-6">{article.event?.contact}</p>
            </div>
          </div>
          <div className="bg-black_preh shadow-bg-black_preh/70 flex flex-col items-start gap-8 rounded-xl p-5 text-slate-100 shadow-2xl">
            <div className="flex flex-col items-start gap-3">
              <p className="text-2xl font-semibold">
                Rezervirajte svoje mjesto već danas!
              </p>
              <p className="text-xl text-white/80">
                Broj mjesta je ograničen. Osigurajte svoje mejsto na vrijeme!
              </p>
            </div>
            <Button type="red" href="/kontakt">
              <span className="text-nowrap">Kontaktirajte nas</span>
              <FaArrowRight className="text-2xl transition-all duration-300 group-hover:translate-x-3" />
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Content;
