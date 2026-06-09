"use client";

import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

export function Industries() {
  const { lang } = useLang();

  const industriesList = [
    t(T.industriesSection.i1, lang),
    t(T.industriesSection.i2, lang),
    t(T.industriesSection.i3, lang),
    t(T.industriesSection.i4, lang),
    t(T.industriesSection.i5, lang),
    t(T.industriesSection.i6, lang),
    t(T.industriesSection.i7, lang),
    t(T.industriesSection.i8, lang),
  ];

  return (
    <section
      id="branze"
      className="container-x py-20 md:py-28"
      aria-labelledby="industries-heading"
    >
      <Reveal className="mb-10 max-w-xl">
        <p className="section-label">{t(T.industriesSection.label, lang)}</p>
        <h2
          id="industries-heading"
          className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
        >
          {t(T.industriesSection.heading, lang)}
        </h2>
        <p className="mt-3 text-[15px] text-fg-muted">
          {t(T.industriesSection.sub, lang)}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-wrap gap-3" role="list">
          {industriesList.map((ind) => (
            <a
              key={ind}
              href="#kontakt"
              role="listitem"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-fg-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-fg"
              aria-label={`${lang === "PL" ? "Zapytaj o pracowników" : "Запитати про працівників"}: ${ind}`}
            >
              {ind}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
