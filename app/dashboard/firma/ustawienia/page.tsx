"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const SECTIONS = [
  { id: "firma",      label: "Dane firmy",             icon: "🏢" },
  { id: "powiadomienia", label: "Powiadomienia",        icon: "🔔" },
  { id: "dostep",     label: "Dostęp i bezpieczeństwo", icon: "🔒" },
  { id: "integracje", label: "Integracje",              icon: "🔌" },
];

export default function UstawieniaFirmaPage() {
  const [active,  setActive]  = useState("firma");
  const [saved,   setSaved]   = useState(false);
  const [form, setForm] = useState({
    companyName: "TechMetal Sp. z o.o.",
    nip: "123-456-78-90",
    address: "ul. Przemysłowa 12, 30-001 Kraków",
    contactEmail: "kadry@techmetal.pl",
    contactPhone: "+48 12 345 67 89",
    invoiceEmail: "faktury@techmetal.pl",
  });

  const [notifs, setNotifs] = useState({
    newTimesheet: true,
    invoiceReady: true,
    documentExpiry: true,
    weeklyReport: false,
    smsAlerts: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Ustawienia" subtitle="Konfiguracja Panelu Firmy B2B" />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar nav */}
        <nav className="xl:w-56 flex-shrink-0">
          <div className="glass rounded-2xl overflow-hidden">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all hover:bg-white/5 ${active === s.id ? "bg-white/8 border-l-2" : "border-l-2 border-transparent"}`}
                style={active === s.id ? { borderLeftColor: "#5B8CFF" } : {}}>
                <span className="text-base">{s.icon}</span>
                <span className={`text-sm font-semibold ${active === s.id ? "text-fg" : "text-fg-muted"}`}>{s.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 glass rounded-2xl p-6">
          {/* ── Dane firmy ─────────────────────────────────────────────── */}
          {active === "firma" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Dane firmy</h2>
                <p className="text-sm text-fg-muted mt-1">Dane identyfikacyjne i kontaktowe — widoczne w fakturach i raportach.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "companyName", label: "Nazwa firmy",         placeholder: "TechMetal Sp. z o.o." },
                  { id: "nip",         label: "NIP",                 placeholder: "123-456-78-90" },
                  { id: "address",     label: "Adres siedziby",      placeholder: "ul. Przemysłowa 12, 30-001 Kraków" },
                  { id: "contactEmail",label: "E-mail kontaktowy",   placeholder: "kadry@firma.pl" },
                  { id: "contactPhone",label: "Telefon kontaktowy",  placeholder: "+48 12 345 67 89" },
                  { id: "invoiceEmail",label: "E-mail do faktur",    placeholder: "faktury@firma.pl" },
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">{f.label}</label>
                    <input
                      type="text" className="field w-full" placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={e => setForm(v => ({ ...v, [f.id]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-10 h-6 rounded-full bg-white/15 peer-checked:bg-accent transition-colors" />
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all peer-checked:translate-x-4" />
                  </div>
                  <span className="text-sm text-fg">Zezwól Omega Workforce na wgląd w dane do celów compliance</span>
                </label>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <button onClick={handleSave}
                  className="btn-primary px-6 py-2.5 text-sm">
                  {saved ? "✓ Zapisano" : "Zapisz zmiany"}
                </button>
                <button className="btn-ghost px-5 py-2.5 text-sm">Anuluj</button>
              </div>
            </div>
          )}

          {/* ── Powiadomienia ──────────────────────────────────────────── */}
          {active === "powiadomienia" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Powiadomienia</h2>
                <p className="text-sm text-fg-muted mt-1">Wybierz, o czym chcesz być informowany.</p>
              </div>
              <div className="space-y-3">
                {[
                  { id: "newTimesheet",    label: "Nowe timesheety do zatwierdzenia",  desc: "E-mail gdy pracownicy prześlą godziny" },
                  { id: "invoiceReady",    label: "Nowa faktura dostępna",             desc: "Gdy Omega Workforce wystawi fakturę" },
                  { id: "documentExpiry",  label: "Wygasające dokumenty pracowników",  desc: "Powiadomienie 30 i 7 dni przed wygaśnięciem" },
                  { id: "weeklyReport",    label: "Raport tygodniowy",                 desc: "Zestawienie kosztów i godzin co poniedziałek" },
                  { id: "smsAlerts",       label: "Alerty SMS",                        desc: "SMS dla krytycznych alertów (pilne dokumenty, zaległe faktury)" },
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
                      <div className="w-10 h-6 rounded-full bg-white/15 peer-checked:bg-accent transition-colors" />
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

          {/* ── Dostęp ─────────────────────────────────────────────────── */}
          {active === "dostep" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Dostęp i bezpieczeństwo</h2>
                <p className="text-sm text-fg-muted mt-1">Zarządzaj hasłem i sesjami.</p>
              </div>
              {/* Password change */}
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
              {/* Active sessions */}
              <div className="space-y-3 pt-4 border-t border-white/8">
                <h3 className="text-sm font-bold text-fg">Aktywne sesje</h3>
                {[
                  { device: "MacBook Pro — Chrome 126", location: "Kraków, PL", time: "Teraz", current: true },
                  { device: "iPhone 15 — Safari",       location: "Kraków, PL", time: "2h temu",  current: false },
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

          {/* ── Integracje ─────────────────────────────────────────────── */}
          {active === "integracje" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-fg">Integracje</h2>
                <p className="text-sm text-fg-muted mt-1">Połącz Panel z Twoimi systemami ERP / HR / księgowymi.</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Webhook (REST)",   desc: "Odbieraj zdarzenia (nowe faktury, zatwierdzone godziny) na własny endpoint.", connected: false, badge: "Dostępne" },
                  { name: "Symfonia ERP",     desc: "Eksport danych do systemu Symfonia — kadry, rozrachunki.", connected: false, badge: "Wkrótce" },
                  { name: "Comarch Optima",   desc: "Dwukierunkowa synchronizacja pracowników i faktur.",     connected: false, badge: "Wkrótce" },
                  { name: "API Export (CSV)", desc: "Automatyczny eksport danych do wybranego arkusza / BI.", connected: true,  badge: "Aktywne"  },
                ].map(int => (
                  <div key={int.name} className="flex items-start justify-between p-4 rounded-xl border border-white/8 hover:bg-white/3 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-fg">{int.name}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: int.connected ? "rgba(52,211,154,0.15)" : "rgba(91,140,255,0.12)",
                            color: int.connected ? "#34D39A" : "#5B8CFF",
                          }}>
                          {int.badge}
                        </span>
                      </div>
                      <p className="text-xs text-fg-faint mt-0.5">{int.desc}</p>
                    </div>
                    <button className={`ml-4 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all flex-shrink-0 ${
                      int.connected
                        ? "border-red-500/25 text-red-400 hover:border-red-500/50"
                        : int.badge === "Wkrótce"
                          ? "border-white/10 text-fg-faint cursor-not-allowed"
                          : "border-accent/30 text-accent hover:border-accent/60"
                    }`} disabled={int.badge === "Wkrótce"}>
                      {int.connected ? "Rozłącz" : int.badge === "Wkrótce" ? "Niedostępne" : "Połącz"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
