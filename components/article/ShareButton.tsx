"use client";

import { useState } from "react";
import { FaLink } from "react-icons/fa";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      "https://prehabilitationtherapycenter.hr/zdravlje/skolioza-kamp",
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <button onClick={handleCopy} className="group cursor-pointer">
        <FaLink className="text-black_preh text-2xl transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600" />
      </button>
      {copied && (
        <div className="absolute top-1/2 left-0 -translate-x-1/2 translate-y-1/2 rounded-xl bg-slate-200 px-3 py-1 text-sm whitespace-nowrap text-black">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
