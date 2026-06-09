"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const SECTIONS = [
  { id: "profil",          label: "Mój profil",          icon: "👤" },
  { id: "powiadomienia",   label: "Powiadomienia",        icon: "🔔" },
  { id: "bezpieczenstwo",  label: "Bezpieczeństwo",       icon: "🔒" },
  { id: "jezyk",           label: "Język i region",       icon: "🌐" },
];

export default function UstawieniaPracownikPage() {
  const [active, setActive] = useState("profil");
  const [saved,  setSaved]  = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Dmytro",
    lastName: "Kovalenko",
    email: "d.kovalenko@omega.pl",
    phone: "+48 500 111 222",
    iban: "PL61 1090 1014 0000 0712 1981 2874",
    address: "ul. Wiśniowa 4/12, 30-002 Kraków",
    emergencyName: "Olena Kovalenko",
    emergencyPhone: "+48 500 999 888",
  });

  const [notifs, setNotifs] = useState({
    payslipReady:    true,
    timesheetApproved: true,
    documentExpiry:  true,
    appPush:         false,
  });

  const [lang, setLang] = useState<"pl" | "uk" | "en">("pl");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Ustawienia" subtitle="Profil i preferencje Twojego konta" />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar */}
        <nav className="xl:w-56 flex-shrink-0">
          <div className="glass rounded-2xl overflow-hidden">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-white/5 ${active === s.id ? "bg-white/8 border-l-2" : "border-l-2 border-transparent"}`}
                style={active === s.id ? { borderLeftColor: "#34D39A" } : {}}>
                <span className="text-base">{s.icon}</span>
                <span className={`text-sm font-semibold ${active === s.id ? "text-fg" : "text-fg-muted"}`}>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Avatar card */}
          <div className="glass rounded-2xl p-4 mt-3 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto"
              style={{ background: "linear-gradient(135deg,#34D39A,#5B8CFF)" }}>
              DK
            </div>
            <p className="text-sm font-bold text-fg mt-3">Dmytro Kovalenko</p>
            <p className="text-xs text-fg-faint">Operator CNC · Produkcja</p>
            <p className="text-[10px] px-2 py-0.5 rounded-full inline-block mt-2 font-semibold"
              style={{ background: "rgba(52,211,154,0.12)", color: "#34D39A" }}>
              Pracownik
            </p>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 glass rounded-2xl p-6">

          {/* ── Profil ──────────────────────────────────────────────────── */}
          {active === "profil" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Mój profil</h2>
                <p className="text-sm text-fg-muted mt-1">Dane osobowe i kontaktowe — widoczne tylko dla Omega Workforce.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "firstName",     label: "Imię" },
                  { id: "lastName",      label: "Nazwisko" },
                  { id: "email",         label: "E-mail" },
                  { id: "phone",         label: "Telefon" },
                  { id: "address",       label: "Adres zamieszkania" },
                  { id: "iban",          label: "Numer konta (IBAN)" },
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">{f.label}</label>
                    <input type="text" className="field w-full"
                      value={profile[f.id as keyof typeof profile]}
                      onChange={e => setProfile(v => ({ ...v, [f.id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              {/* Emergency contact */}
              <div className="pt-4 border-t border-white/8 space-y-3">
                <p className="text-sm font-bold text-fg">Kontakt awaryjny</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "emergencyName",  label: "Imię i nazwisko" },
                    { id: "emergencyPhone", label: "Telefon" },
                  ].map(f => (
                    <div key={f.id} className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">{f.label}</label>
                      <input type="text" className="field w-full"
                        value={profile[f.id as keyof typeof profile]}
                        onChange={e => setProfile(v => ({ ...v, [f.id]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <button onClick={handleSave} className="btn-primary px-6 py-2.5 text-sm">
                  {saved ? "✓ Zapisano" : "Zapisz zmiany"}
                </button>
                <p className="text-xs text-fg-faint">Dane chronione zgodnie z RODO</p>
              </div>
            </div>
          )}

          {/* ── Powiadomienia ──────────────────────────────────────────── */}
          {active === "powiadomienia" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Powiadomienia</h2>
                <p className="text-sm text-fg-muted mt-1">Zdecyduj, o czym chcesz być informowany.</p>
              </div>
              <div className="space-y-3">
                {[
                  { id: "payslipReady",       label: "Pasek płacowy gotowy",         desc: "E-mail gdy Twoje wynagrodzenie jest rozliczone" },
                  { id: "timesheetApproved",  label: "Godziny zatwierdzone",          desc: "Powiadomienie po akceptacji timesheet przez firmę" },
                  { id: "documentExpiry",     label: "Wygasające dokumenty",          desc: "Przypomnienie 30 i 7 dni przed wygaśnięciem" },
                  { id: "appPush",            label: "Powiadomienia push (aplikacja)", desc: "Wymaga aplikacji mobilnej Omega Workforce" },
                ].map(n => (
                  <div key={n.id} className="flex items-center justify-between p-4 rounded-xl border border-white/8 hover:bg-white/3 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-fg">{n.label}</p>
                      <p className="text-xs text-fg-faint mt-0.5">{n.desc}</p>
                    </div>
                    <label className="relative flex-shrink-0 cursor-pointer">
                      <input type="checkbox" className="sr-only peer"
                        checked={notifs[n.id as keyof typeof notifs]}
                        onChange={e => setNotifs(v => ({ ...v, [n.id]: e.target.checked }))} />
                      <div className="w-10 h-6 rounded-full bg-white/15 peer-checked:bg-signal transition-colors" />
                      <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all peer-checked:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <button onClick={handleSave} className="btn-primary px-6 py-2.5 text-sm">
                  {saved ? "✓ Zapisano" : "Zapisz preferencje"}
                </button>
              </div>
            </div>
          )}

          {/* ── Bezpieczeństwo ─────────────────────────────────────────── */}
          {active === "bezpieczenstwo" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Bezpieczeństwo</h2>
                <p className="text-sm text-fg-muted mt-1">Zmień hasło i zarządzaj aktywnymi sesjami.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-fg">Zmiana hasła</h3>
                {["Obecne hasło", "Nowe hasło", "Powtórz nowe hasło"].map(f => (
                  <div key={f} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">{f}</label>
                    <input type="password" className="field w-full max-w-sm" placeholder="••••••••" />
                  </div>
                ))}
                <button className="btn-primary px-6 py-2.5 text-sm">Zmień hasło</button>
              </div>
              <div className="pt-4 border-t border-white/8 space-y-3">
                <h3 className="text-sm font-bold text-fg">Aktywne sesje</h3>
                {[
                  { device: "Samsung Galaxy A55 — Chrome", location: "Kraków, PL", time: "Teraz",    current: true },
                  { device: "PC — Firefox 126",            location: "Kraków, PL", time: "3h temu",  current: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/8">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-fg">{s.device}</p>
                        {s.current && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(52,211,154,0.15)", color: "#34D39A" }}>AKTYWNA</span>}
                      </div>
                      <p className="text-xs text-fg-faint mt-0.5">{s.location} · {s.time}</p>
                    </div>
                    {!s.current && (
                      <button className="text-xs text-red-400 hover:underline font-semibold">Zakończ</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Język ──────────────────────────────────────────────────── */}
          {active === "jezyk" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Język i region</h2>
                <p className="text-sm text-fg-muted mt-1">Wybierz język interfejsu panelu.</p>
              </div>
              <div className="space-y-2">
                {([
                  { id: "pl", flag: "🇵🇱", label: "Polski",     sub: "Domyślny" },
                  { id: "uk", flag: "🇺🇦", label: "Українська",  sub: "Ukrainian" },
                  { id: "en", flag: "🇬🇧", label: "English",     sub: "English" },
                ] as const).map(l => (
                  <button key={l.id} onClick={() => setLang(l.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all hover:bg-white/4 ${lang === l.id ? "border-signal bg-signal/5" : "border-white/8"}`}>
                    <span className="text-2xl">{l.flag}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${lang === l.id ? "text-fg" : "text-fg-muted"}`}>{l.label}</p>
                      <p className="text-xs text-fg-faint">{l.sub}</p>
                    </div>
                    {lang === l.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D39A" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl text-sm"
                style={{ background: "rgba(91,140,255,0.06)", border: "1px solid rgba(91,140,255,0.12)" }}>
                <p className="text-fg-muted">
                  Zmiana języka wejdzie w życie po odświeżeniu strony. Treści wynagrodzenia i dokumenty pozostają w języku polskim.
                </p>
              </div>
              <button onClick={handleSave} className="btn-primary px-6 py-2.5 text-sm">
                {saved ? "✓ Zapisano" : "Zapisz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
