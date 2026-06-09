import { Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section
      className="container-x py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <Reveal className="mb-12 text-center">
        <p className="section-label justify-center">Opinie klientów</p>
        <h2
          id="testimonials-heading"
          className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
        >
          Co mówią firmy, które z nami pracują.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[15px] text-fg-muted">
          Nie słowa agencji — słowa managerów, którzy mieli problem i go rozwiązali.
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <figure className="glass glass-hover flex h-full flex-col rounded-3xl p-7">
              {/* Stars */}
              <div className="mb-5 flex gap-0.5" aria-label={`Ocena: ${t.stars} na 5`}>
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-amber text-amber"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-[14px] leading-relaxed text-fg">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent"
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-fg">{t.name}</p>
                  <p className="text-xs text-fg-muted">{t.role} · {t.company}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
