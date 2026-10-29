import Image from "next/image";

const Suradnje = () => {
  return (
    <section
      id="suradnje"
      className="bg-slate-100/80 px-6 py-16 md:px-10 lg:px-16"
    >
      <div className="px-10 max-md:p-0 max-md:py-10">
        <h2 className="font-oswald text-red_preh mb-10 text-5xl">Suradnje</h2>
        <div className="grid grid-cols-5 gap-7 max-[1700px]:grid-cols-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="group border-red_preh relative aspect-video overflow-hidden rounded-xl border-4">
            <Image
              src="/images/suradnje/NkRudes.jpg"
              fill
              alt="NK Rudeš"
              loading="lazy"
            />
            <div className="from-red_preh_t font-oswald absolute top-0 right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t to-black text-3xl font-bold text-white transition-all duration-1000 group-hover:translate-y-0">
              NK Rudeš
            </div>
          </div>
          <div className="group border-red_preh relative aspect-video overflow-hidden rounded-xl border-4">
            <Image
              src="/images/suradnje/abeceda.jpg"
              fill
              alt="NK Abeceda"
              loading="lazy"
            />
            <div className="from-red_preh_t font-oswald absolute top-0 right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t to-black text-3xl font-bold text-white transition-all duration-1000 group-hover:translate-y-0">
              NK Abeceda
            </div>
          </div>
          <div className="group border-red_preh relative aspect-video overflow-hidden rounded-xl border-4">
            <Image
              src="/images/suradnje/sonik.jpg"
              fill
              alt="KK Aleta Puntamika"
              loading="lazy"
            />
            <div className="from-red_preh_t font-oswald absolute top-0 right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t to-black text-xl font-bold text-white transition-all duration-1000 group-hover:translate-y-0">
              KK Aleta Puntamika
            </div>
          </div>
          <div className="group border-red_preh relative aspect-video overflow-hidden rounded-xl border-4">
            <Image
              src="/images/suradnje/plivacki-klub-zadar.jpg"
              fill
              alt="PK Zadar"
              loading="lazy"
            />
            <div className="from-red_preh_t font-oswald absolute top-0 right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t to-black text-3xl font-bold text-white transition-all duration-1000 group-hover:translate-y-0">
              PK Zadar
            </div>
          </div>
          <div className="group border-red_preh relative aspect-video overflow-hidden rounded-xl border-4">
            <Image
              src="/images/suradnje/vaterpolo-klub-zadar.jpg"
              fill
              alt="VK Zadar"
              loading="lazy"
            />
            <div className="from-red_preh_t font-oswald absolute top-0 right-0 bottom-0 left-0 flex translate-y-full items-center justify-center bg-gradient-to-t to-black text-3xl font-bold text-white transition-all duration-1000 group-hover:translate-y-0">
              VK Zadar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suradnje;
