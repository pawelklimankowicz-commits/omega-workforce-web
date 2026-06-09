import { industries } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Industries() {
  return (
    <section
      id="branze"
      className="container-x py-20 md:py-28"
      aria-labelledby="industries-heading"
    >
      <Reveal className="mb-10 max-w-xl">
        <p className="section-label">Branże</p>
        <h2
          id="industries-heading"
          className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
        >
          Twoja branża. Twoje tempo.
        </h2>
        <p className="mt-3 text-[15px] text-fg-muted">
          Rekrutujemy i obsługujemy pracowników we wszystkich kluczowych sektorach.
          Specjalizacja pozwala nam działać szybciej — bo znamy wymagania.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="flex flex-wrap gap-3" role="list">
          {industries.map((ind) => (
            <a
              key={ind}
              href="#kontakt"
              role="listitem"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-fg-muted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-fg"
              aria-label={`Zapytaj o pracowników: ${ind}`}
            >
              {ind}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
