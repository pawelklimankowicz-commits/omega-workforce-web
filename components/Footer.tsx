"use client";

import { Logo } from "./Logo";
import { useLang } from "./LangProvider";
import { T, t } from "@/lib/translations";
import { company } from "@/lib/content";
import { ShieldCheck, Phone, Mail, Clock, MapPin } from "lucide-react";

export function Footer() {
  const { lang } = useLang();

  const services = lang === "UA"
    ? ["Посередництво у працевлаштуванні", "Тимчасова робота", "Аутсорсинг процесів", "Працівники з України"]
    : ["Pośrednictwo pracy", "Praca tymczasowa", "Outsourcing procesów", "Pracownicy z Ukrainy"];

  const navLinks = [
    { label: t(T.nav.firms,      lang), href: "#uslugi"  },
    { label: t(T.nav.howWeWork,  lang), href: "#proces"  },
    { label: t(T.nav.ukraine,    lang), href: "#ukraina" },
    { label: t(T.nav.industries, lang), href: "#branze"  },
    { label: t(T.nav.faq,        lang), href: "#faq"     },
    { label: t(T.nav.contact,    lang), href: "#kontakt" },
  ];

  const legalLinks = [
    { label: t(T.footer.privacy, lang), href: "/polityka-prywatnosci" },
    { label: t(T.footer.rodo,    lang), href: "/rodo"                 },
    { label: t(T.footer.terms,   lang), href: "/regulamin"            },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-ink-900" aria-label="Stopka strony">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          {/* Kolumna 1 — marka */}
          <div>
            <Logo variant="horizontal" height={36} />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent/70">
              {t(T.footer.motto, lang)}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              {lang === "UA"
                ? "Посередництво у працевлаштуванні, лізинг персоналу, аутсорсинг та обслуговування іноземців — легально, швидко і прозоро."
                : "Pośrednictwo pracy, leasing pracowniczy, outsourcing i obsługa cudzoziemców — legalnie, szybko i transparentnie."}
            </p>
            <div className="mt-6 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-signal/20 bg-signal/10 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden />
                <span className="text-[11px] font-semibold text-signal">KRAZ nr {company.kraz}</span>
              </div>
              <div className="ml-0.5 block text-[11px] text-fg-faint">
                NIP {company.nip} · {t(T.footer.legal, lang)}
              </div>
            </div>
          </div>

          {/* Kolumna 2 — usługi */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              {t(T.footer.servicesCol, lang)}
            </h3>
            <ul className="space-y-2.5" role="list">
              {services.map((s) => (
                <li key={s}>
                  <a href="#uslugi" className="text-sm text-fg-muted transition-colors hover:text-fg">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 3 — nawigacja */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              {t(T.footer.navCol, lang)}
            </h3>
            <ul className="space-y-2.5" role="list">
              {navLinks.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-sm text-fg-muted transition-colors hover:text-fg">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4 — kontakt */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              {t(T.footer.contactCol, lang)}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}
                  className="flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-fg-muted">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-faint" aria-hidden />
                {company.address}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-fg-muted">
                <Clock className="h-3.5 w-3.5 shrink-0 text-fg-faint" aria-hidden />
                {company.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-fg-faint sm:flex-row">
          <span>© 2025 {company.name}. {t(T.footer.rights, lang)}</span>
          <nav aria-label="Linki prawne">
            <ul className="flex gap-5" role="list">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-fg transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
