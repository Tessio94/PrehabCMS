import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "../shared/Button";
// import Button from "@/components/shared/Button";

const Trening = () => {
  return (
    <>
      <section
        id="novo"
        className="relative overflow-hidden px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="p-10 max-md:p-0 max-md:py-10">
          <h2 className="font-oswald text-red_preh mb-10 text-5xl">Novo</h2>

          <div className="">
            <h4 className="font-oswald mb-4 text-2xl">
              Moderna terapijska rješenja za brži oporavak i zdravlje
              kralježnice
            </h4>
            <p className="mb-10 text-xl xl:max-w-2/3">
              U našu ponudu uvodimo suvremene terapijske metode usmjerene na
              smanjenje boli, ubrzanje oporavka i poboljšanje funkcionalnosti
              lokomotornog sustava.
            </p>
            <div className="bg-red_preh_t flex flex-col gap-2 rounded-t-xl px-5 py-4">
              <h4 className="font-oswald text-black_preh text-red_preh text-2xl font-bold">
                TECAR terapija
              </h4>
              <p className="font-oswald text-lg">
                TECAR terapija koristi radiofrekvencijsku energiju za poticanje
                prirodnih procesa regeneracije tkiva, smanjenje boli i
                ubrzavanje oporavka nakon ozljeda i kroničnih tegoba. <br />
                Posebno je učinkovita kod mišićnih i zglobnih problema te
                sportske rehabilitacije.
              </p>
            </div>
            <div className="bg-black_preh flex flex-col gap-2 rounded-b-xl px-5 py-4">
              <h4 className="font-oswald text-2xl font-bold text-slate-100">
                Lumbar Health terapija | 448 kHz
              </h4>
              <p className="font-oswald text-lg text-slate-100">
                Lumbar Health terapija na frekvenciji 448 kHz predstavlja
                inovativan pristup tretiranju bolova i disfunkcija kralježnice.{" "}
                <br />
                Terapija djeluje dubinski na tkivo, poboljšava cirkulaciju,
                smanjuje upalne procese i doprinosi bržem oporavku te većoj
                pokretljivosti.
              </p>
            </div>
          </div>
        </div>
        <div className="xxl:-right-75 h absolute -top-70 right-[-28%] hidden aspect-square h-200 overflow-hidden rounded-full xl:block">
          <Image src="/images/zadar/slika2.jpg" alt="čučanj vježba" fill />
        </div>
        <div className="mx-auto w-fit">
          <Button href="kontakt" type="black">
            <span>Kontaktirajte nas</span>
            <FaArrowRight className="transform transition-transform duration-500 group-hover:translate-x-2" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default Trening;
