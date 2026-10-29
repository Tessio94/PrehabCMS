export default function LegalPage({ title, draft, children }: { title: string; draft: boolean; children: React.ReactNode }) {
  return <article className="bg-slate-50 px-6 py-20 text-black_preh sm:px-10"><div className="mx-auto max-w-4xl">
    <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-red_preh uppercase">Prehab · Informacije</p>
    <h1 className="font-oswald mb-9 text-5xl">{title}</h1>
    {draft && <p className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">Podaci i obavijest su u pripremi. Online obrasci za prikupljanje podataka dostupni su nakon provjere podataka klinike.</p>}
    <div className="legal-content space-y-8 rounded-3xl border border-slate-200 bg-white p-6 text-base leading-8 text-slate-600 sm:p-10">{children}</div>
  </div></article>
}
