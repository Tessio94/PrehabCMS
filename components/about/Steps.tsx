const Steps = () => {
  return (
    <section className="bg-white px-6 py-10 md:px-10 lg:px-16">
      <div className="flex flex-col items-center justify-between gap-15 p-10 max-md:p-0 max-md:py-10 xl:flex-row">
        <div className="flex flex-col items-center gap-5 xl:max-w-[280px] xl:items-start">
          <p className="font-oswald text-red_preh text-xl font-semibold uppercase">
            Naš pristup
          </p>
          <p className="font-oswald relative text-4xl font-bold text-black">
            Put do vašeg oporavka
          </p>
          <p className="font-inter mt-4 text-start text-xl text-black">
            Sustavan i provjeren proces koji osigurava siguran povratak pokretu
            i aktivnostima koje volite..
          </p>
        </div>
        <div className="flex flex-row items-start overflow-hidden max-lg:flex-wrap max-lg:gap-y-10 max-sm:gap-y-0">
          <div className="relative flex flex-col items-center gap-5 border-r border-white p-2 max-lg:w-1/2 max-lg:overflow-hidden max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10">
            <div className="border-l-red_preh_t absolute top-[33px] right-0 h-0 w-0 border-t-[16px] border-b-[16px] border-l-[24px] border-t-transparent border-b-transparent max-sm:hidden"></div>
            <div className="font-oswald bg-red_preh after:border-red_preh_t relative z-20 flex h-20 w-20 items-center justify-center rounded-full p-3 text-6xl font-semibold text-white after:absolute after:top-1/2 after:right-0.5 after:h-0 after:w-1000 after:translate-x-full after:border-t-2 after:border-dashed after:max-sm:hidden">
              1
            </div>
            <p className="text-center text-2xl font-semibold text-black">
              Procjena
            </p>
            <p className="text-center text-2xl text-black">
              Detaljna analiza vašeg stanja, potreba i ciljeva kako bismo
              razumjeli vaš problem.
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-5 overflow-hidden border-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10 lg:border-r">
            <div className="border-l-red_preh_t absolute top-[33px] right-0 hidden h-0 w-0 border-t-[16px] border-b-[16px] border-l-[24px] border-t-transparent border-b-transparent max-sm:hidden lg:block"></div>
            <div className="font-oswald bg-red_preh after:border-red_preh_t relative z-20 flex h-20 w-20 items-center justify-center rounded-full p-3 text-6xl font-semibold text-white after:absolute after:top-1/2 after:right-0.5 after:-z-10 after:h-0 after:w-100 after:border-t-2 after:border-dashed after:max-sm:hidden after:lg:hidden">
              2
            </div>
            <p className="text-center text-2xl font-semibold text-black">
              Plan terapije
            </p>
            <p className="text-center text-2xl text-black">
              Kreiramo personaliziran plan terapije prilagošen vašem tijelu,
              životnon stilu i ciljevima.
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-5 border-r border-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:border-b max-sm:py-10">
            <div className="border-l-red_preh_t absolute top-[33px] right-0 h-0 w-0 border-t-[16px] border-b-[16px] border-l-[24px] border-t-transparent border-b-transparent max-sm:hidden"></div>
            <div className="font-oswald bg-red_preh after:border-red_preh_t relative z-20 flex h-20 w-20 items-center justify-center rounded-full p-3 text-6xl font-semibold text-white after:absolute after:top-1/2 after:right-0.5 after:-z-10 after:h-0 after:w-100 after:translate-x-full after:border-t-2 after:border-dashed after:max-sm:hidden after:lg:hidden">
              3
            </div>
            <p className="text-center text-2xl font-semibold text-black">
              Provedba
            </p>
            <p className="text-center text-2xl text-black">
              Kroz stručne tretmane i vježbe radimo na obnovi pokretljivosti,
              snage i funkcionalnosti.
            </p>
          </div>
          <div className="z-30 flex flex-col items-center gap-5 overflow-hidden bg-white p-2 max-lg:w-1/2 max-sm:w-full max-sm:border-r-0 max-sm:py-10">
            <div className="font-oswald bg-red_preh after:border-red_preh_t relative z-30 flex h-20 w-20 items-center justify-center rounded-full p-3 text-6xl font-semibold text-white after:absolute after:top-1/2 after:right-0.5 after:-z-10 after:h-0 after:w-100 after:border-t-2 after:border-dashed after:max-sm:hidden">
              4
            </div>
            <p className="text-center text-2xl font-semibold text-black">
              Praćenje i napredak
            </p>
            <p className="text-center text-2xl text-black">
              Pratimo vaš napredak i prilagođavamo plan kako bismo osigurali
              najbolje moguće rezultate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
