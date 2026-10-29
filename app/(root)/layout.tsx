import type { Metadata } from "next";
import "@fontsource-variable/oswald";
import "@fontsource-variable/inter";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { localBusinessSchema } from "@/lib/schema/localBusiness";

export const metadata: Metadata = {
  title: "Prehab Fizioterapija Zadar | Biograd",
  description:
    "Prehab je specijalizirana klinika za fizioterapiju i rehabilitaciju u Zadru i Biogradu koju vodi Nikola Lukić, diplomirani fizioterapeut. Nudimo dijagnostiku problema, korekciju posture, terapiju skolioze, masažu, elektro stimulaciju, ultrazvučnu terapiju, terapijske vježbe u vodi te individualne programe rehabilitacije.",
  openGraph: {
    title: "Prehab Fizioterapija | Zadar i Biograd",
    description:
      "Specijalizirani centar za fizioterapiju, rehabilitaciju i terapijske programe u Zadru i Biogradu.",
    url: "https://prehabilitationtherapycenter.hr/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }} />
        <Header /><main className="relative">{children}</main><Footer />
      </body>
    </html>
  );
}
