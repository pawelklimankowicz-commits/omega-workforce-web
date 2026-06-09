"use client";

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
          <div className="mx-auto mt-7 flex justify-center">
            <div
              className="relative inline-block rounded-2xl p-px"
              style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.5), rgba(138,92,255,0.45), rgba(91,140,255,0.3))" }}
            >
              <div
                className="rounded-2xl px-6 py-3 text-center"
                style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.09), rgba(6,6,10,0.85))", backdropFilter: "blur(8px)" }}
              >
                <p className="text-[15px] font-semibold leading-snug text-fg sm:text-base">
                  <span className="mr-1 font-serif text-xl leading-none text-accent/60" aria-hidden>&bdquo;</span>
                  {t(T.hero.motto, lang)}
                  <span className="ml-1 font-serif text-xl leading-none text-accent/60" aria-hidden>&rdquo;</span>
                </p>
              </div>
            </div>
          </div>

          {/* Sub */}
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base md:text-lg">
            {t(T.hero.sub, lang)}
          </p>

          {/* CTA */}
          <div className="mx-auto mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:max-w-md">
            <a href="#kontakt" className="btn-primary flex-1 !py-3.5 !text-[14px]">
              {t(T.hero.ctaFirm, lang)}
            </a>
            <a href="#kandydaci" className="btn-ghost flex-1 !py-3.5 !text-[14px]">
              {t(T.hero.ctaJob, lang)}
            </a>
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
