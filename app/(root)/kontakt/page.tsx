import { cms } from "@/lib/cms";
export const dynamic = "force-dynamic";
import ContactPage from "@/components/contact/ContactPage";
import { Metadata } from "next";

const Page = async () => {
  const settings = await (await cms()).findGlobal({ slug: "clinic-settings" });
  return (
    <>
      <ContactPage formEnabled={Boolean(settings.privacyReviewed)} phone={settings.phone} />
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Kontakt | Prehab Fizioterapija Zadar i Biograd",
  description:
    "Pronađite Prehab kliniku u Zadru na adresi Splitska ulica 3 te u Biogradu na moru na adresi Bukovačka 15, BnM",
  openGraph: {
    title: "Prehab Zadar | Kontakt",
    description:
      "Prehab klinika u Zadru na adresi Splitska ulica 3 te u Biogradu na moru na adresi Bukovačka 15, BnM",

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
