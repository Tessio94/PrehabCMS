const Intro = () => {
  return (
    <section className="bg-slate-100">
      <div className="flex w-full flex-col px-6 py-16 md:px-10 lg:px-16 xl:flex-row">
        <div className="flex flex-col items-start gap-6 p-10 max-md:px-0 max-md:py-10">
          <h1 className="text-red_preh text-semibold font-oswald text-4xl max-[400px]:text-4xl">
            Naš blog
          </h1>
          <h2 className="after:bg-red_preh font-oswald relative text-6xl font-bold after:absolute after:top-[110%] after:left-0 after:h-2 after:w-20 after:rounded-2xl max-[400px]:text-5xl sm:text-7xl xl:text-6xl 2xl:text-7xl">
            Savjeti, znanje i inspiracija za{" "}
            <span className="text-red_preh">zdraviji život.</span>
          </h2>
          <p className="text-semibold font-inter mt-5 text-3xl text-black max-[400px]:text-2xl">
            Istražite stučne članke, praktične savjete i najnovije informacije
            iz svijeta fizioterapije, rehabilitacije i zdravog načina života
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
