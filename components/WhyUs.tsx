"use client";

import { ShieldCheck, Zap, UserCog, Receipt } from "lucide-react";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

const config = [
  { icon: <ShieldCheck className="h-5 w-5" />, badge: "icon-badge-signal",  num: "01" },
  { icon: <Zap         className="h-5 w-5" />, badge: "icon-badge-accent",  num: "02" },
  { icon: <UserCog     className="h-5 w-5" />, badge: "icon-badge-violet",  num: "03" },
  { icon: <Receipt     className="h-5 w-5" />, badge: "icon-badge-amber",   num: "04" },
];

export function WhyUs() {
  const { lang } = useLang();

  const whyUsData = [
    { title: t(T.whyUsSection.w1title, lang), desc: t(T.whyUsSection.w1desc, lang) },
    { title: t(T.whyUsSection.w2title, lang), desc: t(T.whyUsSection.w2desc, lang) },
    { title: t(T.whyUsSection.w3title, lang), desc: t(T.whyUsSection.w3desc, lang) },
    { title: t(T.whyUsSection.w4title, lang), desc: t(T.whyUsSection.w4desc, lang) },
  ];

  return (
    <section
      className="container-x py-20 md:py-28"
      aria-labelledby="whyus-heading"
    >
      <Reveal className="mb-12 max-w-2xl">
        <p className="section-label">{t(T.whyUsSection.label, lang)}</p>
        <h2
          id="whyus-heading"
          className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
        >
          {t(T.whyUsSection.heading1, lang)}{" "}
          <span className="text-gradient">{t(T.whyUsSection.heading2, lang)}</span>
        </h2>
        <p className="mt-4 text-[15px] text-fg-muted">
          {t(T.whyUsSection.sub, lang)}
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {whyUsData.map((w, i) => (
          <Reveal key={w.title} delay={i * 75}>
            <div className="glass glass-hover flex h-full gap-5 rounded-2xl p-6 md:p-7">
              {/* Lewa: numer + ikona */}
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span className={`icon-badge ${config[i].badge}`} aria-hidden>
                  {config[i].icon}
                </span>
                <span className="font-display text-[10px] font-bold tracking-[0.15em] text-fg-faint">
                  {config[i].num}
                </span>
              </div>
              {/* Prawa: treść */}
              <div>
                <h3 className="font-display text-base font-bold text-fg sm:text-[17px]">
                  {w.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                  {w.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
