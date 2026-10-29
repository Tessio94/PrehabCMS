"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiX } from "react-icons/fi";

import Usluga, { type Service } from "./Usluga";
import ServiceIcon from "../services/ServiceIcon";

export default function Usluge({ data }: { data: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section
      id="usluge"
      aria-labelledby="services-heading"
      className="text-black_preh scroll-mt-24 bg-slate-50 px-6 py-16 md:px-10 lg:px-16"
    >
      <div className="md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="font-inter text-red_preh mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Stručnost. Pokret. Ravnoteža.
            </p>
            <h2
              id="services-heading"
              className="font-oswald text-5xl font-medium sm:text-6xl"
            >
              Usluge za vaš <span className="text-red_preh">bolji pokret.</span>
            </h2>
          </div>
          <p className="font-inter max-w-sm text-base leading-relaxed text-slate-600">
            Svaki oporavak počinje razumijevanjem vaših potreba. Odaberite
            uslugu i saznajte kako vam možemo pomoći.
          </p>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((service) => (
            <Usluga key={service.id} usluga={service} onSelect={setSelected} />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-oswald text-xl">Niste sigurni odakle početi?</p>
            <p className="font-inter mt-1 text-sm text-slate-600">
              Javite nam se i zajedno pronađimo prvi korak.
            </p>
          </div>
          <Link
            href="/rezervacije"
            className="bg-black_preh hover:bg-red_preh focus-visible:outline-red_preh inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Rezervirajte termin
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="service-title"
        aria-describedby="service-description"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setSelected(null);
          }
        }}
        className="service-dialog text-black_preh backdrop:bg-black_preh/65 fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div className="relative p-7 sm:p-12">
            <button
              type="button"
              autoFocus
              aria-label="Zatvori detalje usluge"
              onClick={() => setSelected(null)}
              className="hover:text-red_preh focus-visible:outline-red_preh absolute top-5 right-5 rounded-full bg-slate-100 p-3 text-slate-600 hover:bg-red-50 focus-visible:outline-2"
            >
              <FiX className="size-5" />
            </button>
            <span className="text-red_preh mb-8 inline-flex size-24 items-center justify-center rounded-3xl bg-red-50">
              <ServiceIcon id={selected.iconId ?? selected.id} className="size-16" />
            </span>
            <p className="font-inter text-red_preh mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              Prehab · Naše usluge
            </p>
            <h2
              id="service-title"
              className="font-oswald pr-3 text-4xl font-medium sm:text-5xl"
            >
              {selected.name}
            </h2>
            <p
              id="service-description"
              className="font-inter mt-6 text-lg leading-relaxed text-slate-600"
            >
              {selected.description}
            </p>
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="font-inter mb-5 text-sm leading-relaxed text-slate-500">
                Imate pitanje o ovoj usluzi? Razgovarajmo o vašim potrebama.
              </p>
              <Link
                href={`/rezervacije?usluga=${encodeURIComponent(selected.slug || "")}`}
                onClick={() => setSelected(null)}
                className="bg-red_preh hover:bg-black_preh focus-visible:outline-red_preh inline-flex items-center gap-4 rounded-xl px-6 py-3.5 font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Dogovorite termin
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
