import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Polityka Prywatności · Omega Workforce",
  description: "Zasady przetwarzania danych osobowych przez Omega Spółka z o.o. — zgodnie z RODO/GDPR.",
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

function TableRow({ left, right }: { left: string; right: string }) {
  return (
    <tr className="border-b border-white/[0.05]">
      <td className="py-2.5 pr-4 text-sm text-fg-muted w-1/2 align-top">{left}</td>
      <td className="py-2.5 text-sm text-fg-faint w-1/2 align-top">{right}</td>
    </tr>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
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

export default function PolitykaPrywatnosci() {
  return (
    <LegalPageLayout
      title="Polityka Prywatności"
      date="1 lipca 2025 r."
      version="1.0"
      pdfHref="/docs/polityka-prywatnosci.pdf"
      sections={[
        {
          heading: "Wstęp",
          content: (
            <>
              <P>
                Niniejsza Polityka Prywatności opisuje zasady przetwarzania danych osobowych przez{" "}
                <Strong>Omega Spółka z ograniczoną odpowiedzialnością</Strong> w związku z prowadzeniem serwisu
                internetowego <Strong>www.omegaworkforce.pl</Strong> oraz realizacją usług pośrednictwa pracy.
                Polityka spełnia obowiązki informacyjne wynikające z art. 13 i 14 Rozporządzenia RODO.
              </P>
            </>
          ),
        },
        {
          heading: "§ 1  Administrator danych osobowych",
          content: (
            <>
              <div className="my-3 px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-0.5">
                <p className="font-semibold text-fg">Omega Spółka z ograniczoną odpowiedzialnością</p>
                <p className="text-fg-muted">os. Stefana Batorego 14/81, 60-687 Poznań</p>
                <p className="text-fg-faint">KRS: 0000853422 · NIP: 781-201-17-24 · REGON: 386693099</p>
                <p className="text-fg-faint">e-mail: <a href="mailto:kontakt@omegaworkforce.pl" className="hover:text-fg transition-colors">kontakt@omegaworkforce.pl</a></p>
                <p className="text-fg-faint">RODO: <a href="mailto:rodo@omegaworkforce.pl" className="hover:text-fg transition-colors">rodo@omegaworkforce.pl</a></p>
                <p className="text-fg-faint">Prezes Zarządu: Paweł Klimankowicz</p>
              </div>
              <P>
                Administrator przetwarza dane osobowe zgodnie z Rozporządzeniem RODO (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                oraz z ustawą z dnia 10 maja 2018 r. o ochronie danych osobowych.
              </P>
              <P>
                We wszelkich sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem
                e-mail: <a href="mailto:rodo@omegaworkforce.pl" className="text-accent hover:underline">rodo@omegaworkforce.pl</a> lub pisemnie na adres siedziby Administratora.
              </P>
            </>
          ),
        },
        {
          heading: "§ 2  Kategorie osób, których dane są przetwarzane",
          content: (
            <ol className="list-decimal list-inside space-y-1.5">
              <Li><Strong>Użytkownicy Serwisu</Strong> – osoby przeglądające stronę, wypełniające formularze kontaktowe, zapisujące się do newslettera.</Li>
              <Li><Strong>Kandydaci</Strong> – osoby fizyczne ubiegające się o pracę lub nawiązanie współpracy B2B (JDG) za pośrednictwem Agencji.</Li>
              <Li><Strong>Podwykonawcy (JDG)</Strong> – osoby fizyczne prowadzące jednoosobową działalność gospodarczą, które zawarły lub zamierzają zawrzeć umowę o współpracy.</Li>
              <Li><Strong>Klienci / Kontrahenci</Strong> – osoby fizyczne będące przedsiębiorcami (JDG) lub reprezentanci klientów instytucjonalnych.</Li>
              <Li><Strong>Osoby kontaktowe po stronie Klientów</Strong> – pracownicy, managerowie i inne osoby wskazane przez Klientów do komunikacji z Agencją.</Li>
            </ol>
          ),
        },
        {
          heading: "§ 3  Cele i podstawy prawne przetwarzania danych",
          content: (
            <>
              <p className="text-sm font-semibold text-fg mb-2">A. Użytkownicy Serwisu</p>
              <Table rows={[
                ["Prowadzenie statystyk i analiza ruchu", "Art. 6 ust. 1 lit. f RODO – uzasadniony interes Administratora"],
                ["Odpowiedź na zapytanie z formularza", "Art. 6 ust. 1 lit. f RODO – uzasadniony interes (komunikacja)"],
                ["Wysyłka newslettera / materiałów marketingowych", "Art. 6 ust. 1 lit. a RODO – zgoda osoby"],
                ["Obsługa plików cookie", "Art. 6 ust. 1 lit. a RODO – zgoda (dla niezbędnych: uzasadniony interes)"],
              ]} />
              <p className="text-sm font-semibold text-fg mb-2 mt-4">B. Kandydaci</p>
              <Table rows={[
                ["Prowadzenie procesu rekrutacji / onboardingu JDG", "Art. 6 ust. 1 lit. b RODO; art. 6 ust. 1 lit. a RODO (zgoda)"],
                ["Przyszłe procesy rekrutacyjne (baza talentów)", "Art. 6 ust. 1 lit. a RODO – zgoda"],
                ["Obowiązki z ustawy o promocji zatrudnienia", "Art. 6 ust. 1 lit. c RODO – obowiązek prawny"],
                ["Dochodzenie roszczeń", "Art. 6 ust. 1 lit. f RODO – uzasadniony interes"],
              ]} />
              <p className="text-sm font-semibold text-fg mb-2 mt-4">C. Podwykonawcy (JDG) i Klienci</p>
              <Table rows={[
                ["Zawarcie i realizacja umowy", "Art. 6 ust. 1 lit. b RODO – wykonanie umowy"],
                ["Wystawianie faktur i rozliczenia finansowe", "Art. 6 ust. 1 lit. c RODO – obowiązek prawny"],
                ["Obowiązki prawne (AML, KRAZ)", "Art. 6 ust. 1 lit. c RODO – obowiązek prawny"],
                ["Bieżąca komunikacja, koordynacja zleceń", "Art. 6 ust. 1 lit. b i f RODO"],
                ["Dochodzenie roszczeń", "Art. 6 ust. 1 lit. f RODO – uzasadniony interes"],
                ["Marketing bezpośredni własnych usług", "Art. 6 ust. 1 lit. f RODO (z prawem sprzeciwu)"],
              ]} />
            </>
          ),
        },
        {
          heading: "§ 4  Kategorie przetwarzanych danych osobowych",
          content: (
            <>
              <div className="space-y-3">
                {[
                  { label: "Użytkownicy Serwisu", data: "adres IP, dane plików cookie, czas i źródło wizyty, przeglądane strony, opcjonalnie: imię, adres e-mail." },
                  { label: "Kandydaci", data: "imię i nazwisko, data urodzenia, adres zamieszkania, numer PESEL, seria i numer dokumentu tożsamości, adres e-mail, numer telefonu, wykształcenie, historia zatrudnienia, kwalifikacje zawodowe, znajomość języków; dane JDG (NIP, REGON, numer konta bankowego)." },
                  { label: "Podwykonawcy (JDG)", data: "imię i nazwisko, PESEL, seria i numer dokumentu tożsamości, adres zameldowania/zamieszkania, adres e-mail, numer telefonu, firma i adres JDG, NIP, REGON, numer CEIDG, numer rachunku bankowego, kod IBAN, status rezydencji podatkowej." },
                  { label: "Klienci (osoby fizyczne / kontaktowe)", data: "imię i nazwisko, stanowisko, adres e-mail służbowy, numer telefonu służbowego, dane do fakturowania (firma, adres, NIP)." },
                ].map(({ label, data }) => (
                  <div key={label} className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <p className="text-sm font-semibold text-fg mb-1">{label}</p>
                    <p className="text-sm text-fg-muted">{data}</p>
                  </div>
                ))}
              </div>
              <P>Administrator <Strong>nie przetwarza danych szczególnych kategorii</Strong> (art. 9 RODO) – danych dotyczących zdrowia, orientacji seksualnej, przekonań politycznych ani religijnych – za wyjątkiem danych o niepełnosprawności, jeżeli zostały przekazane dobrowolnie.</P>
            </>
          ),
        },
        {
          heading: "§ 5  Okres przechowywania danych",
          content: (
            <Table rows={[
              ["Kandydaci – bieżąca rekrutacja", "Do zakończenia procesu, max. 6 miesięcy od ostatniego kontaktu"],
              ["Kandydaci – baza talentów (za zgodą)", "Do cofnięcia zgody, max. 2 lata od jej udzielenia"],
              ["Podwykonawcy (JDG) – dane kontraktowe", "6 lat od zakończenia umowy"],
              ["Podwykonawcy (JDG) – dokumenty księgowe", "5 lat od końca roku podatkowego"],
              ["Klienci / Kontrahenci", "6 lat od zakończenia umowy / ostatniej transakcji"],
              ["Faktury i dokumenty rachunkowe", "5 lat od końca roku podatkowego"],
              ["Dane z formularza kontaktowego", "12 miesięcy od ostatniego kontaktu"],
              ["Newsletter / marketing", "Do cofnięcia zgody lub wniesienia sprzeciwu"],
              ["Pliki cookie analityczne", "Zgodnie z polityką cookies (max. 24 miesiące)"],
              ["Logi serwera (adresy IP)", "12 miesięcy od daty wpisu"],
            ]} />
          ),
        },
        {
          heading: "§ 6  Odbiorcy danych osobowych",
          content: (
            <ol className="list-[lower-alpha] list-inside space-y-2">
              <Li>Klientom (pracodawcom/zleceniodawcom) – w zakresie niezbędnym do zrealizowania usługi pośrednictwa.</Li>
              <Li>Podmiotom przetwarzającym dane na zlecenie Administratora (art. 28 RODO): dostawcom oprogramowania CRM/ATS, systemów kadrowo-płacowych, usług hostingowych i poczty elektronicznej – na podstawie umów powierzenia.</Li>
              <Li>Biurom rachunkowym i doradcom podatkowym – w zakresie niezbędnym do rozliczeń finansowych.</Li>
              <Li>Kancelariom prawnym – w przypadku dochodzenia roszczeń.</Li>
              <Li>Organom publicznym – ZUS, Urząd Skarbowy, PIP, UODO – wyłącznie na podstawie przepisów prawa.</Li>
            </ol>
          ),
        },
        {
          heading: "§ 7  Przekazywanie danych do państw trzecich",
          content: (
            <>
              <P>Administrator co do zasady nie przekazuje danych osobowych do państw trzecich (poza EOG). Jeżeli korzystanie z narzędzi technologicznych wymaga transferu poza EOG, odbywa się to wyłącznie:</P>
              <ol className="list-[lower-alpha] list-inside space-y-1.5">
                <Li>na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni poziom ochrony (art. 45 RODO), lub</Li>
                <Li>przy zastosowaniu standardowych klauzul umownych przyjętych przez Komisję Europejską (art. 46 ust. 2 lit. c RODO).</Li>
              </ol>
            </>
          ),
        },
        {
          heading: "§ 8  Prawa osób, których dane dotyczą",
          content: (
            <>
              <Table rows={[
                ["Prawo dostępu (art. 15)", "Uzyskanie potwierdzenia, czy dane są przetwarzane; wgląd w treść danych."],
                ["Prawo do sprostowania (art. 16)", "Żądanie niezwłocznego sprostowania nieprawidłowych lub uzupełnienia niekompletnych danych."],
                ["Prawo do usunięcia (art. 17)", "Żądanie usunięcia danych (\"prawo do bycia zapomnianym\")."],
                ["Prawo do ograniczenia przetwarzania (art. 18)", "Żądanie ograniczenia przetwarzania w przypadkach z art. 18 RODO."],
                ["Prawo do przenoszenia danych (art. 20)", "Otrzymanie danych w ustrukturyzowanym formacie lub przesłanie ich innemu administratorowi."],
                ["Prawo sprzeciwu (art. 21)", "Sprzeciw wobec przetwarzania opartego na uzasadnionym interesie lub celach marketingowych."],
                ["Prawo cofnięcia zgody (art. 7 ust. 3)", "Wycofanie zgody w każdym czasie, bez wpływu na zgodność z prawem wcześniejszego przetwarzania."],
                ["Prawo do skargi (art. 77)", "Wniesienie skargi do Prezesa UODO, ul. Stawki 2, 00-193 Warszawa."],
              ]} />
              <InfoBox>
                <strong className="text-signal">Kontakt w sprawach RODO:</strong>{" "}
                <a href="mailto:rodo@omegaworkforce.pl" className="text-accent hover:underline">rodo@omegaworkforce.pl</a>
                {" · "}Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687 Poznań.
                Administrator odpowiada bez zbędnej zwłoki, w terminie miesiąca od żądania (art. 12 ust. 3 RODO).
              </InfoBox>
            </>
          ),
        },
        {
          heading: "§ 9  Pliki cookie i technologie śledzące",
          content: (
            <>
              <P>Serwis www.omegaworkforce.pl korzysta z plików cookie – małych plików tekstowych zapisywanych na urządzeniu końcowym Użytkownika.</P>
              <ol className="list-[lower-alpha] list-inside space-y-2">
                <Li><Strong>Niezbędne (techniczne)</Strong> – konieczne do prawidłowego działania Serwisu; podstawa: uzasadniony interes; nie wymagają zgody.</Li>
                <Li><Strong>Analityczne / statystyczne</Strong> – umożliwiają analizę ruchu (np. Google Analytics); podstawa: zgoda Użytkownika.</Li>
                <Li><Strong>Marketingowe / reklamowe</Strong> – służą do wyświetlania spersonalizowanych reklam; podstawa: zgoda Użytkownika.</Li>
              </ol>
              <P>Użytkownik może w każdej chwili cofnąć zgodę na cookies nieobowiązkowe, klikając „Zarządzaj zgodami” w stopce Serwisu lub zmieniając ustawienia przeglądarki.</P>
            </>
          ),
        },
        {
          heading: "§ 10  Bezpieczeństwo danych",
          content: (
            <ol className="list-[lower-alpha] list-inside space-y-1.5">
              <Li>szyfrowanie danych przesyłanych za pośrednictwem Serwisu (protokół TLS/HTTPS);</Li>
              <Li>kontrola dostępu – dane dostępne wyłącznie dla upoważnionych pracowników i współpracowników;</Li>
              <Li>regularne kopie zapasowe danych;</Li>
              <Li>procedury postępowania w przypadku naruszenia ochrony danych osobowych.</Li>
            </ol>
          ),
        },
        {
          heading: "§ 11–13  Postanowienia końcowe",
          content: (
            <>
              <P><Strong>Zautomatyzowane podejmowanie decyzji:</Strong> Administrator nie podejmuje decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu danych, w tym profilowaniu (art. 22 RODO). Dane kandydatów mogą być wstępnie filtrowane przez systemy ATS, lecz ostateczna decyzja jest zawsze podejmowana przez człowieka.</P>
              <P><Strong>Dobrowolność podania danych:</Strong> Podanie danych jest dobrowolne, jednak niepodanie ich może uniemożliwić korzystanie z usług rekrutacyjnych, zawarcie umowy B2B lub otrzymanie odpowiedzi na zapytanie.</P>
              <P><Strong>Zmiany Polityki:</Strong> Administrator zastrzega prawo do zmiany Polityki z przyczyn technicznych, prawnych lub organizacyjnych, informując o tym z co najmniej 14-dniowym wyprzedzeniem. Aktualna wersja jest zawsze dostępna pod adresem: www.omegaworkforce.pl/polityka-prywatnosci.</P>
              <P>Data ostatniej modyfikacji: <Strong>1 lipca 2025 r. · Wersja 1.0</Strong></P>
            </>
          ),
        },
      ]}
    />
  );
}
