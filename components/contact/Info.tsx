import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Info = () => {
  return (
    <section className="xxl:py-16 py-0 sm:py-5 lg:py-10">
      <div className="mx-auto flex flex-col items-stretch justify-between px-10 py-10 sm:flex-row sm:gap-0 sm:px-0">
        <div className="border-red_preh_t flex h-[10rem] w-full basis-[33.3%] flex-col items-center justify-start gap-3 border-b-2 pb-5 sm:border-r-2 sm:border-b-0 sm:pb-0">
          <div className="bg-red_preh_t/80 flex flex-row items-center justify-center rounded-full p-3.5">
            <BsFillTelephoneFill className="text-red_preh h-[50] w-auto" />
          </div>
          <h3 className="font-oswald text-3xl sm:text-2xl md:text-3xl">
            Telefon
          </h3>
          <p className="font-oswald mt-auto text-xl sm:text-base md:text-xl">
            Tel: +385 95 906 4240
          </p>
        </div>
        <div className="border-red_preh_t flex h-[10rem] w-full basis-[33.3%] flex-col items-center justify-start gap-3 border-b-2 py-5 sm:border-r-2 sm:border-b-0 sm:py-0">
          <div className="bg-red_preh_t/80 flex flex-row items-center justify-center rounded-full p-3.5">
            <FaLocationDot className="text-red_preh h-[50] w-auto" />
          </div>
          <p className="font-oswald text-3xl sm:text-2xl md:text-3xl">Adresa</p>
          <div className="mt-auto flex flex-col gap-2">
            <p className="font-oswald text-xl sm:text-base md:text-xl">
              Splitska ulica 3, Zadar
            </p>
            <p className="font-oswald m-auto text-xl sm:text-base md:text-xl">
              Bukovačka 15, BnM
            </p>
          </div>
        </div>
        <div className="flex h-[10rem] w-full basis-[33.3%] flex-col items-center justify-start gap-3 pt-10 sm:pt-0">
          <div className="bg-red_preh_t/80 flex flex-row items-center justify-center rounded-full p-3.5">
            <MdEmail className="text-red_preh h-[50] w-auto" />
          </div>

          <p className="font-oswald text-3xl sm:text-2xl md:text-3xl">E-mail</p>
          <p className="font-oswald mt-auto text-xl sm:text-base md:text-xl">
            nikola.lukic.993@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Info;
