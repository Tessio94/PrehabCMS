"use client";

import { SetStateAction, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const initialValues = {
  user: "",
  email: "",
  location: "",
  message: "",
  botfield: "",
  privacyAcknowledged: false,
};

const ContactForm = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: name === 'privacyAcknowledged' ? (e.target as HTMLInputElement).checked : value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Pogreška prilikom slanja zahtjeva!");
      }

      const result = await res.json();


      setFormValues(initialValues);
      setSuccess(true);
      setLoading(false);
      toast.success(result.message);
    } catch (err) {
      if (err instanceof Error) {
        setSuccess(false);
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="relative mt-5 flex w-full flex-col-reverse items-center justify-center gap-20 bg-slate-100 bg-[url(/images/zadar/slika1.jpg)] bg-cover bg-no-repeat px-10 pt-10 pb-10 sm:flex-row">
      <div className="from-black_preh via-black_preh/80 absolute inset-0 z-0 bg-linear-to-l to-transparent backdrop-blur-xs"></div>
      <div className="z-20 ml-auto w-[100%] sm:w-[55%] md:w-[40%]">
        <form
          className="flex flex-col gap-7"
          name="contact"
          onSubmit={handleSubmit}
        >
          <h6 className="font-oswald mb-3 text-center text-3xl font-bold text-slate-100 underline">
            Ispunite formu
          </h6>
          <input type="hidden" name="form-name" value="contact" />

          <input
            type="text"
            name="botfield"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            onChange={handleChange}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="user" className="font-oswald text-xl text-white">
              Ime i prezime
            </label>
            <input
              type="text"
              name="user"
              required
              maxLength={120}
              id="user"
              placeholder="Ime i prezime"
              className="rounded-lg bg-white px-5 py-2 text-lg outline-none"
              value={formValues.user}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-oswald text-xl text-white">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Vaš e-mail"
              className="rounded-lg bg-white px-5 py-2 text-lg outline-none"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="location"
              className="font-oswald text-xl text-white"
            >
              Lokacija (neobavezno)
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Zadar ili Biograd"
              className="rounded-lg bg-white px-5 py-2 text-lg outline-none"
              value={formValues.location}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-oswald text-xl text-white">
              Vaš zahtjev
            </label>
            <textarea
              name="message"
              required
              maxLength={3000}
              id="message"
              rows={6}
              className="rounded-lg bg-white px-5 py-2 text-lg outline-none"
              value={formValues.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <p className="text-sm text-white/80">Ne šaljite medicinske nalaze, dijagnoze ni druge zdravstvene podatke.</p>
          <label className="flex items-start gap-3 text-sm leading-6 text-white">
            <input type="checkbox" name="privacyAcknowledged" required checked={formValues.privacyAcknowledged} onChange={handleChange} className="mt-1 size-4 shrink-0 accent-red_preh" />
            <span>Upoznat/a sam s <Link href="/politika-privatnosti" target="_blank" className="underline">obavijesti o privatnosti</Link>.</span>
          </label>
          <button
            disabled={loading}
            type="submit"
            className="bg-red_preh font-oswald hover:text-red_preh hover:border-red_preh group mx-auto flex w-full items-center justify-center rounded-xl border-2 px-5 py-2 text-xl font-bold text-white transition-all duration-500 hover:border-2 hover:bg-slate-100"
          >
            {loading ? (
              <svg
                className="size-6 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Pošalji"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
