"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="relative z-10 h-screen max-h-screen min-h-screen w-full bg-[url(/images/Nikola/cover4.png)] max-lg:bg-position-[20%] max-md:bg-position-[30%] max-sm:bg-position-[55%] min-[1920px]:bg-cover">
      <div className="from-black_preh/90 to-black_preh/20 absolute inset-0 -z-10 bg-linear-to-r backdrop-blur-xs" />
      <div className="absolute top-1/2 z-20 flex w-full -translate-y-1/2 flex-col items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-18 lg:py-26">
        <motion.span
          className="text-red_preh font-oswald text-center text-8xl font-bold max-[1500px]:text-7xl max-[750px]:text-6xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          404
        </motion.span>
        <Link href="/">
          <Image
            src="/images/logo/ikona3.svg"
            width={150}
            height={150}
            alt="ikona Prehab"
            className="border-red_preh rounded-xl border-2"
          />
        </Link>
        <motion.h1
          className="font-inter text-center text-5xl font-bold text-slate-100 max-[1500px]:text-4xl max-[750px]:text-3xl max-[450px]:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Stranica koju ste zatražili nije pronađena
        </motion.h1>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/"
            className="bg-red_preh hover:slate-100 font-oswald hover:border-red_preh hover:text-red_preh mt-5 rounded-xl border-2 border-slate-100 px-5 py-2 text-3xl font-semibold text-slate-100 transition-all duration-300 hover:bg-slate-100 max-[1400px]:px-3 max-[1400px]:py-1 max-[640px]:text-2xl"
          >
            Naslovnica
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
