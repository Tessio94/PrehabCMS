"use client";
import type { Service } from "./Usluga";

import { useEffect, useState } from "react";
import Main from "@/components/homepage/Main";
import Quote from "@/components/homepage/Quote";
import HomeProfile from "@/components/homepage/HomeProfile";
import Intro from "@/components/homepage/Intro";
import Usluge from "@/components/homepage/Usluge";
import Cjenik from "@/components/homepage/Cjenik";
import Trening from "@/components/homepage/Trening";
import Suradnje from "@/components/homepage/Suradnje";
import { FaArrowUp } from "react-icons/fa";
import Cover from "@/components/homepage/Cover";
import Image from "next/image";

const LandingPage = ({ services }: { services: Service[] }) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-700 ${
          loaded && minTimePassed
            ? "pointer-events-none translate-y-[-100%] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {/* BACK LOGO */}
        <div className="absolute flex items-center justify-center">
          <Image
            src="/images/logo/ikona3.svg"
            alt="Prehab ikona"
            width={240}
            height={240}
            className="border-red_preh rounded-2xl border-2 opacity-15"
          />
        </div>

        {/* FILLING LOGO */}
        <div className="logo-fill-wrapper absolute flex items-center justify-center">
          <Image
            src="/images/logo/ikona3.svg"
            alt="Prehab ikona"
            width={240}
            height={240}
            className="logo-fill border-red_preh rounded-2xl border-2"
          />
        </div>
      </div>

      {showScrollToTop && (
        <div
          onClick={scrollToTop}
          className="bg-red_preh/35 fixed right-2 bottom-5 z-50 flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-xl p-3"
        >
          <FaArrowUp className="text-red_preh text-5xl" />
        </div>
      )}
      <Cover setLoaded={setLoaded} />
      <Main />
      <HomeProfile />
      <Intro />
      <Quote />
      <Usluge data={services} />
      <Cjenik />
      <Trening />
      <Suradnje />
    </>
  );
};

export default LandingPage;
