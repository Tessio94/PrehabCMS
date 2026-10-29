import { BiHeart, BiUser } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import Button from "../shared/Button";
import { FaArrowRight } from "react-icons/fa";

const Skills = () => {
  return (
    <div className="bg-black_preh px-6 py-10 md:px-10 lg:px-16">
      <div className="flex flex-col justify-between gap-15 p-10 max-xl:items-center max-md:p-0 max-md:py-10 xl:flex-row">
        <div className="flex flex-col items-center gap-5 xl:max-w-[280px] xl:items-start">
          <p className="font-oswald text-red_preh text-xl font-semibold uppercase">
            Zašto odabrati nas
          </p>
          <p className="after:bg-red_preh font-oswald relative text-4xl font-bold text-white after:absolute after:top-[110%] after:left-0 after:h-1.5 after:w-20 after:rounded-2xl">
            Vaše zdravlje je naš prioritet
          </p>
          <p className="font-inter mt-4 text-start text-xl text-white">
            Kombiniramo stručnost, iskustvo i individualni pristup kako bismo
            svakom klijentu omogućili najbolje rezultate.
          </p>
          <Button type="red" href="kontakt">
            <span>Kontaktirajte nas</span>
            <FaArrowRight className="transition-all duration-300 group-hover:translate-x-3" />
          </Button>
        </div>
        <div className="flex flex-row items-stretch py-5 max-lg:flex-wrap max-lg:gap-y-10 max-sm:gap-y-0">
          <div className="flex flex-col items-center gap-5 border-r border-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10">
            <div className="bg-red_preh_t/80 rounded-full p-3">
              <LuShieldCheck className="text-red_preh text-6xl" />
            </div>
            <p className="text-center text-2xl font-semibold text-white">
              Stručnost i iskustvo
            </p>
            <p className="mt-auto text-center text-2xl text-white/80">
              Godine prakse i stalne edukacije osiguravaju vrhunsku skrb.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 border-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10 lg:border-r">
            <div className="bg-red_preh_t/80 rounded-full p-3">
              <BiUser className="text-red_preh text-6xl" />
            </div>
            <p className="text-center text-2xl font-semibold text-white">
              Individualan pristup
            </p>
            <p className="mt-auto text-center text-2xl text-white/80">
              Svaki plan terapije prilagođen je vašim potrebama i ciljevima.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 border-r border-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10">
            <div className="bg-red_preh_t/80 rounded-full p-3">
              <FiTarget className="text-red_preh text-6xl" />
            </div>
            <p className="text-center text-2xl font-semibold text-white">
              Dokazani rezultati
            </p>
            <p className="mt-auto text-center text-2xl text-white/80">
              Fokusirani smo na ostvarenje mjerljivih i dugoročnih rezultata.
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10">
            <div className="bg-red_preh_t/80 rounded-full p-3">
              <BiHeart className="text-red_preh text-6xl" />
            </div>
            <p className="text-center text-2xl font-semibold text-white">
              Posvećenost i podrška
            </p>
            <p className="mt-auto text-center text-2xl text-white/80">
              Uz vas smo kroz cijeli proces oporavka - svaki korak je važan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
