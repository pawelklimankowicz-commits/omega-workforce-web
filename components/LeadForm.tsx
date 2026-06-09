"use client";

import { useState } from "react";
import {
  Send, CheckCircle2, Phone, Mail, Clock, ShieldCheck,
  Building2, UserRound, AlertCircle,
} from "lucide-react";
import { company, contactCopy } from "@/lib/content";
import { Reveal } from "./Reveal";

type Role   = "firma" | "kandydat";
type Status = "idle" | "loading" | "success" | "error";

const industryOptions = [
  "Produkcja i przemysł",
  "Logistyka / magazyn",
  "E-commerce / fulfillment",
  "Przetwórstwo spożywcze",
  "Budownictwo",
  "HoReCa / gastronomia",
  "Sprzątanie / facility",
  "Inne",
];

const headcountOptions = [
  "1–10 osób",
  "11–50 osób",
  "51–150 osób",
  "150+ osób",
];

const positionOptions = [
  "Produkcja / operator maszyn",
  "Magazynier / picker",
  "Kierowca / transport",
  "Budownictwo / prace fizyczne",
  "Sprzątanie / facility",
  "Sezon / rolnictwo",
  "Inne",
];

const trustItems = [
  { icon: <Clock className="h-4 w-4" />,       color: "text-accent",         bg: "bg-accent/10",         text: contactCopy.trustItems[0].text },
  { icon: <ShieldCheck className="h-4 w-4" />, color: "text-signal",         bg: "bg-signal/10",         text: contactCopy.trustItems[1].text },
  { icon: <Phone className="h-4 w-4" />,       color: "text-accent-violet",  bg: "bg-accent-violet/10",  text: contactCopy.trustItems[2].text },
  { icon: <Mail className="h-4 w-4" />,        color: "text-fg-muted",       bg: "bg-white/[0.05]",      text: contactCopy.trustItems[3].text },
];

export function LeadForm() {
  const [role, setRole]     = useState<Role>("firma");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ role, ...data }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const copy = contactCopy;

  return (
    <section
      id="kontakt"
      className="container-x py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <Reveal className="mb-10 max-w-2xl">
        <p className="section-label">{copy.sectionLabel}</p>
        <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {copy.heading}
          <br />
          <span className="text-gradient">{copy.headingAccent}</span>
        </h2>
      </Reveal>

      <div className="glass overflow-hidden rounded-3xl">
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          {/* ── Lewa: wartość + kontakt ── */}
          <div className="relative border-b border-white/[0.06] p-8 md:p-12 lg:border-b-0 lg:border-r">
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
              style={{ background: "rgba(91,140,255,1)" }}
              aria-hidden
            />
            <div className="relative">
              <p className="mb-6 text-[15px] leading-relaxed text-fg-muted">{copy.sub}</p>
              <ul className="space-y-4" role="list">
                {trustItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-fg">
                    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`} aria-hidden>
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* Bezpośredni telefon */}
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-fg-faint">
                  {copy.callPrompt}
                </p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-2.5 text-lg font-bold text-fg hover:text-accent transition-colors"
                >
                  <Phone className="h-5 w-5 text-accent" aria-hidden />
                  {company.phone}
                </a>
                <p className="mt-1 text-xs text-fg-faint">{company.hours}</p>
              </div>
            </div>
          </div>

          {/* ── Prawa: formularz ── */}
          <div className="p-8 md:p-12">
            {/* Role toggle */}
            <div
              className="mb-8 grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-1.5"
              role="group"
              aria-label="Jestem:"
            >
              {(["firma", "kandydat"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setRole(r); setStatus("idle"); }}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                    role === r
                      ? "bg-accent/20 text-accent shadow-[0_0_0_1px_rgba(91,140,255,0.3)]"
                      : "text-fg-muted hover:text-fg"
                  }`}
                  aria-pressed={role === r}
                >
                  {r === "firma"
                    ? <><Building2 className="h-4 w-4" aria-hidden /> Jestem firmą</>
                    : <><UserRound className="h-4 w-4" aria-hidden /> Szukam pracy</>
                  }
                </button>
              ))}
            </div>

            {status === "success" ? (
              /* Potwierdzenie */
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle2 className="h-14 w-14 text-signal" aria-hidden />
                <h3 className="font-display text-xl font-bold text-fg">Zgłoszenie wysłane!</h3>
                <p className="text-sm text-fg-muted max-w-xs">
                  {role === "firma" ? copy.successB2B : copy.successCandidate}
                </p>
                <button onClick={() => setStatus("idle")} className="btn-ghost !py-2 !px-5 !text-xs mt-2">
                  Wyślij kolejne zgłoszenie
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                aria-label={role === "firma" ? "Formularz dla firm" : "Formularz dla kandydatów"}
              >
                <div className="space-y-4">
                  {/* Imię */}
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {role === "firma" ? copy.labels.nameB2B : copy.labels.nameCandidate}
                      {" "}<span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      placeholder={role === "firma" ? copy.placeholders.nameB2B : copy.placeholders.nameCandidate}
                      className="field"
                    />
                  </div>

                  {/* Telefon */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {copy.labels.phone} <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required autoComplete="tel"
                      placeholder={copy.placeholders.phone}
                      className="field"
                    />
                  </div>

                  {role === "firma" ? (
                    <>
                      <div>
                        <label htmlFor="company" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {copy.labels.company}
                        </label>
                        <input
                          id="company" name="company" type="text" autoComplete="organization"
                          placeholder={copy.placeholders.company}
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="industry" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {copy.labels.industry}
                        </label>
                        <select id="industry" name="industry" className="field">
                          <option value="">Wybierz branżę</option>
                          {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="headcount" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {copy.labels.headcount}
                        </label>
                        <select id="headcount" name="headcount" className="field">
                          <option value="">Wybierz przedział</option>
                          {headcountOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="city" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {copy.labels.city}
                        </label>
                        <input
                          id="city" name="city" type="text" autoComplete="address-level2"
                          placeholder={copy.placeholders.city}
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="position" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {copy.labels.position}
                        </label>
                        <select id="position" name="position" className="field">
                          <option value="">Wybierz / Оберіть</option>
                          {positionOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Wiadomość */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {role === "firma" ? copy.labels.messageB2B : copy.labels.messageCandidate}
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
                      placeholder={role === "firma" ? copy.placeholders.messageB2B : copy.placeholders.messageCandidate}
                      className="field resize-none"
                    />
                  </div>

                  {/* RODO */}
                  <p className="text-[11px] leading-relaxed text-fg-faint">
                    {copy.rodoText.split("polityką prywatności")[0]}
                    <a href="#" className="underline hover:text-fg-muted">polityką prywatności</a>
                    {copy.rodoText.split("polityką prywatności")[1]}
                  </p>

                  {/* Error */}
                  {status === "error" && (
                    <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                      {copy.errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`btn-primary w-full !py-3.5 !text-sm justify-center ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                    aria-live="polite"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                        {copy.submitting}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        {role === "firma" ? copy.submitB2B : copy.submitCandidate}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
