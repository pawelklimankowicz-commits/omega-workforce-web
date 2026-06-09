import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Klauzule Informacyjne RODO · Omega Workforce",
  description:
    "Klauzule informacyjne RODO (art. 13 i 14) dla Klientów B2B, Podwykonawców (JDG), Kandydatów, Użytkowników serwisu i Osób kontaktowych — Omega Spółka z o.o.",
};

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-relaxed text-fg-muted mb-3">{children}</p>
);
const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="text-sm leading-relaxed text-fg-muted mb-1.5">{children}</li>
);
const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-fg font-semibold">{children}</strong>
);
const WarnBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 px-4 py-3 rounded-xl border border-amber/20 bg-amber/5 text-sm text-fg-muted">
    {children}
  </div>
);
const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 px-4 py-3 rounded-xl border border-signal/20 bg-signal/5 text-sm text-fg-muted">
    {children}
  </div>
);
function KlauzylaHeader({
  number,
  title,
  target,
}: {
  number: string;
  title: string;
  target: string;
}) {
  return (
    <div className="mb-4 px-4 py-3 rounded-xl border border-accent/20 bg-accent/5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent/70 mb-1">
        {number}
      </p>
      <p className="text-base font-bold text-fg">{title}</p>
      <p className="text-xs text-fg-faint mt-1">{target}</p>
    </div>
  );
}
function TableRow({
  left,
  right,
}: {
  left: string;
  right: React.ReactNode;
}) {
  return (
    <tr className="border-b border-white/[0.05]">
      <td className="py-2.5 pr-4 text-sm font-medium text-fg-muted w-2/5 align-top">
        {left}
      </td>
      <td className="py-2.5 text-sm text-fg-faint w-3/5 align-top">{right}</td>
    </tr>
  );
}
function KlauzylaTable({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/[0.08]">
      <table className="w-full">
        <tbody>
          {rows.map(([l, r], i) => (
            <TableRow key={i} left={l} right={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Admin data constant
// ---------------------------------------------------------------------------

const adminData = (
  <span>
    Omega Spółka z o.o., os. Stefana Batorego 14/81, 60-687 Poznań
    <br />
    KRS 0000853422 · NIP 781-201-17-24 · REGON 386693099
    <br />
    e-mail:{" "}
    <a
      href="mailto:kontakt@omegaworkforce.pl"
      className="hover:text-fg transition-colors"
    >
      kontakt@omegaworkforce.pl
    </a>
    <br />
    RODO:{" "}
    <a
      href="mailto:rodo@omegaworkforce.pl"
      className="hover:text-fg transition-colors"
    >
      rodo@omegaworkforce.pl
    </a>
    <br />
    Prezes Zarządu: Paweł Klimankowicz
  </span>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RodoPage() {
  return (
    <LegalPageLayout
      title="Klauzule Informacyjne RODO"
      subtitle="Dokument zawiera pięć odrębnych klauzul informacyjnych spełniających obowiązki informacyjne wynikające z art. 13 i 14 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO)."
      date="1 lipca 2025 r."
      version="2.0"
      pdfHref="/docs/rodo.pdf"
      sections={[
        // ------------------------------------------------------------------
        // Section 1 — Administrator i punkt kontaktowy
        // ------------------------------------------------------------------
        {
          heading: "Administrator i punkt kontaktowy RODO",
          content: (
            <>
              <div className="px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-0.5 mb-4">
                <p className="font-semibold text-fg">
                  Omega Spółka z ograniczoną odpowiedzialnością
                </p>
                <p className="text-fg-muted">
                  os. Stefana Batorego 14/81, 60-687 Poznań
                </p>
                <p className="text-fg-faint">
                  KRS: 0000853422 · NIP: 781-201-17-24 · REGON: 386693099
                </p>
                <p className="text-fg-faint">
                  e-mail:{" "}
                  <a
                    href="mailto:kontakt@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    kontakt@omegaworkforce.pl
                  </a>
                  {" · "}RODO:{" "}
                  <a
                    href="mailto:rodo@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    rodo@omegaworkforce.pl
                  </a>
                </p>
                <p className="text-fg-faint">
                  Prezes Zarządu: Paweł Klimankowicz
                </p>
              </div>
              <P>
                <Strong>Inspektor Ochrony Danych (IOD):</Strong> Omega Sp. z
                o.o. nie powołała formalnego Inspektora Ochrony Danych, co jest
                dopuszczalne dla podmiotów niespełniających przesłanek z art. 37
                ust. 1 RODO (brak przetwarzania na dużą skalę danych
                szczególnych kategorii ani systematycznej obserwacji osób na
                dużą skalę). Wszelkie zapytania i wnioski dotyczące ochrony
                danych osobowych należy kierować do dedykowanego punktu
                kontaktowego:{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="hover:text-fg transition-colors"
                >
                  rodo@omegaworkforce.pl
                </a>
                .
              </P>
              <P>
                <Strong>Termin odpowiedzi:</Strong> Administrator odpowiada na
                wnioski bez zbędnej zwłoki, nie później niż w terminie{" "}
                <Strong>1 miesiąca</Strong> od otrzymania wniosku (art. 12 ust.
                3 RODO). W przypadku skomplikowanych lub licznych wniosków
                termin może zostać przedłużony o kolejne 2 miesiące — o
                przedłużeniu poinformujemy w ciągu pierwszego miesiąca.
              </P>
              <P>
                <Strong>Prawo skargi do organu nadzorczego:</Strong> Każda
                osoba, której dane dotyczą, ma prawo wniesienia skargi do
                Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2,
                00-193 Warszawa,{" "}
                <a
                  href="https://www.uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  www.uodo.gov.pl
                </a>
                , jeżeli uważa, że przetwarzanie jej danych osobowych narusza
                przepisy RODO.
              </P>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 2 — Klauzula I: Klienci B2B
        // ------------------------------------------------------------------
        {
          heading: "Klauzula I — Klienci B2B (art. 13 RODO)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna I"
                title="Przetwarzanie danych Klientów B2B"
                target="Dotyczy: przedsiębiorców (JDG) i osób prawnych korzystających z usług pośrednictwa pracy oraz leasingu pracowniczego."
              />
              <KlauzylaTable
                rows={[
                  ["Administrator danych", adminData],
                  [
                    "Cele i podstawy prawne",
                    <span key="k1c">
                      1. Zawarcie i wykonanie umowy o świadczenie usług
                      pośrednictwa/leasingu pracowniczego —{" "}
                      <Strong>art. 6 ust. 1 lit. b RODO</Strong>.
                      <br />
                      2. Wystawianie faktur i archiwizacja dokumentów
                      księgowych —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong> (ustawa z
                      29.09.1994 r. o rachunkowości).
                      <br />
                      3. Obowiązki wynikające z ustawy o promocji zatrudnienia i
                      instytucjach rynku pracy oraz wpisu do KRAZ —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong>.
                      <br />
                      4. Bieżąca komunikacja w ramach realizacji umowy —{" "}
                      <Strong>art. 6 ust. 1 lit. b i f RODO</Strong>.
                      <br />
                      5. Marketing bezpośredni własnych usług po zakończeniu
                      umowy —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong> (prawnie
                      uzasadniony interes; przysługuje prawo sprzeciwu).
                      <br />
                      6. Ustalenie, dochodzenie i obrona roszczeń —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                      <br />
                      7. Prowadzenie rejestrów i sprawozdawczości wewnętrznej —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                    </span>,
                  ],
                  [
                    "Kategorie danych",
                    <span key="k1d">
                      Dane identyfikacyjne (imię, nazwisko, PESEL/seria dowodu —
                      jeśli JDG); adres prowadzenia działalności; dane
                      rejestrowe JDG (NIP, REGON, CEIDG); dane kontaktowe
                      (e-mail, telefon); dane do fakturowania; dane bankowe
                      (numer rachunku); treść umów i korespondencji; historia
                      transakcji.
                    </span>,
                  ],
                  [
                    "Źródło danych",
                    "Bezpośrednio od osoby; z publicznych rejestrów (CEIDG, KRS, VIES); od pracowników i managerów Klienta.",
                  ],
                  [
                    "Okres przechowywania",
                    <span key="k1p">
                      Dane z umów i korespondencja: <Strong>6 lat</Strong> od
                      zakończenia umowy (art. 118 KC). Faktury i dokumenty
                      finansowe: <Strong>5 lat</Strong> od końca roku
                      podatkowego (art. 74 ustawy o rachunkowości). Dane
                      marketingowe: do wniesienia sprzeciwu lub ustania
                      uzasadnionego interesu.
                    </span>,
                  ],
                  [
                    "Odbiorcy danych",
                    "Podwykonawcy i Kandydaci (w zakresie niezbędnym do realizacji usług); biuro rachunkowe; dostawcy systemów CRM/ERP (umowy powierzenia); kancelaria prawna; organy publiczne (US, ZUS, KAS, PIP, sądy); banki (w przypadku płatności).",
                  ],
                  [
                    "Przekazywanie poza EOG",
                    <span key="k1eog">
                      Co do zasady nie. Przy korzystaniu z narzędzi IT mogą być
                      stosowane standardowe klauzule umowne KE (art. 46 ust. 2
                      lit. c RODO). Na żądanie udostępniamy kopię stosowanych
                      zabezpieczeń.
                    </span>,
                  ],
                  [
                    "Prawa osoby",
                    <span key="k1r">
                      Prawo dostępu (art. 15); sprostowania (art. 16); usunięcia
                      (art. 17 — z wyjątkami dot. obowiązków prawnych);
                      ograniczenia przetwarzania (art. 18); przenoszenia danych
                      (art. 20 — dot. przetwarzania zautomatyzowanego na
                      podstawie zgody lub umowy); sprzeciwu wobec marketingu
                      bezpośredniego (art. 21 — skuteczny niezwłocznie); skargi
                      do UODO. Kontakt:{" "}
                      <a
                        href="mailto:rodo@omegaworkforce.pl"
                        className="hover:text-fg transition-colors"
                      >
                        rodo@omegaworkforce.pl
                      </a>
                    </span>,
                  ],
                  [
                    "Dobrowolność",
                    "Podanie danych niezbędnych do zawarcia umowy jest warunkiem jej zawarcia. Dane do fakturowania wymagane przepisami prawa. Odmowa uniemożliwia świadczenie usług.",
                  ],
                  [
                    "Profilowanie i decyzje zautomatyzowane",
                    "Administrator nie podejmuje decyzji wyłącznie zautomatyzowanych w rozumieniu art. 22 RODO. Dane nie są wykorzystywane do profilowania wywołującego skutki prawne.",
                  ],
                ]}
              />
              <WarnBox>
                <Strong>Ważne — obowiązek informacyjny wobec osób trzecich:</Strong>{" "}
                Klient będący osobą fizyczną (JDG) przyjmuje niniejszą klauzulę
                w momencie zawarcia umowy. Klient będący osobą prawną
                zobowiązany jest przekazać treść niniejszej klauzuli swoim
                pracownikom i osobom kontaktowym, których dane zostały
                udostępnione Agencji (art. 14 RODO).
              </WarnBox>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 3 — Klauzula II: Podwykonawcy (JDG)
        // ------------------------------------------------------------------
        {
          heading: "Klauzula II — Podwykonawcy (JDG) (art. 13 RODO)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna II"
                title="Przetwarzanie danych Podwykonawców świadczących usługi jako JDG"
                target="Dotyczy: osób fizycznych prowadzących jednoosobową działalność gospodarczą (JDG), wpisanych do CEIDG, które nawiązały lub zamierzają nawiązać współpracę B2B z Omega Workforce."
              />
              <KlauzylaTable
                rows={[
                  ["Administrator danych", adminData],
                  [
                    "Cele i podstawy prawne",
                    <span key="k2c">
                      1. Weryfikacja tożsamości i uprawnień (CEIDG, dokument
                      tożsamości) —{" "}
                      <Strong>art. 6 ust. 1 lit. b i c RODO</Strong>.
                      <br />
                      2. Zawarcie i realizacja umowy B2B —{" "}
                      <Strong>art. 6 ust. 1 lit. b RODO</Strong>.
                      <br />
                      3. Koordynacja świadczenia usług na rzecz Klientów —{" "}
                      <Strong>art. 6 ust. 1 lit. b RODO</Strong>.
                      <br />
                      4. Rozliczenia finansowe (faktury, przelewy) —{" "}
                      <Strong>art. 6 ust. 1 lit. b i c RODO</Strong>.
                      <br />
                      5. Obowiązki z ustawy o promocji zatrudnienia i przepisów
                      BHP —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong>.
                      <br />
                      6. Prowadzenie dokumentacji onboardingowej (szkolenia,
                      certyfikaty, BHP) —{" "}
                      <Strong>art. 6 ust. 1 lit. b i c RODO</Strong>.
                      <br />
                      7. Weryfikacja warunków trzeźwości i gotowości do pracy —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong> (uchwała SN
                      III PZP 2/2019).
                      <br />
                      8. Obsługa cudzoziemców (zezwolenia na pracę,
                      oświadczenia) —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong> (ustawa o
                      cudzoziemcach) — jeżeli dotyczy.
                      <br />
                      9. Dochodzenie i obrona roszczeń —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                    </span>,
                  ],
                  [
                    "Kategorie danych",
                    <span key="k2d">
                      Dane identyfikacyjne (imię i nazwisko, PESEL, seria i
                      numer dokumentu tożsamości, obywatelstwo, data urodzenia);
                      dane adresowe (adres zameldowania, zamieszkania); dane JDG
                      (firma, adres prowadzenia działalności, NIP, REGON, numer
                      CEIDG, data rejestracji, przeważający PKD); dane
                      finansowe (numer rachunku bankowego — IBAN, bank); dane
                      kontaktowe (e-mail prywatny i firmowy, telefon); dane dot.
                      kwalifikacji i doświadczenia (certyfikaty, uprawnienia,
                      znajomość języków); dane BHP (szkolenia, orzeczenia
                      lekarskie — jeżeli dobrowolnie dostarczone); dane dot.
                      cudzoziemców (dokument pobytowy, zezwolenie na
                      pracę/oświadczenie pracodawcy) — jeżeli dotyczy; wizerunek
                      — wyłącznie za wyraźną, odrębną zgodą.
                    </span>,
                  ],
                  [
                    "Źródło danych",
                    "Bezpośrednio od Podwykonawcy; publiczne rejestry (CEIDG); instytucje państwowe (ZUS, US) w zakresie wymaganych weryfikacji.",
                  ],
                  [
                    "Okres przechowywania",
                    <span key="k2p">
                      Umowa i korespondencja: <Strong>6 lat</Strong>. Faktury:{" "}
                      <Strong>5 lat</Strong>. Dokumentacja onboardingowa
                      (szkolenia BHP): <Strong>3 lata</Strong> po zakończeniu
                      współpracy. Kopie dokumentów tożsamości: czas trwania
                      umowy + <Strong>12 miesięcy</Strong>. Wizerunek: do
                      cofnięcia zgody. Oświadczenia dot. trzeźwości i
                      bezpieczeństwa: czas trwania umowy +{" "}
                      <Strong>12 miesięcy</Strong>. Dane cudzoziemców
                      (pozwolenia): <Strong>3 lata</Strong> od wygaśnięcia +
                      zgodnie z wymogami ustawy o cudzoziemcach.
                    </span>,
                  ],
                  [
                    "Odbiorcy danych",
                    "Klienci (zleceniodawcy) — imię, nazwisko, zakres usług; biuro rachunkowe; dostawcy systemów CRM/ATS (umowy powierzenia art. 28 RODO); kancelaria prawna; ZUS, US, PIP, UODO, sądy; podmioty świadczące zakwaterowanie — jeżeli dotyczy i za wiedzą Podwykonawcy.",
                  ],
                  [
                    "Przekazywanie poza EOG",
                    "Co do zasady nie. Wyjątkowo przy narzędziach IT — standardowe klauzule umowne KE (SCC).",
                  ],
                  [
                    "Prawa osoby",
                    <span key="k2r">
                      Prawo dostępu (art. 15); sprostowania (art. 16); usunięcia
                      z zastrzeżeniem art. 17 ust. 3 (art. 17); ograniczenia
                      przetwarzania (art. 18); przenoszenia danych (art. 20);
                      sprzeciwu (art. 21); cofnięcia zgody bez wpływu na
                      wcześniejsze przetwarzanie; skargi do UODO (ul. Stawki 2,
                      00-193 Warszawa). Kontakt:{" "}
                      <a
                        href="mailto:rodo@omegaworkforce.pl"
                        className="hover:text-fg transition-colors"
                      >
                        rodo@omegaworkforce.pl
                      </a>
                    </span>,
                  ],
                  [
                    "Dobrowolność",
                    "Dane niezbędne do umowy — warunek jej zawarcia. Dane o kwalifikacjach — dobrowolne, wpływają na możliwość skierowania do określonych Klientów. Wizerunek, dane zdrowotne — dobrowolne i w pełni opcjonalne.",
                  ],
                ]}
              />
              <WarnBox>
                <Strong>Potwierdzenie odbioru klauzuli:</Strong> Podwykonawca
                potwierdza otrzymanie niniejszej klauzuli przez złożenie podpisu
                pod Umową B2B lub zaznaczenie odpowiedniego checkboxa w systemie
                onboardingowym Agencji. Kopia klauzuli jest przechowywana w
                aktach osobowych Podwykonawcy.
              </WarnBox>
              <InfoBox>
                <Strong>Klauzula dot. cudzoziemców:</Strong> Jeżeli Podwykonawca
                nie posiada polskiego obywatelstwa, Administrator przetwarza
                dodatkowo dane z dokumentu pobytowego (typ zezwolenia, data
                ważności) oraz z oświadczenia o powierzeniu pracy lub zezwolenia
                na pracę — wyłącznie na podstawie art. 6 ust. 1 lit. c RODO w
                zw. z przepisami ustawy z dnia 12 grudnia 2013 r. o
                cudzoziemcach oraz ustawy z dnia 20 kwietnia 2004 r. o promocji
                zatrudnienia i instytucjach rynku pracy.
              </InfoBox>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 4 — Klauzula III: Kandydaci
        // ------------------------------------------------------------------
        {
          heading: "Klauzula III — Kandydaci (art. 13 i art. 14 RODO)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna III"
                title="Przetwarzanie danych Kandydatów do pracy i współpracy"
                target="Dotyczy: osób fizycznych, które przesłały CV, wypełniły formularz rejestracyjny, odpowiedziały na ogłoszenie Agencji lub skontaktowały się z Agencją w celu podjęcia pracy lub nawiązania współpracy B2B. Klauzula obejmuje dane zebrane bezpośrednio (art. 13) oraz pozyskane z zewnętrznych źródeł, np. LinkedIn (art. 14)."
              />
              <KlauzylaTable
                rows={[
                  ["Administrator danych", adminData],
                  [
                    "Cele i podstawy prawne",
                    <span key="k3c">
                      1. Przeprowadzenie procesu rekrutacji i selekcji —{" "}
                      <Strong>art. 6 ust. 1 lit. b RODO</Strong> (podjęcie
                      działań przed zawarciem umowy) oraz{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda) — dla
                      danych wykraczających poza art. 22¹ KP.
                      <br />
                      2. Przekazanie profilu kandydata do zainteresowanych
                      Klientów Agencji —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda —
                      wymagana przed każdym przekazaniem).
                      <br />
                      3. Utrzymanie bazy talentów na potrzeby przyszłych
                      rekrutacji —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (odrębna zgoda,
                      max. 2 lata).
                      <br />
                      4. Wysyłka spersonalizowanych ofert pracy i materiałów o
                      szkoleniach —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda).
                      <br />
                      5. Onboarding i przygotowanie do współpracy B2B
                      (rejestracja JDG, szkolenia) —{" "}
                      <Strong>art. 6 ust. 1 lit. b RODO</Strong>.
                      <br />
                      6. Weryfikacja uprawnień i kwalifikacji zawodowych —{" "}
                      <Strong>art. 6 ust. 1 lit. b i c RODO</Strong>.
                      <br />
                      7. Obowiązki prawne (ewidencja, KRAZ, ustawa o
                      cudzoziemcach jeśli dotyczy) —{" "}
                      <Strong>art. 6 ust. 1 lit. c RODO</Strong>.
                      <br />
                      8. Ustalenie i dochodzenie roszczeń —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                    </span>,
                  ],
                  [
                    "Zakres danych — bezpośrednio (art. 13)",
                    <span key="k3d1">
                      Imię i nazwisko; data urodzenia; obywatelstwo; adres
                      zamieszkania; PESEL (wyłącznie gdy wymagany przez przepisy
                      do celów zatrudnienia lub weryfikacji); numer telefonu,
                      adres e-mail; wykształcenie (poziom, kierunek, instytucja,
                      rok ukończenia); historia zatrudnienia (pracodawca,
                      stanowisko, okres, zakres obowiązków); kwalifikacje i
                      uprawnienia zawodowe (certyfikaty, licencje, kursy);
                      znajomość języków obcych (poziom, certyfikaty); zdjęcie —
                      wyłącznie za wyraźną pisemną zgodą.
                    </span>,
                  ],
                  [
                    "Zakres danych — z zewnątrz (art. 14)",
                    "Imię, nazwisko, stanowisko, doświadczenie zawodowe — z profilu LinkedIn lub innych portali pracy (Pracuj.pl, OLX), jeżeli Kandydat udostępnił je publicznie. Kandydat informowany jest o takim pozyskaniu przy pierwszym kontakcie.",
                  ],
                  [
                    "Okres przechowywania",
                    <span key="k3p">
                      Bieżąca rekrutacja (zakończona bez nawiązania
                      współpracy): do <Strong>6 miesięcy</Strong> od zakończenia
                      procesu. Baza talentów (za odrębną zgodą): max.{" "}
                      <Strong>2 lata</Strong> od udzielenia zgody lub do jej
                      cofnięcia. Notatki rekrutacyjne:{" "}
                      <Strong>1 rok</Strong> od zakończenia rekrutacji (art. 94
                      KP w zw. z przepisami o dokumentacji pracowniczej,
                      stosowane analogicznie). Dane dot. cudzoziemców:{" "}
                      <Strong>3 lata</Strong> od zakończenia współpracy + zgodnie
                      z ustawą o cudzoziemcach.
                    </span>,
                  ],
                  [
                    "Odbiorcy danych",
                    "Klienci Agencji (wyłącznie za uprzednią zgodą Kandydata, wskazując konkretnego Klienta lub kategorię branżową); dostawcy systemów ATS/CRM (umowy powierzenia art. 28 RODO); organy publiczne (PIP, US, ZUS) na żądanie lub z mocy prawa; kancelaria prawna (w razie roszczeń).",
                  ],
                  [
                    "Prawa Kandydata",
                    <span key="k3r">
                      Prawo dostępu, sprostowania, usunięcia, ograniczenia
                      przetwarzania, przenoszenia danych; prawo sprzeciwu; prawo
                      do cofnięcia zgody w każdym czasie (bez wpływu na
                      legalność wcześniejszego przetwarzania). Kontakt:{" "}
                      <a
                        href="mailto:rodo@omegaworkforce.pl"
                        className="hover:text-fg transition-colors"
                      >
                        rodo@omegaworkforce.pl
                      </a>
                      . Prawo do skargi do Prezesa UODO, ul. Stawki 2, 00-193
                      Warszawa.
                    </span>,
                  ],
                  [
                    "Dobrowolność",
                    "Dane z art. 22¹ § 1 KP (imię, nazwisko, data urodzenia, adres, wykształcenie, przebieg dotychczasowego zatrudnienia) — wymagane do udziału w rekrutacji. Inne dane (PESEL, zdjęcie, dodatkowe kwalifikacje) — dobrowolne. Cofnięcie zgody na bazę talentów nie wpływa na bieżące rekrutacje.",
                  ],
                  [
                    "Profilowanie i decyzje zautomatyzowane",
                    "Systemy ATS mogą automatycznie sortować lub filtrować zgłoszenia według słów kluczowych (np. branża, język, uprawnienia). Decyzja o zaproszeniu do dalszego etapu jest ZAWSZE podejmowana przez pracownika Agencji. Brak profilowania wywołującego skutki prawne w rozumieniu art. 22 ust. 1 RODO.",
                  ],
                ]}
              />
              <WarnBox>
                <Strong>Granularne zgody:</Strong> Kandydat udziela zgód na
                przetwarzanie danych poprzez zaznaczenie odpowiednich pól przy
                przesyłaniu CV lub rejestracji w systemie. Zgody są granularne
                — odrębna zgoda dla: (a) bieżącej rekrutacji, (b) przekazania do
                Klientów, (c) bazy talentów. Kandydat może cofnąć każdą zgodę
                niezależnie, przesyłając wiadomość na{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="hover:text-fg transition-colors"
                >
                  rodo@omegaworkforce.pl
                </a>
                .
              </WarnBox>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 5 — Klauzula IV: Użytkownicy serwisu
        // ------------------------------------------------------------------
        {
          heading: "Klauzula IV — Użytkownicy Serwisu (art. 13 RODO)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna IV"
                title="Przetwarzanie danych Użytkowników serwisu omegaworkforce.pl"
                target="Dotyczy: wszystkich osób odwiedzających stronę www.omegaworkforce.pl, wypełniających formularz kontaktowy lub wyceny, zapisujących się na newsletter."
              />
              <KlauzylaTable
                rows={[
                  ["Administrator danych", adminData],
                  [
                    "Cele przetwarzania",
                    <span key="k4c">
                      1. Zapewnienie prawidłowego działania technicznego Serwisu
                      — <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                      <br />
                      2. Analiza ruchu i statystyk —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda na
                      cookies analityczne).
                      <br />
                      3. Obsługa formularza kontaktowego i wyceny —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong> (uzasadniony
                      interes — udzielenie odpowiedzi na zapytanie).
                      <br />
                      4. Wysyłka newslettera z ofertami —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda).
                      <br />
                      5. Remarketing i reklama behawioralna —{" "}
                      <Strong>art. 6 ust. 1 lit. a RODO</Strong> (zgoda).
                      <br />
                      6. Zapobieganie nadużyciom i ochrona bezpieczeństwa —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                    </span>,
                  ],
                  [
                    "Dane techniczne (bez zgody)",
                    "Adres IP (anonimizowany w ciągu 24h przez Google Analytics 4, jeśli zastosowano); typ i wersja przeglądarki; system operacyjny; rozdzielczość ekranu; źródło wizyty (referrer); czas i strony odwiedzone; identyfikator sesji.",
                  ],
                  [
                    "Dane osobowe (za zgodą lub przy kontakcie)",
                    "Imię (pole opcjonalne w formularzu), adres e-mail, numer telefonu (opcjonalny), treść wiadomości, preferowana branża i liczba pracowników (z kalkulatora).",
                  ],
                  [
                    "Cookies",
                    <span key="k4ck">
                      Szczegóły w § 11 Polityki Prywatności dostępnej pod
                      adresem{" "}
                      <a
                        href="/polityka-prywatnosci"
                        className="hover:text-fg transition-colors"
                      >
                        www.omegaworkforce.pl/polityka-prywatnosci
                      </a>
                      .
                    </span>,
                  ],
                  [
                    "Okres przechowywania",
                    <span key="k4p">
                      Logi serwera: <Strong>12 miesięcy</Strong>. Dane z
                      formularza kontaktowego: do <Strong>12 miesięcy</Strong>{" "}
                      od ostatniego kontaktu lub do zakończenia sprawy.
                      Newsletter: do cofnięcia zgody. Cookies analityczne:{" "}
                      <Strong>24 miesiące</Strong> (GA4). Sesja techniczna: do
                      zamknięcia przeglądarki.
                    </span>,
                  ],
                  [
                    "Odbiorcy danych",
                    "Google LLC (Analytics, reCAPTCHA — umowa DPA + EU SCC lub DPF); dostawca hostingu/CDN (umowa powierzenia); dostawca systemu e-mail marketingowego (umowa powierzenia).",
                  ],
                  [
                    "Prawa osoby",
                    <span key="k4r">
                      Prawo dostępu, sprostowania, usunięcia, ograniczenia,
                      przenoszenia (dla przetwarzania na podstawie zgody),
                      sprzeciwu, cofnięcia zgody, skargi do UODO. Kontakt:{" "}
                      <a
                        href="mailto:rodo@omegaworkforce.pl"
                        className="hover:text-fg transition-colors"
                      >
                        rodo@omegaworkforce.pl
                      </a>
                    </span>,
                  ],
                ]}
              />
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 6 — Klauzula V: Osoby kontaktowe po stronie Klientów
        // ------------------------------------------------------------------
        {
          heading:
            "Klauzula V — Osoby kontaktowe po stronie Klientów (art. 14 RODO)",
          content: (
            <>
              <KlauzylaHeader
                number="Klauzula informacyjna V"
                title="Dane osób kontaktowych przekazane przez Klientów instytucjonalnych"
                target="Dotyczy: pracowników, managerów, specjalistów HR i innych reprezentantów podmiotów, których dane zostały przekazane Agencji przez Klienta (osobę prawną lub JDG) w celu realizacji umowy."
              />
              <KlauzylaTable
                rows={[
                  ["Administrator danych", adminData],
                  [
                    "Skąd posiadamy Twoje dane?",
                    "Twoje dane zostały przekazane Agencji przez Twojego pracodawcę lub firmę, która korzysta z naszych usług pośrednictwa pracy. Podstawa: art. 14 RODO — osoba nie przekazywała danych bezpośrednio.",
                  ],
                  [
                    "Cele i podstawy prawne",
                    <span key="k5c">
                      1. Bieżąca komunikacja i koordynacja usług w ramach umowy
                      z Klientem —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong> (uzasadniony
                      interes — realizacja umowy).
                      <br />
                      2. Organizacja pracy i logistyka związana ze skierowanymi
                      Podwykonawcami —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                      <br />
                      3. Rozwiązywanie bieżących spraw (reklamacje, zmiany
                      zamówień, raportowanie) —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                      <br />
                      4. Dochodzenie roszczeń —{" "}
                      <Strong>art. 6 ust. 1 lit. f RODO</Strong>.
                    </span>,
                  ],
                  [
                    "Kategorie danych",
                    "Imię i nazwisko; stanowisko; służbowy adres e-mail; służbowy numer telefonu; ewentualnie: bezpośredni adres miejsca pracy (lokalizacja realizacji usługi).",
                  ],
                  [
                    "Okres przechowywania",
                    <span key="k5p">
                      Przez okres realizacji umowy z Klientem +{" "}
                      <Strong>6 lat</Strong> od jej zakończenia (w zakresie
                      korespondencji istotnej dla rozliczeń lub potencjalnych
                      roszczeń).
                    </span>,
                  ],
                  [
                    "Odbiorcy danych",
                    "Podwykonawcy JDG (wyłącznie imię, nazwisko i e-mail/telefon — dla celów koordynacji); dostawcy systemów CRM (umowy powierzenia art. 28 RODO); kancelaria prawna (przy roszczeniach).",
                  ],
                  [
                    "Prawa osoby",
                    <span key="k5r">
                      Prawo dostępu (art. 15), sprostowania (art. 16), usunięcia
                      (art. 17), ograniczenia przetwarzania (art. 18), sprzeciwu
                      (art. 21), skargi do UODO. Kontakt:{" "}
                      <a
                        href="mailto:rodo@omegaworkforce.pl"
                        className="hover:text-fg transition-colors"
                      >
                        rodo@omegaworkforce.pl
                      </a>
                    </span>,
                  ],
                  [
                    "Dobrowolność",
                    "Przetwarzanie wynika z uzasadnionego interesu Administratora w związku z realizacją umowy — nie jest wymagana zgoda. Przysługuje jednak prawo sprzeciwu.",
                  ],
                ]}
              />
              <InfoBox>
                Jeżeli nie chcesz, abyśmy przetwarzali Twoje dane jako osoby
                kontaktowej, poinformuj swojego pracodawcę lub skontaktuj się
                bezpośrednio z nami:{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="hover:text-fg transition-colors"
                >
                  rodo@omegaworkforce.pl
                </a>
                . W uzasadnionych przypadkach usuniemy Twoje dane i poprosimy
                Klienta o wskazanie innej osoby kontaktowej.
              </InfoBox>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 7 — Procedura realizacji praw
        // ------------------------------------------------------------------
        {
          heading: "Jak wykonać swoje prawa — procedura i wzór wniosku",
          content: (
            <>
              <P>
                <Strong>Sposób złożenia wniosku:</Strong> Wniosek o realizację
                praw wynikających z RODO można złożyć:
              </P>
              <ul className="list-disc list-inside space-y-1.5 mb-4">
                <Li>
                  pisemnie na adres: Omega Sp. z o.o., os. Stefana Batorego
                  14/81, 60-687 Poznań;
                </Li>
                <Li>
                  drogą elektroniczną na adres:{" "}
                  <a
                    href="mailto:rodo@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    rodo@omegaworkforce.pl
                  </a>
                  .
                </Li>
              </ul>
              <P>
                <Strong>Co powinien zawierać wniosek:</Strong>
              </P>
              <ol className="list-decimal list-inside space-y-1.5 mb-4">
                <Li>Imię i nazwisko wnioskodawcy.</Li>
                <Li>Dane kontaktowe (adres e-mail lub adres korespondencyjny).</Li>
                <Li>
                  Wskazanie, które prawo Wnioskodawca chce wykonać (np. prawo
                  dostępu, usunięcia, sprostowania, sprzeciwu).
                </Li>
                <Li>
                  Dodatkowe informacje pomocne w identyfikacji w systemach
                  Agencji (np. przybliżona data kontaktu, stanowisko, na które
                  aplikowano).
                </Li>
              </ol>
              <P>
                <Strong>Termin odpowiedzi:</Strong> Administrator odpowiada bez
                zbędnej zwłoki, nie później niż w ciągu{" "}
                <Strong>1 miesiąca</Strong> od otrzymania wniosku (art. 12 ust.
                3 RODO). W przypadku skomplikowanych lub licznych wniosków
                termin może zostać przedłużony o kolejne{" "}
                <Strong>2 miesiące</Strong> — o przedłużeniu poinformujemy w
                ciągu pierwszego miesiąca, podając przyczyny opóźnienia.
              </P>
              <P>
                <Strong>Weryfikacja tożsamości:</Strong> W celu ochrony przed
                nieuprawnionym dostępem do danych Administrator może prosić o
                potwierdzenie tożsamości, np. przez dodatkowe pytania lub
                potwierdzenie z adresu e-mail podanego przy rejestracji.
              </P>
              <P>
                <Strong>Bezpłatność:</Strong> Realizacja wniosków jest
                bezpłatna. W przypadku wniosków oczywiście nieuzasadnionych lub
                nadmiernych (w szczególności ze względu na swój ustawiczny
                charakter) Administrator może pobrać rozsądną opłatę lub odmówić
                podjęcia działań (art. 12 ust. 5 RODO).
              </P>
              <WarnBox>
                <Strong>Wzór wniosku o realizację prawa dostępu do danych:</Strong>
                <br />
                <br />
                Miejscowość, data: ................................................
                <br />
                Imię i nazwisko: ................................................
                <br />
                Adres / e-mail: ................................................
                <br />
                <br />
                Do: Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687
                Poznań / rodo@omegaworkforce.pl
                <br />
                <br />
                Treść: Na podstawie art. 15 RODO wnoszę o potwierdzenie, czy
                Omega Sp. z o.o. przetwarza moje dane osobowe, a jeżeli tak —
                o przesłanie kopii przetwarzanych danych oraz informacji, o
                których mowa w art. 15 ust. 1 i 2 RODO.
                <br />
                <br />
                [Opcjonalnie: Wnoszę o [sprostowanie / usunięcie / ograniczenie
                przetwarzania / przeniesienie danych / wniesienie sprzeciwu]
                danych dotyczących [opis danych].]
                <br />
                <br />
                Podpis: ................................................
              </WarnBox>
            </>
          ),
        },

        // ------------------------------------------------------------------
        // Section 8 — Podstawy prawne i dokumenty referencyjne
        // ------------------------------------------------------------------
        {
          heading: "Podstawy prawne i dokumenty referencyjne",
          content: (
            <>
              <P>
                Poniższa tabela zawiera zestawienie podstaw prawnych
                powoływanych w niniejszym dokumencie.
              </P>
              <div className="my-4 rounded-xl overflow-hidden border border-white/[0.08]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                      <th className="py-2.5 px-3 text-xs font-bold uppercase tracking-[0.1em] text-fg-muted text-left w-2/5">
                        Przepis
                      </th>
                      <th className="py-2.5 px-3 text-xs font-bold uppercase tracking-[0.1em] text-fg-muted text-left w-3/5">
                        Opis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "art. 6 ust. 1 lit. a RODO",
                        "Zgoda osoby, której dane dotyczą",
                      ],
                      [
                        "art. 6 ust. 1 lit. b RODO",
                        "Wykonanie umowy lub podjęcie działań przed jej zawarciem",
                      ],
                      [
                        "art. 6 ust. 1 lit. c RODO",
                        "Obowiązek prawny ciążący na administratorze",
                      ],
                      [
                        "art. 6 ust. 1 lit. f RODO",
                        "Uzasadniony interes administratora lub osoby trzeciej",
                      ],
                      [
                        "art. 9 ust. 2 lit. a RODO",
                        "Wyraźna zgoda na przetwarzanie danych szczególnych kategorii",
                      ],
                      [
                        "art. 12–14 RODO",
                        "Obowiązki informacyjne administratora",
                      ],
                      [
                        "art. 15–22 RODO",
                        "Prawa osób, których dane dotyczą",
                      ],
                      [
                        "art. 22 RODO",
                        "Zakaz w pełni zautomatyzowanych decyzji bez podstawy prawnej",
                      ],
                      [
                        "art. 28 RODO",
                        "Umowa powierzenia przetwarzania danych",
                      ],
                      [
                        "art. 30 RODO",
                        "Rejestr czynności przetwarzania",
                      ],
                      [
                        "art. 33–34 RODO",
                        "Naruszenia ochrony danych osobowych (incydenty)",
                      ],
                      [
                        "art. 46 ust. 2 lit. c RODO",
                        "Standardowe klauzule umowne (SCC) — transfer poza EOG",
                      ],
                      [
                        "art. 22¹ KP",
                        "Dane osobowe gromadzone przez pracodawcę / agencję zatrudnienia",
                      ],
                      [
                        "ustawa z 10.05.2018 o ochronie danych",
                        "Polska ustawa wdrażająca RODO",
                      ],
                      [
                        "ustawa z 20.04.2004 o promocji zatrudnienia",
                        "Obowiązki KRAZ i agencji zatrudnienia",
                      ],
                      [
                        "ustawa z 12.12.2013 o cudzoziemcach",
                        "Obowiązki dot. pracowników zagranicznych",
                      ],
                      [
                        "ustawa z 29.09.1994 o rachunkowości art. 74",
                        "Retencja dokumentów księgowych (5 lat)",
                      ],
                      [
                        "art. 118 KC",
                        "Ogólny termin przedawnienia roszczeń (6 lat)",
                      ],
                    ].map(([przepis, opis], i) => (
                      <tr key={i} className="border-b border-white/[0.05]">
                        <td className="py-2.5 px-3 text-sm font-medium text-fg-muted align-top">
                          {przepis}
                        </td>
                        <td className="py-2.5 px-3 text-sm text-fg-faint align-top">
                          {opis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InfoBox>
                <Strong>Kontakt w sprawach ochrony danych osobowych:</Strong>
                {" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="hover:text-fg transition-colors"
                >
                  rodo@omegaworkforce.pl
                </a>{" "}
                · Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687 Poznań ·
                Prezes UODO: ul. Stawki 2, 00-193 Warszawa,{" "}
                <a
                  href="https://www.uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  www.uodo.gov.pl
                </a>
              </InfoBox>
            </>
          ),
        },
      ]}
    />
  );
}
