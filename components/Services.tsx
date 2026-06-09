"use client";

import { Users, Repeat, Boxes, Globe, Check } from "lucide-react";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { Reveal } from "./Reveal";

type ServiceId = "posrednictwo" | "leasing" | "outsourcing" | "ukraina";

const serviceConfig: Record<ServiceId, {
  icon: React.ReactNode;
  color: "accent" | "violet" | "signal" | "amber";
  badgeClass: string;
  borderGrad: string;
}> = {
  posrednictwo: {
    icon:        <Users className="h-5 w-5" />,
    color:       "accent",
    badgeClass:  "icon-badge-accent",
    borderGrad:  "linear-gradient(90deg,#5B8CFF,#8A5CFF)",
  },
  leasing: {
    icon:        <Repeat className="h-5 w-5" />,
    color:       "violet",
    badgeClass:  "icon-badge-violet",
    borderGrad:  "linear-gradient(90deg,#8A5CFF,#B45CFF)",
  },
  outsourcing: {
    icon:        <Boxes className="h-5 w-5" />,
    color:       "signal",
    badgeClass:  "icon-badge-signal",
    borderGrad:  "linear-gradient(90deg,#34D39A,#20B47A)",
  },
  ukraina: {
    icon:        <Globe className="h-5 w-5" />,
    color:       "amber",
    badgeClass:  "icon-badge-amber",
    borderGrad:  "linear-gradient(90deg,#FFB454,#FFD454)",
  },
};

export function Services() {
  const { lang } = useLang();

  const serviceData = [
    {
      id:     "posrednictwo" as ServiceId,
      title:  t(T.servicesItems.s1title, lang),
      desc:   t(T.servicesItems.s1desc, lang),
      points: [
        t(T.servicesItems.s1p1, lang),
        t(T.servicesItems.s1p2, lang),
        t(T.servicesItems.s1p3, lang),
      ],
    },
    {
      id:     "leasing" as ServiceId,
      title:  t(T.servicesItems.s2title, lang),
      desc:   t(T.servicesItems.s2desc, lang),
      points: [
        t(T.servicesItems.s2p1, lang),
        t(T.servicesItems.s2p2, lang),
        t(T.servicesItems.s2p3, lang),
      ],
    },
    {
      id:     "outsourcing" as ServiceId,
      title:  t(T.servicesItems.s3title, lang),
      desc:   t(T.servicesItems.s3desc, lang),
      points: [
        t(T.servicesItems.s3p1, lang),
        t(T.servicesItems.s3p2, lang),
        t(T.servicesItems.s3p3, lang),
      ],
    },
    {
      id:     "ukraina" as ServiceId,
      title:  t(T.servicesItems.s4title, lang),
      desc:   t(T.servicesItems.s4desc, lang),
      points: [
        t(T.servicesItems.s4p1, lang),
        t(T.servicesItems.s4p2, lang),
        t(T.servicesItems.s4p3, lang),
      ],
    },
  ];

  return (
    <section id="uslugi" className="container-x py-20 md:py-28" aria-labelledby="services-heading">
      <Reveal className="mb-12">
        <p className="section-label">{t(T.servicesSection.label, lang)}</p>
        <h2 id="services-heading" className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl max-w-2xl">
          {t(T.servicesSection.heading1, lang)}
          <br />
          <span className="text-gradient">{t(T.servicesSection.heading2, lang)}</span>
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-fg-muted">
          {t(T.servicesSection.sub, lang)}
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {serviceData.map((s, i) => {
          const cfg = serviceConfig[s.id];
          return (
            <Reveal key={s.id} delay={i * 80}>
              <article className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 md:p-8">
                {/* Top color bar */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
                  style={{ background: cfg.borderGrad }}
                  aria-hidden
                />

                <div className="flex items-start gap-4">
                  <span className={`icon-badge shrink-0 ${cfg.badgeClass}`} aria-hidden>
                    {cfg.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-fg">{s.title}</h3>
                  </div>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">{s.desc}</p>

                <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5" role="list">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13px] text-fg">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className="mt-auto pt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors group-hover:text-fg"
                  aria-label={`${t(T.servicesSection.cta, lang)}: ${s.title}`}
                >
                  {t(T.servicesSection.cta, lang)}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
