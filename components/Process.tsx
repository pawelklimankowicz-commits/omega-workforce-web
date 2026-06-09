"use client";

import { Reveal } from "./Reveal";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import {
  PhoneCall,
  FileCheck2,
  Users,
  Headphones,
  CheckCircle2,
} from "lucide-react";

// ─── Per-step visual config (static, no translations) ────────────────────────

const STEP_VISUAL = [
  {
    Icon:        PhoneCall,
    accent:      "#5B8CFF",
    glowColor:   "rgba(91,140,255,0.28)",
    borderColor: "rgba(91,140,255,0.35)",
    bgColor:     "rgba(91,140,255,0.07)",
    stepNum:     "01",
  },
  {
    Icon:        FileCheck2,
    accent:      "#8A5CFF",
    glowColor:   "rgba(138,92,255,0.28)",
    borderColor: "rgba(138,92,255,0.35)",
    bgColor:     "rgba(138,92,255,0.07)",
    stepNum:     "02",
  },
  {
    Icon:        Users,
    accent:      "#34D39A",
    glowColor:   "rgba(52,211,154,0.28)",
    borderColor: "rgba(52,211,154,0.35)",
    bgColor:     "rgba(52,211,154,0.07)",
    stepNum:     "03",
  },
  {
    Icon:        Headphones,
    accent:      "#FFB454",
    glowColor:   "rgba(255,180,84,0.28)",
    borderColor: "rgba(255,180,84,0.35)",
    bgColor:     "rgba(255,180,84,0.07)",
    stepNum:     "04",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function Process() {
  const { lang } = useLang();

  const processSteps = [
    {
      stepNum:     "01",
      time:        t(T.processSection.step1Time, lang),
      title:       t(T.processSection.step1Title, lang),
      desc:        t(T.processSection.step1Desc, lang),
      deliverables: [
        t(T.processSection.step1d1, lang),
        t(T.processSection.step1d2, lang),
        t(T.processSection.step1d3, lang),
      ],
    },
    {
      stepNum:     "02",
      time:        t(T.processSection.step2Time, lang),
      title:       t(T.processSection.step2Title, lang),
      desc:        t(T.processSection.step2Desc, lang),
      deliverables: [
        t(T.processSection.step2d1, lang),
        t(T.processSection.step2d2, lang),
        t(T.processSection.step2d3, lang),
      ],
    },
    {
      stepNum:     "03",
      time:        t(T.processSection.step3Time, lang),
      title:       t(T.processSection.step3Title, lang),
      desc:        t(T.processSection.step3Desc, lang),
      deliverables: [
        t(T.processSection.step3d1, lang),
        t(T.processSection.step3d2, lang),
        t(T.processSection.step3d3, lang),
      ],
    },
    {
      stepNum:     "04",
      time:        t(T.processSection.step4Time, lang),
      title:       t(T.processSection.step4Title, lang),
      desc:        t(T.processSection.step4Desc, lang),
      deliverables: [
        t(T.processSection.step4d1, lang),
        t(T.processSection.step4d2, lang),
        t(T.processSection.step4d3, lang),
      ],
    },
  ];

  return (
    <section
      id="proces"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      {/* Background glows */}
      <div
        className="glow left-[-140px] top-1/2 h-[420px] w-[420px] -translate-y-1/2"
        style={{ background: "rgba(138,92,255,0.18)" }}
        aria-hidden
      />
      <div
        className="glow right-[-100px] bottom-1/4 h-[300px] w-[300px]"
        style={{ background: "rgba(91,140,255,0.15)" }}
        aria-hidden
      />

      <div className="container-x relative">

        {/* ── Heading ── */}
        <Reveal className="mb-16 max-w-2xl">
          <p className="section-label">{t(T.processSection.label, lang)}</p>
          <h2
            id="process-heading"
            className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
          >
            {t(T.processSection.heading1, lang)}
            <br />
            <span className="text-gradient">{t(T.processSection.heading2, lang)}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            {t(T.processSection.sub, lang)}
          </p>
        </Reveal>

        {/* ══════════════════════════════════════════════
            DESKTOP — pozioma linia czasu (md+)
        ══════════════════════════════════════════════ */}
        <div className="hidden md:block">

          {/* Górna szyna z kółkami i łącznikami */}
          <div className="relative mb-8">

            {/* Linia łącząca */}
            <div
              className="absolute left-[calc(12.5%+0px)] right-[calc(12.5%+0px)] top-7 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(91,140,255,0.6) 0%, rgba(138,92,255,0.6) 33%, rgba(52,211,154,0.6) 66%, rgba(255,180,84,0.6) 100%)",
              }}
              aria-hidden
            />

            {/* Kółka kroków */}
            <div className="grid grid-cols-4">
              {processSteps.map((step, i) => {
                const meta = STEP_VISUAL[i];
                const Icon = meta.Icon;
                return (
                  <div key={step.stepNum} className="flex flex-col items-center">
                    {/* Kółko */}
                    <Reveal delay={i * 80}>
                      <div className="relative flex h-14 w-14 items-center justify-center">
                        {/* Glow za kółkiem */}
                        <div
                          className="absolute inset-0 rounded-full blur-xl"
                          style={{ background: meta.glowColor }}
                          aria-hidden
                        />
                        {/* Kółko właściwe */}
                        <div
                          className="relative z-10 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 text-center"
                          style={{
                            borderColor: meta.borderColor,
                            background:  `linear-gradient(135deg, ${meta.bgColor}, rgba(255,255,255,0.04))`,
                            boxShadow:   `0 0 0 4px rgba(6,6,10,1), 0 0 0 5px ${meta.borderColor}`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: meta.accent }}
                            aria-hidden
                          />
                        </div>
                        {/* Numer etapu */}
                        <span
                          className="absolute -top-3 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                          style={{
                            background: meta.accent,
                            color:      "#06060A",
                          }}
                        >
                          {step.stepNum}
                        </span>
                      </div>
                    </Reveal>

                    {/* Czas pod kółkiem */}
                    <Reveal delay={i * 80 + 40}>
                      <span
                        className="mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{
                          background:  meta.bgColor,
                          color:       meta.accent,
                          border:      `1px solid ${meta.borderColor}`,
                        }}
                      >
                        {step.time}
                      </span>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Karty treści pod szyną */}
          <div className="grid grid-cols-4 gap-4">
            {processSteps.map((step, i) => {
              const meta = STEP_VISUAL[i];
              return (
                <Reveal key={step.stepNum} delay={i * 90 + 60}>
                  <div
                    className="flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      background:   `linear-gradient(135deg, ${meta.bgColor}, rgba(255,255,255,0.02))`,
                      border:       `1px solid ${meta.borderColor}`,
                      boxShadow:    `0 8px 32px -12px ${meta.glowColor}`,
                    }}
                  >
                    <h3 className="font-display text-[15px] font-bold leading-snug text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                      {step.desc}
                    </p>

                    {/* Deliverables checklist */}
                    <ul className="mt-4 space-y-1.5" role="list">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            style={{ color: meta.accent }}
                            aria-hidden
                          />
                          <span className="text-[12px] text-fg-faint">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MOBILE — pionowa linia czasu (< md)
        ══════════════════════════════════════════════ */}
        <div className="relative md:hidden">

          {/* Pionowa linia */}
          <div
            className="absolute left-7 top-0 bottom-8 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(91,140,255,0.6) 0%, rgba(138,92,255,0.5) 33%, rgba(52,211,154,0.5) 66%, rgba(255,180,84,0.5) 100%)",
            }}
            aria-hidden
          />

          <div className="space-y-6">
            {processSteps.map((step, i) => {
              const meta = STEP_VISUAL[i];
              const Icon = meta.Icon;
              const isLast = i === processSteps.length - 1;

              return (
                <Reveal key={step.stepNum} delay={i * 80}>
                  <div className="relative flex gap-5">

                    {/* Kółko na linii */}
                    <div className="relative z-10 shrink-0">
                      {/* Glow */}
                      <div
                        className="absolute inset-0 rounded-full blur-lg"
                        style={{ background: meta.glowColor }}
                        aria-hidden
                      />
                      <div
                        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2"
                        style={{
                          borderColor: meta.borderColor,
                          background:  `linear-gradient(135deg, ${meta.bgColor}, rgba(6,6,10,0.9))`,
                          boxShadow:   `0 0 0 3px rgba(6,6,10,1), 0 0 0 4px ${meta.borderColor}`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: meta.accent }}
                          aria-hidden
                        />
                      </div>
                      {/* Numer */}
                      <span
                        className="absolute -top-2 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                        style={{ background: meta.accent, color: "#06060A" }}
                      >
                        {step.stepNum}
                      </span>
                    </div>

                    {/* Karta */}
                    <div
                      className="flex-1 rounded-2xl p-5"
                      style={{
                        background:   `linear-gradient(135deg, ${meta.bgColor}, rgba(255,255,255,0.02))`,
                        border:       `1px solid ${meta.borderColor}`,
                        boxShadow:    `0 8px 24px -10px ${meta.glowColor}`,
                      }}
                    >
                      {/* Czas */}
                      <span
                        className="mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                        style={{
                          background:  meta.bgColor,
                          color:       meta.accent,
                          border:      `1px solid ${meta.borderColor}`,
                        }}
                      >
                        {step.time}
                      </span>

                      <h3 className="font-display text-base font-bold leading-snug text-fg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                        {step.desc}
                      </p>

                      {/* Deliverables */}
                      <ul className="mt-3 space-y-1.5" role="list">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              style={{ color: meta.accent }}
                              aria-hidden
                            />
                            <span className="text-[12px] text-fg-faint">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────── */}
        <Reveal delay={220} className="mt-16 flex flex-col items-center gap-4 text-center">
          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-fg-faint">
            <span>
              <strong className="text-fg">97%</strong>{" "}{t(T.processSection.bottomStat1, lang)}
            </span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>
              {t(T.processSection.bottomStat2, lang)}{" "}
              <strong className="text-fg">7 {lang === "PL" ? "dni" : "днів"}</strong>
            </span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>
              {t(T.processSection.bottomStat3, lang)}{" "}
              <strong className="text-fg">3,5 {lang === "PL" ? "godz." : "год."}</strong>
            </span>
          </div>

          <a href="#kontakt" className="btn-primary inline-flex text-base px-8 py-3.5">
            {t(T.processSection.ctaBtn, lang)}
          </a>

          <p className="text-xs text-fg-faint">
            {t(T.processSection.ctaNote, lang)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
