import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface Section {
  heading: string;
  content: ReactNode;
}

interface Props {
  title: string;
  subtitle?: string;
  date: string;
  version?: string;
  pdfHref: string;
  sections: Section[];
}

export function LegalPageLayout({ title, subtitle, date, version, pdfHref, sections }: Props) {
  return (
    <div className="min-h-screen" style={{ background: "#06060A", color: "#F4F5F8" }}>
      {/* Top bar */}
      <header className="border-b border-white/[0.07] sticky top-0 z-40"
        style={{ background: "rgba(6,6,10,0.96)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image src="/logo-horizontal.png" alt="Omega Workforce" width={140} height={27} priority />
          </Link>
          <Link href="/"
            className="text-sm text-fg-muted hover:text-fg transition-colors flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Strona główna
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12 md:py-16">
        {/* Hero */}
        <div className="mb-10 pb-10 border-b border-white/[0.08]">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/70 mb-3">
            Omega Workforce · Dokumenty prawne
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
          {subtitle && <p className="text-fg-muted mb-4">{subtitle}</p>}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-fg-faint">
              Obowiązuje od: <strong className="text-fg-muted">{date}</strong>
              {version && <> · Wersja: <strong className="text-fg-muted">{version}</strong></>}
            </span>
            <a href={pdfHref} download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-accent/30 bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Pobierz PDF
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i} className="scroll-mt-20">
              <h2 className="text-base font-bold uppercase tracking-[0.1em] text-fg-muted mb-4 pb-2 border-b border-white/[0.06]">
                {section.heading}
              </h2>
              <div className="prose-legal">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer stripe */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-xs text-fg-faint space-y-1">
          <p>© 2025 Omega Spółka z ograniczoną odpowiedzialnością · os. Stefana Batorego 14/81, 60-687 Poznań</p>
          <p>KRS: 0000853422 · NIP: 781-201-17-24 · REGON: 386693099</p>
          <p>Kontakt RODO: <a href="mailto:rodo@omegaworkforce.pl" className="hover:text-fg transition-colors">rodo@omegaworkforce.pl</a></p>
        </div>
      </main>
    </div>
  );
}
