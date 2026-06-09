import { ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { heroB, heroBenefits, company } from "@/lib/content";
import { Reveal } from "./Reveal";

// Aktywny wariant: heroB (Premium / value-first).
// Żeby przetestować wariant A lub C, zmień import: heroA / heroC.
const hero = heroB;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 md:pt-40"
      aria-label="Omega Workforce"
    >
      {/* Tła dekoracyjne */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div
        className="glow left-1/2 -translate-x-1/2 top-[-80px] h-[520px] w-[720px]"
        style={{ background: "radial-gradient(ellipse, rgba(91,140,255,0.33) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="glow right-[-60px] top-[80px] h-[380px] w-[380px]"
        style={{ background: "rgba(138,92,255,0.28)" }}
        aria-hidden
      />
      <div
        className="glow left-[-80px] top-[220px] h-[280px] w-[280px]"
        style={{ background: "rgba(52,211,154,0.1)" }}
        aria-hidden
      />

      <div className="container-x relative pb-24 md:pb-32">
        {/* ── Główna treść ── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* Pre-heading */}
          <div className="mb-6 flex justify-center">
            <span className="pill-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
              {hero.preheading}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]">
            <span className="text-gradient">{hero.h1line1}</span>
            <br />
            {hero.h1line2}
          </h1>

          {/* Motto */}
          <p className="mx-auto mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent/80">
            {company.mottoFull}
          </p>

          {/* Subheadline */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base md:text-lg">
            {hero.sub}
          </p>

          {/* Dual CTA — rozdzielenie B2B / Kandydat */}
          <div className="mx-auto mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:max-w-md">
            <a
              href="#kontakt"
              className="btn-primary flex-1 !py-3.5 !text-[14px]"
              aria-label="Zamów bezpłatną wycenę dla firmy"
            >
              {hero.ctaB2B}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#kandydaci"
              className="btn-ghost flex-1 !py-3.5 !text-[14px]"
              aria-label="Szukam pracy — zostaw zgłoszenie"
            >
              {hero.ctaCandidate}
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-fg-faint">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-signal" aria-hidden />
              Wpis do KRAZ
            </span>
            <span className="hidden sm:inline text-white/15" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" aria-hidden />
              Wycena w 24&nbsp;h
            </span>
            <span className="hidden sm:inline text-white/15" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-signal" aria-hidden />
              Zgodność z&nbsp;RODO
            </span>
            <span className="hidden sm:inline text-white/15" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-accent-violet" aria-hidden />
              Obsługa UA
            </span>
          </div>
        </Reveal>

        {/* ── Benefit card ── */}
        <Reveal delay={180} className="mt-14 flex justify-center">
          <div className="glass relative overflow-hidden rounded-2xl p-[1px] max-w-2xl w-full mx-4">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(91,140,255,0.6), transparent)" }}
              aria-hidden
            />
            <div className="rounded-2xl bg-ink-800/60 px-6 py-5 md:px-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-faint text-center">
                Dlaczego firmy wybierają Omega Workforce
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroBenefits.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-xl" role="img" aria-hidden>{item.icon}</span>
                    <span className="text-xs font-semibold text-fg">{item.label}</span>
                    <span className="text-[11px] leading-snug text-fg-faint hidden sm:block">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
