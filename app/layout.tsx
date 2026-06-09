import type { Metadata, Viewport } from "next";
import { company } from "@/lib/content";
import { SkipLink } from "@/components/SkipLink";
import { MessengerWidget } from "@/components/MessengerWidget";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://omegaworkforce.pl"),
  title: {
    default: "Omega Workforce — agencja pracy, leasing, outsourcing, pracownicy z Ukrainy",
    template: "%s | Omega Workforce",
  },
  description:
    "Legalna agencja zatrudnienia: pośrednictwo pracy, praca tymczasowa, outsourcing procesów oraz rekrutacja i obsługa pracowników z Ukrainy. Wycena w 24h, kandydaci w 7 dni.",
  keywords: [
    "agencja pracy",
    "leasing pracowniczy",
    "outsourcing pracowniczy",
    "pracownicy z Ukrainy",
    "praca tymczasowa",
    "pośrednictwo pracy",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Omega Workforce — agencja zatrudnienia nowej generacji",
    description:
      "Pośrednictwo, leasing, outsourcing i obsługa pracowników z Ukrainy. Legalnie, szybko, transparentnie.",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

/** Viewport export — wymagany w Next.js 14 osobno (nie w metadata) */
export const viewport: Viewport = {
  themeColor: "#06060A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="font-sans antialiased">
        {/* Accessibility: skip to main content (WCAG 2.4.1) */}
        <SkipLink />
        {children}
        {/* Sticky multi-channel contact widget (global) */}
        <MessengerWidget />
      </body>
    </html>
  );
}
