"use client";

import useEmblaCarousel from "embla-carousel-react";
import { BiUser } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Filip M.",
    review:
      "S Nikolom radim nekoliko godina i mogu reći samo pozitivne stvari! Uporan i smiren u rješavanju problema, komunikativan i fleksibilan oko dogovora. Posjeduje veliko znanje i iskustvo u radu s klijentima. Svakako preporučujem!",
    info: "Sportaš",
  },
  {
    name: "Marino L.",
    review:
      "Programer koji je imao problema sa lopaticom dugo vremena. Na kraju mi je zao sto nisam dosao prije. Nikola je jako strućan i pomogao mi je izlijeciti svakodnevnu bol.",
    info: "Programer",
  },
  {
    name: "Ines G.",
    review:
      "Oduševila me mala, ali profesionalna ekipa koja ima individualni pristup i rješenje za svakoga. Moja topla preporuka",
    info: "Poduzetnica",
  },
  {
    name: "Kruno M.",
    review:
      "Profesionalni vozač koji puno vremena provodi u sjedećem položaju uz loše držanje prouzročilo je bolove u vratnoj kralježnici, ramenu i leđima, zbog kojeg nisam mogao spavati. Već kod prvog susreta su ustanovili korijen problema i nakon par tretmana osjećam se puno bolje. Svaka preporuka za profesionalni pristup i stručnost. Hvala",
    info: "Vozač",
  },
  {
    name: "Mario Š.",
    review: "Pomogao mi je sa tegobama u leđima!",
    info: "Sportaš",
  },
  {
    name: "Ivan B.",
    review: "Jako stručni u svemu, efikasni. Topla preporuka svima! ",
    info: "Sportaš",
  },
];

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="bg-slate-200/40 px-6 py-10 md:px-10 lg:px-16">
      <div className="flex flex-col gap-15 p-10 max-xl:items-center max-md:p-0 max-md:py-10">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <p className="font-oswald text-red_preh text-xl font-semibold uppercase">
            Zašto odabrati nas
          </p>

          <p className="after:bg-red_preh font-oswald relative text-center text-4xl font-bold text-black after:absolute after:top-[calc(100%+10px)] after:left-1/2 after:h-1.5 after:w-20 after:-translate-x-1/2 after:rounded-2xl">
            Vaše povjerenje je naš najveći uspjeh.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative w-full">
          {/* Buttons */}
          <button
            onClick={scrollPrev}
            className="bg-red_preh_t hover:bg-black_preh group absolute top-1/2 left-0 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaChevronLeft className="text-black_preh group-hover:text-red_preh transition-all duration-300" />
          </button>

          <button
            onClick={scrollNext}
            className="bg-red_preh_t hover:bg-black_preh group absolute top-1/2 right-0 z-10 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
          >
            <FaChevronRight className="text-black_preh group-hover:text-red_preh transition-all duration-300" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Embla container */}
            <div className="flex gap-6">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="group min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] 2xl:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="inset-shadow-red_preh_t flex h-fit flex-col items-start gap-5 rounded-xl bg-white p-6 inset-shadow-sm max-sm:py-10">
                    <FaQuoteLeft className="text-red_preh text-6xl" />

                    <p className="text-2xl text-black">{review.review}</p>

                    <div className="mt-auto flex flex-row items-center gap-10">
                      <div className="bg-red_preh_t flex h-16 w-16 flex-row items-center justify-center rounded-full">
                        <BiUser className="text-5xl" />
                      </div>

                      <div className="flex flex-col items-start gap-3">
                        <p className="text-2xl font-bold text-black">
                          {review.name}
                        </p>

                        <p className="text-2xl text-black/80">{review.info}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
