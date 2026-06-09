"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { lang } = useLang();

  const faqs = [
    { q: t(T.faqSection.q1, lang), a: t(T.faqSection.a1, lang) },
    { q: t(T.faqSection.q2, lang), a: t(T.faqSection.a2, lang) },
    { q: t(T.faqSection.q3, lang), a: t(T.faqSection.a3, lang) },
    { q: t(T.faqSection.q4, lang), a: t(T.faqSection.a4, lang) },
    { q: t(T.faqSection.q5, lang), a: t(T.faqSection.a5, lang) },
    { q: t(T.faqSection.q6, lang), a: t(T.faqSection.a6, lang) },
  ];

  return (
    <section id="faq" className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="section-label">{t(T.faqSection.label, lang)}</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t(T.faqSection.heading, lang)}
          </h2>
          <p className="mt-4 text-fg-muted">
            {t(T.faqSection.sub, lang)}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="bg-white/[0.015]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-fg">{f.q}</span>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-accent">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-fg-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
