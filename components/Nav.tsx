"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck, Phone, ArrowRight, Globe } from "lucide-react";
import { company, nav } from "@/lib/content";
import { Logo } from "./Logo";
import Image from "next/image";

type Lang = "PL" | "UA";

export function Nav() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang]         = useState<Lang>("PL");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Trust bar ── */}
      <div className="hidden border-b border-white/[0.06] bg-ink-900/92 backdrop-blur-md md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5 text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-signal" />
              Wpis do KRAZ nr{" "}
              <strong className="font-semibold text-fg">{company.kraz}</strong>
            </span>
            <span className="hidden xl:inline text-white/20" aria-hidden>·</span>
            <span className="hidden xl:inline text-fg-faint">
              Legalna agencja zatrudnienia · obsługa cudzoziemców
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div
              className="flex items-center gap-0.5 rounded-lg border border-white/[0.07] bg-white/[0.03] p-0.5"
              role="group"
              aria-label="Wybór języka"
            >
              <Globe className="mx-1.5 h-3 w-3 text-fg-faint" aria-hidden />
              {(["PL", "UA"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`lang-btn ${lang === l ? "lang-btn-active" : "lang-btn-inactive"}`}
                  aria-label={`Język ${l}`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href={`tel:${company.phoneHref}`}
              className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div
        className={`border-b transition-all duration-200 ${
          scrolled
            ? "border-white/[0.07] bg-ink-900/92 backdrop-blur-xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-x flex h-16 items-center justify-between gap-4"
          aria-label="Główna nawigacja"
        >
          <a
            href="#top"
            aria-label={`${company.name} — strona główna`}
            className="z-50 shrink-0 rounded-lg outline-none"
          >
            <Logo variant="horizontal" height={38} />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex" role="list">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg hover:bg-white/[0.04]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 lg:flex shrink-0">
            <a href="#kandydaci" className="btn-ghost !py-2 !px-4 !text-[13px]">
              Szukam pracy
            </a>
            {/* Panel login button */}
            <a href="/login"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-fg-muted transition-all hover:text-fg hover:border-white/25 hover:bg-white/[0.08]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Panel klienta
            </a>
            <a href="#kontakt" className="btn-primary !py-2 !px-5 !text-[13px]">
              Bezpłatna wycena
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.08] lg:hidden"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink-900/98 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-16 md:h-[4.75rem] flex items-center px-5" aria-hidden>
          <Logo variant="horizontal" height={34} />
        </div>
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-10">
          {/* Lang mobile */}
          <div className="mb-6 flex items-center gap-2">
            <Globe className="h-4 w-4 text-fg-faint" aria-hidden />
            <span className="text-xs text-fg-faint mr-1">Język:</span>
            {(["PL", "UA"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`lang-btn !h-8 !min-w-[44px] !text-sm ${lang === l ? "lang-btn-active" : "lang-btn-inactive"}`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>

          <ul className="space-y-0.5" role="list">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-fg hover:bg-white/[0.06] transition-colors"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-fg-faint" />
                </a>
              </li>
            ))}
          </ul>

          <div className="my-6 divider" />

          <div className="flex flex-col gap-3">
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center !py-3.5 !text-sm"
            >
              Bezpłatna wycena dla firm
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#kandydaci"
              onClick={() => setOpen(false)}
              className="btn-ghost w-full justify-center !py-3.5 !text-sm"
            >
              Szukam pracy
            </a>
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-white/[0.12] bg-white/[0.03] py-3.5 text-sm font-semibold text-fg-muted hover:text-fg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              Panel klienta / pracownika
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <a
              href={`tel:${company.phoneHref}`}
              className="flex items-center gap-2.5 text-sm font-medium text-fg hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4 text-accent" />
              {company.phone}
            </a>
            <p className="text-xs text-fg-faint">
              <ShieldCheck className="inline h-3.5 w-3.5 text-signal mr-1.5" />
              KRAZ nr {company.kraz} · Legalne zatrudnienie
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
