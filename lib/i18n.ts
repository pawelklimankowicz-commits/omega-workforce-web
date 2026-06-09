/**
 * Scaffolding wielojęzyczności (i18n).
 *
 * Aktualny stan: tylko język PL (produkcja).
 * Gotowy do rozszerzenia o UA i EN bez zmian w komponentach.
 *
 * Jak wdrożyć pełne i18n:
 *   1. Zainstaluj `next-intl` lub `next-i18next`.
 *   2. Przenieś teksty z lib/content.ts do osobnych plików locale/pl.json, locale/ua.json.
 *   3. Opatrz layout.tsx w `<html lang={locale}>`.
 *   4. Podmień importy content.ts na useTranslations() / getTranslations().
 *
 * Obecna rola tego pliku:
 *   - Centralny rejestr obsługiwanych języków i ich metadanych.
 *   - Importowany przez Nav do przełącznika PL / UA.
 */

export const LOCALES = ["PL", "UA"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_META: Record<Locale, { label: string; lang: string; dir: "ltr" | "rtl" }> = {
  PL: { label: "Polski",      lang: "pl", dir: "ltr" },
  UA: { label: "Українська",  lang: "uk", dir: "ltr" },
};

export const DEFAULT_LOCALE: Locale = "PL";

/**
 * Minimalne tłumaczenia UI (nawigacja, przyciski).
 * Uzupełnij UA gdy będziesz gotowy na pełną lokalizację.
 */
export const UI_STRINGS: Record<Locale, {
  freeQuote:    string;
  lookingJob:   string;
  contactUs:    string;
  sendRequest:  string;
  close:        string;
  openMenu:     string;
}> = {
  PL: {
    freeQuote:   "Bezpłatna wycena",
    lookingJob:  "Szukam pracy",
    contactUs:   "Kontakt",
    sendRequest: "Wyślij zapytanie",
    close:       "Zamknij",
    openMenu:    "Otwórz menu",
  },
  UA: {
    freeQuote:   "Безкоштовна оцінка",
    lookingJob:  "Шукаю роботу",
    contactUs:   "Контакт",
    sendRequest: "Надіслати запит",
    close:       "Закрити",
    openMenu:    "Відкрити меню",
  },
};
