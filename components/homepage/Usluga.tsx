"use client";

import { FiArrowUpRight } from "react-icons/fi";
import ServiceIcon from "../services/ServiceIcon";

export type Service = {
  id: number;
  iconId?: number;
  slug?: string;
  name: string;
  img: string;
  description: string;
  imageDesc: string;
};

export default function Usluga({
  usluga,
  onSelect,
}: {
  usluga: Service;
  onSelect: (service: Service) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(usluga)}
      aria-haspopup="dialog"
      className="service-card group text-black_preh hover:border-red_preh/30 hover:shadow-black_preh/5 focus-visible:outline-red_preh flex h-full w-full flex-col items-start rounded-3xl border-2 border-slate-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none sm:p-7"
    >
      <span className="mb-7 flex w-full items-start justify-between gap-3">
        <span className="text-red_preh group-hover:bg-red_preh inline-flex size-16 items-center justify-center rounded-2xl bg-red-50 transition-colors group-hover:text-white">
          <ServiceIcon id={usluga.iconId ?? usluga.id} className="size-12" />
        </span>
      </span>
      <span className="font-oswald text-2xl leading-snug font-medium">
        {usluga.name}
      </span>
      <span className="font-inter mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {usluga.description}
      </span>
      <span className="text-red_preh mt-auto flex w-full items-center justify-between gap-3 pt-6 text-sm font-semibold">
        Otkrijte više
        <FiArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
      </span>
    </button>
  );
}
