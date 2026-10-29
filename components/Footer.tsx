import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <>
      <Banner />
      <footer className="bg-black_preh px-6 pt-16 text-stone-50 sm:px-10">
        <div className="flex flex-row flex-wrap items-stretch justify-between gap-5 max-[830px]:gap-12 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-col items-start justify-between gap-5 max-[830px]:mx-auto max-[830px]:w-1/2! max-xl:w-[45%] max-sm:w-fit!">
            <a href="#" className="flex items-center gap-4 text-stone-100">
              <Image
                src="/images/logo/ikona.png"
                alt="logo"
                className="border-red_preh_t rounded-xl border-2 shadow-2xl"
                height={80}
                width={80}
              />
              <h1 className="font-oswald text-3xl font-bold">Prehab</h1>
            </a>
            <p className="font-inter text-xl text-slate-100">
              Fizioterapija, rehabilitacija
              <br /> i individualan pristup vašem zdravlju.
            </p>
          </div>
          <div className="flex flex-col items-start justify-between gap-5 max-[830px]:mx-auto max-[830px]:w-1/2! max-xl:w-[45%] max-sm:w-fit!">
            <div className="text-center sm:w-[26rem] sm:text-start">
              <div className="flex flex-row items-center gap-2">
                <IoLocation className="text-red_preh text-5xl" />
                <h3 className="text-md font-oswald flex flex-col items-start gap-1 sm:text-xl">
                  <span className="text-red_preh text-[1rem] sm:text-[1.5rem]">
                    Lokacija br. 1:
                  </span>{" "}
                  Splitska ulica 3, 23000 Zadar
                </h3>
              </div>
            </div>
            <div className="text-center sm:w-[26rem] sm:text-start">
              <div className="flex flex-row items-center gap-2">
                <IoLocation className="text-red_preh text-5xl" />
                <h3 className="text-md font-oswald flex flex-col items-start gap-1 sm:text-xl">
                  <span className="text-red_preh text-[1rem] sm:text-[1.5rem]">
                    Lokacija br. 2:
                  </span>{" "}
                  Bukovačka 15, 23210 Biograd na Moru
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5 max-xl:w-[45%] max-sm:mr-8 max-sm:w-fit!">
            <div className="flex flex-row items-center gap-2">
              <BsFillTelephoneFill className="text-red_preh text-4xl" />
              <a
                href="tel:+385959064240"
                className="font-oswald ml-2 block text-lg transition-all duration-500 hover:scale-125 hover:text-stone-400 sm:text-xl"
              >
                +385 95 906 4240
              </a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MdEmail className="text-red_preh text-5xl" />
              <a
                href="mailto:nikola.lukic.993@gmail.com"
                className="font-oswald text-lg transition-all duration-500 hover:scale-125 hover:text-stone-400 sm:text-xl"
              >
                nikola.lukic.993@gmail.com
              </a>
            </div>
          </div>
          <div className="flex gap-3 max-xl:mt-auto max-xl:w-[45%] max-sm:w-fit!">
            <a
              href="https://www.facebook.com/prehabilitationtherapycenter"
              target="_blank"
            >
              <FaFacebook className="text-2xl transition-all duration-500 hover:scale-115 hover:text-stone-400" />
            </a>
            <a href="https://www.instagram.com/prehabcentar/" target="_blank">
              <FaInstagram className="text-2xl transition-all duration-500 hover:scale-115 hover:text-stone-400" />
            </a>
          </div>
        </div>
        <nav aria-label="Pravne informacije" className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-300">
          <Link href="/rezervacije" className="hover:text-white">Rezervacije</Link>
          <Link href="/politika-privatnosti" className="hover:text-white">Politika privatnosti</Link>
          <Link href="/impressum" className="hover:text-white">Impressum</Link>
        </nav>
        <hr className="mt-5 w-full pb-5 text-white" />
        <p className="font-oswald pb-5 text-center">
          © {date} <i>Tessio94</i>
        </p>
      </footer>
    </>
  );
};

export default Footer;
