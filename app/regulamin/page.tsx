import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Regulamin Świadczenia Usług · Omega Workforce",
  description: "Regulamin korzystania z serwisu oraz świadczenia usług pośrednictwa pracy przez Omega Workforce.",
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
const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 px-4 py-3 rounded-xl border border-amber/20 bg-amber/5 text-sm text-fg-muted">
    {children}
  </div>
);

export default function RegulaminPage() {
  return (
    <LegalPageLayout
      title="Regulamin Świadczenia Usług"
      subtitle="Omega Workforce — zasady korzystania z serwisu oraz świadczenia usług pośrednictwa pracy."
      date="1 lipca 2025 r."
      pdfHref="/docs/regulamin.pdf"
      sections={[
        {
          heading: "§ 1  Postanowienia ogólne",
          content: (
            <>
              <P>Niniejszy Regulamin określa zasady:</P>
              <ol className="list-[lower-alpha] list-inside space-y-1.5 mb-3">
                <Li>korzystania z serwisu internetowego dostępnego pod adresem <Strong>www.omegaworkforce.pl</Strong>;</Li>
                <Li>świadczenia przez Operatora usług pośrednictwa w kojarzeniu Klientów z Podwykonawcami (JDG);</Li>
                <Li>procesu rejestracji i onboardingu Podwykonawców (JDG) oraz warunków współpracy B2B.</Li>
              </ol>
              <div className="px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm space-y-0.5">
                <p className="font-semibold text-fg">Omega Spółka z ograniczoną odpowiedzialnością</p>
                <p className="text-fg-muted">os. Stefana Batorego 14/81, 60-687 Poznań</p>
                <p className="text-fg-faint">KRS: 0000853422 · NIP: 781-201-17-24 · REGON: 386693099</p>
                <p className="text-fg-faint">Prezes Zarządu: Paweł Klimankowicz</p>
              </div>
              <P>Operator jest wpisany do Krajowego Rejestru Agencji Zatrudnienia (KRAZ) i prowadzi działalność na podstawie ustawy o promocji zatrudnienia i instytucjach rynku pracy.</P>
              <P>Korzystanie z Serwisu oraz nawiązanie współpracy z Operatorem jest równoznaczne z akceptacją Regulaminu.</P>
            </>
          ),
        },
        {
          heading: "§ 2  Definicje",
          content: (
            <div className="space-y-2">
              {[
                ["Operator / Agencja", "Omega Spółka z ograniczoną odpowiedzialnością, os. Stefana Batorego 14/81, 60-687 Poznań."],
                ["Serwis", "Portal internetowy www.omegaworkforce.pl wraz ze wszystkimi podstronami i funkcjonalnościami."],
                ["Użytkownik", "Każda osoba fizyczna lub prawna korzystająca z Serwisu."],
                ["Klient", "Przedsiębiorca lub pracodawca korzystający z usług Agencji w celu pozyskania Podwykonawców do realizacji zleceń."],
                ["Podwykonawca / JDG", "Osoba fizyczna prowadząca jednoosobową działalność gospodarczą (JDG), wpisana do CEIDG, świadcząca usługi jako niezależny przedsiębiorca."],
                ["Kandydat", "Osoba fizyczna ubiegająca się o podjęcie pracy lub założenie JDG za pośrednictwem Agencji."],
                ["Usługi Pośrednictwa", "Usługi Agencji polegające na kojarzeniu Klientów z Podwykonawcami (JDG) lub pracownikami."],
                ["Prowizja", "Wynagrodzenie Agencji za świadczone usługi pośrednictwa, naliczane w sposób wskazany w Umowie."],
                ["KRAZ", "Krajowy Rejestr Agencji Zatrudnienia."],
              ].map(([term, def]) => (
                <div key={term} className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex gap-3">
                  <p className="text-sm font-semibold text-fg min-w-[140px] shrink-0">{term}</p>
                  <p className="text-sm text-fg-muted">{def}</p>
                </div>
              ))}
            </div>
          ),
        },
        {
          heading: "§ 3  Zakres świadczonych usług",
          content: (
            <>
              <ol className="list-[lower-alpha] list-inside space-y-2 mb-3">
                <Li><Strong>Pośrednictwo pracy</Strong> – kojarzenie pracodawców z osobami poszukującymi pracy, w tym pracownikami tymczasowymi.</Li>
                <Li><Strong>Pośrednictwo JDG (model B2B)</Strong> – kojarzenie Klientów z osobami prowadzącymi JDG świadczącymi usługi jako niezależni Podwykonawcy.</Li>
                <Li><Strong>Outsourcing kadrowy</Strong> – organizacja i nadzór nad realizacją zleceń wykonywanych przez Podwykonawców na terenie zakładu Klienta.</Li>
                <Li><Strong>Doradztwo i wsparcie przy zakładaniu JDG</Strong> – pomoc w rejestracji działalności w CEIDG (nie stanowi porady prawnej ani podatkowej).</Li>
                <Li><Strong>Onboarding i szkolenia</Strong> – przygotowanie Podwykonawców do świadczenia usług zgodnie z wymaganiami Klienta.</Li>
              </ol>
              <Warning>
                <strong className="text-amber">Uwaga:</strong> Agencja nie gwarantuje zatrudnienia ani nawiązania współpracy z konkretnym Klientem. Usługi pośrednictwa mają charakter kojarzenia stron – finalna decyzja należy wyłącznie do zainteresowanych podmiotów.
              </Warning>
              <P>Agencja nie jest stroną stosunku prawnego łączącego Klienta z Podwykonawcą (JDG). Model B2B zakłada, że Podwykonawca świadczy usługi jako niezależny przedsiębiorca, we własnym imieniu i na własne ryzyko gospodarcze.</P>
            </>
          ),
        },
        {
          heading: "§ 4  Warunki korzystania z Serwisu",
          content: (
            <>
              <P>Korzystanie z Serwisu jest dobrowolne i nieodpłatne w zakresie przeglądania treści.</P>
              <P>Rejestracja konta wymaga: podania prawdziwych danych, akceptacji Regulaminu oraz Polityki Prywatności oraz potwierdzenia adresu e-mail.</P>
              <P>Użytkownik zobowiązany jest do korzystania z Serwisu zgodnie z prawem, dobrymi obyczajami i Regulaminem; nienaruszania praw własności intelektualnej; ochrony danych dostępowych do konta.</P>
              <P>Serwis przeznaczony jest wyłącznie dla osób pełnoletnich (18+) lub podmiotów prawnych.</P>
            </>
          ),
        },
        {
          heading: "§ 5  Zasady współpracy z Klientami",
          content: (
            <>
              <P>Warunkiem nawiązania współpracy jest zawarcie pisemnej Umowy o świadczenie usług pośrednictwa.</P>
              <P>Klient zobowiązany jest do: przekazywania prawdziwych informacji o zapotrzebowaniu, zapewnienia Podwykonawcom bezpiecznych warunków pracy (BHP), terminowego regulowania należności.</P>
              <Warning>
                <strong className="text-amber">Klauzula antypomijania:</strong> Bezpośrednie nawiązanie jakiejkolwiek formy współpracy (umowa o pracę, zlecenie, dzieło, B2B) pomiędzy Klientem a Podwykonawcą skierowanym przez Agencję z pominięciem Agencji przez cały okres obowiązywania Umowy i przez <Strong>24 miesiące</Strong> po jej rozwiązaniu stanowi istotne naruszenie Regulaminu i uprawnia Agencję do naliczenia kary umownej nie niższej niż równowartość 6-miesięcznej prowizji.
              </Warning>
            </>
          ),
        },
        {
          heading: "§ 6  Zasady onboardingu i współpracy z Podwykonawcami (JDG)",
          content: (
            <>
              <P>Podwykonawcą może być wyłącznie osoba fizyczna prowadząca JDG wpisaną do CEIDG, posiadająca NIP i REGON.</P>
              <P>Proces onboardingu obejmuje: złożenie wniosku i dostarczenie dokumentów, zawarcie Umowy B2B, podpisanie klauzul (deklaracja niezależności, oświadczenie BHP, klauzula antyalkoholowa), szkolenie wstępne BHP.</P>
              <P>Podwykonawca oświadcza, że prowadzi działalność jako niezależny przedsiębiorca, samodzielnie opłaca składki ZUS i zaliczki podatkowe, nie jest związany umową o pracę z Agencją ani Klientem.</P>
              <P>W przypadku niestawienia się do pracy bez powiadomienia z co najmniej 24-godzinnym wyprzedzeniem, Agencja ma prawo do natychmiastowego rozwiązania Umowy B2B.</P>
            </>
          ),
        },
        {
          heading: "§ 7  Prowizja i zasady rozliczeń",
          content: (
            <>
              <P>Prowizja jest naliczana jako iloczyn liczby godzin pracy Podwykonawcy i stawki godzinowej prowizji, określonej w Umowie.</P>
              <P>Faktury VAT są wystawiane na koniec okresu rozliczeniowego wskazanego w Umowie (tygodniowego, 14-dniowego lub miesięcznego).</P>
              <P>Termin płatności faktury wynosi <Strong>14 dni</Strong> od daty jej wystawienia. W przypadku opóźnienia Operator nalicza odsetki ustawowe za opóźnienie w transakcjach handlowych.</P>
              <P>Reklamacje dotyczące faktur należy zgłaszać pisemnie w terminie 7 dni od daty wystawienia. Po upływie tego terminu faktura uznawana jest za zaakceptowaną.</P>
            </>
          ),
        },
        {
          heading: "§ 8  Poufność i ochrona tajemnicy przedsiębiorstwa",
          content: (
            <>
              <P>Strony zobowiązują się do zachowania poufności wszelkich informacji uzyskanych w związku ze współpracą (tajemnica przedsiębiorstwa — art. 11 ustawy o zwalczaniu nieuczciwej konkurencji).</P>
              <P>Za informacje poufne uznaje się: dane Podwykonawców i Klientów, stawki prowizji, metody rekrutacji, bazy danych kandydatów, warunki Umów.</P>
              <P>Obowiązek poufności trwa przez cały czas współpracy oraz przez <Strong>5 lat</Strong> od jej zakończenia.</P>
            </>
          ),
        },
        {
          heading: "§ 9  Zakaz konkurencji",
          content: (
            <>
              <P>W okresie obowiązywania Umowy i przez <Strong>12 miesięcy</Strong> po jej rozwiązaniu Klient zobowiązuje się do nieprowadzenia działalności konkurencyjnej wobec Agencji, w szczególności:</P>
              <ol className="list-[lower-alpha] list-inside space-y-1.5">
                <Li>zakładania, przejmowania lub uczestniczenia w podmiotach świadczących usługi pośrednictwa pracy;</Li>
                <Li>nakłaniania Podwykonawców JDG do rozwiązania umów z Agencją;</Li>
                <Li>bezpośredniego oferowania współpracy B2B Podwykonawcom z bazy Agencji z pominięciem Agencji.</Li>
              </ol>
            </>
          ),
        },
        {
          heading: "§ 10  Odpowiedzialność Operatora",
          content: (
            <>
              <P>Operator nie ponosi odpowiedzialności za: jakość i terminowość usług Podwykonawców, decyzje biznesowe podjęte na podstawie treści Serwisu, szkody wynikające z korzystania z Serwisu niezgodnie z Regulaminem, przerwy spowodowane siłą wyższą lub awariami.</P>
              <P>Odpowiedzialność Operatora jest ograniczona do rzeczywiście poniesionej szkody bezpośredniej i nie może przekroczyć kwoty prowizji faktycznie zapłaconej za <Strong>ostatnie 3 miesiące</Strong> poprzedzające zdarzenie.</P>
            </>
          ),
        },
        {
          heading: "§ 11  Własność intelektualna",
          content: (
            <P>Wszelkie treści zamieszczone w Serwisie (grafiki, logotypy, teksty, oprogramowanie, bazy danych) stanowią własność Operatora lub podmiotów, które udzieliły licencji, i są chronione przepisami prawa autorskiego. Kopiowanie, reprodukowanie lub modyfikowanie treści Serwisu bez pisemnej zgody Operatora jest <Strong>zabronione</Strong>.</P>
          ),
        },
        {
          heading: "§ 12  Postępowanie reklamacyjne",
          content: (
            <>
              <P>Reklamację należy złożyć pisemnie na adres: Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687 Poznań lub drogą elektroniczną: <a href="mailto:kontakt@omegaworkforce.pl" className="text-accent hover:underline">kontakt@omegaworkforce.pl</a></P>
              <P>Reklamacja powinna zawierać: dane kontaktowe, opis przedmiotu i okoliczności, datę zdarzenia oraz określenie żądania.</P>
              <P>Reklamację dotyczącą jakości usług należy złożyć w terminie <Strong>14 dni</Strong> od stwierdzenia nieprawidłowości. Operator rozpatruje reklamację w terminie <Strong>14 dni roboczych</Strong>.</P>
            </>
          ),
        },
        {
          heading: "§ 13–16  Postanowienia końcowe",
          content: (
            <>
              <P><Strong>Ochrona danych osobowych:</Strong> Administratorem danych jest Omega Sp. z o.o., NIP: 781-201-17-24. Szczegóły zawiera Polityka Prywatności dostępna na stronie Serwisu.</P>
              <P><Strong>Zmiany Regulaminu:</Strong> Operator informuje z co najmniej 14-dniowym wyprzedzeniem. Brak sprzeciwu w terminie 14 dni oznacza akceptację.</P>
              <P><Strong>Rozwiązywanie sporów:</Strong> Strony podejmują próbę polubownego rozwiązania sporu w terminie 30 dni. W razie braku porozumienia – sąd powszechny właściwy dla siedziby Operatora (miasto Poznań). Prawem właściwym jest prawo polskie. Konsumenci mogą skorzystać z platformy ODR: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ec.europa.eu/consumers/odr</a></P>
              <P>Regulamin wchodzi w życie z dniem <Strong>1 lipca 2025 r.</Strong></P>
              <P>Kontakt: <a href="mailto:kontakt@omegaworkforce.pl" className="text-accent hover:underline">kontakt@omegaworkforce.pl</a> · Omega Sp. z o.o., os. Stefana Batorego 14/81, 60-687 Poznań.</P>
            </>
          ),
        },
      ]}
    />
  );
}
