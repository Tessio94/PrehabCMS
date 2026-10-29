"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Option = {
  label: string;
  tab: string;
};

const Options = ({ data }: { data: Option[] }) => {
  const [tabs, setTabs] = useState("t1");

  return (
    <section className="px-6 pt-10 md:px-10 lg:px-16" id="galerija">
      <div className="flex flex-row flex-wrap items-center justify-start gap-5 rounded-xl px-10 max-md:px-0 md:gap-6 xl:gap-8">
        {data.map((option, i) => (
          <div
            className={cn(
              "border-red_preh_t font-inter cursor-pointer rounded-xl border px-5 py-3 text-2xl transition-all duration-300",
              tabs === option.tab
                ? "bg-red_preh text-slate-100"
                : "hover:bg-red_preh_t text-red_preh bg-slate-100/80",
            )}
            onClick={() => setTabs(option.tab)}
            key={i}
          >
            {option.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Options;
