"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

// ─── Types ──────────────────────────────────────────────────────────────────

type IndustryKey =
  | "produkcja" | "logistyka" | "budownictwo" | "handel"
  | "gastronomia" | "it" | "finanse" | "inne";

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES: Array<{ key: IndustryKey; label: string; icon: string }> = [
  { key: "produkcja",   label: "Produkcja",     icon: "🏭" },
  { key: "logistyka",   label: "Logistyka",     icon: "📦" },
  { key: "budownictwo", label: "Budownictwo",   icon: "🏗️" },
  { key: "handel",      label: "Handel",        icon: "🛒" },
  { key: "gastronomia", label: "HoReCa",        icon: "🍽️" },
  { key: "it",          label: "IT / BPO",      icon: "💻" },
  { key: "finanse",     label: "Finanse / SSC", icon: "💼" },
  { key: "inne",        label: "Inna branża",   icon: "⚙️" },
];

// Całkowity koszt dla klienta per pracownik/miesiąc (bez VAT)
// = wynagrodzenie brutto + ZUS pracodawcy + rezerwa urlopowa + obsługa Omega
// Podstawa: płaca minimalna 2026 = 4 806 zł (Dz.U. 2025 poz. 1242)
// ZUS pracodawcy: emerytalne 9,76% + rentowe 6,50% + FP 2,45% + FGŚP 0,10% + wypadkowe (wg PKD)
// Marża Omega: 13–22% w zależności od branży (rynek APT Polska, czerwiec 2026)
const BASE_COST: Record<IndustryKey, number> = {
  produkcja:   8_100,   // brutto ~5 200 zł | ZUS 20,28% | marża 20%
  logistyka:   8_300,   // brutto ~5 400 zł | ZUS 20,01% | marża 18%
  budownictwo: 11_100,  // brutto ~7 000 zł | ZUS 19,74% | marża 20%
  handel:      7_400,   // brutto ~4 900 zł | ZUS 19,74% | marża 16%
  gastronomia: 7_200,   // brutto ~4 806 zł | ZUS 19,48% | marża 16%
  it:          9_500,   // brutto ~6 500 zł | ZUS 19,48% | marża 13%
  finanse:     10_400,  // brutto ~7 200 zł | ZUS 19,48% | marża 12%
  inne:        7_800,   // brutto ~5 100 zł | ZUS 20,01% | marża 18%
};

// Szacunkowe wynagrodzenie brutto pracownika (do prezentacji podziału kosztów)
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
const DURATION_LABEL    = { 3: "3 miesiące", 6: "6 miesięcy", 12: "12+ miesięcy" } as const;

const WORKER_PRESETS = [5, 10, 25, 50, 100] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function snap(n: number, step = 100) { return Math.round(n / step) * step; }
function fmt(n: number) { return new Intl.NumberFormat("pl-PL").format(n); }

// ─── Component ───────────────────────────────────────────────────────────────

export function Calculator() {
  const [step,     setStep]     = useState<0 | 1 | 2 | 3>(0);
  const [workers,  setWorkers]  = useState(15);
  const [industry, setIndustry] = useState<IndustryKey | null>(null);
  const [duration, setDuration] = useState<3 | 6 | 12>(6);

  // Results (calculated only when step 3 is shown)
  const base       = BASE_COST[industry ?? "inne"];
  const grossEst   = GROSS_EST[industry ?? "inne"];
  const disc       = DURATION_DISCOUNT[duration];
  const monthly    = base * workers * disc;
  const low        = snap(monthly * 0.94);
  const high       = snap(monthly * 1.06);
  // "Koszt własnego HR" — wynagrodzenia brutto + ZUS + koszty ukryte własnej rekrutacji
  // (ogłoszenia, czas menedżerski, onboarding, rotacja ~30%/rok, dział HR)
  // Szacunek +22% vs stawka Omega — rynek polskich APT, czerwiec 2026
  const internal   = snap(monthly * 1.22);
  const savingsMo  = snap(internal - monthly);
  const savingsTotal = snap(savingsMo * duration);
  const perWorker  = snap(base * disc);
  const hourlyRate = Math.round(base / 168);

  const selectedLabel = INDUSTRIES.find(i => i.key === industry)?.label ?? "";

  function scrollToContact() {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

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
            <p className="pill-accent mb-4">Kalkulator wyceny</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg mb-4 leading-tight">
              Ile kosztuje leasing<br className="hidden sm:block" /> pracowniczy?
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">
              30 sekund. Bez rejestracji. Bez zobowiązań.
            </p>
          </Reveal>
        )}

        {/* Results heading */}
        {step === 3 && (
          <Reveal className="text-center mb-12">
            <p className="pill-accent mb-4">Twoja szacunkowa wycena</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg mb-4 leading-tight">
              Oto Twój wynik
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">
              {workers} pracowników · {selectedLabel} · {DURATION_LABEL[duration]}
            </p>
          </Reveal>
        )}

        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-3 mb-10"
              role="progressbar" aria-valuenow={step + 1} aria-valuemax={3}
              aria-label={`Krok ${step + 1} z 3`}>
              {(["Liczba osób", "Branża", "Okres"] as const).map((label, i) => (
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
                    <h3 className="text-2xl font-bold text-fg mb-1">Ilu pracowników potrzebujesz?</h3>
                    <p className="text-fg-muted text-sm">Możesz skalować w górę i w dół w trakcie całej umowy.</p>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-8xl font-black tabular-nums leading-none"
                      style={{ background: "linear-gradient(135deg,#F4F5F8,#9CA0AD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {workers}
                    </span>
                    <p className="text-fg-muted text-lg mt-3">
                      {workers === 1 ? "pracownik" : "pracowników"}
                    </p>
                  </div>

                  {/* Styled slider */}
                  <div className="space-y-2">
                    <input type="range" min={1} max={200} value={workers}
                      onChange={e => setWorkers(Number(e.target.value))}
                      className="w-full h-2 rounded-full cursor-pointer accent-accent"
                      style={{ background: `linear-gradient(to right, #5B8CFF ${(workers / 200) * 100}%, rgba(255,255,255,0.1) ${(workers / 200) * 100}%)` }}
                      aria-label="Liczba pracowników" />
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
                    Dalej — wybierz branżę →
                  </button>
                </div>
              )}

              {/* ── Step 1: Industry ─────────────────────────────────────── */}
              {step === 1 && (
                <div className="p-8 sm:p-12 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-fg mb-1">W jakiej branży działasz?</h3>
                    <p className="text-fg-muted text-sm">Stawki różnią się zależnie od specyfiki pracy i rynku lokalnego.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {INDUSTRIES.map(ind => (
                      <button key={ind.key} onClick={() => setIndustry(ind.key)}
                        className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 ${
                          industry === ind.key
                            ? "border-accent text-fg shadow-lg shadow-accent/20"
                            : "border-white/8 text-fg-muted hover:border-white/20 hover:text-fg"
                        }`}
                        style={industry === ind.key ? { background: "rgba(91,140,255,0.12)" } : {}}>
                        <span className="text-3xl leading-none" aria-hidden>{ind.icon}</span>
                        <span className="text-xs font-semibold text-center leading-tight">{ind.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(0)} className="btn-ghost flex-1">← Wróć</button>
                    <button onClick={() => setStep(2)} disabled={!industry}
                      className="btn-primary flex-[2] disabled:opacity-40 disabled:cursor-not-allowed">
                      Dalej →
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 2: Duration ─────────────────────────────────────── */}
              {step === 2 && (
                <div className="p-8 sm:p-12 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-fg mb-1">Na jak długo?</h3>
                    <p className="text-fg-muted text-sm">Przy dłuższych umowach negocjujemy niższy koszt jednostkowy.</p>
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
                            -{Math.round((1 - DURATION_DISCOUNT[d]) * 100)}% taniej
                          </span>
                        )}
                        <span className="text-4xl font-black leading-none">{d === 12 ? "12+" : d}</span>
                        <span className="text-xs font-medium">{d < 5 ? "miesiące" : "miesięcy"}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="btn-ghost flex-1">← Wróć</button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-[2]">
                      Oblicz koszt →
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
                    <p className="text-fg-muted text-sm mb-3">Szacunkowy koszt miesięczny</p>
                    <p className="text-4xl sm:text-5xl font-extrabold leading-none stat-number">
                      {fmt(low)}–{fmt(high)} zł
                    </p>
                    <p className="text-fg-faint text-xs mt-2">
                      netto klienta (wynagrodzenie + ZUS + obsługa Omega) · bez VAT
                    </p>
                  </div>

                  {/* Per-worker breakdown */}
                  <div className="rounded-xl px-5 py-4 space-y-3"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-fg-faint text-xs font-semibold uppercase tracking-widest">Struktura kosztu / pracownik</p>
                    <div className="space-y-2">
                      {/* Gross bar */}
                      {(() => {
                        const grossPct = Math.round((grossEst / base) * 100);
                        const zusPct   = Math.round(((base - grossEst - Math.round(grossEst * 0.10)) / base) * 100);
                        const marginPct = 100 - grossPct - zusPct;
                        return (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">Wynagrodzenie</div>
                              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-accent/60" style={{ width: `${grossPct}%` }} />
                              </div>
                              <div className="w-20 text-right text-xs font-semibold text-fg">{fmt(grossEst)} zł</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">ZUS + urlop</div>
                              <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full bg-violet-400/50" style={{ width: `${zusPct}%` }} />
                              </div>
                              <div className="w-20 text-right text-xs font-semibold text-fg">{fmt(Math.round(grossEst * 0.305))} zł</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-28 shrink-0 text-[11px] text-fg-faint">Obsługa Omega</div>
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
                      <span className="text-[11px] text-fg-faint">Na pracownika / miesiąc</span>
                      <span className="text-sm font-bold text-fg">{fmt(perWorker)} zł · {hourlyRate} zł/h</span>
                    </div>
                  </div>

                  {/* Secondary metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-xl p-4 space-y-1">
                      <p className="text-fg-faint text-xs">Czas obsadzenia stanowiska</p>
                      <p className="text-2xl font-black" style={{ color: "#34D39A" }}>7 dni</p>
                      <p className="text-fg-faint text-[11px]">vs. ~4 tygodnie własny HR</p>
                    </div>
                    <div className="glass rounded-xl p-4 space-y-1">
                      <p className="text-fg-faint text-xs">Oszczędność vs. własny HR*</p>
                      <p className="text-2xl font-black" style={{ color: "#34D39A" }}>+{fmt(savingsMo)} zł</p>
                      <p className="text-fg-faint text-[11px]">miesięcznie</p>
                    </div>
                    <div className="glass rounded-xl p-5 space-y-1 col-span-2">
                      <p className="text-fg-faint text-xs">Łączna oszczędność przez {DURATION_LABEL[duration]}</p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-3xl font-black" style={{ color: "#34D39A" }}>{fmt(savingsTotal)} zł</p>
                        <p className="text-fg-muted text-sm">vs. własny dział rekrutacji</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-fg-faint text-xs text-center leading-relaxed">
                    * Szacunek oparty na danych rynku pracy czerwiec 2026 (płaca minimalna 4 806 zł, składki ZUS wg Dz.U. 2025 poz. 1242). Oszczędność vs. własny HR uwzględnia koszty rekrutacji, onboardingu, rotacji ~30%/rok i działu kadr. Dokładna wycena po bezpłatnej konsultacji.
                  </p>

                  <button onClick={scrollToContact} className="btn-primary w-full py-4 text-base">
                    Chcę dokładną wycenę dla {workers} pracowników →
                  </button>

                  <button onClick={() => { setStep(0); setIndustry(null); setDuration(6); }}
                    className="btn-ghost w-full text-sm">
                    ↺ Zmień parametry
                  </button>
                </div>
              )}

            </div>
          </Reveal>

          {/* Bottom trust row */}
          {step < 3 && (
            <p className="text-center text-fg-faint text-xs mt-6">
              🔒 Bez rejestracji · Bez zobowiązań · Wycena bezpłatna
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
