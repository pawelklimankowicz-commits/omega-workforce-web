/**
 * Omega Workforce — pełne tłumaczenia PL / UA
 * Używaj przez useLang() hook z LangProvider.
 */

export type Lang = "PL" | "UA";

export const T = {
  // ─── Nawigacja ──────────────────────────────────────────────────
  nav: {
    firms:      { PL: "Dla firm",       UA: "Для підприємств" },
    howWeWork:  { PL: "Jak działamy",   UA: "Як ми працюємо"  },
    ukraine:    { PL: "Ukraina",        UA: "Україна"          },
    industries: { PL: "Branże",         UA: "Галузі"           },
    faq:        { PL: "FAQ",            UA: "FAQ"              },
    contact:    { PL: "Kontakt",        UA: "Контакт"          },
    panel:      { PL: "Panel klienta",  UA: "Панель клієнта"   },
    lookingJob: { PL: "Szukam pracy",   UA: "Шукаю роботу"    },
    freeQuote:  { PL: "Bezpłatna wycena", UA: "Безкоштовна оцінка" },
  },

  // ─── Hero ───────────────────────────────────────────────────────
  hero: {
    pill:    { PL: "Agencja zatrudnienia nowej generacji", UA: "Агентство зайнятості нового покоління" },
    h1a:     { PL: "Ludzie do pracy.",                    UA: "Люди до роботи."                        },
    h1b:     { PL: "Profesjonaliści dostarczeni legalnie i na czas.", UA: "Професіонали доставлені легально та вчасно." },
    motto:   { PL: "Omega Workforce — ostatnie słowo w rekrutacji należy do nas",
               UA: "Omega Workforce — останнє слово у рекрутингу належить нам" },
    sub:     { PL: "Bierzemy na siebie rekrutację, kadry i legalizację — Ty dostajesz gotowych pracowników w 7 dni. Pośrednictwo, leasing, outsourcing i pełna obsługa pracowników z Ukrainy.",
               UA: "Ми беремо на себе рекрутинг, кадри та легалізацію — ти отримуєш готових працівників за 7 днів. Посередництво, лізинг, аутсорсинг та повне обслуговування працівників з України." },
    ctaFirm: { PL: "Dla firm — bezpłatna wycena",  UA: "Для підприємств — безкоштовна оцінка" },
    ctaJob:  { PL: "Szukam pracy",                 UA: "Шукаю роботу"                         },
    badge1:  { PL: "Wpis do KRAZ",                 UA: "Реєстр KRAZ"                           },
    badge2:  { PL: "Wycena w 24h",                 UA: "Оцінка за 24 год"                      },
    badge3:  { PL: "Zgodnie z RODO",               UA: "Відповідно до RODO"                    },
    badge4:  { PL: "Obsługa UA",                   UA: "Підтримка UA"                          },
  },

  // ─── Sekcje — etykiety ──────────────────────────────────────────
  sections: {
    services:     { PL: "Nasze usługi",         UA: "Наші послуги"           },
    whyUs:        { PL: "Dlaczego my",           UA: "Чому ми"                },
    process:      { PL: "Jak działamy",          UA: "Як ми працюємо"         },
    ukraine:      { PL: "Pracownicy z Ukrainy",  UA: "Працівники з України"   },
    industries:   { PL: "Branże",                UA: "Галузі"                 },
    calculator:   { PL: "Kalkulator ROI",        UA: "Калькулятор ROI"        },
    testimonials: { PL: "Opinie",                UA: "Відгуки"                },
    faq:          { PL: "FAQ",                   UA: "FAQ"                    },
    contact:      { PL: "Kontakt",               UA: "Контакт"                },
  },

  // ─── Usługi ─────────────────────────────────────────────────────
  services: {
    s1title: { PL: "Pośrednictwo pracy",                   UA: "Посередництво у працевлаштуванні"    },
    s1desc:  { PL: "Rekrutujemy i weryfikujemy kandydatów dopasowanych do Twojego profilu.",
               UA: "Ми рекрутуємо та верифікуємо кандидатів, підібраних під ваш профіль."  },
    s2title: { PL: "Praca tymczasowa / leasing",           UA: "Тимчасова робота / лізинг"           },
    s2desc:  { PL: "Pracownicy na liście płac Omega — zerowe ryzyko kadrowe dla firmy.",
               UA: "Працівники в штаті Omega — нульовий кадровий ризик для компанії."      },
    s3title: { PL: "Outsourcing procesów",                 UA: "Аутсорсинг процесів"                 },
    s3desc:  { PL: "Przejmujemy całe działy produkcji, magazynów lub logistyki.",
               UA: "Ми беремо під управління цілі відділи виробництва, складів або логістики." },
    s4title: { PL: "Pracownicy z Ukrainy",                 UA: "Працівники з України"                },
    s4desc:  { PL: "Legalizacja pobytu, tłumaczenia, zakwaterowanie — kompleksowa obsługa.",
               UA: "Легалізація перебування, переклади, житло — комплексне обслуговування." },
  },

  // ─── FAQ ────────────────────────────────────────────────────────
  faq: {
    q1: { PL: "Jak szybko dostanę pracowników?",      UA: "Як швидко я отримаю працівників?"           },
    a1: { PL: "Pierwszych kandydatów przedstawiamy w ciągu 48–72h od podpisania zlecenia. Gotowi do pracy w 7 dni.",
          UA: "Перших кандидатів представляємо протягом 48–72 годин від підписання замовлення. Готові до роботи за 7 днів." },
    q2: { PL: "Czy pracownicy z Ukrainy mogą legalnie pracować w Polsce?",
          UA: "Чи можуть працівники з України легально працювати в Польщі?" },
    a2: { PL: "Tak — na podstawie oświadczenia o powierzeniu pracy lub zezwolenia na pracę. Omega kompleksowo obsługuje legalizację.",
          UA: "Так — на підставі заяви про доручення роботи або дозволу на роботу. Omega комплексно обслуговує легалізацію." },
    q3: { PL: "Czy muszę podpisywać długoterminową umowę?",
          UA: "Чи потрібно підписувати довгостроковий договір?" },
    a3: { PL: "Nie. Pracujemy na zlecenie lub umowę ramową — elastycznie dopasowaną do potrzeb.",
          UA: "Ні. Ми працюємо за замовленням або рамковою угодою — гнучко адаптованою до потреб." },
    q4: { PL: "Co jeśli pracownik nie sprawdzi się na stanowisku?",
          UA: "Що якщо працівник не підійде на посаду?" },
    a4: { PL: "W ciągu 14 dni zapewniamy bezpłatną wymianę pracownika — bez dodatkowych kosztów.",
          UA: "Протягом 14 днів ми забезпечуємо безкоштовну заміну працівника — без додаткових витрат." },
    q5: { PL: "Jakie branże obsługujecie?",     UA: "Які галузі ви обслуговуєте?"              },
    a5: { PL: "Produkcja, logistyka, budownictwo, handel, gastronomia, IT i inne.",
          UA: "Виробництво, логістика, будівництво, торгівля, громадське харчування, IT та інші." },
  },

  // ─── Kontakt / formularz ────────────────────────────────────────
  contact: {
    heading:      { PL: "Napisz do nas",              UA: "Напишіть нам"                 },
    labelName:    { PL: "Imię i nazwisko / Firma",    UA: "Ім'я та прізвище / Компанія"  },
    labelPhone:   { PL: "Telefon",                    UA: "Телефон"                      },
    labelEmail:   { PL: "E-mail",                     UA: "Електронна пошта"             },
    labelMsg:     { PL: "Wiadomość",                  UA: "Повідомлення"                 },
    labelRodo:    { PL: "Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z RODO.",
                    UA: "Я даю згоду на обробку персональних даних відповідно до RODO." },
    btn:          { PL: "Wyślij wiadomość →",         UA: "Надіслати повідомлення →"     },
    success:      { PL: "Wiadomość wysłana! Oddzwonimy w ciągu 24h.",
                    UA: "Повідомлення надіслано! Ми передзвонимо протягом 24 годин." },
  },

  // ─── CTA ────────────────────────────────────────────────────────
  cta: {
    freeQuote:    { PL: "Bezpłatna wycena →",         UA: "Безкоштовна оцінка →"         },
    callUs:       { PL: "Zadzwoń teraz",              UA: "Зателефонуйте зараз"          },
    learnMore:    { PL: "Dowiedz się więcej",          UA: "Дізнатися більше"             },
    sendRequest:  { PL: "Wyślij zapytanie",            UA: "Надіслати запит"              },
  },

  // ─── Footer ─────────────────────────────────────────────────────
  footer: {
    tagline:      { PL: "Agencja zatrudnienia nowej generacji",        UA: "Агентство зайнятості нового покоління"    },
    motto:        { PL: "Omega Workforce — ostatnie słowo w rekrutacji należy do nas",
                    UA: "Omega Workforce — останнє слово у рекрутингу належить нам" },
    legal:        { PL: "Legalna agencja zatrudnienia",                 UA: "Легальне агентство зайнятості"           },
    rights:       { PL: "Wszelkie prawa zastrzeżone.",                  UA: "Усі права захищені."                     },
    privacy:      { PL: "Polityka prywatności",                         UA: "Політика конфіденційності"               },
    rodo:         { PL: "RODO",                                         UA: "RODO"                                    },
    terms:        { PL: "Regulamin",                                    UA: "Правила та умови"                        },
    contactCol:   { PL: "Kontakt",                                      UA: "Контакт"                                 },
    navCol:       { PL: "Menu",                                         UA: "Меню"                                    },
    servicesCol:  { PL: "Usługi",                                       UA: "Послуги"                                 },
  },

  // ─── Dashboard (panel) ──────────────────────────────────────────
  dash: {
    // Sidebar — firma
    dashboard:    { PL: "Dashboard",          UA: "Дашборд"             },
    workers:      { PL: "Pracownicy",         UA: "Працівники"          },
    hours:        { PL: "Godziny",            UA: "Години"              },
    invoices:     { PL: "Faktury",            UA: "Рахунки"             },
    reports:      { PL: "Raporty",            UA: "Звіти"               },
    documents:    { PL: "Dokumenty",          UA: "Документи"           },
    settings:     { PL: "Ustawienia",         UA: "Налаштування"        },
    // Sidebar — pracownik
    myPanel:      { PL: "Pulpit",             UA: "Панель"              },
    myHours:      { PL: "Moje godziny",       UA: "Мої години"          },
    salary:       { PL: "Wypłaty",            UA: "Виплати"             },
    myDocs:       { PL: "Dokumenty",          UA: "Документи"           },
    requests:     { PL: "Wnioski",            UA: "Заяви"               },
    messages:     { PL: "Wiadomości",         UA: "Повідомлення"        },
    // TopBar
    search:       { PL: "Szukaj…",            UA: "Пошук…"              },
    notifications:{ PL: "Powiadomienia",      UA: "Сповіщення"          },
    logout:       { PL: "Wyloguj się",        UA: "Вийти"               },
    // Common
    panelFirma:   { PL: "Panel firmy B2B",    UA: "Панель компанії B2B" },
    panelWorker:  { PL: "Panel pracownika",   UA: "Панель працівника"   },
    panelAdmin:   { PL: "Panel admina",       UA: "Панель адміна"       },
    noData:       { PL: "Brak danych",        UA: "Немає даних"         },
    save:         { PL: "Zapisz zmiany",      UA: "Зберегти зміни"      },
    cancel:       { PL: "Anuluj",             UA: "Скасувати"           },
    download:     { PL: "Pobierz",            UA: "Завантажити"         },
    approve:      { PL: "Zatwierdź",          UA: "Підтвердити"         },
    reject:       { PL: "Odrzuć",            UA: "Відхилити"           },
    status:       { PL: "Status",             UA: "Статус"              },
    active:       { PL: "Aktywny",            UA: "Активний"            },
    pending:      { PL: "Oczekuje",           UA: "Очікує"              },
    approved:     { PL: "Zatwierdzono",       UA: "Підтверджено"        },
    paid:         { PL: "Opłacona",           UA: "Оплачена"            },
    overdue:      { PL: "Zaległa",            UA: "Прострочена"         },
  },
} as const;

/** Helper — zwraca string dla aktualnego języka */
export function t(entry: { PL: string; UA: string }, lang: Lang): string {
  return entry[lang];
}
