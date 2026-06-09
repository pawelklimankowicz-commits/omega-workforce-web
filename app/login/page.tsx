"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./actions";

const DEMO_ACCOUNTS = [
  { label: "Panel Firmy (B2B)",  email: "firma@demo.pl",     password: "demo1234", icon: "🏢", color: "#5B8CFF" },
  { label: "Panel Pracownika",   email: "pracownik@demo.pl", password: "demo1234", icon: "👤", color: "#34D39A" },
] as const;

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error,    setError]    = useState<string | null>(null);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  function fillDemo(acc: typeof DEMO_ACCOUNTS[number]) {
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) { setError("Wypełnij adres e-mail i hasło."); return; }
    setError(null);
    const fd = new FormData();
    fd.set("email",    email);
    fd.set("password", password);
    startTransition(async () => {
      const result = await loginAction(null, fd);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(91,140,255,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(138,92,255,0.10) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white"
              style={{ background: "linear-gradient(135deg, #5B8CFF, #8A5CFF)" }}>
              Ω
            </div>
            <span className="text-lg font-extrabold text-fg tracking-tight">Omega Workforce</span>
          </a>
          <p className="text-fg-muted text-sm mt-2">Panel operacyjny</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-fg">Zaloguj się</h1>
            <p className="text-fg-muted text-sm mt-1">Dostęp chroniony — tylko autoryzowani użytkownicy.</p>
          </div>

          {/* Demo accounts */}
          <div className="space-y-2">
            <p className="text-xs text-fg-faint font-medium uppercase tracking-wider">Konta demo</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.email} type="button" onClick={() => fillDemo(acc)}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-white/10 text-left transition-all hover:border-white/25 hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: `${acc.color}22` }}>
                    {acc.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-fg leading-tight">{acc.label}</p>
                    <p className="text-[10px] text-fg-faint">{acc.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-sm font-semibold text-fg">Adres e-mail</label>
              <input
                id="login-email" type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="field w-full" placeholder="email@firma.pl"
                autoComplete="email" autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-sm font-semibold text-fg">Hasło</label>
              <div className="relative">
                <input
                  id="login-password" type={showPass ? "text" : "password"}
                  required value={password} onChange={e => setPassword(e.target.value)}
                  className="field w-full pr-11" placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-faint hover:text-fg transition-colors"
                  aria-label={showPass ? "Ukryj hasło" : "Pokaż hasło"}>
                  {showPass
                    ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.2)", color: "#FF8080" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={isPending}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-50"
              aria-busy={isPending}>
              {isPending
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loguję…
                  </span>
                : "Zaloguj się →"
              }
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-fg-faint pt-2 border-t border-white/8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span>Sesja wygasa po 8h · Dane szyfrowane w tranzycie (TLS 1.3)</span>
          </div>
        </div>

        <p className="text-center text-xs text-fg-faint mt-6">
          Problem z dostępem?{" "}
          <a href="mailto:kontakt@omegaworkforce.pl" className="text-accent hover:underline">
            Skontaktuj się z Omega Workforce
          </a>
        </p>
      </div>
    </div>
  );
}
