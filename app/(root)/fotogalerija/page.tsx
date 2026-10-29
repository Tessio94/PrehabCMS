import Grid from "@/components/photo/Grid";
import Intro from "@/components/photo/Intro";
import Options from "@/components/photo/Options";
import Banner from "@/components/photo/Banner";
import { Metadata } from "next";

const Page = () => {
  return (
    <>
      <Intro />
      <Options data={[{ label: "Sve", tab: "t1" }]} />
      {/* <Options
        data={[
          { label: "Sve", tab: "t1" },
          { label: "Prostor", tab: "t2" },
          { label: "Terapije", tab: "t3" },
          { label: "Edukacija", tab: "t4" },
          { label: "Događaji", tab: "t5" },
        ]}
      /> */}
      <Grid />
      <Banner />
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Fotogalerija | Prehab Fizioterapija Zadar i Biograd",
  description:
    "Pogledajte fotogaleriju Prehab klinika za fizioterapiju u Zadru te Biogradu.",
  openGraph: {
    title: "Prehab Zadar | Fotogalerija",
    description:
      "Pogledajte više o našem pristupu fizioterapiji, rehabilitaciji i individualnom radu s pacijentima u Zadru i Biogradu.",

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
