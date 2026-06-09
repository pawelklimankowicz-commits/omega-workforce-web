/**
 * Analytics & tracking hooks — gotowy do podłączenia.
 *
 * Aktualna implementacja: no-op (brak danych wysyłanych).
 * Podmień body funkcji gdy masz klucz GA4 / GTM / Plausible.
 *
 * ─── GA4 (Google Analytics 4) ───
 *   1. Dodaj do layout.tsx:
 *      import Script from "next/script"
 *      <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" strategy="afterInteractive" />
 *   2. Podmień trackEvent() na window.gtag("event", name, params)
 *
 * ─── GTM (Google Tag Manager) ───
 *   Użyj @next/third-parties: GoogleTagManager z layout.tsx
 *
 * ─── Plausible (privacy-first) ───
 *   <Script defer data-domain="omegaworkforce.pl" src="https://plausible.io/js/script.js" />
 *
 * ─── Meta Pixel ───
 *   Dodaj fbq("track", "Lead") w onLeadSubmit()
 */

type EventParams = Record<string, string | number | boolean>;

/** Zdarzenie ogólne — zamień na gtag/fbq/plausible call */
export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  // TODO: window.gtag?.("event", name, params ?? {});
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, params);
  }
}

/** Konwersja: formularz B2B wysłany */
export function onLeadSubmit(role: "firma" | "kandydat", extra?: EventParams): void {
  trackEvent("lead_submit", { role, ...extra });
  // TODO: window.fbq?.("track", "Lead");
}

/** Kliknięcie CTA */
export function onCtaClick(label: string, section: string): void {
  trackEvent("cta_click", { label, section });
}

/** Czas spędzony na stronie — wywołaj z useEffect po N sekundach */
export function onEngagement(seconds: number): void {
  trackEvent("engagement", { seconds });
}
