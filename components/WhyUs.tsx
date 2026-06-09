import { ShieldCheck, Zap, UserCog, Receipt } from "lucide-react";
import { whyUs } from "@/lib/content";
import { Reveal } from "./Reveal";

const config = [
  { icon: <ShieldCheck className="h-5 w-5" />, badge: "icon-badge-signal",  num: "01" },
  { icon: <Zap         className="h-5 w-5" />, badge: "icon-badge-accent",  num: "02" },
  { icon: <UserCog     className="h-5 w-5" />, badge: "icon-badge-violet",  num: "03" },
  { icon: <Receipt     className="h-5 w-5" />, badge: "icon-badge-amber",   num: "04" },
];

export function WhyUs() {
  return (
    <section
      className="container-x py-20 md:py-28"
      aria-labelledby="whyus-heading"
    >
      <Reveal className="mb-12 max-w-2xl">
        <p className="section-label">Dlaczego Omega Workforce</p>
        <h2
          id="whyus-heading"
          className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
        >
          Przewaga, którą{" "}
          <span className="text-gradient">da się sprawdzić.</span>
        </h2>
        <p className="mt-4 text-[15px] text-fg-muted">
          Nie obiecujemy ogólników. Każda deklaracja ma konkretny mechanizm
          weryfikacji — dokumenty, liczby, umowy.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {whyUs.map((w, i) => (
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
