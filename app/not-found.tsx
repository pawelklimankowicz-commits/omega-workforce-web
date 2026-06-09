import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strona nie istnieje — Omega Workforce",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      {/* decorative glow */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #5B8CFF 0%, transparent 70%)" }}
      />

      <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">
        Błąd 404
      </p>

      <h1 className="text-5xl sm:text-7xl font-extrabold text-fg mb-6 leading-none">
        Nie ma takiej strony
      </h1>

      <p className="text-fg-muted max-w-md text-lg mb-10">
        Strona, której szukasz, nie istnieje lub została przeniesiona.
        Wróć na stronę główną i znajdź to, czego szukasz.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-primary">
          Wróć na stronę główną
        </Link>
        <Link href="/#kontakt" className="btn-ghost">
          Skontaktuj się z nami
        </Link>
      </div>

      <p className="mt-16 text-fg-faint text-sm">
        Omega Workforce — agencja pracy
      </p>
    </main>
  );
}
