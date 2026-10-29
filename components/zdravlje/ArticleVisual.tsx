import { FiActivity, FiRadio, FiCpu } from "react-icons/fi";
import type { HealthArticle } from "@/data/articles";

export default function ArticleVisual({
  visual,
}: {
  visual: HealthArticle["visual"];
}) {
  const Icon =
    visual === "pemf" ? FiRadio : visual === "robot" ? FiCpu : FiActivity;
  return (
    <div
      aria-hidden="true"
      className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden ${visual === "pemf" ? "bg-[#152c3a]" : visual === "robot" ? "bg-[#3b1824]" : "bg-black_preh"}`}
    >
      <div className="absolute size-64 rounded-full border border-white/10" />
      <div className="absolute size-44 rounded-full border border-white/15" />
      <div className="relative flex size-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-white">
        <Icon className="size-12" strokeWidth={1.2} />
      </div>
      <span className="font-inter absolute bottom-5 left-6 text-xs font-medium tracking-[0.22em] text-white/75 uppercase">
        {visual === "pemf"
          ? "Pulsno elektromagnetsko polje"
          : visual === "robot"
            ? "448 kHz · Radiofrekvencija"
            : "Edukacija · Pokret"}
      </span>
    </div>
  );
}
