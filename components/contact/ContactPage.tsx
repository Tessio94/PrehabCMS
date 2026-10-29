"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import Intro from "@/components/contact/Intro";
import Info from "@/components/contact/Info";
import Location from "@/components/contact/Location";
import ContactForm from "@/components/contact/ContactForm";

const ContactPage = ({ formEnabled, phone }: { formEnabled: boolean; phone: string }) => {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: success ? "#22c55e" : "#ef4444",
            border: success ? "2px solid #22c55e" : "2px solid #ef4444",
          },
        }}
      />
      <Intro />
      <Info />
      <Location />
      {formEnabled ? <ContactForm setSuccess={setSuccess} /> : <div className="bg-slate-100 px-6 py-12 text-center text-slate-600">Online obrazac trenutačno nije dostupan. Nazovite <a className="font-semibold text-red_preh underline" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>.</div>}
    </>
  );
};

export default ContactPage;
