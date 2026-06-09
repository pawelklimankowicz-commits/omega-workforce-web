import { company, nav } from "@/lib/content";
import { Logo } from "./Logo";
import { ShieldCheck, Phone, Mail, Clock, MapPin } from "lucide-react";

const legalLinks = [
  { label: "Polityka prywatności", href: "#" },
  { label: "RODO",                 href: "#" },
  { label: "Regulamin",            href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-900" aria-label="Stopka strony">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          {/* Kolumna 1 — marka + legal */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {company.tagline}. Pośrednictwo pracy, leasing pracowniczy, outsourcing
              i obsługa cudzoziemców — legalnie, szybko i transparentnie.
            </p>

            {/* Odznaki legalności */}
            <div className="mt-6 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-signal/20 bg-signal/10 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-signal" aria-hidden />
                <span className="text-[11px] font-semibold text-signal">
                  KRAZ nr {company.kraz}
                </span>
              </div>
              <div className="ml-0.5 block text-[11px] text-fg-faint">
                NIP {company.nip} · Legalna agencja zatrudnienia
              </div>
            </div>
          </div>

          {/* Kolumna 2 — usługi */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              Usługi
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                "Pośrednictwo pracy",
                "Praca tymczasowa",
                "Outsourcing procesów",
                "Pracownicy z Ukrainy",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#uslugi"
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 3 — nawigacja */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              Nawigacja
            </h3>
            <ul className="space-y-2.5" role="list">
              {nav.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4 — kontakt */}
          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-faint">
              Kontakt
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                >
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
          <span>© 2025 {company.name}. Wszelkie prawa zastrzeżone.</span>
          <nav aria-label="Linki prawne">
            <ul className="flex gap-5" role="list">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-fg transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
