"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";

// ─── Types ──────────────────────────────────────────────────────────────────

type IndustryKey =
  | "produkcja" | "logistyka" | "budownictwo" | "handel"
  | "gastronomia" | "it" | "finanse" | "inne";

// ─── Static data (keys/values that don't change with language) ───────────────

// Całkowity koszt dla klienta per pracownik/miesiąc (bez VAT)
// = wynagrodzenie brutto + ZUS pracodawcy + rezerwa urlopowa + obsługa Omega
// Podstawa: płaca minimalna 2026 = 4 806 zł (Dz.U. 2025 poz. 1242)
const BASE_COST: Record<IndustryKey, number> = {
  produkcja:   8_100,
  logistyka:   8_300,
  budownictwo: 11_100,
  handel:      7_400,
  gastronomia: 7_200,
  it:          9_500,
  finanse:     10_400,
  inne:        7_800,
};

const GROSS_EST: Record<IndustryKey, number> = {
  produkcja:   5_200,
  logistyka:   5_400,
  budownictwo: 7_000,
  handel:      4_900,
  gastronomia: 4_806,
  it:          6_500,
  finanse:     7_200,
  inne:        5_100,
};

const DURATION_DISCOUNT = { 3: 1.00, 6: 0.97, 12: 0.93 } as const;

const WORKER_PRESETS = [5, 10, 25, 50, 100] as const;

const INDUSTRY_ICONS: Record<IndustryKey, string> = {
  produkcja:   "🏭",
  logistyka:   "📦",
  budownictwo: "🏗️",
  handel:      "🛒",
  gastronomia: "🍽️",
  it:          "💻",
  finanse:     "💼",
  inne:        "⚙️",
};

const INDUSTRY_KEYS: IndustryKey[] = [
  "produkcja", "logistyka", "budownictwo", "handel",
  "gastronomia", "it", "finanse", "inne",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function snap(n: number, step = 100) { return Math.round(n / step) * step; }
function fmt(n: number) { return new Intl.NumberFormat("pl-PL").format(n); }

// ─── Component ───────────────────────────────────────────────────────────────

export function Calculator() {
  const { lang } = useLang();
  const [step,     setStep]     = useState<0 | 1 | 2 | 3>(0);
  const [workers,  setWorkers]  = useState(15);
  const [industry, setIndustry] = useState<IndustryKey | null>(null);
  const [duration, setDuration] = useState<3 | 6 | 12>(6);

  // Results
  const base       = BASE_COST[industry ?? "inne"];
  const grossEst   = GROSS_EST[industry ?? "inne"];
  const disc       = DURATION_DISCOUNT[duration];
  const monthly    = base * workers * disc;
  const low        = snap(monthly * 0.94);
  const high       = snap(monthly * 1.06);
  const internal   = snap(monthly * 1.22);
  const savingsMo  = snap(internal - monthly);
  const savingsTotal = snap(savingsMo * duration);
  const perWorker  = snap(base * disc);
  const hourlyRate = Math.round(base / 168);

  // Industry labels from translations
  const industryLabels: Record<IndustryKey, string> = {
    produkcja:   t(T.calculator.ind1, lang),
    logistyka:   t(T.calculator.ind2, lang),
    budownictwo: t(T.calculator.ind3, lang),
    handel:      t(T.calculator.ind4, lang),
    gastronomia: t(T.calculator.ind5, lang),
    it:          t(T.calculator.ind6, lang),
    finanse:     t(T.calculator.ind7, lang),
    inne:        t(T.calculator.ind8, lang),
  };

  // Duration labels from translations
  const durationLabels: Record<3 | 6 | 12, string> = {
    3:  t(T.calculator.dur3, lang),
    6:  t(T.calculator.dur6, lang),
    12: t(T.calculator.dur12, lang),
  };

  const selectedLabel = industry ? industryLabels[industry] : "";

  function scrollToContact() {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

  // Progress step labels
  const progressSteps = [
    t(T.calculator.progressStep1, lang),
    t(T.calculator.progressStep2, lang),
    t(T.calculator.progressStep3, lang),
  ] as const;

  return (
    <section id="kalkulator" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(91,140,255,0.055) 0%, transparent 70%)" }} />
      </div>

      <div className="container-x">
        {/* Heading — only steps 0–2 */}
        {step < 3 && (
          <Reveal className="text-center mb-12">
            <p className="pill-accent mb-4">{t(T.calculator.pill, lang)}</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg mb-4 leading-tight">
              {t(T.calculator.heading, lang).split("?")[0]}?
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">
              {t(T.calculator.sub, lang)}
            </p>
          </Reveal>
        )}

        {/* Results heading */}
        {step === 3 && (
          <Reveal className="text-center mb-12">
            <p className="pill-accent mb-4">{t(T.calculator.resultPill, lang)}</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg mb-4 leading-tight">
              {t(T.calculator.resultH2, lang)}
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">
              {workers} {t(T.calculator.workers2, lang)} · {selectedLabel} · {durationLabels[duration]}
            </p>
          </Reveal>
        )}

        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-3 mb-10"
              role="progressbar" aria-valuenow={step + 1} aria-valuemax={3}
              aria-label={`${t(T.calculator.progressAria, lang)} ${step + 1} ${t(T.calculator.progressOf, lang)} 3`}>
              {progressSteps.map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i < step  ? "bg-signal text-ink" :
                      i === step ? "bg-accent text-white" :
                      "bg-white/10 text-fg-faint"
                    }`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`text-[10px] font-medium transition-colors hidden sm:block ${i === step ? "text-fg" : "text-fg-faint"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className={`w-12 h-px mb-4 transition-all duration-500 ${i < step ? "bg-signal" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Card */}
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden">

              {/* ── Step 0: Workers ─────────────────────────────────────── */}
              {step === 0 && (
                <div className="p-8 sm:p-12 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-fg mb-1">{t(T.calculator.step0h3, lang)}</h3>
                    <p className="text-fg-muted text-sm">{t(T.calculator.step0sub, lang)}</p>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-8xl font-black tabular-nums leading-none"
                      style={{ background: "linear-gradient(135deg,#F4F5F8,#9CA0AD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {workers}
                    </span>
                    <p className="text-fg-muted text-lg mt-3">
                      {workers === 1 ? t(T.calculator.worker1, lang) : t(T.calculator.workersN, lang)}
                    </p>
                  </div>

                  {/* Styled slider */}
                  <div className="space-y-2">
                    <input type="range" min={1} max={200} value={workers}
                      onChange={e => setWorkers(Number(e.target.value))}
                      className="w-full h-2 rounded-full cursor-pointer accent-accent"
                      style={{ background: `linear-gradient(to right, #5B8CFF ${(workers / 200) * 100}%, rgba(255,255,255,0.1) ${(workers / 200) * 100}%)` }}
                      aria-label={t(T.calculator.step0h3, lang)} />
                    <div className="flex justify-between text-xs text-fg-faint px-0.5">
                      <span>1</span><span>50</span><span>100</span><span>150</span><span>200</span>
                    </div>
                  </div>

                  {/* Preset buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {WORKER_PRESETS.map(n => (
                      <button key={n} onClick={() => setWorkers(n)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                          workers === n
                            ? "bg-accent border-accent text-white shadow-lg shadow-accent/25"
                            : "border-white/10 text-fg-muted hover:border-white/25 hover:text-fg"
                        }`}>
                        {n}
                      </button>
                    ))}
                    <button onClick={() => setWorkers(200)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                        workers === 200
                          ? "bg-accent border-accent text-white shadow-lg shadow-accent/25"
                          : "border-white/10 text-fg-muted hover:border-white/25 hover:text-fg"
                      }`}>
                      200+
                    </button>
                  </div>

                  <button onClick={() => setStep(1)} className="btn-primary w-full py-4 text-base">
                    {t(T.calculator.nextIndustry, lang)}
                  </button>
                </div>
              )}

              {/* ── Step 1: Industry ─────────────────────────────────────── */}
              {step === 1 && (
                <div className="p-8 sm:p-12 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-fg mb-1">{t(T.calculator.step1h3, lang)}</h3>
                    <p className="text-fg-muted text-sm">{t(T.calculator.step1sub, lang)}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {INDUSTRY_KEYS.map(key => (
                      <button key={key} onClick={() => setIndustry(key)}
                        className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 ${
                          industry === key
                            ? "border-accent text-fg shadow-lg shadow-accent/20"
                            : "border-white/8 text-fg-muted hover:border-white/20 hover:text-fg"
                        }`}
                        style={industry === key ? { background: "rgba(91,140,255,0.12)" } : {}}>
                        <span className="text-3xl leading-none" aria-hidden>{INDUSTRY_ICONS[key]}</span>
                        <span className="text-xs font-semibold text-center leading-tight">{industryLabels[key]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(0)} className="btn-ghost flex-1">{t(T.calculator.back, lang)}</button>
                    <button onClick={() => setStep(2)} disabled={!industry}
                      className="btn-primary flex-[2] disabled:opacity-40 disabled:cursor-not-allowed">
                      {t(T.calculator.next, lang)}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Duration ─────────────────────────────────────── */}
              {step === 2 && (
                <div className="p-8 sm:p-12 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-fg mb-1">{t(T.calculator.step2h3, lang)}</h3>
                    <p className="text-fg-muted text-sm">{t(T.calculator.step2sub, lang)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {([3, 6, 12] as const).map(d => (
                      <button key={d} onClick={() => setDuration(d)}
                        className={`relative flex flex-col items-center gap-2 py-7 px-3 rounded-xl border transition-all duration-200 ${
                          duration === d
                            ? "border-accent text-fg shadow-lg shadow-accent/20"
                            : "border-white/8 text-fg-muted hover:border-white/20 hover:text-fg"
                        }`}
                        style={duration === d ? { background: "rgba(91,140,255,0.12)" } : {}}>
                        {d > 3 && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-2.5 py-0.5 rounded-full whitespace-nowrap"
                            style={{ background: "#34D39A", color: "#06060A" }}>
                            -{Math.round((1 - DURATION_DISCOUNT[d]) * 100)}% {t(T.calculator.cheaper, lang)}
                          </span>
                        )}
                        <span className="text-4xl font-black leading-none">{d === 12 ? "12+" : d}</span>
                        <span className="text-xs font-medium">
                          {d === 3 ? t(T.calculator.months3, lang) : t(T.calculator.months6, lang)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="btn-ghost flex-1">{t(T.calculator.back, lang)}</button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-[2]">
                      {t(T.calculator.calc, lang)}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Results ──────────────────────────────────────── */}
              {step === 3 && (
                <div className="p-8 sm:p-12 space-y-6">
                  {/* Main cost range */}
                  <div className="rounded-2xl p-6 text-center"
                    style={{ background: "linear-gradient(135deg, rgba(91,140,255,0.1), rgba(138,92,255,0.1))", border: "1px solid rgba(91,140,255,0.2)" }}>
                    <p className="text-fg-muted text-sm mb-3">{t(T.calculator.resMonthly, lang)}</p>
                    <p className="text-4xl sm:text-5xl font-extrabold leading-none stat-number">
                      {fmt(low)}–{fmt(high)} zł
                    </p>
                    <p className="text-fg-faint text-xs mt-2">
                      {t(T.calculator.resNote, lang)}
                    </p>
                  </div>

                  {/* Per-worker breakdown */}
                  <div className="rounded-xl px-5 py-4 space-y-3"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-fg-faint text-xs font-semibold uppercase tracking-widest">{t(T.calculator.costStruct, lang)}</p>
                    <div className="space-y-2">
                      {(() => {
                        const grossPct = Math.round((grossEst / base) * 100);
                        const zusPct   = Math.round(((base - grossEst - Math.round(grossEst * 0.10)) / base) * 100);
                        const marginPct = 100 - grossPct - zusPct;
                        return (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">{t(T.calculator.colGross, lang)}</div>
                              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-accent/60" style={{ width: `${grossPct}%` }} />
                              </div>
                              <div className="w-20 text-right text-xs font-semibold text-fg">{fmt(grossEst)} zł</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">{t(T.calculator.colZus, lang)}</div>
                              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-violet-400/50" style={{ width: `${zusPct}%` }} />
                              </div>
                              <div className="w-20 text-right text-xs font-semibold text-fg">{fmt(Math.round(grossEst * 0.305))} zł</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">{t(T.calculator.colOmega, lang)}</div>
                              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-signal/50" style={{ width: `${marginPct}%` }} />
                              </div>
                              <div className="w-20 text-right text-xs font-semibold text-fg">{fmt(base - grossEst - Math.round(grossEst * 0.305))} zł</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                      <span className="text-[11px] text-fg-faint">{t(T.calculator.perWorker, lang)}</span>
                      <span className="text-sm font-bold text-fg">{fmt(perWorker)} zł · {hourlyRate} zł/h</span>
                    </div>
                  </div>

                  {/* Secondary metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-xl p-4 space-y-1">
                      <p className="text-fg-faint text-xs">{t(T.calculator.fillTime, lang)}</p>
                      <p className="text-2xl font-black" style={{ color: "#34D39A" }}>7 {lang === "PL" ? "dni" : "днів"}</p>
                      <p className="text-fg-faint text-[11px]">{t(T.calculator.vsHR, lang)}</p>
                    </div>
                    <div className="glass rounded-xl p-4 space-y-1">
                      <p className="text-fg-faint text-xs">{t(T.calculator.savingsMo, lang)}</p>
                      <p className="text-2xl font-black" style={{ color: "#34D39A" }}>+{fmt(savingsMo)} zł</p>
                      <p className="text-fg-faint text-[11px]">{t(T.calculator.monthly2, lang)}</p>
                    </div>
                    <div className="glass rounded-xl p-5 space-y-1 col-span-2">
                      <p className="text-fg-faint text-xs">{t(T.calculator.totalSavings, lang)} {durationLabels[duration]}</p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-3xl font-black" style={{ color: "#34D39A" }}>{fmt(savingsTotal)} zł</p>
                        <p className="text-fg-muted text-sm">{t(T.calculator.vsHR2, lang)}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-fg-faint text-xs text-center leading-relaxed">
                    {t(T.calculator.disclaimer, lang)}
                  </p>

                  <button onClick={scrollToContact} className="btn-primary w-full py-4 text-base">
                    {t(T.calculator.wantQuote, lang)} {workers} {t(T.calculator.workers2, lang)}
                  </button>

                  <button onClick={() => { setStep(0); setIndustry(null); setDuration(6); }}
                    className="btn-ghost w-full text-sm">
                    {t(T.calculator.changeParams, lang)}
                  </button>
                </div>
              )}

            </div>
          </Reveal>

          {/* Bottom trust row */}
          {step < 3 && (
            <p className="text-center text-fg-faint text-xs mt-6">
              {t(T.calculator.trustNote, lang)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
