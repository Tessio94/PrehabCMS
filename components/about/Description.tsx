import { cn } from "@/lib/utils";
import Image from "next/image";
import Button from "../shared/Button";
import { FaArrowRight } from "react-icons/fa";

const features = [
  {
    card: "c1",
    title: "Personalizirani pristup terapiji",
    text: "Svoj profesionalni put u svijetu fizioterapije započeo sam u predivnom Zadru. S ponosom nosim titulu diplomiranog fizioterapeuta, koju sam stekao završetkom studija fizioterapije u Zagrebu. Moje stručno usavršavanje nikada ne prestaje, te se ponosno mogu pohvaliti mnogim certifikatima koji obuhvaćaju širok spektar fizioterapeutskih tehnika i pristupa.",
    image: "/images/masazni_stol.jpg",
    icon: "/images/ikone/massage-table.svg",
  },
  {
    card: "c2",
    title: "Edukacija i stalno usavršavanje",
    text: "Posjedujem duboko razumijevanje ljudskog tijela i mehanizama ozdravljenja, što mi omogućuje pružanje najkvalitetnije skrbi svojim pacijentima. Kroz godine rada, stekao sam neprocjenjivo iskustvo surađujući s sportskim klubovima poput Nogometnog kluba Rudeš, Nogometnog kluba Abeceda, KK Sonik Puntamika, Vaterpolskog kluba Zadar, te Plivačkog kluba Zadar.",
    image: "/images/utezi.jpg",
    icon: "/images/ikone/weight.svg",
  },
  {
    card: "c3",
    title: "Rehabilitacija i sportska priprema",
    text: "	Rad s vrhunskim mladim sportašima pružio mi je dragocjeno iskustvo i uvid u potrebe visokih performansi, a taj duh i posvećenost prenosim i na svakog pacijenta u svojoj privatnoj praksi. Ovdje u Prehabilitation Therapy Centeru, posvećujem se vašem zdravlju i dobrobiti, pružajući individualno prilagođene terapeutske tretmane.",
    icon: "/images/ikone/rehab.svg",
  },
];

const Description = () => {
  return (
    <section className="mx-auto px-6 py-10 md:px-10 lg:px-16" id="uvod">
      <div className="grid grid-cols-1 gap-10 p-10 max-md:p-0 max-md:py-10 lg:grid-cols-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "grid grid-cols-1 gap-6",
              feature.card !== "c3"
                ? "md:grid-cols-2 lg:col-span-6 2xl:col-span-5"
                : "md:grid-cols-1 lg:col-span-6 2xl:col-span-2",
            )}
          >
            {/* TEXT */}
            <div className="flex flex-col justify-start">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 p-3 text-red-500">
                <Image
                  src={feature.icon}
                  width={40}
                  height={40}
                  alt="grid image"
                />
              </div>

              <h3 className="font-oswald mb-4 text-3xl font-bold">
                {feature.title}
              </h3>

              <div className="mb-6 h-1 w-14 bg-red-500" />

              <p className="mb-2 leading-7 text-stone-600">{feature.text}</p>

              {index === 2 && (
                <Button type="red" href="zdravlje">
                  <span>Saznajte više</span>
                  <FaArrowRight className="transition-all duration-300 group-hover:translate-x-3" />
                </Button>
              )}
            </div>

            {/* IMAGE */}
            {feature.image && (
              <div className="shadow-red_preh_t relative min-h-[450px] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Description;
