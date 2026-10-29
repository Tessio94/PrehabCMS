"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  RiArrowRightSLine,
  RiArrowRightWideFill,
  RiArrowLeftWideFill,
} from "react-icons/ri";

import { GoDotFill, GoDot } from "react-icons/go";

import Image from "next/image";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import Button from "../shared/Button";

const Intro = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        scrollNext();
      }

      if (e.key === "ArrowLeft") {
        scrollPrev();
      }
    };

    window.addEventListener("keydown", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [scrollNext, scrollPrev]);

  return (
    <section
      id="intro"
      className="relative overflow-hidden px-6 py-16 md:px-10 lg:px-16"
    >
      <div className="relative p-10 max-md:p-0 max-md:py-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-stretch">
            {/* SLIDE 1 */}
            <div className="min-h-full min-w-0 flex-[0_0_100%] px-2">
              <div className="border-red_preh_t flex h-full flex-col justify-between overflow-hidden rounded-xl border-2 bg-slate-100/80 lg:min-h-[750px] lg:flex-row">
                <div className="flex min-h-full w-full flex-col lg:w-[50%]">
                  <div className="xsm:px-8 relative flex grow flex-col items-stretch rounded-t-xl bg-slate-100/80 px-4 py-10 max-lg:gap-3 max-sm:py-4 lg:rounded-t-none lg:bg-transparent">
                    <div>
                      <h2 className="font-oswald xsm:mt-0 text-red_preh mt-5 mb-8 text-center text-5xl xl:text-6xl">
                        Prehab Zadar
                      </h2>

                      <p className="font-oswald xxl:mb-10 text-justify text-2xl lg:mb-5 xl:text-3xl">
                        <strong className="text-red_preh">
                          Prehabilitation
                        </strong>{" "}
                        nudi profesionalnu fizioterapiju za brži oporavak.
                        Specijalizirani smo za prevenciju ozljeda,
                        rehabilitaciju i poboljšanje pokretljivosti.
                      </p>
                    </div>

                    <ul className="flex grow flex-col items-start justify-between gap-4 py-4 sm:gap-7">
                      <li className="font-oswald flex flex-col items-center gap-2 text-xl sm:flex-row sm:gap-6 xl:text-2xl">
                        <Image
                          src="/images/ikone/injury-prevention.svg"
                          alt="prevencija ozljede"
                          width={55}
                          height={55}
                          className="max-sm:hidden"
                        />

                        <div>
                          <span className="text-red_preh mr-2">
                            Prevencija ozljeda:
                          </span>

                          <p className="inline">
                            Naše usluge pomažu u sprječavanju ozljeda kroz
                            individualizirane programe vježbanja i savjete o
                            pravilnom kretanju.
                          </p>
                        </div>
                      </li>

                      <li className="font-oswald flex flex-col items-center gap-2 text-xl sm:flex-row sm:gap-6 xl:text-2xl">
                        <Image
                          src="/images/ikone/recovery.svg"
                          alt="brži oporavak"
                          width={55}
                          height={55}
                          className="max-sm:hidden"
                        />

                        <div>
                          <span className="text-red_preh mr-2">
                            Brži oporavak:
                          </span>

                          <p className="inline">
                            Specijalizirani tretmani i rehabilitacijski programi
                            ubrzavaju proces oporavka nakon ozljeda ili
                            operacija.
                          </p>
                        </div>
                      </li>

                      <li className="font-oswald flex flex-col items-center gap-2 text-xl sm:flex-row sm:gap-6 xl:text-2xl">
                        <Image
                          src="/images/ikone/quality-of-life.svg"
                          alt="kvaliteta života"
                          width={55}
                          height={55}
                          className="max-sm:hidden"
                        />

                        <div>
                          <span className="text-red_preh mr-2">
                            Poboljšanje kvalitete života:
                          </span>

                          <p className="inline">
                            Redovita fizioterapija poboljšava pokretljivost,
                            smanjuje bolove i povećava ukupnu kvalitetu života.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="xsm:justify-center xsm:text-3xl font-oswald xsm:px-8 bg-black_preh mx-auto w-full px-4 py-5 text-2xl font-bold text-slate-100">
                    <div className="bg-red_preh border-red_preh flex w-fit items-center justify-between gap-5 place-self-center overflow-hidden rounded-lg border-2">
                      <span>
                        <Image
                          src="/images/logo/ikona.png"
                          alt="logo"
                          loading="lazy"
                          height={40}
                          width={40}
                        />
                      </span>
                      Posjetite nas
                      <span>
                        <Image
                          src="/images/logo/ikona.png"
                          alt="logo prehab"
                          loading="lazy"
                          height={40}
                          width={40}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative min-h-[320px] w-full max-lg:hidden lg:min-h-full lg:w-1/2">
                  <Image
                    src="/images/zadar/slika1.jpg"
                    alt="prehab zadar klinika"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="min-h-full min-w-0 flex-[0_0_100%] px-2">
              <div className="border-red_preh_t flex h-full flex-col justify-between overflow-hidden rounded-xl border-2 bg-slate-100/80 lg:min-h-[750px] lg:flex-row">
                <div className="relative min-h-[320px] w-full max-lg:hidden lg:min-h-full lg:w-1/2">
                  <div className="relative block w-full max-lg:h-1/2 lg:h-1/2">
                    <Image
                      src="/images/certifikati/slika12.jpg"
                      alt="certifikati"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative block w-full max-lg:h-1/2 lg:h-1/2">
                    <Image
                      src="/images/certifikati/slika7.jpg"
                      alt="diplome prehab"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="xsm:px-8 flex min-h-full w-full flex-col gap-5 overflow-hidden rounded-b-xl bg-slate-100/80 px-4 py-10 max-sm:py-4 lg:w-[50%] lg:rounded-none lg:rounded-r-xl lg:bg-transparent">
                  <h2 className="font-oswald text-red_preh text-center text-5xl lg:text-6xl">
                    Obrazovanje
                  </h2>

                  <p className="font-oswald text-justify text-xl md:text-xl lg:text-2xl xl:text-3xl">
                    <strong className="text-red_preh">Moje obrazovanje</strong>{" "}
                    započelo je sa završenim fakultetom, gdje sam stekao
                    temeljna znanja i vještine potrebne za moj profesionalni
                    razvoj. Nakon uspješnog završetka fakulteta, nastavio sam
                    ulagati u svoje znanje i kompetencije putem različitih
                    certifikata.
                  </p>

                  <ul className="flex grow flex-col gap-7 py-4">
                    {[
                      "Bacc. physioth - Zagreb",
                      "Stecco fascial manipulation lvl 3",
                      "ISST Schroth therapist",
                      "Basic pro coach",
                      "Student Osteopathy, neuro medicine, functional medicine",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="xsm:text-xl font-oswald flex flex-row items-center gap-2.5 text-lg lg:text-2xl"
                      >
                        <span className="text-red_preh">
                          <RiArrowRightSLine className="text-4xl" />
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button type="red" href="o-nama">
                    <span className="text-nowrap">Pročitajte više</span>{" "}
                    <FaArrowRight className="transition-all duration-300 group-hover:translate-x-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* SLIDE 3 */}
            <div className="min-h-full min-w-0 flex-[0_0_100%] px-2">
              <div className="border-red_preh_t flex h-full flex-col justify-between overflow-hidden rounded-xl border-2 bg-slate-100/80 lg:min-h-[750px] lg:flex-row">
                <div className="flex min-h-full w-full flex-col justify-between lg:w-[50%]">
                  <div className="xsm:px-8 relative flex grow flex-col items-stretch justify-between px-4 py-10 max-lg:gap-5 max-sm:py-4">
                    <div>
                      <h2 className="font-oswald text-red_preh mb-7 text-center text-5xl">
                        Usluge
                      </h2>

                      <p className="font-oswald text-justify text-2xl lg:text-2xl xl:text-3xl">
                        U{" "}
                        <strong className="text-red_preh">
                          Prehabilitation
                        </strong>{" "}
                        klinici nudimo razne profesionalne usluge fizioterapije
                        te usluge individualnog i grupnog treninga kako bi vaše
                        zdravlje nastavilo biti na svom maksimumu.
                      </p>
                    </div>

                    <div className="font-oswald flex grow flex-col items-start justify-center gap-3 text-xl">
                      <p className="xxl:text-2xl flex flex-col items-center gap-2 text-justify text-lg max-sm:w-full sm:flex-row lg:text-2xl">
                        <Image
                          src="/images/ikone/usluge.svg"
                          alt="brži oporavak"
                          width={55}
                          height={55}
                        />
                        Listu usluga i dodatne informacije pogledajte u sekciji
                        &quot;Usluge&quot;
                      </p>
                      <div className="mx-auto mt-1.5">
                        <Button type="red" href="#usluge">
                          <span className="text-nowrap">Usluge</span>{" "}
                          <FaArrowDown className="transition-all duration-300 group-hover:translate-y-1.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-oswald flex grow flex-col items-start justify-center gap-3 text-xl">
                      <p className="xxl:text-2xl flex flex-col items-center gap-2 text-justify text-lg max-sm:w-full sm:flex-row lg:text-2xl">
                        <Image
                          src="/images/ikone/cjenik.svg"
                          alt="brži oporavak"
                          width={55}
                          height={55}
                        />
                        Cijene i dodatne informacije pronađite u sekciji
                        &quot;Cjenik&quot;
                      </p>
                      <div className="mx-auto mt-1.5">
                        <Button type="red" href="#cjenik">
                          <span className="text-nowrap">Cjenik</span>{" "}
                          <FaArrowDown className="transition-all duration-300 group-hover:translate-y-1.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="xsm:justify-center xsm:text-3xl font-oswald xsm:px-8 bg-black_preh mx-auto w-full px-4 py-5 text-2xl font-bold text-slate-100">
                    <div className="bg-red_preh border-red_preh flex w-fit items-center justify-between gap-5 place-self-center overflow-hidden rounded-lg border-2">
                      <span>
                        <Image
                          src="/images/logo/ikona.png"
                          alt="logo"
                          loading="lazy"
                          height={40}
                          width={40}
                        />
                      </span>
                      Posjetite nas
                      <span>
                        <Image
                          src="/images/logo/ikona.png"
                          alt="logo prehab"
                          loading="lazy"
                          height={40}
                          width={40}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[320px] w-full max-lg:hidden lg:min-h-full lg:w-1/2">
                  <Image
                    src="/images/zadar/slika2.jpg"
                    alt="prehab klinika"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREV BUTTON */}
        <button
          className="font-oswald text-black_preh hover:bg-black_preh bg-red_preh_t hover:text-red_preh absolute top-1/2 left-0 z-10 flex translate-y-[-50%] items-center rounded-xl px-8 py-3 text-4xl transition-all duration-500 max-md:-translate-x-4 max-md:px-2 max-md:py-6"
          onClick={scrollPrev}
        >
          <RiArrowLeftWideFill />
        </button>

        {/* NEXT BUTTON */}
        <button
          className="font-oswald text-black_preh hover:bg-black_preh group bg-red_preh_t hover:text-red_preh absolute top-1/2 right-0 z-10 flex translate-y-[-50%] items-center rounded-xl px-8 py-3 text-4xl transition-all duration-500 max-md:translate-x-4 max-md:px-2 max-md:py-6"
          onClick={scrollNext}
        >
          <RiArrowRightWideFill />
        </button>

        {/* DOTS */}
        <div className="mt-10 flex w-full items-center justify-center gap-5 text-3xl">
          {[0, 1, 2].map((index) =>
            selectedIndex === index ? (
              <GoDotFill
                key={index}
                onClick={() => scrollTo(index)}
                className="text-red_preh cursor-pointer"
              />
            ) : (
              <GoDot
                key={index}
                onClick={() => scrollTo(index)}
                className="text-black_preh cursor-pointer"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Intro;
