"use client";

import { Phone } from "lucide-react";
import { company } from "@/lib/content";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const { lang } = useLang();

  return (
    <section
      className="container-x py-20 md:py-28"
      aria-labelledby="final-cta-heading"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl p-[1px]">
          {/* Gradient border */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.5), rgba(138,92,255,0.3), rgba(91,140,255,0.08))" }}
            aria-hidden
          />
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 text-center md:px-16 md:py-20"
            style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.1) 0%, rgba(138,92,255,0.07) 50%, rgba(6,6,10,0.97) 100%)" }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "rgba(91,140,255,1)" }}
              aria-hidden
            />

            <p className="section-label justify-center">{t(T.finalCtaSection.label, lang)}</p>

            <h2
              id="final-cta-heading"
              className="relative font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-[2.8rem]"
            >
              {t(T.finalCtaSection.heading, lang)}
              <br className="hidden sm:block" />
              <span className="text-gradient">{t(T.finalCtaSection.accent, lang)}</span>
            </h2>

            <p className="relative mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              {t(T.finalCtaSection.sub, lang)}
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#kontakt"
                className="btn-primary !px-8 !py-3.5 !text-sm w-full justify-center sm:w-auto"
              >
                {t(T.finalCtaSection.ctaPrimary, lang)}
              </a>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="btn-ghost !px-6 !py-3.5 !text-sm w-full justify-center sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {company.phone}
              </a>
            </div>

            {/* Motto — styl identyczny jak w Hero */}
            <div className="relative mt-8 flex justify-center">
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
                    {t(T.footer.motto, lang)}
                    <span className="ml-1 font-serif text-xl leading-none text-accent/60" aria-hidden>&rdquo;</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="relative mt-2 text-xs text-fg-faint">{t(T.finalCtaSection.footer, lang)}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
