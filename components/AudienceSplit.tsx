"use client";

import { Building2, UserRound, Check, TrendingUp } from "lucide-react";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

export function AudienceSplit() {
  const { lang } = useLang();

  return (
    <section
      id="kandydaci"
      className="container-x py-20 md:py-28"
      aria-label={t(T.audience.heading, lang)}
    >
      <Reveal className="mb-10 text-center">
        <p className="section-label justify-center">{t(T.audience.sectionLabel, lang)}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {t(T.audience.heading, lang)}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-fg-muted">{t(T.audience.sub, lang)}</p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {/* ── Karta B2B ── */}
        <Reveal delay={0}>
          <div className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
              style={{ background: "rgba(91,140,255,1)" }}
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #5B8CFF, #8A5CFF)" }}
              aria-hidden
            />
            <div className="relative">
              <span className="icon-badge icon-badge-accent mb-5 block w-fit" aria-hidden>
                <Building2 className="h-5 w-5" />
              </span>
              <p className="section-label">{t(T.audience.b2bLabel, lang)}</p>
              <h3 className="font-display text-2xl font-bold text-fg">{t(T.audience.b2bHeading, lang)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{t(T.audience.b2bSub, lang)}</p>
              <ul className="mt-6 space-y-3" role="list">
                {[
                  t(T.audience.b2bB1, lang),
                  t(T.audience.b2bB2, lang),
                  t(T.audience.b2bB3, lang),
                  t(T.audience.b2bB4, lang),
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#kontakt" className="btn-primary">
                  {t(T.audience.b2bCta, lang)}
                </a>
                <span className="text-xs text-fg-faint flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {t(T.audience.b2bCtaNote, lang)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Karta Kandydat ── */}
        <Reveal delay={100}>
          <div className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
              style={{ background: "rgba(52,211,154,1)" }}
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #34D39A, #20B47A)" }}
              aria-hidden
            />
            <div className="relative">
              <span className="icon-badge icon-badge-signal mb-5 block w-fit" aria-hidden>
                <UserRound className="h-5 w-5" />
              </span>
              <p className="section-label-signal">{t(T.audience.candLabel, lang)}</p>
              <h3 className="font-display text-2xl font-bold text-fg">{t(T.audience.candHeading, lang)}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{t(T.audience.candSub, lang)}</p>
              <ul className="mt-6 space-y-3" role="list">
                {[
                  t(T.audience.candB1, lang),
                  t(T.audience.candB2, lang),
                  t(T.audience.candB3, lang),
                  t(T.audience.candB4, lang),
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#kontakt" className="btn-signal">
                  {t(T.audience.candCta, lang)}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
