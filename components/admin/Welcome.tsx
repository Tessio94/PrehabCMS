import Link from 'next/link'
export function Welcome() {
  return <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--theme-elevation-150)', borderRadius: 12 }}>
    <h2>Prehab · Administracija</h2>
    <p>Članci: napišite, spremite nacrt i objavite na stranici Zdravlje. Rezervacije: filtrirajte po lokaciji i datumu, uredite status ili dodajte blokadu termina.</p>
    <p>Svi termini su u hrvatskom vremenu (Europe/Zagreb), od 08:00 do 19:00. Prije aktivacije provjerite radne dane, usluge i postavke privatnosti.</p>
    <Link href="/rezervacije">Otvori stranicu rezervacija ↗</Link>
  </section>
}
