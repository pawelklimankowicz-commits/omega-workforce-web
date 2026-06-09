"use client";

import { stats } from "@/lib/content";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

const statLabels = [
  (lang: Parameters<typeof t>[1]) => t(T.statsSection.s1, lang),
  (lang: Parameters<typeof t>[1]) => t(T.statsSection.s2, lang),
  (lang: Parameters<typeof t>[1]) => t(T.statsSection.s3, lang),
  (lang: Parameters<typeof t>[1]) => t(T.statsSection.s4, lang),
];

export function Stats() {
  const { lang } = useLang();

  return (
    <section aria-label="Statystyki Omega Workforce" className="relative py-4 md:py-6">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-800/50">
            {/* Top gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent 5%, rgba(91,140,255,0.5) 35%, rgba(138,92,255,0.5) 65%, transparent 95%)" }}
              aria-hidden
            />

            <div className="grid grid-cols-2 gap-px md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center justify-center gap-1.5 px-6 py-8 text-center ${
                    i < stats.length - 1 ? "border-r-0 md:border-r border-white/[0.06]" : ""
                  } ${i === 0 ? "border-b md:border-b-0 border-white/[0.06]" : ""} ${i === 1 ? "border-b md:border-b-0 border-white/[0.06]" : ""}`}
                >
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    className="stat-number font-display text-4xl font-bold leading-none sm:text-5xl"
                  />
                  <p className="text-xs font-medium text-fg-muted sm:text-sm">{statLabels[i](lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
