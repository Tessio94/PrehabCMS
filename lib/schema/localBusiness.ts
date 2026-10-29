import { WithContext, Organization } from "schema-dts";

export const localBusinessSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prehabilitation Therapy Center Zadar",
  alternateName: "Prehab Zadar",
  url: "https://prehabilitationtherapycenter.hr/",
  logo: "https://prehabilitationtherapycenter.hr/images/logo/ikona.png",
  image:
    "https://prehabilitationtherapycenter.hr/images/Nikola/prehab nikola.jpg",
};
