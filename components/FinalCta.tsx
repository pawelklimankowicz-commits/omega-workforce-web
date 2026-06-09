import { ArrowRight, Phone } from "lucide-react";
import { finalCta } from "@/lib/content";
import { Reveal } from "./Reveal";

const copy = finalCta;

export function FinalCta() {
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

            <p className="section-label justify-center">{copy.sectionLabel}</p>

            <h2
              id="final-cta-heading"
              className="relative font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-[2.8rem]"
            >
              {copy.heading}
              <br className="hidden sm:block" />
              <span className="text-gradient">{copy.headingAccent}</span>
            </h2>

            <p className="relative mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              {copy.sub}
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#kontakt"
                className="btn-primary !px-8 !py-3.5 !text-sm w-full justify-center sm:w-auto"
              >
                {copy.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`tel:${copy.ctaPhone.replace(/\s/g, "")}`}
                className="btn-ghost !px-6 !py-3.5 !text-sm w-full justify-center sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {copy.ctaPhone}
              </a>
            </div>

            <p className="relative mt-5 text-xs text-fg-faint">{copy.footer}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
