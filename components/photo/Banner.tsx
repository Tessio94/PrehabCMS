import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

const Banner = ({
  color = "#c70808",
  buttonColor = "#121a29",
  headerColor = "#ffffff",
}) => {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-16">
      <div className="px-10 max-md:px-0">
        <div
          className="flex flex-col items-center justify-between gap-6 rounded-xl border-2 p-4 sm:gap-10 sm:p-8 xl:flex-row xl:p-10"
          style={{ backgroundColor: color, borderColor: buttonColor }}
        >
          <div className="flex flex-row items-center sm:gap-6 lg:gap-10">
            <div
              className="to-red_preh from-red_preh rounded-full border-2 bg-linear-to-bl via-slate-100 p-6 max-sm:hidden"
              style={{ borderColor: buttonColor }}
            >
              <IoCalendarOutline
                className="text-6xl"
                style={{ color: buttonColor }}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <p
                className="text-3xl font-semibold"
                style={{ color: headerColor }}
              >
                Želite i vi biti dio naše priče?
              </p>
              <p className="text-xl text-white/80">
                Rezervirajte termin i započnite svoj put prema boljem zdravlju!
              </p>
            </div>
          </div>

          <Link
            className="font-inter group flex shrink-0 flex-row items-center gap-2 rounded-lg px-5 py-3 sm:gap-3"
            style={{ backgroundColor: buttonColor }}
            href="/kontakt"
          >
            <span className="text-xl font-semibold text-white sm:text-2xl">
              Kontaktirajte nas
            </span>
            <FaArrowRight className="text-center text-2xl text-white transition-all duration-300 group-hover:translate-x-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
