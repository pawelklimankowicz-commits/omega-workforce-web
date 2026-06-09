"use client";

import { ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react";
import { heroBenefits } from "@/lib/content";
import { T, t } from "@/lib/translations";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";

export function Hero() {
  const { lang } = useLang();

  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40" aria-label="Omega Workforce">
      {/* Tła */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="glow left-1/2 -translate-x-1/2 top-[-80px] h-[520px] w-[720px]"
        style={{ background: "radial-gradient(ellipse, rgba(91,140,255,0.33) 0%, transparent 70%)" }} aria-hidden />
      <div className="glow right-[-60px] top-[80px] h-[380px] w-[380px]"
        style={{ background: "rgba(138,92,255,0.28)" }} aria-hidden />
      <div className="glow left-[-80px] top-[220px] h-[280px] w-[280px]"
        style={{ background: "rgba(52,211,154,0.1)" }} aria-hidden />

      <div className="container-x relative pb-24 md:pb-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* Pill */}
          <div className="mb-6 flex justify-center">
            <span className="pill-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
              {t(T.hero.pill, lang)}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]">
            <span className="text-gradient">{t(T.hero.h1a, lang)}</span>
            <br />
            {t(T.hero.h1b, lang)}
          </h1>

          {/* Motto */}
          <p className="mx-auto mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent/80">
            {t(T.hero.motto, lang)}
          </p>

          {/* Sub */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base md:text-lg">
            {t(T.hero.sub, lang)}
          </p>

          {/* CTA */}
          <div className="mx-auto mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:max-w-md">
            <a href="#kontakt" className="btn-primary flex-1 !py-3.5 !text-[14px]">
              {t(T.hero.ctaFirm, lang)}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#kandydaci" className="btn-ghost flex-1 !py-3.5 !text-[14px]">
              {t(T.hero.ctaJob, lang)}
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-fg-faint">
            {[
              { icon: <ShieldCheck className="h-4 w-4 text-signal" />, text: t(T.hero.badge1, lang) },
              { icon: <Clock       className="h-4 w-4 text-accent"  />, text: t(T.hero.badge2, lang) },
              { icon: <ShieldCheck className="h-4 w-4 text-signal"  />, text: t(T.hero.badge3, lang) },
              { icon: <CheckCircle className="h-4 w-4 text-accent-violet" />, text: t(T.hero.badge4, lang) },
            ].map((b, i) => (
              <>
                <span key={i} className="inline-flex items-center gap-1.5">
                  {b.icon} {b.text}
                </span>
                {i < 3 && <span className="hidden sm:inline text-white/15" aria-hidden>·</span>}
              </>
            ))}
          </div>
        </Reveal>

        {/* Benefit card */}
        <Reveal delay={180} className="mt-14 flex justify-center">
          <div className="glass relative overflow-hidden rounded-2xl p-[1px] max-w-2xl w-full mx-4">
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(91,140,255,0.6), transparent)" }} aria-hidden />
            <div className="rounded-2xl bg-ink-800/60 px-6 py-5 md:px-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-faint text-center">
                {lang === "UA" ? "Чому компанії обирають Omega Workforce" : "Dlaczego firmy wybierają Omega Workforce"}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroBenefits.map((item) => (
                  <div key={item.label}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center hover:bg-white/[0.04] transition-colors">
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
