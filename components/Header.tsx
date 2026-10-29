"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BiMailSend } from "react-icons/bi";

const navLinks = [
  { href: "/", label: "Naslovnica" },
  { href: "/o-nama", label: "O nama" },
  { href: "/zdravlje", label: "Zdravlje" },
  { href: "/fotogalerija", label: "Fotogalerija" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/rezervacije", label: "Rezervacije" },
];

const Header = () => {
  const [hambActive, setHambActive] = useState(false);

  const pathname = usePathname();

  return (
    <header
      className={cn(
        "w-full",
        pathname === "/" || pathname.startsWith("/zdravlje/")
          ? "absolute"
          : "relative z-100",
      )}
    >
      {/* LOGO */}
      <div
        className={cn(
          "relative z-50 flex w-full items-center justify-between px-6 pt-9.5 transition-all duration-500 max-[1750px]:pt-8 max-[1650px]:pt-7.5 max-[1400px]:pt-5.5 max-[1200px]:pt-4.5 max-[1024px]:pt-10 max-[950px]:pt-7 max-[700px]:pt-6.5 max-[680px]:pt-5.5 sm:px-10",
          pathname === "/" || pathname.startsWith("/zdravlje/")
            ? "bg-transparent"
            : pathname !== "/fotogalerija"
              ? "bg-slate-100/80"
              : "bg-[url(/images/logo/background.png)]",
        )}
        // ref={navbar}
      >
        <Image
          className="absolute top-0 right-0 left-0 hidden lg:block"
          src="/images/navbar24.png"
          alt="logo"
          width={1952}
          height={150}
        />
        <Image
          className="absolute top-0 right-0 left-0 hidden max-[600px]:hidden! max-lg:block"
          src="/images/navbar24_small2.png"
          alt="logo"
          width={1952}
          height={150}
        />
        <Image
          className="absolute top-0 right-0 left-0 hidden max-[600px]:block"
          src="/images/navbar24_small3.png"
          alt="logo"
          width={1952}
          height={150}
        />

        <Link
          onClick={() => setHambActive(false)}
          href="/"
          className="z-100 flex items-center gap-4"
        >
          <Image
            src="/images/logo/ikona.png"
            alt="logo"
            width={80}
            height={80}
            priority
            className="border-red_preh_t h-20 w-20 rounded-xl border-[2px] shadow-2xl max-[1650px]:h-16 max-[1650px]:w-16 max-[1200px]:h-14 max-[1200px]:w-14 max-[1024px]:h-20 max-[1024px]:w-20 max-[700px]:h-14! max-[700px]:w-14! max-[600px]:hidden max-md:h-16 max-md:w-16"
          />

          <h1
            className={cn(
              "font-oswald text-[27px] font-bold max-[1024px]:hidden min-[1650px]:text-3xl",
              pathname === "/" || pathname.startsWith("/zdravlje/")
                ? "text-slate-100"
                : "text-black_preh",
            )}
          >
            Prehab
          </h1>
        </Link>
        {/* NAVIGATION */}
        <nav className="max-[1200px]:hidden">
          <ul
            // ref={dropdown}
            className="font-oswald z-10 flex max-[1100px]:-mt-1 max-[1024px]:mr-25 max-[950px]:-mt-4 max-[950px]:mr-15 max-[850px]:mr-5 max-[800px]:mr-0 md:relative md:top-0 md:left-0 md:h-fit md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-5 md:bg-transparent md:p-0 md:text-base md:text-xl lg:gap-6 lg:text-xl lg:font-medium xl:gap-8"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isZdravlje =
                link.href === "/zdravlje" && pathname.startsWith("/zdravlje");

              return (
                <li key={link.href}>
                  <Link
                    onClick={() => setHambActive(false)}
                    href={link.href}
                    className={cn(
                      "font-oswald relative transition-all duration-500 before:absolute before:bottom-[-0.2rem] before:left-0 before:h-0.5 before:w-0 before:bg-stone-300 before:transition-all before:duration-500",
                      isActive || isZdravlje
                        ? "text-red_preh underline"
                        : "text-stone-100 hover:text-stone-400 hover:before:w-full",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CONTACT + SOCIAL */}
        <div className="z-50 hidden flex-col items-center justify-center gap-3 max-[1650px]:gap-2 min-[1200px]:flex">
          <div className="text-md">
            <a
              href="tel:+385959064240"
              className={cn(
                "flex items-center gap-2 font-medium",
                pathname === "/" || pathname.startsWith("/zdravlje/")
                  ? "text-slate-100"
                  : "text-black_preh",
              )}
            >
              <BsTelephone />
              +385 95 906 4240
            </a>
          </div>

          <ul
            className={cn(
              "text-md flex gap-3",
              pathname === "/" || pathname.startsWith("/zdravlje/")
                ? "text-slate-100"
                : "text-black_preh",
            )}
          >
            <li className="cursor-pointer text-xl transition-all duration-500 hover:scale-125 hover:text-stone-400">
              <a
                href="https://www.facebook.com/prehabilitationtherapycenter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            </li>

            <li className="cursor-pointer text-xl transition-all duration-500 hover:scale-125 hover:text-stone-400">
              <a
                href="https://www.instagram.com/prehabcentar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
        {/* Mobile navigation */}
        {/* ------------------mobile navigation---------------------------- */}
        <div className="ml-auto block rounded-2xl p-2 min-[1200px]:hidden">
          <div
            className="relative z-50 -mt-3 h-[30px] w-12.5 rotate-0 cursor-pointer transition-all duration-300 ease-in-out max-[700px]:-mt-3 max-[600px]:mt-3 max-[450px]:mt-1 max-[400px]:mt-0 max-[380px]:-mt-1.5"
            onClick={() => setHambActive((prev) => !prev)}
          >
            <span
              className={cn(
                "transition-300 border-theme1 absolute left-0 block h-[4px] w-full rounded-[9px] border bg-slate-100 transition-all ease-in-out",
                hambActive ? "top-[13px] rotate-135" : "top-0 rotate-0",
              )}
            ></span>
            <span
              className={cn(
                "transition-300 border-theme1 absolute top-[13px] block h-[4px] w-full rotate-0 rounded-[9px] border bg-slate-100 transition-all ease-in-out",
                hambActive ? "-left-[60px] opacity-0" : "left-0 opacity-100",
              )}
            ></span>
            <span
              className={cn(
                "transition-300 border-theme1 absolute left-0 block h-[4px] w-full rounded-[9px] border bg-slate-100 transition-all ease-in-out",
                hambActive ? "top-[13px] -rotate-135" : "top-[26px] rotate-0",
              )}
            ></span>
          </div>
        </div>
        <nav
          className={cn(
            "border-theme3 bg-theme4 fixed top-0 bottom-0 left-0 z-9999 w-[300px] border-r-2 bg-contain bg-repeat shadow-[inset_-50px_0_50px_-50px_var(--theme3)] transition-all duration-300 max-[410px]:w-[260px] sm:w-[330px] min-[1200px]:hidden",
            hambActive ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="from-black_preh to-red_preh absolute inset-0 -z-10 bg-linear-to-r" />

          <div className="scrollbar-slate flex h-full max-h-screen flex-col justify-between gap-15 overflow-y-auto pt-6 pb-12">
            <div className="flex flex-col items-start gap-10">
              <Link
                onClick={() => setHambActive(false)}
                href="/"
                className="z-100 flex items-center gap-4 px-3"
              >
                <Image
                  src="/images/logo/ikona.png"
                  alt="logo"
                  width={80}
                  height={80}
                  priority
                  className="border-red_preh_t h-20 w-20 rounded-xl border-[2px] shadow-2xl"
                />

                <h1
                  className=
                    "font-oswald text-[27px] font-bold max-[1024px]:hidden min-[1650px]:text-3xl text-slate-100">
                  Prehab
                </h1>
              </Link>
              <ul className="flex flex-col gap-6 px-3 text-2xl">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const isZdravlje =
                    link.href === "/zdravlje" &&
                    pathname.startsWith("/zdravlje");

                  return (
                    <li key={link.href}>
                      <Link
                        onClick={() => setHambActive(false)}
                        href={link.href}
                        className={cn(
                          "font-oswald relative transition-all duration-500 before:absolute before:bottom-[-0.2rem] before:left-0 before:h-0.5 before:w-0 before:bg-stone-300 before:transition-all before:duration-500",
                          isActive || isZdravlje
                            ? "text-red_preh underline"
                            : "text-stone-100 hover:text-stone-400 hover:before:w-full",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <div className="px-3 py-1 transition-all duration-500">
                <a
                  href="tel:+385959064240"
                  className="flex cursor-pointer items-center gap-2 text-lg tracking-wider text-slate-100 capitalize sm:text-xl"
                >
                  <BsTelephone className="shrink-0 text-2xl text-slate-100 sm:text-3xl" />
                  +385 95 906 4240
                </a>
              </div>
              <div className="px-3 py-1 transition-all duration-500">
                <a
                  href="mailto:nikola.lukic.993@gmail.com"
                  className="flex cursor-pointer items-center gap-2 break-all text-sm text-slate-100"
                >
                  <BiMailSend className="shrink-0 text-2xl text-slate-100 sm:text-3xl" />
                  nikola.lukic.993@gmail.com
                </a>
              </div>

              <div className="ml-3 flex w-fit items-center gap-3 rounded-4xl bg-slate-100 px-5 py-2">
                <a
                  href="https://www.instagram.com/prehabcentar/"
                  target="_blank"
                  className="group text-2xl text-pink-600"
                >
                  <FaInstagram className="transition-all duration-300 group-hover:scale-120" />
                </a>
                <a
                  href="https://www.facebook.com/prehabilitationtherapycenter"
                  target="_blank"
                  className="group text-2xl text-blue-600"
                >
                  <FaFacebook className="transition-all duration-300 group-hover:scale-120" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
