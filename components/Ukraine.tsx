import { Globe, FileCheck2, Home, Languages, ShieldCheck } from "lucide-react";
import { ukraineSection, ukraineBenefits, ukraineCandidateMessage } from "@/lib/content";
import { Reveal } from "./Reveal";

const icons: React.ReactNode[] = [
  <FileCheck2 key="0" className="h-5 w-5" />,
  <Globe      key="1" className="h-5 w-5" />,
  <Home       key="2" className="h-5 w-5" />,
  <Languages  key="3" className="h-5 w-5" />,
];

export function Ukraine() {
  return (
    <section
      id="ukraina"
      className="container-x py-20 md:py-28"
      aria-labelledby="ukraine-heading"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-800/40">
          {/* Flaga-akcentowa linia — niebieski + żółty */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: "linear-gradient(90deg, #5B8CFF 0%, #6D9EFF 40%, #FFB454 60%, #FFD454 100%)" }}
            aria-hidden
          />
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full opacity-15 blur-3xl"
            style={{ background: "rgba(255,180,84,1)" }}
            aria-hidden
          />

          <div className="grid gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            {/* Lewa kolumna */}
            <div>
              <p className="section-label-amber">{ukraineSection.sectionLabel}</p>
              <h2
                id="ukraine-heading"
                className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
              >
                {ukraineSection.heading}
                <br />
                <span className="text-gradient-amber">{ukraineSection.headingAccent}</span>
                <br />
                {ukraineSection.headingSuffix}
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-fg-muted">
                {ukraineSection.subB2B}
              </p>

              {/* Komunikat dla kandydatów UA — bilingual */}
              <div className="mt-5 rounded-xl border border-amber/15 bg-amber/[0.05] p-4">
                <p className="text-[13px] leading-relaxed text-fg-muted">
                  <span className="font-semibold text-amber">🇺🇦 Для кандидатів:</span>
                  <br />
                  {ukraineCandidateMessage.ua}
                </p>
                <p className="mt-2 text-[12px] text-fg-faint italic">
                  {ukraineCandidateMessage.pl}
                </p>
              </div>

              {/* Legal badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-signal/20 bg-signal/10 px-4 py-2.5">
                <ShieldCheck className="h-4 w-4 text-signal" aria-hidden />
                <span className="text-xs font-semibold text-fg">{ukraineSection.legalBadge}</span>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#kontakt" className="btn-primary">
                  {ukraineSection.ctaB2B}
                </a>
                <a
                  href="#kontakt"
                  className="btn-ghost !border-amber/30 !text-amber hover:!bg-amber/10"
                  lang="uk"
                >
                  {ukraineSection.ctaUA}
                </a>
              </div>
            </div>

            {/* Prawa kolumna — benefity */}
            <div className="grid gap-4 sm:grid-cols-2">
              {ukraineBenefits.map((b, i) => (
                <div
                  key={b.title}
                  className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:border-amber/25 hover:bg-amber/[0.04]"
                >
                  <span className="icon-badge icon-badge-amber mb-4 w-fit" aria-hidden>
                    {icons[i]}
                  </span>
                  <h3 className="text-sm font-bold text-fg">{b.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
