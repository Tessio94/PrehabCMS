import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

const Button = ({
  children,
  type,
  href,
}: {
  children: ReactNode;
  type: string;
  href: string;
}) => {
  const base =
    "flex flex-row gap-1 items-center justify-center text-stone-50 px-4 py-2 max-[850px]:py-1 max-[850px]:px-3 rounded-lg text-lg  border-2 font-oswald font-medium shadow-lg tracking-wide transition-colors duration-300  focus:ring  focus:ring-offset-2 disabled:cursor-not-allowed  outline-none hover:border-2 hover:shadow-lg  w-fit group";

  return (
    <Link
      className={cn(
        base,
        type === "red" &&
          "bg-red_preh hover:border-red_preh hover:text-red_preh focus:ring-red_preh !w-[190px] hover:bg-stone-50 hover:shadow-red-300 focus:ring",
        type === "black" &&
          "cursor bg-black_preh hover:border-black_preh hover:text-black_preh focus:ring-black_preh hover:shadow-black_preh/60 !w-[190px] hover:bg-stone-50",
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
