import { process } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

export function Process() {
  return (
    <section
      id="proces"
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      {/* Glowy tła */}
      <div
        className="glow left-[-120px] top-1/2 h-[350px] w-[350px] -translate-y-1/2"
        style={{ background: "rgba(138,92,255,0.25)" }}
        aria-hidden
      />
      <div
        className="glow right-[-80px] top-1/4 h-[250px] w-[250px]"
        style={{ background: "rgba(91,140,255,0.2)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <Reveal className="mb-14 max-w-2xl">
          <p className="section-label">Jak działamy</p>
          <h2
            id="process-heading"
            className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
          >
            Od briefu do ludzi na hali —
            <br />
            <span className="text-gradient">w&nbsp;dni, nie tygodnie.</span>
          </h2>
          <p className="mt-4 text-[15px] text-fg-muted">
            Przejrzysty proces z konkretnymi terminami. Wiesz, co dzieje się
            na każdym etapie — zero czarnych skrzynek.
          </p>
        </Reveal>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Łącząca linia (desktop) */}
          <div
            className="absolute left-0 right-0 top-[2.6rem] hidden h-px md:block"
            style={{ background: "linear-gradient(90deg, transparent 5%, rgba(91,140,255,0.3) 20%, rgba(138,92,255,0.3) 80%, transparent 95%)" }}
            aria-hidden
          />

          <div className="grid gap-6 md:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 90}>
                <div className="relative flex flex-col">
                  {/* Krok numer + czas */}
                  <div className="mb-5 flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                    <div
                      className="relative flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-ink-800 text-sm font-bold text-fg md:h-auto md:w-auto md:rounded-none md:border-0 md:bg-transparent md:text-5xl md:font-bold md:text-white/10"
                    >
                      <span className="md:hidden">{step.step}</span>
                      <span className="hidden font-display md:block">{step.step}</span>
                      {/* Dot for desktop connector */}
                      <div
                        className="absolute -bottom-[1.5rem] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-accent bg-ink md:block"
                        aria-hidden
                      />
                    </div>
                    <span className="pill-accent !text-[11px]">{step.time}</span>
                  </div>

                  <div className="md:mt-4">
                    <h3 className="font-display text-base font-bold text-fg sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow between steps (mobile) */}
                  {i < process.length - 1 && (
                    <ArrowRight
                      className="mt-3 h-4 w-4 text-accent/40 md:hidden"
                      aria-hidden
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={200} className="mt-14 text-center">
          <a href="#kontakt" className="btn-primary inline-flex">
            Zacznij teraz — wycena bezpłatna
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="mt-3 text-xs text-fg-faint">
            Średni czas odpowiedzi: <strong className="text-fg">3,5 godz.</strong> w dni robocze
          </p>
        </Reveal>
      </div>
    </section>
  );
}
