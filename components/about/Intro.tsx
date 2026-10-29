import Image from "next/image";
import { GoTriangleDown } from "react-icons/go";
import Button from "../shared/Button";

const Intro = () => {
  return (
    <section className="bg-slate-100">
      <div className="flex w-full flex-col px-6 pt-16 md:px-10 lg:px-16 xl:flex-row">
        <div className="flex flex-col items-start gap-6 p-10 max-md:p-0 max-md:py-10 sm:pb-16 xl:w-[50%] xl:pb-26">
          <h1 className="text-red_preh text-semibold font-oswald text-4xl max-[400px]:text-3xl">
            O nama
          </h1>
          <h2 className="after:bg-red_preh font-oswald relative text-6xl font-bold after:absolute after:top-[110%] after:left-0 after:h-2 after:w-20 after:rounded-2xl max-[400px]:text-5xl sm:text-7xl xl:text-6xl 2xl:text-7xl">
            Prehab Therapy <span className="text-red_preh">Center</span>
          </h2>
          <p className="text-semibold font-inter mt-5 text-3xl text-black max-[400px]:text-2xl">
            Zovem se <strong className="text-red_preh">Nikola Lukić</strong>,
            diplomirani sam fizioterapeut. Vaša vitalnost i kvaliteta života su
            mi na prvom mjestu, te se radujem prilici da vam pomognem ostvariti
            vaše najbolje zdravstvene rezultate.
          </p>
          <Button type="black" href="o-nama#uvod">
            <span>Više o meni</span>
            <GoTriangleDown />
          </Button>
        </div>
        <div className="bg-contain bg-bottom bg-no-repeat max-lg:p-10 max-lg:pb-0 max-sm:p-6 max-sm:pb-0 min-[1280px]:bg-[url('/images/o-nama-intro-uska4.png')] min-[1650px]:bg-[url('/images/o-nama-intro5.png')] xl:w-[50%]">
          <Image
            src="/images/o-nama-intro5.png"
            className="max-sm:hidden xl:hidden"
            width={960}
            height={658}
            alt="Fizioterapeut Nikola Lukić"
          />
          <Image
            src="/images/o-nama-intro-uska4.png"
            className="hidden max-sm:block"
            width={565}
            height={766}
            alt="Fizioterapeut Nikola Lukić"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
