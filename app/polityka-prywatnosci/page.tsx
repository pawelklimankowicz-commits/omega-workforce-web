import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Polityka Prywatności · Omega Workforce",
  description:
    "Zasady przetwarzania danych osobowych przez Omega Spółka z o.o. — zgodnie z RODO/GDPR (UE) 2016/679.",
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
const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 px-4 py-3 rounded-xl border border-signal/20 bg-signal/5 text-sm text-fg-muted">
    {children}
  </div>
);
const WarnBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 px-4 py-3 rounded-xl border border-amber-400/20 bg-amber-400/5 text-sm text-fg-muted">
    {children}
  </div>
);
function TableRow({ left, right }: { left: string; right: React.ReactNode }) {
  return (
    <tr className="border-b border-white/[0.05]">
      <td className="py-2.5 pr-4 text-sm text-fg-muted w-2/5 align-top">{left}</td>
      <td className="py-2.5 text-sm text-fg-faint w-3/5 align-top">{right}</td>
    </tr>
  );
}
function Table({ rows }: { rows: [string, React.ReactNode][] }) {
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-fg mb-2 mt-5">{children}</p>
  );
}

function ThreeColTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: [string, React.ReactNode, React.ReactNode][];
}) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/[0.08]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.10] bg-white/[0.03]">
            <th className="py-2 px-3 text-xs font-semibold text-fg-muted text-left w-2/5">{headers[0]}</th>
            <th className="py-2 px-3 text-xs font-semibold text-fg-muted text-left w-1/4">{headers[1]}</th>
            <th className="py-2 px-3 text-xs font-semibold text-fg-muted text-left">{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c], i) => (
            <tr key={i} className="border-b border-white/[0.05]">
              <td className="py-2.5 px-3 text-sm text-fg-muted align-top">{a}</td>
              <td className="py-2.5 px-3 text-sm text-fg-faint align-top">{b}</td>
              <td className="py-2.5 px-3 text-sm text-fg-faint align-top">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PolitykaPrywatnosci() {
  return (
    <LegalPageLayout
      title="Polityka Prywatności"
      subtitle="Omega Spółka z ograniczoną odpowiedzialnością (Omega Workforce)"
      date="1 lipca 2025 r."
      version="2.0"
      pdfHref="/docs/polityka-prywatnosci.pdf"
      sections={[
        /* ─────────────────────────────────────────────── 0 · Wstęp */
        {
          heading: "Wstęp",
          content: (
            <>
              <P>
                Niniejsza Polityka Prywatności (dalej:{" "}
                <Strong>Polityka</Strong>) opisuje zasady gromadzenia,
                przetwarzania i ochrony danych osobowych przez{" "}
                <Strong>
                  Omega Spółka z ograniczoną odpowiedzialnością
                </Strong>{" "}
                z siedzibą w Poznaniu (dalej: <Strong>Administrator</Strong>
                ) w związku z prowadzeniem serwisu internetowego{" "}
                <Strong>www.omegaworkforce.pl</Strong> (dalej:{" "}
                <Strong>Serwis</Strong>) oraz świadczeniem usług pośrednictwa
                pracy i outsourcingu pracowniczego.
              </P>
              <P>
                Polityka realizuje obowiązki informacyjne wynikające z{" "}
                <Strong>art. 13 i 14</Strong> Rozporządzenia Parlamentu
                Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                danych osobowych (dalej: <Strong>RODO</Strong>) oraz z{" "}
                <Strong>ustawy z dnia 10 maja 2018 r. o ochronie danych
                osobowych</Strong> (Dz.U. 2018 poz. 1000 ze zm.). W zakresie
                korzystania z elektronicznych środków komunikacji zastosowanie
                ma również{" "}
                <Strong>
                  ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą
                  elektroniczną
                </Strong>{" "}
                oraz dyrektywa e-Privacy (2002/58/WE zmieniona 2009/136/WE).
              </P>
              <P>
                Administrator dokłada wszelkich starań, aby przetwarzanie
                danych osobowych było transparentne, proporcjonalne do celów
                oraz zgodne z zasadami:{" "}
                <Strong>
                  zgodności z prawem, rzetelności, przejrzystości,
                  ograniczenia celu, minimalizacji danych, prawidłowości,
                  ograniczenia przechowywania, integralności i poufności
                </Strong>{" "}
                (art. 5 RODO).
              </P>
              <InfoBox>
                Polityka dotyczy wyłącznie danych osobowych osób fizycznych.
                Nie reguluje zasad przetwarzania danych osób prawnych ani
                innych podmiotów niebędących osobami fizycznymi.
              </InfoBox>
            </>
          ),
        },

        /* ─────────────────────────────────────────── 1 · Administrator */
        {
          heading: "§ 1  Administrator danych osobowych",
          content: (
            <>
              <P>
                Administratorem danych osobowych w rozumieniu art. 4 pkt 7
                RODO jest:
              </P>
              <div className="my-3 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-1">
                <p className="font-bold text-fg text-base">
                  Omega Spółka z ograniczoną odpowiedzialnością
                </p>
                <p className="text-fg-muted">
                  os. Stefana Batorego 14/81, 60-687 Poznań
                </p>
                <p className="text-fg-faint">
                  KRS: 0000853422 &nbsp;·&nbsp; NIP: 781-201-17-24 &nbsp;·&nbsp; REGON: 386693099
                </p>
                <p className="text-fg-faint">
                  Sąd Rejonowy Poznań — Nowe Miasto i Wilda w Poznaniu, VIII Wydział Gospodarczy KRS
                </p>
                <p className="text-fg-faint">
                  Kapitał zakładowy: 5 000,00 zł &nbsp;·&nbsp; Prezes Zarządu: Paweł Klimankowicz
                </p>
                <p className="text-fg-faint pt-1">
                  E-mail ogólny:{" "}
                  <a
                    href="mailto:kontakt@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    kontakt@omegaworkforce.pl
                  </a>
                </p>
                <p className="text-fg-faint">
                  E-mail RODO:{" "}
                  <a
                    href="mailto:rodo@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    rodo@omegaworkforce.pl
                  </a>
                </p>
                <p className="text-fg-faint">
                  Tel.: +48 888 000 000 &nbsp;·&nbsp; www.omegaworkforce.pl
                </p>
              </div>
              <P>
                Wszelkie pytania, wnioski i żądania dotyczące przetwarzania
                danych osobowych należy kierować na adres e-mail{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="text-accent hover:underline"
                >
                  rodo@omegaworkforce.pl
                </a>{" "}
                lub pisemnie na adres siedziby Administratora.
              </P>
              <P>
                Administrator jest wpisany do{" "}
                <Strong>
                  Krajowego Rejestru Agencji Zatrudnienia (KRAZ)
                </Strong>{" "}
                i prowadzi działalność na podstawie ustawy z dnia 20 kwietnia
                2004 r. o promocji zatrudnienia i instytucjach rynku pracy
                (Dz.U. 2023 poz. 735 ze zm.).
              </P>
            </>
          ),
        },

        /* ─────────────────────────────── 2 · Punkt kontaktowy RODO */
        {
          heading: "§ 2  Punkt kontaktowy w sprawach RODO",
          content: (
            <>
              <P>
                Administrator dokonał analizy obowiązku wyznaczenia{" "}
                <Strong>Inspektora Ochrony Danych (IOD)</Strong> zgodnie z
                art. 37 RODO. Ze względu na skalę i charakter prowadzonej
                działalności (brak przetwarzania danych wrażliwych na dużą
                skalę jako działalności podstawowej, brak statusu organu
                publicznego) wyznaczenie IOD nie jest aktualnie prawnie
                wymagane.
              </P>
              <P>
                W celu zapewnienia sprawnej obsługi wszystkich zapytań
                związanych z ochroną danych osobowych Administrator wyznaczył{" "}
                <Strong>dedykowany punkt kontaktowy</Strong>:
              </P>
              <Table
                rows={[
                  ["Adres e-mail RODO", <a key="rodo-mail" href="mailto:rodo@omegaworkforce.pl" className="text-accent hover:underline">rodo@omegaworkforce.pl</a>],
                  ["Adres pocztowy", "Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687 Poznań (z dopiskiem: RODO)"],
                  ["Czas odpowiedzi", "Bez zbędnej zwłoki, nie dłużej niż 1 miesiąc od otrzymania żądania (art. 12 ust. 3 RODO). W uzasadnionych przypadkach termin może zostać przedłużony o kolejne 2 miesiące."],
                  ["Eskalacja do UODO", "Jeżeli Użytkownik uzna, że jego prawa nie zostały należycie zrealizowane, ma prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, e-mail: kancelaria@uodo.gov.pl, tel. 606 950 000."],
                ]}
              />
              <WarnBox>
                Przed wniesieniem skargi do UODO zachęcamy do uprzedniego
                skontaktowania się z nami — w wielu przypadkach jesteśmy w
                stanie szybko wyjaśnić wątpliwości lub naprawić ewentualne
                uchybienia.
              </WarnBox>
            </>
          ),
        },

        /* ──────────────────────────────── 3 · Kategorie osób */
        {
          heading: "§ 3  Kategorie osób, których dane przetwarzamy",
          content: (
            <>
              <P>
                Administrator przetwarza dane osobowe następujących kategorii
                osób fizycznych:
              </P>
              <div className="space-y-3 my-4">
                {[
                  {
                    num: "1",
                    label: "Użytkownicy Serwisu",
                    desc: "Osoby odwiedzające stronę www.omegaworkforce.pl, wypełniające formularze kontaktowe, subskrybujące newsletter lub zapisujące się na eventy. Dane zbierane są głównie automatycznie (pliki cookie, logi serwera) lub na podstawie dobrowolnie uzupełnionych formularzy.",
                  },
                  {
                    num: "2",
                    label: "Kandydaci do pracy",
                    desc: "Osoby fizyczne ubiegające się o pracę lub nawiązanie współpracy B2B (JDG) za pośrednictwem Agencji — zarówno na potrzeby bieżących rekrutacji, jak i w celu umieszczenia w bazie talentów (za odrębną zgodą). Obejmuje osoby przesyłające CV, aplikujące przez formularz online, portale pracy (Pracuj.pl, OLX, LinkedIn) lub zgłaszające się bezpośrednio.",
                  },
                  {
                    num: "3",
                    label: "Podwykonawcy JDG",
                    desc: "Osoby fizyczne prowadzące jednoosobową działalność gospodarczą, które zawarły lub zamierzają zawrzeć z Administratorem umowę o świadczenie usług (tzw. współpraca B2B). Dane przetwarzane są w celach kontraktowych, finansowo-podatkowych i prawnych.",
                  },
                  {
                    num: "4",
                    label: "Klienci instytucjonalni i ich reprezentanci",
                    desc: "Osoby fizyczne działające w imieniu podmiotów prawnych (spółek, instytucji) będących klientami Agencji — w tym członkowie zarządów, pełnomocnicy, prokurentach — których dane pojawiają się w umowach, pełnomocnictwach i dokumentach handlowych.",
                  },
                  {
                    num: "5",
                    label: "Osoby kontaktowe po stronie Klientów",
                    desc: "Pracownicy, kierownicy, koordynatorzy i inne osoby wskazane przez Klienta jako punkty kontaktowe do bieżącej współpracy operacyjnej z Agencją (np. osoba odpowiedzialna za odbiór pracowników tymczasowych, koordynator ds. kadr). Dane pozyskiwane są od samego Klienta.",
                  },
                  {
                    num: "6",
                    label: "Pracownicy i współpracownicy Administratora",
                    desc: "Osoby zatrudnione na podstawie umowy o pracę, umowy zlecenia lub innego stosunku prawnego bezpośrednio u Administratora. Zakres przetwarzania danych pracowniczych regulują odrębne dokumenty (regulamin pracy, umowy, polityki wewnętrzne) zgodne z Kodeksem pracy.",
                  },
                ].map(({ num, label, desc }) => (
                  <div
                    key={num}
                    className="flex gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                      {num}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-fg mb-0.5">{label}</p>
                      <p className="text-sm text-fg-muted">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ),
        },

        /* ──────────────────────────── 4 · Cele i podstawy prawne */
        {
          heading: "§ 4  Cele i podstawy prawne przetwarzania",
          content: (
            <>
              <P>
                Poniżej przedstawiamy szczegółowe cele przetwarzania danych
                wraz z ich podstawami prawnymi dla każdej kategorii osób,
                których dane dotyczą.
              </P>

              <SubHeading>A. Użytkownicy Serwisu</SubHeading>
              <ThreeColTable
                headers={["Cel przetwarzania", "Podstawa prawna", "Uwagi"]}
                rows={[
                  ["Obsługa zapytania z formularza kontaktowego / ofertowego", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes Administratora (odpowiedź na zapytanie)", "Dane przechowywane do 12 mies. od ostatniego kontaktu"],
                  ["Wysyłka newslettera i materiałów marketingowych", "Art. 6 ust. 1 lit. a RODO — zgoda osoby", "Zgoda odwoływalna w każdej chwili; link do rezygnacji w każdym mailu"],
                  ["Analiza ruchu i statystyki Serwisu (Google Analytics)", "Art. 6 ust. 1 lit. a RODO — zgoda na cookies analityczne", "Przetwarzanie anonimizowane po 14 mies."],
                  ["Działania remarketingowe i personalizacja reklam", "Art. 6 ust. 1 lit. a RODO — zgoda na cookies marketingowe", "Tylko po wyrażeniu zgody w bannerze cookie"],
                  ["Zapewnienie bezpieczeństwa Serwisu i zapobieganie nadużyciom", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes (bezpieczeństwo IT)", "Logi serwera, analiza anomalii — bez zbędnej zwłoki usuwane"],
                  ["Obsługa kont użytkownika (jeśli dotyczy)", "Art. 6 ust. 1 lit. b RODO — wykonanie umowy o świadczenie usług elektronicznych", "Dane konta do czasu usunięcia konta"],
                ]}
              />

              <SubHeading>B. Kandydaci do pracy</SubHeading>
              <ThreeColTable
                headers={["Cel przetwarzania", "Podstawa prawna", "Uwagi"]}
                rows={[
                  ["Prowadzenie procesu rekrutacji / onboardingu", "Art. 6 ust. 1 lit. b RODO — podjęcie działań na żądanie przed zawarciem umowy; art. 6 ust. 1 lit. a — zgoda (zakres wykraczający poza art. 221 KP)", "Minimalna aplikacja: zakres z art. 221 § 1 KP"],
                  ["Przekazanie danych kandydata Klientowi (pracodawcy)", "Art. 6 ust. 1 lit. b RODO — realizacja usługi pośrednictwa pracy", "Klient staje się odrębnym administratorem po otrzymaniu danych"],
                  ["Realizacja obowiązków z ustawy o promocji zatrudnienia (KRAZ)", "Art. 6 ust. 1 lit. c RODO — obowiązek prawny", "Ustawa z 20.04.2004 r., rozp. MPiPS"],
                  ["Utrzymanie bazy talentów na potrzeby przyszłych rekrutacji", "Art. 6 ust. 1 lit. a RODO — odrębna, wyraźna zgoda kandydata", "Zgoda odwoływalna; max. 2 lata"],
                  ["Weryfikacja wiarygodności i kwalifikacji (w tym referencje)", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes / art. 6 ust. 1 lit. a — zgoda (przy poufnych referencjach)", "Kandydat informowany o zakresie weryfikacji"],
                  ["Dochodzenie lub obrona roszczeń prawnych", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes Administratora", "Tylko w przypadku sporu; po jego zakończeniu — usunięcie"],
                ]}
              />

              <SubHeading>C. Podwykonawcy JDG</SubHeading>
              <ThreeColTable
                headers={["Cel przetwarzania", "Podstawa prawna", "Uwagi"]}
                rows={[
                  ["Zawarcie i realizacja umowy o współpracy B2B", "Art. 6 ust. 1 lit. b RODO — wykonanie umowy", "Obejmuje cały cykl życia umowy"],
                  ["Wystawianie faktur, rozliczenia VAT i PIT", "Art. 6 ust. 1 lit. c RODO — obowiązek prawny (ustawa o VAT, ustawa o PIT)", "Archiwizacja 5 lat od końca roku podatkowego"],
                  ["Weryfikacja statusu w CEIDG i KRS, weryfikacja AML", "Art. 6 ust. 1 lit. c RODO — obowiązek prawny (ustawa o PZP, ustawa AML)", "Dane z rejestrów publicznych"],
                  ["Bieżąca koordynacja i komunikacja operacyjna", "Art. 6 ust. 1 lit. b i f RODO — wykonanie umowy / uzasadniony interes", "E-mail, telefon, komunikatory"],
                  ["Przekazanie danych Klientom jako zleceniodawcom", "Art. 6 ust. 1 lit. b RODO — realizacja usługi", "Zakres minimalny — imię, nazwisko, kontakt, kwalifikacje"],
                  ["Marketing bezpośredni własnych usług Administratora", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes z prawem sprzeciwu", "Prawo sprzeciwu jest bezwzględne (art. 21 ust. 2 RODO)"],
                ]}
              />

              <SubHeading>D. Klienci instytucjonalni i osoby kontaktowe</SubHeading>
              <ThreeColTable
                headers={["Cel przetwarzania", "Podstawa prawna", "Uwagi"]}
                rows={[
                  ["Zawarcie i realizacja umowy o świadczenie usług agencyjnych", "Art. 6 ust. 1 lit. b RODO — wykonanie umowy / art. 6 ust. 1 lit. f — uzasadniony interes (reprezentanci)", "Reprezentanci = uzasadniony interes firmy-klienta"],
                  ["Fakturowanie, rachunkowość, rozliczenia", "Art. 6 ust. 1 lit. c RODO — obowiązek prawny", "Ustawa o rachunkowości art. 74"],
                  ["Bieżąca komunikacja handlowa i operacyjna", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes", "Obejmuje osoby kontaktowe wskazane przez Klienta"],
                  ["Weryfikacja kontrahenta (KRS, CEIDG, biała lista VAT)", "Art. 6 ust. 1 lit. c i f RODO", "Dochowanie należytej staranności"],
                  ["Dochodzenie lub obrona roszczeń", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes", "Do czasu przedawnienia roszczenia (art. 118 KC)"],
                  ["Marketing bezpośredni e-mail / telefon", "Art. 6 ust. 1 lit. f RODO (B2B) / art. 6 ust. 1 lit. a (konsumenci)", "Prawo sprzeciwu; ustawa o świadczeniu usług drogą elektroniczną"],
                ]}
              />

              <SubHeading>E. Pracownicy i współpracownicy Administratora</SubHeading>
              <ThreeColTable
                headers={["Cel przetwarzania", "Podstawa prawna", "Uwagi"]}
                rows={[
                  ["Realizacja stosunku pracy / zlecenia (kadrowo-płacowe)", "Art. 6 ust. 1 lit. b i c RODO — umowa / obowiązek prawny (Kodeks pracy, ustawa o PIT, ustawa o ubezpieczeniach)", "Dokumentacja pracownicza — 10 lub 50 lat (ustawa archiwalna)"],
                  ["Rozliczenia z ZUS i Urzędem Skarbowym", "Art. 6 ust. 1 lit. c RODO — obowiązek prawny", ""],
                  ["Bezpieczeństwo zakładu pracy, ochrona tajemnicy przedsiębiorstwa", "Art. 6 ust. 1 lit. f RODO — uzasadniony interes", "NDA, polityki bezpieczeństwa"],
                  ["Szkolenia, oceny pracownicze, rozwój zawodowy", "Art. 6 ust. 1 lit. b i f RODO", ""],
                  ["Monitoring służbowych urządzeń i poczty (jeśli wdrożony)", "Art. 6 ust. 1 lit. c i f RODO; art. 223 KP", "Wyłącznie po uprzednim poinformowaniu pracowników"],
                ]}
              />
            </>
          ),
        },

        /* ──────────────────────── 5 · Kategorie przetwarzanych danych */
        {
          heading: "§ 5  Kategorie przetwarzanych danych osobowych",
          content: (
            <>
              <P>
                Poniżej wyszczególniamy konkretne rodzaje danych osobowych
                zbieranych w odniesieniu do każdej kategorii osób.
              </P>
              <div className="space-y-3 my-4">
                {[
                  {
                    label: "1. Użytkownicy Serwisu",
                    items: [
                      "Adres IP i dane techniczne przeglądarki (User-Agent, rozdzielczość ekranu)",
                      "Pliki cookie i lokalne identyfikatory sesji",
                      "Data, godzina i źródło wizyty (URL referreru)",
                      "Przeglądane podstrony i czas spędzony na stronie",
                      "Imię i adres e-mail (formularz kontaktowy / newsletter — podanie dobrowolne)",
                      "Treść zapytania przesłanego przez formularz",
                    ],
                  },
                  {
                    label: "2. Kandydaci do pracy",
                    items: [
                      "Imię i nazwisko, data urodzenia",
                      "Adres zamieszkania / korespondencyjny",
                      "Numer PESEL (wymagany przez przepisy o zatrudnieniu)",
                      "Seria i numer dokumentu tożsamości",
                      "Adres e-mail i numer telefonu",
                      "Wykształcenie, historia zatrudnienia, kwalifikacje zawodowe i certyfikaty",
                      "Znajomość języków obcych i inne umiejętności",
                      "Zdjęcie (jeśli zamieszczone w CV — wyłącznie za zgodą kandydata)",
                      "Dane JDG: NIP, REGON, numer konta bankowego (IBAN), adres firmy",
                      "Wyniki testów kompetencji (jeśli przeprowadzane)",
                    ],
                  },
                  {
                    label: "3. Podwykonawcy JDG",
                    items: [
                      "Imię i nazwisko, PESEL, data i miejsce urodzenia",
                      "Seria i numer dokumentu tożsamości, organ wydający",
                      "Adres zameldowania i zamieszkania",
                      "Adres e-mail, numer telefonu",
                      "Firma, adres prowadzenia działalności, NIP, REGON, numer CEIDG",
                      "Numer rachunku bankowego (IBAN), nazwa banku",
                      "Status rezydencji podatkowej, urząd skarbowy",
                      "Kod PKD, data wpisu do CEIDG, zawieszenia działalności",
                    ],
                  },
                  {
                    label: "4. Klienci instytucjonalni / reprezentanci",
                    items: [
                      "Imię i nazwisko, stanowisko w firmie",
                      "Adres e-mail służbowy i numer telefonu służbowego",
                      "Dane firmy: pełna nazwa, NIP, REGON, KRS, adres siedziby",
                      "Dane do fakturowania",
                      "Pełnomocnictwa i upoważnienia (skan podpisu, zakres uprawnień)",
                    ],
                  },
                  {
                    label: "5. Osoby kontaktowe po stronie Klientów",
                    items: [
                      "Imię i nazwisko",
                      "Stanowisko i dział",
                      "Adres e-mail służbowy",
                      "Numer telefonu służbowego lub komórkowego",
                    ],
                  },
                  {
                    label: "6. Pracownicy i współpracownicy Administratora",
                    items: [
                      "Dane osobowe wskazane w Kodeksie pracy (art. 221 KP)",
                      "PESEL, seria i numer dokumentu tożsamości",
                      "Adres zamieszkania, adres do korespondencji",
                      "Numer rachunku bankowego",
                      "Dane członków rodziny (do celów ubezpieczeniowych / podatkowych)",
                      "Informacje o wykształceniu i kwalifikacjach zawodowych",
                      "Dane o nieobecnościach, urlopach, orzeczenia lekarskie (medycyna pracy)",
                    ],
                  },
                ].map(({ label, items }) => (
                  <div
                    key={label}
                    className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <p className="text-sm font-semibold text-fg mb-2">{label}</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {items.map((item, i) => (
                        <li key={i} className="text-sm text-fg-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <WarnBox>
                <strong>Dane szczególnych kategorii (art. 9 RODO):</strong>{" "}
                Administrator co do zasady nie przetwarza danych szczególnych
                kategorii (dane dotyczące zdrowia, orientacji seksualnej,
                przekonań politycznych, religijnych, przynależności związkowej,
                danych genetycznych ani biometrycznych). Wyjątkiem są dane o{" "}
                <strong>niepełnosprawności lub stanie zdrowia kandydata</strong>{" "}
                przekazane dobrowolnie w celu dostosowania stanowiska pracy —
                przetwarzane wyłącznie na podstawie{" "}
                <strong>wyraźnej zgody (art. 9 ust. 2 lit. a RODO)</strong>.
              </WarnBox>
            </>
          ),
        },

        /* ──────────── 6 · Obowiązkowość i skutki niepodania danych */
        {
          heading: "§ 6  Obowiązkowość i skutki niepodania danych",
          content: (
            <>
              <P>
                Poniższa tabela wyjaśnia, które dane są obowiązkowe, jaka jest
                podstawa tego obowiązku i co grozi ich niepodaniem.
              </P>
              <ThreeColTable
                headers={["Sytuacja", "Czy podanie obowiązkowe?", "Skutek niepodania"]}
                rows={[
                  ["Zawarcie umowy o pracę / B2B (podwykonawca, klient)", "Tak — zakres wymagany przez przepisy (Kodeks pracy, ustawa o PIT, ustawa o VAT)", "Niemożność zawarcia umowy lub jej realizacji"],
                  ["Uczestnictwo w procesie rekrutacyjnym", "Tak — zakres z art. 221 § 1 KP (imię, nazwisko, data urodzenia, wykształcenie, historia zatrudnienia)", "Brak możliwości udziału w rekrutacji"],
                  ["Podanie danych dodatkowych w CV (zdjęcie, zainteresowania)", "Nie — dobrowolne", "Brak wpływu na proces rekrutacji; dane ignorowane lub usuwane na żądanie"],
                  ["Wypełnienie formularza kontaktowego w Serwisie", "Tak — imię i adres e-mail (pola oznaczone *)", "Brak możliwości udzielenia odpowiedzi na zapytanie"],
                  ["Subskrypcja newslettera", "Tak — adres e-mail", "Brak możliwości przesyłania newslettera"],
                  ["Rejestracja konta użytkownika (jeśli dotyczy)", "Tak — imię lub nick, adres e-mail, hasło", "Brak możliwości utworzenia konta"],
                  ["Zgoda na pliki cookie analityczne / marketingowe", "Nie — wyłącznie dobrowolna zgoda", "Serwis działa w trybie podstawowym; brak personalizacji i analityki"],
                  ["Dane o niepełnosprawności / zdrowiu", "Nie — wyłącznie dobrowolna zgoda art. 9 RODO", "Brak dostosowania miejsca pracy; brak przeszkód w rekrutacji"],
                ]}
              />
            </>
          ),
        },

        /* ───────────────────── 7 · Okres przechowywania danych */
        {
          heading: "§ 7  Okres przechowywania danych",
          content: (
            <>
              <P>
                Dane osobowe przechowywane są przez okres niezbędny do
                realizacji celów, dla których zostały zebrane, z
                uwzględnieniem obowiązujących przepisów prawa. Po upływie
                okresu przechowywania dane są anonimizowane lub trwale
                usuwane.
              </P>
              <Table
                rows={[
                  ["Kandydaci — bieżąca rekrutacja", "Do zakończenia procesu rekrutacyjnego lub maksymalnie 6 miesięcy od ostatniego kontaktu, chyba że kandydat wyraził zgodę na bazę talentów"],
                  ["Kandydaci — baza talentów (za zgodą)", "Do cofnięcia zgody, nie dłużej niż 2 lata od jej wyrażenia"],
                  ["Dane wysłane w CV przez portal zewnętrzny", "Jak wyżej — do 6 mies. bez zgody lub do 2 lat za zgodą na bazę talentów"],
                  ["Podwykonawcy JDG — dane kontraktowe i korespondencja", "6 lat od zakończenia umowy (art. 118 KC — termin przedawnienia roszczeń)"],
                  ["Podwykonawcy JDG — dokumenty księgowe / faktury", "5 lat od końca roku podatkowego, którego dotyczy dokument (art. 74 ust. 2 ustawy o rachunkowości)"],
                  ["Klienci / Kontrahenci — dokumenty umowne", "6 lat od zakończenia współpracy lub ostatniej transakcji (art. 118 KC)"],
                  ["Faktury VAT i dokumenty rachunkowe", "5 lat od końca roku podatkowego (art. 86 ust. 1 ustawy o VAT; art. 74 ustawy o rachunkowości)"],
                  ["Formularz kontaktowy / e-mail zapytanie", "12 miesięcy od ostatniego kontaktu — chyba że nawiązano współpracę (wtedy: j.w.)"],
                  ["Newsletter / marketing e-mail", "Do cofnięcia zgody lub wniesienia sprzeciwu; następnie niezwłoczne usunięcie"],
                  ["Pliki cookie sesyjne", "Do zamknięcia przeglądarki"],
                  ["Pliki cookie analityczne (Google Analytics)", "Maksymalnie 24 miesiące od ostatniej aktywności (konfiguracja GA4)"],
                  ["Pliki cookie marketingowe", "Maksymalnie 13 miesięcy lub do wycofania zgody"],
                  ["Logi serwera (adresy IP, User-Agent)", "12 miesięcy od daty wpisu (bezpieczeństwo IT)"],
                  ["Dokumentacja pracownicza — pracownicy zatrudnieni od 1.01.2019 r.", "10 lat od końca roku, w którym rozwiązano stosunek pracy (art. 94 pkt 9b KP po nowelizacji ustawą z 10.01.2018 r.)"],
                  ["Dokumentacja pracownicza — pracownicy zatrudnieni do 31.12.2018 r.", "50 lat od dnia rozwiązania stosunku pracy (art. 94 pkt 9b KP — stara reguła), chyba że pracodawca złożył oświadczenie o skróceniu do 10 lat (ZUS OSW)"],
                  ["Dane w związku z roszczeniami lub postępowaniami sądowymi", "Do prawomocnego zakończenia postępowania + 1 rok na wypadek wznowienia; co najmniej przez czas przedawnienia roszczenia"],
                ]}
              />
              <InfoBox>
                Po upływie okresu przechowywania dane są usuwane lub
                anonimizowane w sposób uniemożliwiający identyfikację osoby.
                Backup danych usuwa się w cyklu zgodnym z polityką retencji
                kopii zapasowych (max. 90 dni po usunięciu z bazy głównej).
              </InfoBox>
            </>
          ),
        },

        /* ────────────────────────── 8 · Odbiorcy danych */
        {
          heading: "§ 8  Odbiorcy i kategorie odbiorców danych",
          content: (
            <>
              <P>
                Administrator może udostępniać dane osobowe następującym
                kategoriom odbiorców. Dane nie są sprzedawane ani
                wynajmowane podmiotom zewnętrznym w celach komercyjnych.
              </P>

              <SubHeading>a) Podmioty przetwarzające — umowy powierzenia (art. 28 RODO)</SubHeading>
              <P>
                Administrator zawarł lub zawrze umowy powierzenia
                przetwarzania danych osobowych z następującymi kategoriami
                podmiotów przetwarzających:
              </P>
              <Table
                rows={[
                  ["Dostawca hostingu i infrastruktury chmurowej", "Przechowywanie danych Serwisu i bazy danych na serwerach w EOG"],
                  ["System CRM / ATS (zarządzanie kandydatami)", "Narzędzia do zarządzania bazą kandydatów, procesami rekrutacji i komunikacją"],
                  ["Platforma e-mail marketingowej (newsletter)", "Wysyłka newslettera, zarządzanie listami subskrybentów, raportowanie otwarć"],
                  ["Oprogramowanie kadrowo-płacowe", "Przetwarzanie danych pracowników i podwykonawców w celach kadrowych i rozliczeń"],
                  ["Narzędzia analityczne (Google Analytics 4)", "Analiza ruchu w Serwisie, statystyki, optymalizacja UX"],
                  ["System do e-podpisów i obiegu dokumentów", "Zawieranie umów elektronicznych, archiwizacja podpisanych dokumentów"],
                  ["Firma IT i serwisująca infrastrukturę", "Dostęp techniczny niezbędny do utrzymania i bezpieczeństwa systemów"],
                ]}
              />

              <SubHeading>b) Administratorzy odrębni</SubHeading>
              <P>
                Poniższe podmioty działają jako odrębni administratorzy
                danych — przetwarzają je na własnych zasadach i we własnych
                celach:
              </P>
              <Table
                rows={[
                  ["Klienci agencji (pracodawcy, zleceniodawcy)", "Otrzymują dane kandydatów / podwykonawców w celu realizacji usługi pośrednictwa; dalsze przetwarzanie na ich odpowiedzialność"],
                  ["Biuro rachunkowe / doradca podatkowy", "Obsługa ksiąg rachunkowych, rozliczeń podatkowych i ZUS"],
                  ["Kancelaria prawna", "Obsługa prawna, dochodzenie roszczeń, reprezentacja w postępowaniach"],
                  ["Zakład Ubezpieczeń Społecznych (ZUS)", "Zgłoszenia ubezpieczeniowe, rozliczenia składek — na podstawie prawa"],
                  ["Urząd Skarbowy / Krajowa Administracja Skarbowa", "Rozliczenia podatkowe — na podstawie prawa"],
                  ["Państwowa Inspekcja Pracy (PIP)", "Kontrole legalności zatrudnienia — na podstawie prawa"],
                  ["Urząd Ochrony Danych Osobowych (UODO)", "Postępowania administracyjne — na żądanie organu lub w przypadku incydentu"],
                  ["Sądy i organy ścigania", "Wyłącznie na podstawie nakazu sądowego lub przepisu prawa"],
                ]}
              />

              <SubHeading>c) Inne podmioty</SubHeading>
              <Table
                rows={[
                  ["Operatorzy pocztowi i kurierzy", "Doręczanie korespondencji pisemnej — imię, nazwisko, adres"],
                  ["Banki i instytucje płatnicze", "Realizacja przelewów — niezbędny zakres do wykonania transakcji"],
                  ["Platforma ogłoszeń o pracę (Pracuj.pl, OLX, LinkedIn)", "Przekazanie ogłoszenia i zarządzanie aplikacjami — zgodnie z regulaminami tych serwisów"],
                ]}
              />
            </>
          ),
        },

        /* ─────────────── 9 · Przekazywanie do państw trzecich */
        {
          heading: "§ 9  Przekazywanie danych do państw trzecich",
          content: (
            <>
              <P>
                Dane osobowe przetwarzane przez Administratora są zasadniczo
                przechowywane na serwerach zlokalizowanych w{" "}
                <Strong>Europejskim Obszarze Gospodarczym (EOG)</Strong>.
                W niektórych przypadkach korzystanie z narzędzi
                technologicznych może wiązać się z transferem danych do{" "}
                <Strong>państw trzecich</Strong> (spoza EOG). Odbywa się to
                wyłącznie z zachowaniem odpowiednich zabezpieczeń:
              </P>
              <Table
                rows={[
                  ["Google LLC (USA) — Analytics, Workspace", "Decyzja adekwatności dla USA w ramach EU-U.S. Data Privacy Framework (art. 45 RODO) od 10.07.2023 r.; Google LLC certyfikowane w DPF"],
                  ["Meta Platforms Ireland / Meta USA — Facebook, Instagram (jeśli stosowane)", "Standardowe klauzule umowne (SCC) przyjęte przez Komisję Europejską decyzją z 4.06.2021 r. (art. 46 ust. 2 lit. c RODO)"],
                  ["LinkedIn Ireland / LinkedIn USA", "EU-U.S. Data Privacy Framework (certyfikacja LinkedIn) + SCC jako zabezpieczenie uzupełniające"],
                  ["Inne narzędzia SaaS (jeśli wdrożone)", "Każdorazowo na podstawie SCC lub decyzji adekwatności — informacja dostępna w polityce prywatności danego dostawcy"],
                ]}
              />
              <InfoBox>
                Osoba, której dane dotyczą, ma prawo uzyskać kopię
                zastosowanych zabezpieczeń transferu (np. treść standardowych
                klauzul umownych) — wystarczy skierować wniosek na{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="text-accent hover:underline"
                >
                  rodo@omegaworkforce.pl
                </a>
                .
              </InfoBox>
            </>
          ),
        },

        /* ─────────────────────── 10 · Prawa osób */
        {
          heading: "§ 10  Prawa osób, których dane dotyczą",
          content: (
            <>
              <P>
                Każdej osobie fizycznej, której dane osobowe przetwarza
                Administrator, przysługują następujące prawa wynikające z
                Rozdziału III RODO:
              </P>
              <Table
                rows={[
                  ["Prawo dostępu (art. 15 RODO)", "Uzyskanie potwierdzenia, czy dane są przetwarzane; wgląd w ich treść; informacja o celach, odbiorcach, okresie przechowywania; bezpłatna kopia danych."],
                  ["Prawo do sprostowania (art. 16 RODO)", "Żądanie niezwłocznego poprawienia nieprawidłowych danych lub uzupełnienia niekompletnych."],
                  ["Prawo do usunięcia — prawo do bycia zapomnianym (art. 17 RODO)", "Żądanie usunięcia danych, gdy: nie są już potrzebne do celów, w których zostały zebrane; cofnięto zgodę; wniesiono skuteczny sprzeciw; przetwarzanie niezgodne z prawem."],
                  ["Prawo do ograniczenia przetwarzania (art. 18 RODO)", "Żądanie zawieszenia operacji na danych (bez usuwania) w przypadkach określonych w art. 18 RODO (np. kwestionowanie prawidłowości danych)."],
                  ["Prawo do przenoszenia danych (art. 20 RODO)", "Otrzymanie danych w ustrukturyzowanym, powszechnie używanym, nadającym się do odczytu maszynowego formacie (np. JSON, CSV) lub bezpośrednie przesłanie do innego administratora — dotyczy danych przetwarzanych na podstawie zgody lub umowy."],
                  ["Prawo sprzeciwu (art. 21 RODO)", "Sprzeciw wobec przetwarzania opartego na uzasadnionym interesie (art. 6 ust. 1 lit. f) — w tym profilowania. Administrator przestaje przetwarzać dane, chyba że wykaże ważne prawnie uzasadnione podstawy nadrzędne. Sprzeciw wobec marketingu bezpośredniego — skutek bezwzględny (art. 21 ust. 2)."],
                  ["Prawo cofnięcia zgody (art. 7 ust. 3 RODO)", "Wycofanie w dowolnym momencie, bez podawania przyczyny, bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem zgody."],
                  ["Prawo wniesienia skargi do UODO (art. 77 RODO)", "Skargę wnosi się do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa; e-mail: kancelaria@uodo.gov.pl; tel. 606 950 000."],
                ]}
              />
              <SubHeading>Jak złożyć wniosek?</SubHeading>
              <P>
                Wniosek można złożyć:{" "}
                <Strong>
                  (a) e-mailem na rodo@omegaworkforce.pl
                </Strong>{" "}
                lub{" "}
                <Strong>
                  (b) pisemnie na adres siedziby
                </Strong>{" "}
                (os. Stefana Batorego 14/81, 60-687 Poznań) z dopiskiem{" "}
                <em>Wniosek RODO</em>. Wniosek powinien zawierać: imię i
                nazwisko, dane kontaktowe, opis żądania. Jeśli tożsamość
                wnioskodawcy budzi wątpliwości, Administrator może poprosić
                o jej dodatkowe potwierdzenie.
              </P>
              <P>
                Administrator odpowiada bez zbędnej zwłoki, nie dłużej niż w
                terminie <Strong>1 miesiąca</Strong> od otrzymania żądania. W
                uzasadnionych przypadkach (złożoność, liczba wniosków) termin
                może zostać przedłużony o kolejne{" "}
                <Strong>2 miesiące</Strong> — z powiadomieniem wnioskodawcy.
                Realizacja praw jest{" "}
                <Strong>bezpłatna</Strong>, z wyjątkiem ewidentnie
                nieuzasadnionych lub nadmiernych żądań (art. 12 ust. 5 RODO).
              </P>
            </>
          ),
        },

        /* ───────────────────────── 11 · Pliki cookie */
        {
          heading: "§ 11  Pliki cookie i podobne technologie",
          content: (
            <>
              <SubHeading>a) Czym są pliki cookie?</SubHeading>
              <P>
                Pliki cookie to małe pliki tekstowe zapisywane na urządzeniu
                końcowym Użytkownika (komputer, tablet, smartfon) przez
                przeglądarkę internetową w chwili odwiedzania strony. Służą
                do rozpoznawania urządzenia przy kolejnych wizytach,
                przechowywania preferencji oraz zbierania anonimowych
                statystyk.
              </P>

              <SubHeading>b) Typy plików cookie stosowanych w Serwisie</SubHeading>
              <Table
                rows={[
                  ["Niezbędne (techniczne)", "Konieczne do prawidłowego działania Serwisu (np. sesja zalogowanego użytkownika, zapamiętanie zgody cookie). Nie wymagają zgody — podstawa: uzasadniony interes Administratora."],
                  ["Analityczne / statystyczne", "Zbierają anonimowe lub pseudonimowe dane o sposobie korzystania ze strony (liczba odwiedzin, czas sesji, ścieżki nawigacji). Podstawa: zgoda Użytkownika."],
                  ["Marketingowe / retargetingowe", "Umożliwiają wyświetlanie spersonalizowanych reklam na innych stronach (remarketing Google Ads, Meta Pixel). Podstawa: wyraźna zgoda Użytkownika."],
                  ["Preferencji / funkcjonalne", "Zapamiętują wybory Użytkownika (język, region, motyw kolorystyczny). Podstawa: zgoda lub uzasadniony interes."],
                  ["Podmiotów trzecich", "Umieszczane przez zewnętrznych dostawców (Google, Meta, LinkedIn) w związku z wtyczkami społecznościowymi lub narzędziami analitycznymi. Podlegają własnym politykom tych podmiotów."],
                ]}
              />

              <SubHeading>c) Szczegółowe informacje o stosowanych plikach cookie</SubHeading>
              <ThreeColTable
                headers={["Nazwa / wzorzec", "Dostawca / cel", "Typ / czas życia"]}
                rows={[
                  ["_omega_consent", "Omega Workforce — zapamiętanie wyboru zgody na cookie", "Niezbędny / 12 mies."],
                  ["_omega_session", "Omega Workforce — sesja zalogowanego użytkownika", "Niezbędny / sesja (do zamknięcia przeglądarki)"],
                  ["_ga, _ga_*", "Google Analytics 4 — identyfikator klienta GA, pomiar ruchu", "Analityczny / 24 mies."],
                  ["_gid", "Google Analytics — identyfikator sesji GA", "Analityczny / 24 godz."],
                  ["_gcl_au", "Google Ads / Adsense — atrybucja konwersji z reklam Google", "Marketingowy / 90 dni"],
                  ["_fbp, _fbc", "Meta (Facebook) Pixel — śledzenie konwersji i remarketing", "Marketingowy / 90 dni"],
                  ["li_*", "LinkedIn Insight Tag — analityka i remarketing LinkedIn", "Analityczny / Marketingowy / 30 dni — 1 rok"],
                  ["localStorage: omega_*", "Omega Workforce — preferencje UI (motyw, język) w localStorage", "Preferencji / bezterminowy (do ręcznego czyszczenia)"],
                ]}
              />

              <SubHeading>d) Zarządzanie plikami cookie — ustawienia przeglądarki</SubHeading>
              <P>
                Użytkownik może w dowolnym momencie zarządzać plikami cookie
                za pośrednictwem ustawień swojej przeglądarki lub przez panel
                zarządzania zgodami dostępny w stopce Serwisu. Poniżej
                wskazujemy ścieżki dla najpopularniejszych przeglądarek:
              </P>
              <Table
                rows={[
                  ["Google Chrome", "Menu (⋮) → Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn"],
                  ["Mozilla Firefox", "Menu (☰) → Ustawienia → Prywatność i bezpieczeństwo → Ciasteczka i dane witryn"],
                  ["Apple Safari (macOS/iOS)", "Safari → Ustawienia → Prywatność → Zarządzaj danymi witryn"],
                  ["Microsoft Edge", "Menu (…) → Ustawienia → Pliki cookie i uprawnienia witryny → Pliki cookie i dane witryn"],
                  ["Opera", "Menu → Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie"],
                ]}
              />
              <WarnBox>
                Zablokowanie wszystkich plików cookie może uniemożliwić
                prawidłowe działanie Serwisu. Pliki niezbędne są zawsze
                aktywne — ich wyłączenie jest możliwe tylko przez zmianę
                ustawień przeglądarki, co może zaburzyć podstawową
                funkcjonalność strony.
              </WarnBox>

              <SubHeading>e) Baner zgody na cookies</SubHeading>
              <P>
                Przy pierwszej wizycie Użytkownik widzi baner zgody na pliki
                cookie. Może zaakceptować wszystkie cookies, wybrać tylko
                niezbędne lub dostosować wybór w panelu szczegółowym. Wybór
                jest zapamiętywany przez 12 miesięcy. Zmiana decyzji jest
                możliwa w każdej chwili przez kliknięcie opcji{" "}
                <em>Zarządzaj zgodami</em> w stopce.
              </P>

              <SubHeading>f) localStorage i sessionStorage</SubHeading>
              <P>
                Serwis może korzystać z mechanizmów{" "}
                <Strong>localStorage</Strong> i{" "}
                <Strong>sessionStorage</Strong> przeglądarki do
                przechowywania preferencji interfejsu (motyw, język).
                localStorage przechowuje dane bezterminowo (do ręcznego
                wyczyszczenia), sessionStorage — wyłącznie do zamknięcia
                karty przeglądarki. Dane te są lokalne i nie są przesyłane
                na serwer Administratora.
              </P>
            </>
          ),
        },

        /* ─────────────────── 12 · Bezpieczeństwo */
        {
          heading: "§ 12  Bezpieczeństwo danych osobowych",
          content: (
            <>
              <P>
                Administrator wdrożył odpowiednie środki techniczne i
                organizacyjne w celu zapewnienia bezpieczeństwa danych
                osobowych zgodnie z art. 25 i 32 RODO, uwzględniając stan
                wiedzy technicznej, koszt wdrożenia, charakter, zakres,
                kontekst i cele przetwarzania.
              </P>
              <Table
                rows={[
                  ["Szyfrowanie transmisji", "Protokół TLS 1.2+ / HTTPS na wszystkich stronach Serwisu; certyfikat SSL wydany przez zaufany urząd certyfikacji"],
                  ["Szyfrowanie danych w spoczynku", "Wrażliwe dane (dane identyfikacyjne) szyfrowane w bazie danych (AES-256 lub odpowiednik)"],
                  ["Kontrola dostępu (RBAC)", "Zasada minimalnych uprawnień — dostęp do danych wyłącznie dla upoważnionych pracowników w zakresie niezbędnym do wykonania zadań"],
                  ["Polityka haseł", "Wymagania co do długości i złożoności haseł; obowiązkowe uwierzytelnienie dwuskładnikowe (2FA) dla kont administracyjnych"],
                  ["Regularne kopie zapasowe", "Automatyczne backupy bazy danych wg harmonogramu; testy przywracania; szyfrowane kopie przechowywane poza główną infrastrukturą"],
                  ["Aktualizacje i patche bezpieczeństwa", "Regularne aktualizacje oprogramowania serwerowego, CMS i bibliotek w celu eliminacji znanych podatności"],
                  ["Monitorowanie i audyty", "Logi dostępu i anomalii analizowane przez system SIEM; cykliczne przeglądy bezpieczeństwa; testy penetracyjne (pentest) minimum raz w roku"],
                  ["Szkolenia pracowników", "Cykliczne szkolenia z zakresu ochrony danych i bezpieczeństwa IT dla wszystkich pracowników mających dostęp do danych osobowych"],
                  ["Umowy o poufności (NDA)", "Wszystkie osoby przetwarzające dane osobowe podpisują umowę o zachowaniu poufności"],
                  ["Umowy powierzenia (DPA)", "Z każdym podmiotem przetwarzającym dane na zlecenie Administratora zawarta jest umowa powierzenia (art. 28 RODO)"],
                  ["Bezpieczeństwo fizyczne", "Dokumenty zawierające dane osobowe przechowywane w zamykanych szafach; zasady clean-desk; polityka niszczenia dokumentów (niszczarki przekrojowe, min. DIN 66399 P-4)"],
                  ["Procedura incydentów", "Wewnętrzna procedura reagowania na naruszenia ochrony danych; rejestr naruszeń prowadzony zgodnie z art. 33 ust. 5 RODO"],
                ]}
              />
            </>
          ),
        },

        /* ───────── 13 · Profilowanie i zautomatyzowane decyzje */
        {
          heading: "§ 13  Profilowanie i zautomatyzowane podejmowanie decyzji",
          content: (
            <>
              <P>
                Zgodnie z art. 22 RODO Administrator{" "}
                <Strong>
                  nie podejmuje decyzji opartych wyłącznie na
                  zautomatyzowanym przetwarzaniu danych
                </Strong>
                , które wywoływałyby wobec osoby fizycznej skutki prawne lub
                w podobny sposób istotnie na nią wpływały.
              </P>

              <SubHeading>Wstępna selekcja kandydatów (ATS)</SubHeading>
              <P>
                W procesach rekrutacyjnych Administrator może korzystać z
                systemu ATS (Applicant Tracking System), który automatycznie
                porównuje dane aplikacji (doświadczenie, kwalifikacje) z
                wymaganiami stanowiska i generuje ranking lub wstępną
                selekcję kandydatów. Działanie to stanowi{" "}
                <Strong>profilowanie</Strong> w rozumieniu art. 4 pkt 4 RODO.
                Każdorazowo jednak{" "}
                <Strong>
                  ostateczna decyzja rekrutacyjna jest podejmowana przez
                  człowieka
                </Strong>{" "}
                (rekrutera lub menedżera), który weryfikuje wyniki systemu.
                Kandydat ma prawo do informacji o zastosowaniu ATS i może
                zażądać ludzkiej analizy swojej aplikacji (art. 22 ust. 3
                RODO).
              </P>

              <SubHeading>Profilowanie w celach marketingowych (cookies)</SubHeading>
              <P>
                Na podstawie danych z plików cookie marketingowych (wyłącznie
                po wyrażeniu zgody) Administrator lub podmioty trzecie (Google
                Ads, Meta) mogą tworzyć profile zainteresowań w celu
                wyświetlania dopasowanych reklam. Użytkownik może w każdej
                chwili zrezygnować z profilowania marketingowego przez:{" "}
                <Strong>(a)</Strong> wycofanie zgody na cookies
                marketingowych w panelu zgód,{" "}
                <Strong>(b)</Strong> skorzystanie z narzędzi opt-out
                dostawców (Google Ads Settings, Meta Ad Preferences),{" "}
                <Strong>(c)</Strong> skorzystanie z inicjatywy{" "}
                <em>Your Online Choices</em> (youronlinechoices.eu).
              </P>
            </>
          ),
        },

        /* ──────────────── 14 · Naruszenia ochrony danych */
        {
          heading: "§ 14  Naruszenia ochrony danych (incydenty)",
          content: (
            <>
              <P>
                W przypadku stwierdzenia naruszenia ochrony danych osobowych
                Administrator stosuje procedury wymagane przez RODO:
              </P>
              <Table
                rows={[
                  ["Zgłoszenie do UODO (art. 33 RODO)", "W ciągu 72 godzin od stwierdzenia naruszenia — o ile jest prawdopodobne, że skutkuje ono ryzykiem dla praw i wolności osób fizycznych. Zgłoszenie zawiera opis zdarzenia, kategorię i przybliżoną liczbę osób, prawdopodobne konsekwencje i środki zaradcze."],
                  ["Powiadomienie osób (art. 34 RODO)", "Gdy naruszenie może powodować wysokie ryzyko dla osób — Administrator niezwłocznie (bez zbędnej zwłoki) informuje te osoby w jasny i przystępny sposób."],
                  ["Rejestr naruszeń (art. 33 ust. 5 RODO)", "Administrator prowadzi wewnętrzny rejestr wszystkich naruszeń ochrony danych (również tych niezgłaszanych do UODO), zawierający opis zdarzenia, skutki i podjęte działania naprawcze."],
                  ["Środki zaradcze", "Po każdym incydencie Administrator analizuje przyczynę, wdraża środki naprawcze i — jeśli to konieczne — aktualizuje procedury bezpieczeństwa."],
                ]}
              />
              <InfoBox>
                Jeśli podejrzewasz, że Twoje dane osobowe zostały naruszone
                lub nieautoryzowanie ujawnione, prosimy o niezwłoczne
                zgłoszenie na{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="text-accent hover:underline"
                >
                  rodo@omegaworkforce.pl
                </a>
                . Każde zgłoszenie traktujemy poważnie i reagujemy
                niezwłocznie.
              </InfoBox>
            </>
          ),
        },

        /* ────────────────────────── 15 · Dane dzieci */
        {
          heading: "§ 15  Dane osób poniżej 16. roku życia",
          content: (
            <>
              <P>
                Serwis www.omegaworkforce.pl{" "}
                <Strong>
                  nie jest kierowany do osób poniżej 16. roku życia
                </Strong>{" "}
                i nie gromadzi świadomie danych osobowych takich osób.
                Usługi pośrednictwa pracy adresowane są wyłącznie do osób
                pełnoletnich lub osób od 15. roku życia w zakresie
                dozwolonym przez Kodeks pracy (art. 190 KP — młodociani).
              </P>
              <P>
                Jeżeli Administrator stwierdzi, że dane osoby poniżej 16.
                roku życia zostały omyłkowo zgromadzone bez weryfikowalnej
                zgody rodzica lub opiekuna prawnego, niezwłocznie podejmie
                działania w celu ich usunięcia.
              </P>
              <P>
                Rodzice lub opiekunowie prawni, którzy uważają, że ich
                dziecko przekazało Administratorowi dane osobowe, mogą
                skontaktować się pod adresem{" "}
                <a
                  href="mailto:rodo@omegaworkforce.pl"
                  className="text-accent hover:underline"
                >
                  rodo@omegaworkforce.pl
                </a>{" "}
                — Administrator niezwłocznie zweryfikuje i usunie takie dane.
              </P>
            </>
          ),
        },

        /* ─────────── 16 · Linki zewnętrzne i media społecznościowe */
        {
          heading: "§ 16  Linki zewnętrzne i media społecznościowe",
          content: (
            <>
              <P>
                Serwis może zawierać linki do zewnętrznych stron
                internetowych oraz ikony lub wtyczki portali
                społecznościowych (LinkedIn, Facebook / Meta, TikTok, YouTube
                i inne). Administrator{" "}
                <Strong>
                  nie ponosi odpowiedzialności za polityki prywatności
                  prowadzone przez zewnętrznych operatorów
                </Strong>{" "}
                tych serwisów.
              </P>
              <P>
                Kliknięcie ikony lub przycisku mediów społecznościowych może
                skutkować przesłaniem danych do operatora danej platformy
                (adres IP, informacja o stronie, z której nastąpiło
                przejście), nawet jeśli Użytkownik nie jest zalogowany na
                tym portalu. Mechanizm ten wynika z architektury tych
                platform i jest poza bezpośrednią kontrolą Administratora.
              </P>
              <Table
                rows={[
                  ["LinkedIn (LinkedIn Ireland Unlimited Company)", "linkedin.com/legal/privacy-policy"],
                  ["Facebook / Meta (Meta Platforms Ireland Ltd)", "facebook.com/privacy/policy"],
                  ["TikTok (TikTok Technology Ltd / TikTok Inc.)", "tiktok.com/legal/privacy-policy"],
                  ["YouTube (Google Ireland Ltd)", "policies.google.com/privacy"],
                ]}
              />
              <P>
                Zachęcamy do zapoznania się z politykami prywatności
                powyższych serwisów przed udostępnieniem im swoich danych
                osobowych.
              </P>
            </>
          ),
        },

        /* ─────────────────── 17 · Zmiany Polityki i kontakt */
        {
          heading: "§ 17  Zmiany Polityki i kontakt",
          content: (
            <>
              <SubHeading>Procedura zmian</SubHeading>
              <P>
                Administrator zastrzega prawo do zmiany niniejszej Polityki
                Prywatności z przyczyn technicznych, prawnych lub
                organizacyjnych. O każdej istotnej zmianie Użytkownicy
                zostaną poinformowani z{" "}
                <Strong>co najmniej 14-dniowym wyprzedzeniem</Strong>{" "}
                poprzez komunikat na stronie głównej Serwisu lub (jeśli
                znamy adres e-mail) wiadomością e-mail.
              </P>
              <P>
                Aktualna wersja Polityki jest zawsze dostępna pod adresem:{" "}
                <Strong>www.omegaworkforce.pl/polityka-prywatnosci</Strong>.
                Wcześniejsze wersje są archiwizowane i dostępne na żądanie.
              </P>

              <SubHeading>Wersjonowanie</SubHeading>
              <Table
                rows={[
                  ["Wersja bieżąca", "2.0 — obowiązuje od 1 lipca 2025 r."],
                  ["Poprzednia wersja", "1.0 — obowiązywała od 1 marca 2024 r. do 30 czerwca 2025 r. (archiwum dostępne na żądanie)"],
                ]}
              />

              <SubHeading>Dane kontaktowe Administratora</SubHeading>
              <div className="my-3 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-1">
                <p className="font-bold text-fg">Omega Spółka z ograniczoną odpowiedzialnością</p>
                <p className="text-fg-muted">os. Stefana Batorego 14/81, 60-687 Poznań</p>
                <p className="text-fg-faint">
                  E-mail ogólny:{" "}
                  <a
                    href="mailto:kontakt@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    kontakt@omegaworkforce.pl
                  </a>
                </p>
                <p className="text-fg-faint">
                  E-mail RODO:{" "}
                  <a
                    href="mailto:rodo@omegaworkforce.pl"
                    className="hover:text-fg transition-colors"
                  >
                    rodo@omegaworkforce.pl
                  </a>
                </p>
                <p className="text-fg-faint">Tel.: +48 888 000 000</p>
                <p className="text-fg-faint">www.omegaworkforce.pl</p>
              </div>

              <InfoBox>
                Niniejsza Polityka Prywatności wersja 2.0 wchodzi w życie z
                dniem <strong>1 lipca 2025 r.</strong> i zastępuje wszelkie
                wcześniejsze wersje. Korzystając z Serwisu po tej dacie,
                potwierdzasz zapoznanie się z jej treścią.
              </InfoBox>
            </>
          ),
        },
      ]}
    />
  );
}
