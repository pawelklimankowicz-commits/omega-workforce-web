import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Klauzule Informacyjne RODO · Omega Workforce",
  description: "Klauzule informacyjne RODO dla Klientów B2B, Podwykonawców (JDG) i Kandydatów — Omega Workforce.",
};

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed text-fg-muted mb-3">{children}</p>
);
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="text-sm leading-relaxed text-fg-muted mb-1.5">{children}</li>
);
const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-fg font-semibold">{children}</strong>
);

function TableRow({ left, right }: { left: string; right: React.ReactNode }) {
  return (
    <tr className="border-b border-white/[0.05]">
      <td className="py-2.5 pr-4 text-sm font-medium text-fg-muted w-2/5 align-top">{left}</td>
      <td className="py-2.5 text-sm text-fg-faint w-3/5 align-top">{right}</td>
    </tr>
  );
}

function KlauzylaTable({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/[0.08]">
      <table className="w-full">
        <tbody>
          {rows.map(([l, r], i) => <TableRow key={i} left={l} right={r} />)}
        </tbody>
      </table>
    </div>
  );
}

function KlauzylaHeader({ number, title, target }: { number: string; title: string; target: string }) {
  return (
    <div className="mb-4 px-4 py-3 rounded-xl border border-accent/20 bg-accent/5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent/70 mb-1">{number}</p>
      <p className="text-base font-bold text-fg">{title}</p>
      <p className="text-xs text-fg-faint mt-1">{target}</p>
    </div>
  );
}

const adminData = (
  <span>
    Omega Spółka z o.o., os. Stefana Batorego 14/81, 60-687 Poznań<br />
    e-mail: kontakt@omegaworkforce.pl · RODO: rodo@omegaworkforce.pl
  </span>
);

export default function RodoPage() {
  return (
    <LegalPageLayout
      title="Klauzule Informacyjne RODO"
      subtitle="Dokument zawiera trzy odrębne klauzule informacyjne spełniające obowiązki z art. 13 i 14 Rozporządzenia RODO."
      date="1 lipca 2025 r."
      pdfHref="/docs/rodo.pdf"
      sections={[
        {
          heading: "Administrator danych osobowych",
          content: (
            <div className="px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-0.5">
              <p className="font-semibold text-fg">Omega Spółka z ograniczoną odpowiedzialnością</p>
              <p className="text-fg-muted">os. Stefana Batorego 14/81, 60-687 Poznań</p>
              <p className="text-fg-faint">KRS: 0000853422 · NIP: 781-201-17-24 · REGON: 386693099</p>
              <p className="text-fg-faint">
                e-mail: <a href="mailto:kontakt@omegaworkforce.pl" className="hover:text-fg transition-colors">kontakt@omegaworkforce.pl</a>
                {" · "}RODO: <a href="mailto:rodo@omegaworkforce.pl" className="hover:text-fg transition-colors">rodo@omegaworkforce.pl</a>
              </p>
              <p className="text-fg-faint">Prezes Zarządu: Paweł Klimankowicz</p>
            </div>
          ),
        },
        {
          heading: "Klauzula I — Klienci B2B",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna I"
                title="Dla Klientów B2B (Usługobiorców) | art. 13 RODO"
                target="Skierowana do: przedsiębiorców (JDG) oraz osób fizycznych reprezentujących klientów instytucjonalnych."
              />
              <KlauzylaTable rows={[
                ["Administrator danych", adminData],
                ["Cele i podstawy prawne", <span key="k1c">
                  1. Zawarcie i realizacja umowy – art. 6 ust. 1 lit. b RODO.<br/>
                  2. Wystawianie faktur, dokumentacja finansowa – art. 6 ust. 1 lit. c RODO.<br/>
                  3. Obowiązki z przepisów prawa (m.in. KRAZ) – art. 6 ust. 1 lit. c RODO.<br/>
                  4. Bieżąca komunikacja w sprawach umowy – art. 6 ust. 1 lit. b i f RODO.<br/>
                  5. Ustalenie/dochodzenie/obrona roszczeń – art. 6 ust. 1 lit. f RODO.<br/>
                  6. Marketing bezpośredni własnych usług – art. 6 ust. 1 lit. f RODO (z prawem sprzeciwu).
                </span>],
                ["Kategorie danych", "Imię i nazwisko, stanowisko, adres e-mail, numer telefonu, firma i adres, NIP, REGON, numer rachunku bankowego, dane z umowy i korespondencji."],
                ["Odbiorcy danych", "Podwykonawcy JDG, biuro rachunkowe, dostawcy IT (umowy powierzenia), kancelaria prawna, organy publiczne (US, ZUS, KAS)."],
                ["Okres przechowywania", "Dane z umowy: 6 lat od jej zakończenia · Faktury: 5 lat od końca roku podatkowego · Marketing: do wniesienia sprzeciwu."],
                ["Przekazywanie poza EOG", "Co do zasady nie. W wyjątkowych przypadkach – wyłącznie ze standardowymi klauzulami umownymi KE (art. 46 RODO)."],
                ["Prawa osoby", "Dostęp · Sprostowanie · Usunięcie · Ograniczenie · Przenoszenie · Sprzeciw · Skarga do UODO. Kontakt: rodo@omegaworkforce.pl"],
                ["Dobrowolność", "Podanie danych jest dobrowolne, lecz niezbędne do zawarcia i realizacji umowy. Dane do fakturowania są wymagane przepisami prawa."],
                ["Zautomatyzowane decyzje", "Administrator nie podejmuje decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu (art. 22 RODO)."],
              ]} />
            </>
          ),
        },
        {
          heading: "Klauzula II — Podwykonawcy (JDG)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna II"
                title="Dla Podwykonawców (JDG) | art. 13 RODO"
                target="Skierowana do: osób fizycznych prowadzących JDG wpisanych do CEIDG, które zawarły lub zamierzają zawrzeć umowę o współpracy B2B."
              />
              <KlauzylaTable rows={[
                ["Administrator danych", adminData],
                ["Cele i podstawy prawne", <span key="k2c">
                  1. Weryfikacja tożsamości i uprawnień (CEIDG) – art. 6 ust. 1 lit. b i c RODO.<br/>
                  2. Zawarcie i realizacja umowy B2B – art. 6 ust. 1 lit. b RODO.<br/>
                  3. Koordynacja usług na rzecz Klientów – art. 6 ust. 1 lit. b RODO.<br/>
                  4. Rozliczenia finansowe, faktury – art. 6 ust. 1 lit. b i c RODO.<br/>
                  5. Obowiązki z ustawy o promocji zatrudnienia (KRAZ) – art. 6 ust. 1 lit. c RODO.<br/>
                  6. Obowiązki BHP – art. 6 ust. 1 lit. c RODO.<br/>
                  7. Weryfikacja trzeźwości (klauzula BHP) – art. 6 ust. 1 lit. c RODO.<br/>
                  8. Dochodzenie/obrona roszczeń – art. 6 ust. 1 lit. f RODO.<br/>
                  9. Akta onboardingowe (szkolenia, certyfikaty) – art. 6 ust. 1 lit. b i c RODO.
                </span>],
                ["Kategorie danych", "Dane identyfikacyjne (imię, nazwisko, PESEL, dowód/paszport), dane adresowe, dane JDG (NIP, REGON, CEIDG), dane finansowe (IBAN), dane kontaktowe, kwalifikacje, zdjęcie (za zgodą), dane o niepełnosprawności (za zgodą)."],
                ["Odbiorcy danych", "Klienci (zleceniodawcy), biuro rachunkowe, dostawcy IT (umowy powierzenia), kancelaria prawna, ZUS/US/PIP/UODO, podmioty świadczące zakwaterowanie (jeśli dotyczy)."],
                ["Okres przechowywania", "Dane kontraktowe: 6 lat od zakończenia umowy · Faktury: 5 lat · Dokumenty onboardingowe (BHP): 3 lata · Kopie dokumentów tożsamości: czas trwania umowy + 12 miesięcy · Zdjęcie: do cofnięcia zgody."],
                ["Przekazywanie poza EOG", "Co do zasady nie. Gdy konieczne – ze standardowymi klauzulami umownymi KE."],
                ["Prawa osoby", "Dostęp · Sprostowanie · Usunięcie · Ograniczenie · Przenoszenie · Sprzeciw · Cofnięcie zgody · Skarga do UODO (ul. Stawki 2, 00-193 Warszawa). Kontakt: rodo@omegaworkforce.pl"],
                ["Dobrowolność", "Podanie danych niezbędnych do umowy jest wymagane. Dane o niepełnosprawności i wizerunek – całkowicie dobrowolne."],
              ]} />
              <div className="mt-3 px-4 py-3 rounded-xl border border-amber/20 bg-amber/5 text-sm text-fg-muted">
                <strong className="text-amber">Ważne:</strong> Kopia niniejszej klauzuli jest przekazywana Podwykonawcy przy podpisaniu Umowy B2B. Podwykonawca potwierdza jej odbiór własnoręcznym podpisem lub poprzez zaznaczenie odpowiedniego pola w systemie onboardingowym.
              </div>
            </>
          ),
        },
        {
          heading: "Klauzula III — Kandydaci",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna III"
                title="Dla Kandydatów | art. 13 RODO"
                target="Skierowana do: osób fizycznych, które przesłały CV, wypełniły formularz rejestracyjny lub skontaktowały się z Agencją w celu podjęcia pracy lub współpracy."
              />
              <KlauzylaTable rows={[
                ["Administrator danych", adminData],
                ["Cele i podstawy prawne", <span key="k3c">
                  1. Prowadzenie procesu rekrutacji / onboardingu JDG – art. 6 ust. 1 lit. b RODO; art. 6 ust. 1 lit. a RODO (zgoda).<br/>
                  2. Przesyłanie danych do potencjalnych pracodawców / Klientów Agencji – art. 6 ust. 1 lit. a RODO (zgoda).<br/>
                  3. Baza talentów na potrzeby przyszłych rekrutacji – art. 6 ust. 1 lit. a RODO (zgoda).<br/>
                  4. Wysyłka informacji o ofertach pracy – art. 6 ust. 1 lit. a RODO (zgoda).<br/>
                  5. Obowiązki prawne (ewidencja, KRAZ) – art. 6 ust. 1 lit. c RODO.<br/>
                  6. Dochodzenie/obrona roszczeń – art. 6 ust. 1 lit. f RODO.
                </span>],
                ["Kategorie danych", "Imię i nazwisko, data urodzenia, PESEL (jeśli wymagany), obywatelstwo, adres zamieszkania, e-mail, telefon, wykształcenie, historia zatrudnienia, kwalifikacje, certyfikaty, języki obce. Zdjęcie i dane dokumentu tożsamości – wyłącznie za wyraźną zgodą."],
                ["Odbiorcy danych", "Klienci Agencji (za zgodą Kandydata), dostawcy systemów ATS/CRM (umowy powierzenia), organy publiczne (PIP, US, ZUS)."],
                ["Okres przechowywania", "Bieżąca rekrutacja (zakończona bez nawiązania współpracy): do 6 miesięcy · Baza talentów (za zgodą): do cofnięcia zgody, max. 2 lata · Dokumentacja rekrutacyjna (notatki): 1 rok od zakończenia rekrutacji."],
                ["Przekazywanie poza EOG", "Co do zasady nie. Przy narzędziach IT poza EOG – ze standardowymi klauzulami umownymi KE."],
                ["Prawa Kandydata", "Dostęp · Sprostowanie · Usunięcie · Ograniczenie · Przenoszenie · Sprzeciw · Cofnięcie zgody · Skarga do UODO. Kontakt: rodo@omegaworkforce.pl"],
                ["Dobrowolność", "Podanie danych z art. 22¹ KP jest wymagane do udziału w rekrutacji. Pozostałe dane (zdjęcie, dodatkowe kwalifikacje) są dobrowolne."],
                ["Zautomatyzowane decyzje", "Systemy ATS mogą wstępnie sortować aplikacje wg kryteriów. Ostateczna decyzja jest zawsze podejmowana przez pracownika Agencji. Brak profilowania wywołującego skutki prawne (art. 22 RODO)."],
              ]} />
            </>
          ),
        },
      ]}
    />
  );
}
