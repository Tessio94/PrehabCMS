import Image from "next/image";

const Quote = () => {
  return (
    <section className="bg-black_preh py-8 md:px-10 lg:px-16">
      <div className="font-oswald mx-auto flex flex-col items-center justify-center gap-4 text-3xl sm:flex-row">
        <Image
          src="/images/logo/ikona.png"
          alt="logo"
          width={80}
          height={80}
          className="rounded max-lg:h-14 max-lg:w-14"
        />
        <h3 className="font-oswald flex items-center justify-center gap-3 py-10 text-wrap">
          <em className="quote bg-clip-text pr-5 text-center text-2xl text-transparent md:text-3xl lg:text-4xl">
            &quot;Započnite svoj put prema ozdravljenju sa prehabom&quot;
          </em>
        </h3>
        <Image
          src="/images/logo/ikona.png"
          alt="logo"
          width={80}
          height={80}
          className="rounded max-lg:h-14 max-lg:w-14"
        />
      </div>
    </section>
  );
};

export default Quote;
