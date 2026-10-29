import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
export type HealthArticle = {
  coverImage?: string;
  coverAlt?: string;
  publishedAt?: string;
  authorName?: string;
  event?: { location?: string | null; dateLabel?: string | null; duration?: string | null; contact?: string | null };
  slug: string;
  title: string;
  bgColor?: string;
  category: string;
  excerpt: string;
  readTime: string;
  visual: "pemf" | "robot" | "camp";
  sections: {
    body?: SerializedEditorState;
    title: string;
    paragraphs: string[];
    points?: string[];
    sources?: number[];
  }[];
  sources: { label: string; url: string }[];
};

export const healthArticles: HealthArticle[] = [
  {
    slug: "pemf-terapija",
    title: "PEMF terapija: pulsno elektromagnetsko polje u rehabilitaciji",
    category: "Fizikalna terapija",
    excerpt:
      "Što je PEMF, kako izgleda tretman i što istraživanja govore o njegovoj ulozi u smanjenju boli i poboljšanju funkcije?",
    readTime: "4 min čitanja",
    visual: "pemf",
    sections: [
      {
        title: "Što je PEMF terapija?",
        paragraphs: [
          "PEMF je kratica za terapiju pulsirajućim elektromagnetskim poljem. Uređaj putem aplikatora stvara vremenski promjenjivo magnetsko polje koje djeluje na odabrano područje tijela. Tretman je neinvazivan i razmatra se kao dopuna drugim postupcima rehabilitacije.",
          "PEMF nije isto što i elektrostimulacija mišića. Ne treba očekivati da će osjećaj snažnog podražaja biti pokazatelj uspješnosti: doživljaj tretmana ovisi o uređaju i njegovim postavkama.",
        ],
        sources: [1],
      },
      {
        title: "Kada se razmatra i što pokazuju istraživanja?",
        paragraphs: [
          "PEMF se istražuje kod različitih mišićno-koštanih tegoba, osobito osteoartritisa koljena. U randomiziranom istraživanju iz 2025. dodavanje PEMF-a fizikalnoj terapiji poboljšalo je neke pokazatelje boli, ukočenosti i funkcije u usporedbi s lažnim tretmanom.",
          "Ipak, novija metaanaliza pokazuje neujednačene rezultate. Učinak ovisi o vremenu mjerenja i parametrima uređaja, a statističko poboljšanje ne mora značiti primjetnu promjenu u svakodnevnom životu. Razlike među protokolima i rizik pristranosti ograničavaju sigurnost zaključaka. PEMF zato nije jamstvo oporavka niti zamjena za ciljane vježbe i plan liječenja.",
        ],
        sources: [2, 3],
      },
      {
        title: "Kako izgleda dolazak na tretman?",
        paragraphs: [
          "Prije odluke o primjeni razgovara se o tegobama, zdravstvenoj povijesti i ciljevima rehabilitacije. Terapeut procjenjuje je li postupak primjeren, odabire aplikator i postavke te objašnjava što možete očekivati. Tijekom primjene nalazite se u udobnom položaju, a aplikator se postavlja uz ciljano područje.",
          "Trajanje i broj dolazaka određuju se prema indikaciji, uputama konkretnog uređaja i vašem odgovoru na terapiju. Koristan cilj nije samo manja bol odmah nakon tretmana, nego i lakše hodanje, bolji san ili povratak važnim aktivnostima. O tim ciljevima razgovarajte s terapeutom prije početka.",
        ],
      },
      {
        title: "Sigurnost i individualna procjena",
        paragraphs: [
          "Prije tretmana obavezno navedite ugrađene elektroničke uređaje, trudnoću, epilepsiju i lijekove koji se primjenjuju preko kožnih flastera. U tim situacijama PEMF može biti neprikladan. Posebno je važno provjeriti mogućnost ometanja elektrostimulatora srca ili inzulinske pumpe. Primjena mora slijediti upute proizvođača i procjenu zdravstvenog stručnjaka.",
          "Ako osjetite novu ili jaču bol ili druge neuobičajene simptome, prekinite tretman i obavijestite terapeuta. Prikladnost postupka i očekivani učinak procjenjuju se zasebno za svaku osobu.",
        ],
        sources: [1],
      },
    ],
    sources: [
      {
        label:
          "Cleveland Clinic: PEMF terapija — postupak, mogući učinci i sigurnost",
        url: "https://my.clevelandclinic.org/health/treatments/pulsed-electromagnetic-field-pemf-therapy",
      },
      {
        label:
          "Randomizirano istraživanje PEMF-a kod osteoartritisa koljena (2025.)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40270637/",
      },
      {
        label:
          "Sustavni pregled i metaanaliza PEMF-a kod osteoartritisa koljena (2026.)",
        url: "https://pubmed.ncbi.nlm.nih.gov/42075549/",
      },
    ],
  },
  {
    slug: "frekvencijski-robot",
    title: "Frekvencijski robot: tehnologija 448 kHz i individualni pristup",
    category: "Tehnologija i rehabilitacija",
    bgColor: "#3b1824",
    excerpt:
      "Upoznajte radiofrekvencijsku tehnologiju 448 kHz, tijek tretmana i važnost stručne procjene pri odabiru terapije.",
    readTime: "4 min čitanja",
    visual: "robot",
    sections: [
      {
        title: "Što je frekvencijski robot?",
        paragraphs: [
          "Frekvencijski robot je uređaj koji povezuje radiofrekvencijsku energiju frekvencije 448 kHz s automatiziranim pomicanjem aplikatora. Prema tehničkom opisu proizvođača, sustav koristi senzore te prilagođava putanju, pritisak i toplinske parametre tijekom rada.",
          "Radiofrekvencijska energija može zagrijavati tkivo. Automatizacija pomaže u vođenju aplikatora, ali ne određuje dijagnozu i ne zamjenjuje procjenu stručnjaka. Za primjenu je potrebno provjeriti namjenu konkretnog uređaja i njegove upute za uporabu.",
        ],
      },
      {
        title: "Što možemo očekivati od tehnologije 448 kHz?",
        paragraphs: [
          "Radiofrekvencijski postupci na 448 kHz proučavani su kao dodatak rehabilitaciji. Malo randomizirano istraživanje kod osteoartritisa koljena zabilježilo je kratkoročno smanjenje boli; razlike nisu bile prisutne za sve funkcionalne ishode, a nakon tri mjeseca nije bilo razlike među skupinama.",
          "Ti se rezultati odnose na ispitani kapacitivno-rezistivni sustav i određeni protokol. Sama jednaka frekvencija ne dokazuje da frekvencijski robot postiže isti učinak. Razlikuju se aplikatori, način predaje energije i doziranje, pa se rezultati drugih uređaja ne mogu automatski prenijeti na ovaj sustav.",
        ],
        sources: [1],
      },
      {
        title: "Kako izgleda individualno prilagođen tretman?",
        paragraphs: [
          "Prvi korak je razgovor o razlogu dolaska i procjena područja koje želite tretirati. Stručnjak treba objasniti cilj postupka, provjeriti odgovara li on namjeni uređaja te odrediti primjerene postavke. Tijekom rada prati se stanje kože, osjećaj topline i vaša povratna informacija.",
          "Osjećaj pečenja, bol ili neugodan pritisak razlog su za trenutačan prekid i provjeru postavki. Broj i trajanje dolazaka nisu isti za sve: plan treba prilagoditi procjeni i rezultatima. Ako se postupak uključuje u rehabilitaciju, njegovu vrijednost pratimo kroz konkretne ciljeve, poput ugodnijeg pokreta i lakšeg obavljanja dnevnih aktivnosti.",
        ],
      },
      {
        title: "Što je važno provjeriti prije primjene?",
        paragraphs: [
          "Prije dogovora navedite imate li ugrađeni elektronički ili metalni implantat, jeste li trudni, imate li promjene na koži ili oslabljenu osjetljivost tretiranog područja. Te informacije omogućuju stručnjaku da provjeri ograničenja iz uputa konkretnog uređaja i prema potrebi zatraži liječničku procjenu.",
          "Frekvencijski robot treba promatrati kao mogući dodatak individualnom planu, uz jasno objašnjena očekivanja. Za ovaj konkretni robotski sustav ovdje navedeni izvori ne potvrđuju kliničku učinkovitost. Odabir postupka treba temeljiti na vašim potrebama, sigurnosti i praćenju stvarnog napretka.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Randomizirano istraživanje kapacitivno-rezistivne radiofrekvencije 448 kHz kod osteoartritisa koljena (2019.)",
        url: "https://pubmed.ncbi.nlm.nih.gov/30269963/",
      },
    ],
  },
];

export const campArticle: HealthArticle = {
  slug: "skolioza-kamp",
  title: "Skolioza kamp Biograd na moru",
  category: "Edukacija i pokret",
  excerpt:
    "Stručno vodstvo, prilagođene vježbe i edukacija o pravilnom držanju u Biogradu na Moru.",
  readTime: "5 min čitanja",
  visual: "camp",
  sections: [],
  sources: [],
};

export const otherArticles = [...healthArticles];
export const allArticles = [campArticle, ...healthArticles];
export function getArticle(slug: string) {
  return allArticles.find((article) => article.slug === slug);
}
