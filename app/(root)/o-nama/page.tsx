import Skills from "@/components/about/Skills";
import Description from "@/components/about/Description";
import Intro from "@/components/about/Intro";
import Reviews from "@/components/about/Reviews";
import Steps from "@/components/about/Steps";
import { Metadata } from "next";

const Page = async () => {
  return (
    <>
      <Intro />
      <Description />
      <Skills />
      <Steps />
      <Reviews />
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "O nama | Prehab Fizioterapija Zadar i Biograd",
  description:
    "Naš rad temelji se na individualnom pristupu pacijentu. Prehab je fizioteraputska klinika otvorena od strane fizioterapeuta Nikole Lukića u Zadru i Biogradu.",
  openGraph: {
    title: "Prehab Zadar | O nama",
    description:
      "Saznajte više o našem pristupu fizioterapiji, rehabilitaciji i individualnom radu s pacijentima u Zadru i Biogradu.",

    url: "https://prehabilitationtherapycenter.hr/o-nama",
    siteName: "Prehab Zadar",
    images: [
      {
        url: "https://prehabilitationtherapycenter.hr/images/Nikola/prehab.jpg",
        width: 1920,
        height: 1080,
        alt: "Prehab fizioterapija Zadar i Biograd",
      },
    ],
    type: "website",
    locale: "hr_HR",
  },
};
