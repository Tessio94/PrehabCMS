import Image from "next/image";
import { GoTriangleDown } from "react-icons/go";
import Button from "../shared/Button";

const Intro = () => {
  return (
    <section className="bg-slate-100 bg-[url(/images/logo/background.png)] bg-cover bg-no-repeat">
      <div className="flex w-full flex-col px-6 pt-16 md:px-10 lg:px-16 xl:flex-row">
        <div className="flex flex-col items-start gap-6 p-10 max-md:p-0 max-md:py-10 sm:pb-16 xl:w-[50%] xl:pb-26">
          <h1 className="text-red_preh text-semibold font-oswald text-4xl max-[400px]:text-3xl">
            Fotogalerija
          </h1>
          <h2 className="after:bg-red_preh font-oswald relative text-6xl font-bold after:absolute after:top-[110%] after:left-0 after:h-2 after:w-20 after:rounded-2xl max-[400px]:text-5xl sm:text-7xl xl:text-6xl 2xl:text-7xl">
            Trenuci posvećenosti i{" "}
            <span className="text-red_preh">napretka</span>
          </h2>
          <p className="text-semibold font-inter mt-5 text-3xl text-black max-[400px]:text-2xl">
            Zavirite u naš prostor, opremu i svakodnevne aktivnosti kroz
            fotografije koje prikazuju predanost, stručnost i rezultate.
          </p>
          <Button type="black" href="fotogalerija#galerija">
            <span>Pogledaj galeriju</span>
            <GoTriangleDown />
          </Button>
        </div>
        <div className="max-lg:py-10 max-sm:hidden xl:w-[50%]">
          <Image
            src="/images/foto2.png"
            className="block"
            width={941}
            height={821}
            alt="Fizioterapeut Nikola Lukić"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
