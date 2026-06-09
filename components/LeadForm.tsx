"use client";

import { useState } from "react";
import {
  Send, CheckCircle2, Phone, Mail, Clock, ShieldCheck,
  Building2, UserRound, AlertCircle,
} from "lucide-react";
import { company } from "@/lib/content";
import { useLang } from "./LangProvider";
import { T, t, leadFormIndOpt, leadFormHcOpt, leadFormPosOpt } from "@/lib/translations";
import { Reveal } from "./Reveal";

type Role   = "firma" | "kandydat";
type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const { lang } = useLang();
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

  const trustItems = [
    { icon: <Clock className="h-4 w-4" />,       color: "text-accent",         bg: "bg-accent/10",         text: t(T.leadForm.trust1, lang) },
    { icon: <ShieldCheck className="h-4 w-4" />, color: "text-signal",         bg: "bg-signal/10",         text: `${t(T.leadForm.trust2, lang)} ${company.kraz}` },
    { icon: <Phone className="h-4 w-4" />,       color: "text-accent-violet",  bg: "bg-accent-violet/10",  text: t(T.leadForm.trust3, lang) },
    { icon: <Mail className="h-4 w-4" />,        color: "text-fg-muted",       bg: "bg-white/[0.05]",      text: company.email },
  ];

  return (
    <section
      id="kontakt"
      className="container-x py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <Reveal className="mb-10 max-w-2xl">
        <p className="section-label">{t(T.leadForm.sectionLabel, lang)}</p>
        <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {t(T.leadForm.heading, lang)}
          <br />
          <span className="text-gradient">{t(T.leadForm.headingAccent, lang)}</span>
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
              <p className="mb-6 text-[15px] leading-relaxed text-fg-muted">{t(T.leadForm.sub, lang)}</p>
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
                  {t(T.leadForm.callPrompt, lang)}
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
              aria-label={lang === "PL" ? "Jestem:" : "Я:"}
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
                    ? <><Building2 className="h-4 w-4" aria-hidden /> {t(T.leadForm.isFirm, lang)}</>
                    : <><UserRound className="h-4 w-4" aria-hidden /> {t(T.leadForm.lookingJob, lang)}</>
                  }
                </button>
              ))}
            </div>

            {status === "success" ? (
              /* Potwierdzenie */
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle2 className="h-14 w-14 text-signal" aria-hidden />
                <h3 className="font-display text-xl font-bold text-fg">{t(T.leadForm.successTitle, lang)}</h3>
                <p className="text-sm text-fg-muted max-w-xs">
                  {role === "firma" ? t(T.leadForm.successB2B, lang) : t(T.leadForm.successCand, lang)}
                </p>
                <button onClick={() => setStatus("idle")} className="btn-ghost !py-2 !px-5 !text-xs mt-2">
                  {t(T.leadForm.anotherSend, lang)}
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                aria-label={role === "firma" ? t(T.leadForm.isFirm, lang) : t(T.leadForm.lookingJob, lang)}
              >
                <div className="space-y-4">
                  {/* Imię */}
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {role === "firma" ? t(T.leadForm.labelNameB2B, lang) : t(T.leadForm.labelNameCand, lang)}
                      {" "}<span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      placeholder={role === "firma" ? t(T.leadForm.phNameB2B, lang) : t(T.leadForm.phNameCand, lang)}
                      className="field"
                    />
                  </div>

                  {/* Telefon */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {t(T.leadForm.labelPhone, lang)} <span className="text-accent" aria-hidden>*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required autoComplete="tel"
                      placeholder={company.phone}
                      className="field"
                    />
                  </div>

                  {role === "firma" ? (
                    <>
                      <div>
                        <label htmlFor="company" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {t(T.leadForm.labelCompany, lang)}
                        </label>
                        <input
                          id="company" name="company" type="text" autoComplete="organization"
                          placeholder={t(T.leadForm.phCompany, lang)}
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="industry" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {t(T.leadForm.labelIndustry, lang)}
                        </label>
                        <select id="industry" name="industry" className="field">
                          <option value="">{t(T.leadForm.selectInd, lang)}</option>
                          {leadFormIndOpt.map((o) => (
                            <option key={o.PL} value={o.PL}>{o[lang]}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="headcount" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {t(T.leadForm.labelHeadcount, lang)}
                        </label>
                        <select id="headcount" name="headcount" className="field">
                          <option value="">{t(T.leadForm.selectHc, lang)}</option>
                          {leadFormHcOpt.map((o) => (
                            <option key={o.PL} value={o.PL}>{o[lang]}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="city" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {t(T.leadForm.labelCity, lang)}
                        </label>
                        <input
                          id="city" name="city" type="text" autoComplete="address-level2"
                          placeholder={t(T.leadForm.phCity, lang)}
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="position" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                          {t(T.leadForm.labelPosition, lang)}
                        </label>
                        <select id="position" name="position" className="field">
                          <option value="">{t(T.leadForm.selectPos, lang)}</option>
                          {leadFormPosOpt.map((o) => (
                            <option key={o.PL} value={o.PL}>{o[lang]}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Wiadomość */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-fg-muted">
                      {role === "firma" ? t(T.leadForm.labelMsgB2B, lang) : t(T.leadForm.labelMsgCand, lang)}
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
                      placeholder={role === "firma" ? t(T.leadForm.phMsgB2B, lang) : t(T.leadForm.phMsgCand, lang)}
                      className="field resize-none"
                    />
                  </div>

                  {/* RODO */}
                  <p className="text-[11px] leading-relaxed text-fg-faint">
                    {t(T.leadForm.rodo1, lang)}
                    <a href="#" className="underline hover:text-fg-muted">{t(T.leadForm.rodo2, lang)}</a>
                    {t(T.leadForm.rodo3, lang)}
                  </p>

                  {/* Error */}
                  {status === "error" && (
                    <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                      {t(T.leadForm.errorMsg, lang)}
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
                        {t(T.leadForm.submitting, lang)}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        {role === "firma" ? t(T.leadForm.submitB2B, lang) : t(T.leadForm.submitCand, lang)}
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
