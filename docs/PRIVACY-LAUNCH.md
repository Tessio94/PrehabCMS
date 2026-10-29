# Privacy and legal review before accepting patient bookings

The Croatian privacy and imprint pages are working templates driven by **Postavke klinike i privatnost** in Payload. They do not by themselves establish GDPR compliance. The clinic must confirm that the wording matches its registered status, actual data processing and suppliers. Have the responsible privacy/legal professional review the final notice.

## Information the project could not infer

- Registered entity name, legal form, registered address, OIB and register number.
- Professional chamber, professional title, country of qualification, supervisory/licensing authority and applicable professional rules.
- Correct privacy contact and DPO contact if one is appointed.
- Actual hosting, database, email and backup suppliers, processing locations, processor agreements and any international transfers/safeguards.
- The applicable Article 6 basis and Article 9 condition for the clinic's treatment and appointment data, including relevant Croatian obligations and professional secrecy. Article 9(2)(h) must not simply be assumed to apply to every service in the original catalogue.
- Justified retention periods, backup/log retention, access procedures and the daily maintenance schedule.
- Any additional legal disclosures, complaint-handling details, VAT information and website accessibility obligations applicable to the clinic's legal form and services.

The existing public clinic email and location addresses were reused from the provided website. Verify them. No fictional company identifiers are published or seeded.

## Implemented measures

Reservations and inquiries are restricted to reception/administrators. Blog editors cannot view them. The booking form has no medical-history free text or patient uploads. Even the chosen service may reveal health information, so reservation records are treated as private. The checkbox acknowledges the notice; it is not a blanket consent or marketing permission. No marketing consent is bundled into booking.

The draft booking purpose uses GDPR Article 6(1)(b) for requested appointment arrangements. The clinic must enter its verified health-data basis and any necessary qualifications in the admin. If the clinic cannot rely on that legal basis for particular services, obtain advice and change both the notice and relevant collection workflow before enabling them.

A separate imprint page identifies the service provider. “Impressum” is not itself a GDPR requirement; provider identification obligations may arise under Croatian law, including Article 6 of the Electronic Commerce Act, depending on the service and entity. The page name is less important than accurate, readily accessible information.

The public site has no analytics/advertising tags and locally served fonts. Google Maps does not load before opt-in. If you add analytics, pixels, embedded video, social widgets or third-party appointment integrations, reassess consent and the notice before deploying them.

The software provides a configurable retention command. It does not schedule your host's cron, encrypt the hosting provider's disks, sign processor agreements, administer patient-rights requests or assess whether a DPIA/DPO is required. Do those operational tasks as applicable before launch. Keep the booking database separate from legally required clinical documentation.

## Official sources checked on 28 October 2026

- GDPR, including Articles 5, 6, 9, 12–14, 15–22, 28 and 32: https://eur-lex.europa.eu/eli/reg/2016/679/oj
- AZOP, transparency/privacy notices and the distinction from consent: https://azop.hr/informiranje-ispitanika-o-obradi-njegovih-osobnih-podataka-politika-privatnosti/
- AZOP, health-data processing guidance: https://azop.hr/obrada-osobnih-podataka-u-zdravstvu/
- AZOP, cookies guidance: https://azop.hr/kolacici-gdpr/
- Croatian Electronic Commerce Act, Article 6 provider information: https://narodne-novine.nn.hr/clanci/sluzbeni/2003_10_173_2504.html
- 2025 implementing legislation, Article 25 changes to specified Electronic Commerce Act provisions: https://narodne-novine.nn.hr/clanci/sluzbeni/full/2025_04_67_857.html

The initial operational retention setting is 180 days. It is configurable, and is **not** represented as a Croatian statutory patient-record retention requirement.
