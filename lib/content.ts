/**
 * OMEGA WORKFORCE — Centralna warstwa copy i danych firmowych.
 * Uzupełnij dane oznaczone TODO o realne wartości rejestrowe.
 * Wszystkie teksty gotowe do wdrożenia na stronę.
 */

// ─────────────────────────────────────────────
// DANE FIRMOWE
// ─────────────────────────────────────────────

export const company = {
  name:       "Omega Workforce",
  tagline:    "Agencja zatrudnienia nowej generacji",
  motto:      "Ostatnie słowo w rekrutacji należy do nas",
  mottoFull:  "Omega Workforce — ostatnie słowo w rekrutacji należy do nas",
  // TODO: uzupełnij o realne dane rejestrowe przed publikacją
  kraz:       "0000/00",
  nip:        "000-000-00-00",
  regon:      "000000000",
  krs:        "0000000000",
  phone:      "+48 503 090 523",
  phoneHref:  "+48503090523",
  email:      "kontakt@omegaworkforce.pl",
  address:    "ul. Przykładowa 1, 00-000 Warszawa",
  hours:      "Pon–Pt  8:00–18:00",
};

// ─────────────────────────────────────────────
// HERO — 3 warianty copy
// ─────────────────────────────────────────────

/**
 * Wariant A — Bezpieczny (trust-first)
 * Dla konserwatywnych odbiorców z branży przemysłowej.
 */
export const heroA = {
  preheading: "Legalna agencja zatrudnienia · KRAZ nr " + company.kraz,
  h1line1:    "Pracownicy na czas.",
  h1line2:    "Dokumenty w porządku.",
  sub:        "Pośrednictwo pracy, leasing i outsourcing pracowniczy. Pełna obsługa zatrudnienia cudzoziemców z Ukrainy. Z umową, z KRAZ-em, zgodnie z prawem.",
  ctaB2B:     "Zamów bezpłatną wycenę",
  ctaCandidate: "Sprawdź oferty pracy",
};

/**
 * Wariant B — Premium (value-first) ← AKTYWNY
 * Silna obietnica + konkretny zakres + dual CTA segmentujący personę.
 */
export const heroB = {
  preheading: "Agencja zatrudnienia nowej generacji",
  h1line1:    "Ludzie do pracy.",
  h1line2:    "Dostarczeni legalnie i na czas.",
  sub:        "Bierzemy na siebie rekrutację, kadry i legalizację — Ty dostajesz gotowych pracowników w 7 dni. Pośrednictwo, leasing, outsourcing i pełna obsługa pracowników z Ukrainy.",
  ctaB2B:     "Dla firm — bezpłatna wycena",
  ctaCandidate: "Szukam pracy",
};

/**
 * Wariant C — Wyrazisty (speed+bold)
 * Otwiera na bólu klienta — czasie straconego czasu z innymi agencjami.
 */
export const heroC = {
  preheading: "Nie tracisz tygodni na szukanie. My już to mamy.",
  h1line1:    "7 dni od briefu",
  h1line2:    "do ludzi na hali.",
  sub:        "Rekrutujemy, legalizujemy, zatrudniamy — i bierzemy za to pełną odpowiedzialność. Firmy, które potrzebują pracowników teraz, wybierają Omega Workforce.",
  ctaB2B:     "Chcę pracowników teraz",
  ctaCandidate: "Znajdź pracę w Polsce",
};

// ─────────────────────────────────────────────
// HERO — benefit cards (wersja aktywna)
// ─────────────────────────────────────────────

export const heroBenefits = [
  { icon: "🏛", label: "Legalność",      sub: "Wpis do KRAZ, umowy zgodne z prawem pracy" },
  { icon: "⚡", label: "Szybkość",       sub: "Pierwsi kandydaci w 7 dni, wycena w 24 h" },
  { icon: "🇺🇦", label: "Ukraina",       sub: "Legalizacja, zakwaterowanie, opieka UA" },
  { icon: "📋", label: "Jeden kontakt",  sub: "Kadry, ZUS, dokumenty — całość po naszej stronie" },
];

// ─────────────────────────────────────────────
// STATYSTYKI
// ─────────────────────────────────────────────

export const stats = [
  { value: 1200, suffix: "+",    label: "pracowników rocznie" },
  { value: 24,   suffix: " h",   label: "do wyceny zapotrzebowania" },
  { value: 7,    suffix: " dni", label: "średni czas obsadzenia" },
  { value: 98,   suffix: "%",    label: "skuteczność rekrutacji" },
];

// ─────────────────────────────────────────────
// AUDIENCE SPLIT — ścieżki B2B / Kandydat
// ─────────────────────────────────────────────

export const audienceSplit = {
  sectionLabel: "Wybierz swoją ścieżkę",
  heading:      "Jesteś firmą czy szukasz pracy?",
  sub:          "Obsługujemy obie strony rynku pracy. Wybierz swoją ścieżkę — każda prowadzi do konkretnego rozwiązania.",

  company: {
    label:   "Dla firm (B2B)",
    heading: "Jestem firmą",
    sub:     "Potrzebujesz sprawdzonych pracowników do produkcji, magazynu lub konkretnego procesu. Dobieramy model i dostarczamy ludzi na czas.",
    bullets: [
      "Wycena w 24 h, pierwsi kandydaci w 7 dni",
      "Pełna obsługa kadrowo-płacowa i ZUS",
      "Pracownicy krajowi i z Ukrainy w jednym procesie",
      "Jedna faktura, jeden koordynator — zero papierologii po Twojej stronie",
    ],
    cta:      "Zamów bezpłatną wycenę",
    ctaNote:  "Bez zobowiązań · odpowiedź w 24 h",
  },

  candidate: {
    label:   "Dla kandydatów",
    heading: "Szukam pracy",
    sub:     "Mamy oferty w produkcji, logistyce i przemyśle w Polsce. Dla kandydatów z Ukrainy — pełne wsparcie w dokumentach, legalizacji i zakwaterowaniu.",
    bullets: [
      "Legalna umowa o pracę lub umowa zlecenie",
      "Terminowe wypłaty bez opóźnień",
      "Pomoc w legalizacji pobytu i pracy (kandydaci z UA)",
      "Zakwaterowanie i koordynator po ukraińsku",
    ],
    cta:      "Zostaw zgłoszenie",
    ctaNoteUA: "Дзвонимо протягом дня · Телефонуємо сьогодні",
  },
};

// ─────────────────────────────────────────────
// USŁUGI — 4 modele współpracy
// ─────────────────────────────────────────────

export const services = [
  {
    id:    "posrednictwo",
    title: "Pośrednictwo pracy",
    desc:  "Dostarczamy zweryfikowanych kandydatów na wskazane stanowiska. Wstępna selekcja, rozmowy kwalifikacyjne i sprawdzenie referencji — po naszej stronie. Ty wybierasz z gotowej krótkiej listy.",
    points: [
      "Weryfikacja kompetencji, doświadczenia i referencji",
      "Kandydaci krajowi i z Ukrainy w jednym procesie",
      "Rozliczenie za efekt — płacisz za obsadzone stanowisko",
    ],
  },
  {
    id:    "leasing",
    title: "Praca tymczasowa / Leasing pracowniczy",
    desc:  "Pracownicy wykonują zadania w Twoim zakładzie, ale zatrudnieni są przez nas. Przejmujemy umowy, ZUS, płace i całą dokumentację kadrową. Ty skalujesz zespół bez kosztów stałych i ryzyka Kodeksu pracy.",
    points: [
      "Pełna obsługa kadrowo-płacowa, ZUS i PFRON",
      "Elastyczny wzrost i redukcja składu w trybie tygodniowym",
      "Zgodność z Ustawą o zatrudnianiu pracowników tymczasowych",
    ],
  },
  {
    id:    "outsourcing",
    title: "Outsourcing procesów",
    desc:  "Oddajesz nam linię, dział lub proces — pakowanie, sortowanie, magazyn, produkcję. Rozliczamy się za wynik (SLA), nie za roboczogodziny. Ryzyko operacyjne i zarządcze przechodzi na nas.",
    points: [
      "Odpowiedzialność za wynik: SLA i kary umowne w umowie",
      "Nadzór, koordynator i miesięczne raporty po naszej stronie",
      "Optymalizacja kosztu jednostkowego — niższa faktura przy wyższym wolumenie",
    ],
  },
  {
    id:    "ukraina",
    title: "Pracownicy z Ukrainy",
    desc:  "Kompleksowa obsługa zatrudnienia cudzoziemców — od dokumentów urzędowych, przez zakwaterowanie, po codzienną opiekę koordynatora. Pracownik jest gotowy do pracy od pierwszego dnia.",
    points: [
      "Legalizacja pobytu i pracy: oświadczenia, zezwolenia, PUP",
      "Zakwaterowanie, transport i pierwsze wdrożenie",
      "Koordynatorzy komunikujący się po ukraińsku i rosyjsku",
    ],
  },
];

// ─────────────────────────────────────────────
// PROCES — 4 etapy
// ─────────────────────────────────────────────

export const process = [
  {
    step:  "01",
    time:  "Dzień 1",
    title: "Opisujesz, czego potrzebujesz",
    desc:  "15-minutowa rozmowa lub formularz online. Ustalamy stanowiska, skalę, lokalizację i preferowany model: pośrednictwo, leasing lub outsourcing. Zero dokumentów na tym etapie.",
  },
  {
    step:  "02",
    time:  "Do 24 h",
    title: "Dostajesz wycenę i wzór umowy",
    desc:  "Transparentna wycena z podziałem na stawkę, zakres odpowiedzialności i termin. Wzór umowy do wglądu jeszcze przed podpisaniem. Bez ukrytych kosztów.",
  },
  {
    step:  "03",
    time:  "Do 7 dni",
    title: "Rekrutujemy i legalizujemy",
    desc:  "Selekcja, weryfikacja, rozmowy. Dla pracowników z Ukrainy — kompletna legalizacja pobytu i pracy. Dostarczamy gotowych do startu ludzi z dokumentami w porządku.",
  },
  {
    step:  "04",
    time:  "Cały czas",
    title: "Pracownicy na stanowiskach, my na posterunku",
    desc:  "Dedykowany koordynator pilnuje frekwencji, dokumentów i rotacji. Jeden punkt kontaktu, regularne raporty, szybka reakcja na zmiany zapotrzebowania.",
  },
];

// ─────────────────────────────────────────────
// DLACZEGO MY — 4 przewagi
// ─────────────────────────────────────────────

export const whyUs = [
  {
    title: "Legalność bez kompromisów",
    desc:  `Działamy w oparciu o wpis do KRAZ nr ${company.kraz}. Każda umowa zgodna z Kodeksem pracy i Ustawą o zatrudnianiu cudzoziemców. Pełna dokumentacja w aktach — nic „na czarno", zero ryzyka dla Twojej firmy.`,
  },
  {
    title: "Szybkość mierzona w dniach, nie tygodniach",
    desc:  "Wycena w 24 h. Pierwsi kandydaci w 7 dni. Mamy gotowe bazy pracowników, sprawdzony proces rekrutacyjny i zbudowane relacje z urzędami — nie zaczynamy od zera przy każdym zleceniu.",
  },
  {
    title: "Jeden punkt odpowiedzialności",
    desc:  "Dedykowany koordynator dla każdego klienta. Jedna faktura. Jeden numer telefonu. Przejmujemy kadry, ZUS, dokumentację i codzienną opiekę nad pracownikiem. Ty zarządzasz pracą, nie papierologią.",
  },
  {
    title: "Transparentne rozliczenia",
    desc:  "Stawka ustalona z góry i zapisana w umowie. Koszty legalizacji, zakwaterowania i dojazdów — jeśli dotyczą — widoczne w ofercie przed podpisaniem. Zero niespodzianek na fakturze pod koniec miesiąca.",
  },
];

// ─────────────────────────────────────────────
// SEKCJA UKRAINA — korzyści dla firm (B2B)
// ─────────────────────────────────────────────

export const ukraineSection = {
  sectionLabel: "Specjalizacja · Спеціалізація",
  heading:      "Pracownicy z Ukrainy —",
  headingAccent:"legalnie, z dokumentami",
  headingSuffix:"i opieką.",
  subB2B:       "Ukraińscy pracownicy to dziś kluczowy zasób dla polskich firm produkcyjnych i logistycznych. Przejmujemy najtrudniejszą część: legalizację, formalności urzędowe i codzienną opiekę. Ty dostajesz zmotywowany zespół gotowy od pierwszego dnia.",
  legalBadge:   `Zgodność z Ustawą o cudzoziemcach · KRAZ nr ${company.kraz}`,
  ctaB2B:       "Zapytaj o pracowników z Ukrainy",
  ctaUA:        "Шукаю роботу в Польщі",
};

// Komunikat empatyczny dla kandydatów z Ukrainy (bilingual)
export const ukraineCandidateMessage = {
  pl: "Szukasz pracy w Polsce? Pomożemy z dokumentami, zakwaterowaniem i formalnościami. Legalnie, z umową i wsparciem koordynatora mówiącego po ukraińsku.",
  ua: "Шукаєте роботу в Польщі? Ми допоможемо з документами, житлом і оформленням. Легально, з договором і підтримкою україномовного координатора.",
};

export const ukraineBenefits = [
  {
    title: "Legalizacja pobytu i pracy",
    desc:  "Oświadczenia o powierzeniu pracy, zezwolenia, powiadomienia do PUP, przedłużenia — kompletna dokumentacja prowadzona przez naszych specjalistów. Ryzyko formalne po naszej stronie.",
  },
  {
    title: "Weryfikacja przed przyjazdem",
    desc:  "Sprawdzamy kwalifikacje, doświadczenie i dokumenty kandydata zanim przyjedzie do Polski. Oszczędzasz czas — i eliminujesz rotację od pierwszego tygodnia.",
  },
  {
    title: "Zakwaterowanie i transport",
    desc:  "Organizujemy mieszkania w pobliżu miejsca pracy i dojazdy na zmianę. Pracownik ma warunki do normalnego startu bez stresu logistycznego.",
  },
  {
    title: "Wsparcie językowe i kulturowe",
    desc:  "Koordynatorzy komunikują się po ukraińsku i rosyjsku. Mniej nieporozumień, szybsze wdrożenie, niższa rotacja — mierzalne efekty już po pierwszym miesiącu.",
  },
];

// ─────────────────────────────────────────────
// OPINIE KLIENTÓW
// ─────────────────────────────────────────────

export const testimonials = [
  {
    quote:    "Potrzebowaliśmy 40 pracowników na linię pakowania w ciągu 10 dni. Omega dostarczyła 38 gotowych, z dokumentami, przed terminem. Żadna poprzednia agencja tego nie zrobiła.",
    name:     "Mariusz K.",
    role:     "Kierownik produkcji",
    company:  "Firma produkcyjna, Łódź",
    initials: "MK",
    stars:    5,
  },
  {
    quote:    "Przeszliśmy z innej agencji. Różnica jest w obsłudze — jeden koordynator, który zna nasz zakład na pamięć. Rotacja spadła o 30% w ciągu pierwszego kwartału.",
    name:     "Agnieszka W.",
    role:     "HR Manager",
    company:  "Centrum logistyczne, Poznań",
    initials: "AW",
    stars:    5,
  },
  {
    quote:    "Pracownicy z Ukrainy są znakomicie przygotowani — dokumenty, BHP, wdrożenie. Omega przejęła wszystko, my dostaliśmy ludzi gotowych do pracy od pierwszego dnia.",
    name:     "Tomasz R.",
    role:     "Właściciel",
    company:  "Zakład przetwórczy, Wrocław",
    initials: "TR",
    stars:    5,
  },
];

// ─────────────────────────────────────────────
// BRANŻE
// ─────────────────────────────────────────────

export const industries = [
  "Produkcja i przemysł",
  "Logistyka i magazyny",
  "E-commerce / fulfillment",
  "Przetwórstwo spożywcze",
  "Budownictwo",
  "HoReCa i gastronomia",
  "Sprzątanie i facility",
  "Sezon i rolnictwo",
];

// ─────────────────────────────────────────────
// FAQ — najczęstsze pytania
// ─────────────────────────────────────────────

export const faqs = [
  {
    q: "Czym różni się leasing pracowniczy od outsourcingu?",
    a: "Przy leasingu (pracy tymczasowej) pracownik wykonuje zadania pod Twoim kierownictwem, na naszej umowie i obsłudze kadrowej. Przy outsourcingu przejmujemy cały proces — zarządzanie, nadzór i odpowiedzialność za wynik. Rozliczamy się za SLA, nie za godziny.",
  },
  {
    q: "Czy zatrudnianie pracowników z Ukrainy jest legalne i bezpieczne?",
    a: `Tak, pod warunkiem dopełnienia formalności. Zajmujemy się całą procedurą: oświadczeniami o powierzeniu pracy, zezwoleniami, powiadomieniami do PUP i legalizacją pobytu. Działamy w oparciu o wpis do KRAZ nr ${company.kraz}. Pełna dokumentacja zostaje po naszej stronie — Twoja firma jest chroniona.`,
  },
  {
    q: "Jak szybko możecie dostarczyć pracowników?",
    a: "Wycenę przygotowujemy w ciągu 24 godzin od rozmowy. Pierwszych zweryfikowanych kandydatów dostarczamy średnio w 7 dni roboczych. Przy dużych zleceniach lub stanowiskach specjalistycznych termin ustalamy indywidualnie na etapie briefu.",
  },
  {
    q: "Kto odpowiada za ZUS, wynagrodzenia i dokumentację przy pracy tymczasowej?",
    a: "My. Przy pracy tymczasowej i outsourcingu jesteśmy pracodawcą na papierze. Przejmujemy umowy, naliczanie wynagrodzeń, odprowadzanie składek ZUS, BHP i dokumentację kadrową. Ty otrzymujesz jedną fakturę i masz jeden punkt kontaktu.",
  },
  {
    q: "Czy są ukryte koszty w wycenie?",
    a: "Nie. Stawka jest ustalana przed podpisaniem umowy i obejmuje uzgodniony zakres. Ewentualne koszty dodatkowe — legalizacja, zakwaterowanie, dojazdy — są wyraźnie wyszczególnione w ofercie, a nie na fakturze po fakcie.",
  },
  {
    q: "Czy obsługujecie małe firmy, czy tylko duże przedsiębiorstwa?",
    a: "Obsługujemy firmy od 5 do 500+ pracowników. Dla mniejszych zakładów często najlepszym rozwiązaniem jest pośrednictwo pracy, dla większych — leasing lub outsourcing. Doradzimy model odpowiedni do Twojej skali i sezonowości.",
  },
];

// ─────────────────────────────────────────────
// FORMULARZ KONTAKTOWY — copy
// ─────────────────────────────────────────────

export const contactCopy = {
  sectionLabel:  "Kontakt i wycena",
  heading:       "Odpowiadamy w 24 h.",
  headingAccent: "Bez zobowiązań.",
  sub:           "Zostaw kontakt i krótki opis potrzeby. Oddzwonimy z gotową propozycją modelu współpracy i orientacyjną wyceną.",

  trustItems: [
    { text: "Wycena do 24 h, pierwsi kandydaci w 7 dni" },
    { text: `Legalność gwarantowana · KRAZ nr ${company.kraz}` },
    { text: "Bezpośredni kontakt: dedykowany koordynator" },
    { text: company.email },
  ],

  callPrompt:    "Wolisz zadzwonić?",

  successB2B:       "Oddzwonimy z wyceną w ciągu 24 h roboczych. Sprawdź też skrzynkę e-mail.",
  successCandidate: "Skontaktujemy się z Tobą jeszcze dziś lub następnego dnia roboczego.",
  errorMsg:         "Coś poszło nie tak. Spróbuj ponownie lub zadzwoń bezpośrednio.",

  rodoText: "Wysyłając formularz, zgadzasz się na przetwarzanie danych osobowych zgodnie z polityką prywatności (RODO). Dane są używane wyłącznie w celu odpowiedzi na zapytanie.",

  submitB2B:       "Wyślij zapytanie o wycenę",
  submitCandidate: "Wyślij zgłoszenie",
  submitting:      "Wysyłam…",

  // Pola formularza — placeholder copy
  placeholders: {
    nameB2B:       "Jan Kowalski",
    nameCandidate: "Ім'я / Imię",
    phone:         "+48 503 090 523",
    company:       "Np. ABC Sp. z o.o.",
    city:          "Np. Warszawa, Wrocław, Kraków…",
    messageB2B:    "Np. 20 pracowników produkcji, start od 1 sierpnia, okolice Wrocławia…",
    messageCandidate: "Np. posiadam kartę pobytu / шукаю роботу у Варшаві…",
  },

  labels: {
    nameB2B:       "Imię i nazwisko",
    nameCandidate: "Twoje imię",
    phone:         "Telefon",
    company:       "Nazwa firmy",
    industry:      "Branża",
    headcount:     "Potrzebna liczba pracowników",
    city:          "Miasto / Lokalizacja",
    position:      "Interesujące stanowisko",
    messageB2B:    "Opis zapotrzebowania (opcjonalnie)",
    messageCandidate: "Dodatkowe informacje (opcjonalnie)",
  },
};

// ─────────────────────────────────────────────
// FINAL CTA — sekcja zamykająca
// ─────────────────────────────────────────────

export const finalCta = {
  sectionLabel:  "Gotowy do działania?",
  heading:       "Sprawdzone zatrudnienie.",
  headingAccent: "Bez czekania, bez ryzyka.",
  sub:           "Opisz zapotrzebowanie w 2 zdaniach. Oddzwonimy z propozycją modelu i orientacyjną wyceną. Bezpłatnie, bez zobowiązań.",
  ctaPrimary:    "Wyślij brief — wycena w 24 h",
  ctaPhone:      company.phone,
  footer:        `Pon–Pt 8:00–18:00 · ${company.email}`,
};

// ─────────────────────────────────────────────
// NAWIGACJA
// ─────────────────────────────────────────────

export const nav = [
  {
    label: "Dla firm",
    href:  "#uslugi",
    children: [
      { label: "Pośrednictwo pracy",       href: "#uslugi" },
      { label: "Praca tymczasowa / leasing", href: "#uslugi" },
      { label: "Outsourcing procesów",     href: "#uslugi" },
      { label: "Pracownicy z Ukrainy",     href: "#ukraina" },
    ],
  },
  { label: "Jak działamy", href: "#proces" },
  { label: "Ukraina",      href: "#ukraina" },
  { label: "Branże",       href: "#branze" },
  { label: "FAQ",          href: "#faq" },
  { label: "Kontakt",      href: "#kontakt" },
];
