"use client";

import { useState } from "react";
import type { ContactRole, FormStatus } from "@/lib/types";
import { onLeadSubmit } from "@/lib/analytics";

// ─── Option sets ─────────────────────────────────────────────────────────────

const HEADCOUNT_OPTIONS = ["1–5", "6–15", "16–50", "51–100", "100+"] as const;

const URGENCY_OPTIONS = [
  { value: "asap",   label: "Jak najszybciej",           badge: "🔥" },
  { value: "soon",   label: "Za 1–2 tygodnie",           badge: "📅" },
  { value: "plan",   label: "Planuję z wyprzedzeniem",   badge: "📊" },
] as const;

const AVAILABILITY_OPTIONS = [
  { value: "now",    label: "Od zaraz",       badge: "⚡" },
  { value: "2w",     label: "Za 2 tygodnie",  badge: "📅" },
  { value: "month",  label: "Za miesiąc+",   badge: "🗓️" },
] as const;

// ─── Step indicator ──────────────────────────────────────────────────────────

const STEPS = ["Twoja rola", "Szczegóły", "Kontakt"] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function OptionBtn({
  selected, onClick, icon, label,
}: { selected: boolean; onClick: () => void; icon?: string; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
        selected
          ? "border-accent text-fg shadow-lg shadow-accent/20"
          : "border-white/10 text-fg-muted hover:border-white/25 hover:text-fg"
      }`}
      style={selected ? { background: "rgba(91,140,255,0.12)" } : {}}
    >
      {icon && <span aria-hidden className="text-base">{icon}</span>}
      {label}
    </button>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function LeadWizard() {
  // Step: 0=role, 1=details, 2=contact, 3=success
  const [step,         setStep]         = useState(0);
  const [role,         setRole]         = useState<ContactRole | null>(null);

  // Firma-specific
  const [headcount,    setHeadcount]    = useState("");
  const [urgency,      setUrgency]      = useState("");

  // Kandydat-specific
  const [position,     setPosition]     = useState("");
  const [city,         setCity]         = useState("");
  const [availability, setAvailability] = useState("");

  // Contact (shared)
  const [name,         setName]         = useState("");
  const [phone,        setPhone]        = useState("");
  const [rodo,         setRodo]         = useState(false);

  // Submission
  const [status,       setStatus]       = useState<FormStatus>("idle");
  const [errorMsg,     setErrorMsg]     = useState("");

  // ── Validation guards ────────────────────────────────────────────────────

  const step1Valid = role === "firma"
    ? headcount !== "" && urgency !== ""
    : position.trim() !== "" && city.trim() !== "" && availability !== "";

  const step2Valid = name.trim() !== "" && phone.trim() !== "" && rodo;

  // ── Navigation ───────────────────────────────────────────────────────────

  function pickRole(r: ContactRole) { setRole(r); setStep(1); }
  function back()                    { setStep(s => s - 1); }

  // ── Submit ───────────────────────────────────────────────────────────────

  async function submit() {
    if (!step2Valid || !role) return;
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      role,
      name:     name.trim(),
      phone:    phone.trim(),
      ...(role === "firma"
        ? { headcount, message: `Pilność: ${urgency}` }
        : { city: city.trim(), position: position.trim(), message: `Dostępność: ${availability}` }),
    };

    try {
      const res = await fetch("/api/lead", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Błąd serwera");
      onLeadSubmit(role, { headcount, urgency, availability });
      setStatus("success");
      setStep(3);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Spróbuj ponownie lub zadzwoń do nas.");
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section id="kontakt" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(52,211,154,0.06) 0%, rgba(91,140,255,0.06) 50%, transparent 70%)" }} />
      </div>

      <div className="container-x max-w-2xl">
        {/* Heading */}
        {step < 3 && (
          <div className="text-center mb-12">
            <p className="pill-accent mb-4">Bezpłatna konsultacja</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-fg mb-4 leading-tight">
              Zacznijmy razem
            </h2>
            <p className="text-fg-muted max-w-md mx-auto">
              Pierwsza rozmowa bezpłatna. Propozycja kandydatów lub oferty pracy w 24h.
            </p>
          </div>
        )}

        {/* Progress (steps 1–2) */}
        {step >= 1 && step < 3 && (
          <div className="flex items-center justify-center gap-3 mb-10"
            role="progressbar" aria-valuenow={step} aria-valuemax={2}
            aria-label={`Krok ${step} z 2`}>
            {STEPS.map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i + 1 < step  ? "bg-signal text-ink" :
                    i + 1 === step ? "bg-accent text-white" :
                    "bg-white/10 text-fg-faint"
                  }`}>
                    {i + 1 < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block transition-colors ${
                    i + 1 === step ? "text-fg" : "text-fg-faint"
                  }`}>{label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-10 sm:w-16 h-px mb-4 transition-all duration-500 ${
                    i + 1 < step ? "bg-signal" : "bg-white/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="glass rounded-2xl overflow-hidden">

          {/* ── Step 0: Role ────────────────────────────────────────────── */}
          {step === 0 && (
            <div className="p-8 sm:p-12 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-fg mb-2">Kim jesteś?</h3>
                <p className="text-fg-muted text-sm">Dopasujemy rozmowę do Twoich potrzeb.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Firma card */}
                <button type="button" onClick={() => pickRole("firma")}
                  className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/15"
                  style={{ background: "linear-gradient(180deg, rgba(91,140,255,0.06) 0%, rgba(91,140,255,0.02) 100%)" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(91,140,255,0.15)" }}>
                    🏢
                  </div>
                  <div>
                    <p className="text-fg font-bold text-lg mb-1">Szukam pracowników</p>
                    <p className="text-fg-muted text-sm">dla mojej firmy</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(91,140,255,0.15)", color: "#5B8CFF" }}>
                    Leasing · Outsourcing · Rekrutacja
                  </span>
                </button>

                {/* Kandydat card */}
                <button type="button" onClick={() => pickRole("kandydat")}
                  className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:border-signal hover:-translate-y-1 hover:shadow-xl hover:shadow-signal/15"
                  style={{ background: "linear-gradient(180deg, rgba(52,211,154,0.06) 0%, rgba(52,211,154,0.02) 100%)" }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(52,211,154,0.15)" }}>
                    👤
                  </div>
                  <div>
                    <p className="text-fg font-bold text-lg mb-1">Szukam pracy</p>
                    <p className="text-fg-muted text-sm">w Polsce lub za granicą</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(52,211,154,0.15)", color: "#34D39A" }}>
                    Praca stała · Tymczasowa
                  </span>
                </button>
              </div>

              <p className="text-center text-fg-faint text-xs">
                🔒 Twoje dane są bezpieczne i nie będą udostępniane
              </p>
            </div>
          )}

          {/* ── Step 1a: Firma details ───────────────────────────────────── */}
          {step === 1 && role === "firma" && (
            <div className="p-8 sm:p-12 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-fg mb-1">Opowiedz nam więcej</h3>
                <p className="text-fg-muted text-sm">Dopasujemy opiekuna do Twojego zapytania.</p>
              </div>

              {/* Headcount */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-fg">Ile osób potrzebujesz?</p>
                <div className="flex flex-wrap gap-2">
                  {HEADCOUNT_OPTIONS.map(h => (
                    <OptionBtn key={h} selected={headcount === h} onClick={() => setHeadcount(h)} label={h} />
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-fg">Kiedy chcesz zacząć?</p>
                <div className="flex flex-col gap-2">
                  {URGENCY_OPTIONS.map(u => (
                    <OptionBtn key={u.value} selected={urgency === u.value} onClick={() => setUrgency(u.value)} icon={u.badge} label={u.label} />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={back} className="btn-ghost flex-1">Wróć</button>
                <button type="button" onClick={() => setStep(2)} disabled={!step1Valid}
                  className="btn-primary flex-[2] disabled:opacity-40 disabled:cursor-not-allowed">
                  Dalej
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1b: Kandydat details ────────────────────────────────── */}
          {step === 1 && role === "kandydat" && (
            <div className="p-8 sm:p-12 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-fg mb-1">Opowiedz nam o sobie</h3>
                <p className="text-fg-muted text-sm">Znajdziemy oferty dopasowane do Twoich potrzeb.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="wiz-position" className="text-sm font-semibold text-fg">Jakie stanowisko szukasz?</label>
                  <input id="wiz-position" type="text" value={position}
                    onChange={e => setPosition(e.target.value)}
                    placeholder="np. spawacz, kierowca, magazynier…"
                    className="field w-full" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="wiz-city" className="text-sm font-semibold text-fg">Gdzie szukasz pracy?</label>
                  <input id="wiz-city" type="text" value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="np. Kraków, Wrocław, Warszawa…"
                    className="field w-full" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-fg">Kiedy możesz zacząć?</p>
                <div className="flex flex-col gap-2">
                  {AVAILABILITY_OPTIONS.map(a => (
                    <OptionBtn key={a.value} selected={availability === a.value} onClick={() => setAvailability(a.value)} icon={a.badge} label={a.label} />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={back} className="btn-ghost flex-1">Wróć</button>
                <button type="button" onClick={() => setStep(2)} disabled={!step1Valid}
                  className="btn-primary flex-[2] disabled:opacity-40 disabled:cursor-not-allowed">
                  Dalej
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Contact ──────────────────────────────────────────── */}
          {step === 2 && (
            <div className="p-8 sm:p-12 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-fg mb-1">Jak się z Tobą skontaktować?</h3>
                <p className="text-fg-muted text-sm">Tylko dwa pola. Oddzwaniamy w ciągu 2 godzin w godzinach pracy.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="wiz-name" className="text-sm font-semibold text-fg">Imię i nazwisko</label>
                  <input id="wiz-name" type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    autoComplete="name"
                    className="field w-full" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wiz-phone" className="text-sm font-semibold text-fg">Numer telefonu</label>
                  <input id="wiz-phone" type="tel" value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+48 600 000 000"
                    autoComplete="tel"
                    className="field w-full text-lg tracking-wide" />
                </div>
              </div>

              {/* RODO */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" checked={rodo} onChange={e => setRodo(e.target.checked)}
                    className="sr-only" aria-label="Zgoda RODO" />
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    rodo ? "bg-accent border-accent" : "border-white/25 group-hover:border-accent/50"
                  }`}>
                    {rodo && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span className="text-xs text-fg-muted leading-relaxed">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez Omega Workforce w celu obsługi zapytania (art. 6 ust. 1 lit. a RODO).{" "}
                  <a href="/polityka-prywatnosci" className="text-accent hover:underline" target="_blank" rel="noopener">
                    Polityka prywatności
                  </a>
                </span>
              </label>

              {/* Error */}
              {status === "error" && (
                <div className="rounded-xl p-4 text-sm" style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", color: "#FF8080" }}>
                  {errorMsg || "Nie udało się wysłać. Spróbuj ponownie lub zadzwoń do nas."}
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={back} className="btn-ghost flex-1">Wróć</button>
                <button type="button" onClick={submit} disabled={!step2Valid || status === "loading"}
                  className="btn-primary flex-[2] disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-busy={status === "loading"}>
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wysyłam…
                    </span>
                  ) : role === "firma" ? (
                    "Zadzwońcie do mnie"
                  ) : (
                    "Pomóżcie mi znaleźć pracę"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Success ──────────────────────────────────────────── */}
          {step === 3 && (
            <div className="p-8 sm:p-12 space-y-8 text-center">
              {/* Checkmark */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(52,211,154,0.15)", border: "2px solid rgba(52,211,154,0.3)" }}>
                  <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                    <path d="M3 14L13 24L33 4" stroke="#34D39A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-fg mb-2">Gotowe!</h3>
                  <p className="text-fg-muted">
                    {role === "firma"
                      ? `Twoje zapytanie trafiło do opiekuna. Oddzwaniamy w ciągu 2 godzin w godzinach pracy.`
                      : `Twoje zgłoszenie jest u naszego doradcy. Zadzwonimy z dopasowanymi ofertami.`}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="text-left space-y-4 max-w-sm mx-auto">
                <p className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-3">Co dalej?</p>
                {(role === "firma" ? [
                  { icon: "📞", time: "Do 2h",  text: "Opiekun dzwoni z pierwszymi pytaniami" },
                  { icon: "👥", time: "24h",    text: "Przesyłamy dopasowanych kandydatów" },
                  { icon: "📝", time: "3–5 dni", text: "Podpisujemy umowę i ustalamy warunki" },
                  { icon: "✅", time: "7 dni",   text: "Pierwsi pracownicy zaczynają" },
                ] : [
                  { icon: "📞", time: "Do 2h",   text: "Doradca dzwoni z pytaniami o Ciebie" },
                  { icon: "💼", time: "24h",     text: "Dostaniesz propozycje ofert pracy" },
                  { icon: "🤝", time: "3–5 dni", text: "Pomagamy w rozmowie kwalifikacyjnej" },
                  { icon: "🎉", time: "7 dni",   text: "Zaczynasz pracę" },
                ]).map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-accent mr-2">{item.time}</span>
                      <span className="text-sm text-fg-muted">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp backup */}
              <div className="glass rounded-xl p-5 space-y-3">
                <p className="text-sm text-fg-muted">Nie możesz czekać? Napisz do nas od razu:</p>
                <a
                  href="https://wa.me/48503090523?text=Dzień+dobry%2C+wysłałem+zapytanie+i+chciałem+potwierdzić"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "#25D366", color: "#fff" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.542 5.874L.057 23.486a.5.5 0 00.614.614l5.612-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.5a9.45 9.45 0 01-4.886-1.36l-.35-.208-3.63.96.977-3.567-.228-.367A9.46 9.46 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z"/>
                  </svg>
                  Napisz na WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Trust bar */}
        {step < 3 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-xs text-fg-faint">
            <span>✅ KRAZ-certyfikowana agencja</span>
            <span>🔒 Dane chronione zgodnie z RODO</span>
            <span>📞 Odpowiedź w ciągu 2h</span>
          </div>
        )}
      </div>
    </section>
  );
}
