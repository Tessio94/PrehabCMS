"use client";

import { cardsGalleryVariants } from "@/lib/animation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HomeProfile = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const inView1 = useInView(ref1, { once: true, amount: 0.6 });
  const inView2 = useInView(ref2, { once: true, amount: 0.6 });
  const inView3 = useInView(ref3, { once: true, amount: 0.6 });

  return (
    <section className="relative z-20 px-6 pt-16 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 items-stretch gap-4 p-10 max-md:p-0 max-md:pt-10 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="border-red_preh_t shadow-black_preh/40 flex h-full flex-col items-center gap-4 rounded-lg border-2 bg-slate-100/80 px-5 py-3 shadow-xl xl:h-[12rem] xl:flex-row xl:justify-between"
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "show" : "hidden"}
          variants={cardsGalleryVariants}
        >
          <div className="rounded-custom_radius aspect-square h-full w-full basis-1/2 overflow-hidden bg-[url(/images/Nikola/O_nikoli_2.jpg)] bg-cover bg-position-[0_30%] bg-no-repeat max-[1550px]:bg-position-[10%_30%] max-[1450px]:bg-position-[20%_30%] max-xl:max-h-60 max-xl:grow max-sm:max-h-80"></div>
          <div className="flex flex-col items-start gap-2 xl:basis-[45%]">
            <h3 className="font-oswald text-red_preh text-3xl font-semibold">
              Nikola Lukić
            </h3>
            <p className="font-oswald text-xl font-medium">bacc. Physioth.</p>
          </div>
        </motion.div>
        <motion.div
          className="border-red_preh_t shadow-black_preh/40 flex h-full flex-col items-center gap-4 rounded-lg border-2 bg-slate-100/80 px-5 py-3 shadow-xl xl:h-[12rem] xl:flex-row xl:justify-between"
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "show" : "hidden"}
          variants={cardsGalleryVariants}
        >
          <div className="rounded-custom_radius aspect-square h-full w-full basis-1/2 overflow-hidden bg-[url(/images/Nikola/masazni_stol_1.jpg)] bg-cover bg-position-[10%_20%] bg-no-repeat max-[1550px]:bg-position-[20%_20%] max-[1450px]:bg-position-[30%_20%] max-xl:max-h-60 max-xl:grow max-sm:max-h-80"></div>
          <div className="flex flex-col items-start gap-2 xl:basis-[45%]">
            <h3 className="font-oswald text-red_preh text-3xl font-semibold">
              Radno vrijeme:
            </h3>
            <p className="font-oswald text-xl font-medium">pon-pet: 08-16 h</p>
            <em className="text-sm">*po dogovoru</em>
          </div>
        </motion.div>
        <motion.div
          className="border-red_preh_t shadow-black_preh/40 flex h-full w-full flex-col items-center gap-4 rounded-lg border-2 bg-slate-100/80 px-5 py-3 shadow-xl max-lg:col-span-2 max-lg:mx-auto max-lg:w-[45%] max-sm:col-span-1 max-sm:w-full xl:h-[12rem] xl:flex-row xl:justify-between"
          ref={ref3}
          initial="hidden"
          animate={inView3 ? "show" : "hidden"}
          variants={cardsGalleryVariants}
        >
          <div className="rounded-custom_radius aspect-square h-full w-full basis-1/2 overflow-hidden bg-[url(/images/Nikola/visnjik_1.jpg)] bg-cover bg-position-[10%_20%] bg-no-repeat max-[1550px]:bg-position-[20%_20%] max-[1450px]:bg-position-[30%_20%] max-xl:max-h-60 max-xl:grow max-sm:max-h-80"></div>
          <div className="flex flex-col items-start gap-2 xl:basis-[45%]">
            <h3 className="font-oswald text-red_preh text-3xl font-semibold">
              Lokacije:
            </h3>
            <p className="font-oswald text-xl font-medium">Splitska ulica 3</p>
            <p className="font-oswald text-xl font-medium">Bukovačka 15</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProfile;
