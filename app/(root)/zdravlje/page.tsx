import { publishedPosts, articleView } from "@/lib/posts";
export const dynamic = "force-dynamic";
import Banner from "@/components/photo/Banner";
import Options from "@/components/photo/Options";
import Articles from "@/components/zdravlje/Articles";
import Intro from "@/components/zdravlje/Intro";
import MainArticle from "@/components/zdravlje/MainArticle";
import { Metadata } from "next";

const Page = async () => {
  const posts = await publishedPosts();
  const featured = posts.find(p => p.featured);
  const articles = posts.filter(p => p.id !== featured?.id).map(articleView);
  return (
    <>
      <Intro />
      <Options data={[{ label: "Svi", tab: "t1" }]} />
      {/* <Options
        data={[
          { label: "Svi", tab: "t1" },
          { label: "Edukacija", tab: "t2" },
          { label: "Trening", tab: "t3" },
        ]}
      /> */}
      {featured && <MainArticle article={articleView(featured)} />}
      <Articles articles={articles} />
      <Banner color="#121a29" buttonColor="#c70808" headerColor="#c70808" />
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Zdravlje | Prehab Fizioterapija Zadar i Biograd",
  description:
    "U ovom kutku pronađite stručne uvide, savjete i inspiraciju vezanu uz zdravlje, pokret i prevenciju od strane diplomiranog fizioterapeuta.",
  openGraph: {
    title: "Prehab Zadar | Zdravlje",
    description:
      "Pročitajte Prehab blog i saznajte više o novostima, terapijama i našem svakodnevnom radu.",

    url: "https://prehabilitationtherapycenter.hr/zdravlje",
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
