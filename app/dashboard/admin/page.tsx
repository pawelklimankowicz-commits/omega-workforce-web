"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_USERS } from "@/lib/mock-users";

const KONTA_TESTOWE = MOCK_USERS.filter(u => u.role !== "admin");

type Zakladka = "pulpit" | "pracownik" | "firma" | "uprawnienia" | "ustawienia";

const UPRAWNIENIA: Record<string, { pracownik: boolean; firma: boolean; opis: string }> = {
  "Podgląd pulpitu":        { pracownik: true,  firma: true,  opis: "Dostęp do strony głównej dashboardu" },
  "Moje godziny":           { pracownik: true,  firma: false, opis: "Rejestracja i podgląd godzin pracy" },
  "Wypłaty / paski":        { pracownik: true,  firma: false, opis: "Wgląd w historię wypłat i pasków" },
  "Wnioski":                { pracownik: true,  firma: false, opis: "Składanie wniosków (urlop, zaliczka, korekta)" },
  "Wiadomości":             { pracownik: true,  firma: false, opis: "Skrzynka wiadomości wewnętrznych" },
  "Zarządzanie pracownikami":{ pracownik: false, firma: true,  opis: "Dodawanie, edycja i dezaktywacja kont" },
  "Zatwierdzanie godzin":   { pracownik: false, firma: true,  opis: "Akceptacja lub odrzucenie timesheetów" },
  "Faktury":                { pracownik: false, firma: true,  opis: "Wystawianie i pobieranie faktur" },
  "Raporty":                { pracownik: false, firma: true,  opis: "Eksport raportów operacyjnych" },
  "Dokumenty":              { pracownik: true,  firma: true,  opis: "Podgląd i pobieranie dokumentów" },
  "Ustawienia konta":       { pracownik: true,  firma: true,  opis: "Zmiana hasła, języka i danych profilu" },
};

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }}
      className="ml-2 text-fg-faint hover:text-accent transition-colors text-xs"
      title="Kopiuj"
    >
      {ok ? "✓" : "⧉"}
    </button>
  );
}

function Badge({ label, color }: { label: string; color: "accent" | "signal" | "amber" | "red" | "faint" }) {
  const styles: Record<string, string> = {
    accent: "border-accent/25 bg-accent/10 text-accent",
    signal: "border-signal/25 bg-signal/10 text-signal",
    amber:  "border-amber-400/25 bg-amber-400/10 text-amber-300",
    red:    "border-red-400/25 bg-red-400/10 text-red-300",
    faint:  "border-white/10 bg-white/5 text-fg-faint",
  };
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[color]}`}>
      {label}
    </span>
  );
}

function KartaDanych({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-xs text-fg-faint uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-semibold text-fg flex items-center ${mono ? "font-mono" : ""}`}>
        {value}
        <CopyBtn text={value} />
      </span>
    </div>
  );
}

function SekretnyBadge({ haslo }: { haslo: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-xs text-fg-faint uppercase tracking-wider">Hasło</span>
      <span className="text-sm font-semibold text-fg flex items-center font-mono gap-2">
        {show ? haslo : "••••••••••"}
        <button onClick={() => setShow(v => !v)} className="text-fg-faint hover:text-accent transition-colors text-xs ml-1">
          {show ? "ukryj" : "pokaż"}
        </button>
        {show && <CopyBtn text={haslo} />}
      </span>
    </div>
  );
}

function TabPulpit() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Konta testowe",  value: "2",        color: "text-accent" },
          { label: "Aktywnych kont", value: "2",        color: "text-signal" },
          { label: "Role systemu",   value: "3",        color: "text-amber-300" },
        ].map(s => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <p className="text-xs text-fg-faint uppercase tracking-wider">{s.label}</p>
            <p className={`text-4xl font-black mt-2 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <h3 className="text-sm font-bold text-fg">Konta testowe — szybki podgląd</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6">
              {["Użytkownik", "Rola", "E-mail", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KONTA_TESTOWE.map(u => (
              <tr key={u.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: u.role === "firma" ? "linear-gradient(135deg,#5B8CFF,#8A5CFF)" : "linear-gradient(135deg,#34D39A,#0EA572)" }}>
                      {u.name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase()}
                    </div>
                    <span className="font-semibold text-fg">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Badge label={u.role} color={u.role === "firma" ? "accent" : "signal"} />
                </td>
                <td className="px-5 py-3.5 font-mono text-fg-muted text-xs">{u.email}</td>
                <td className="px-5 py-3.5"><Badge label="aktywny" color="signal" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass rounded-2xl p-5 border border-amber-400/15 bg-amber-400/4">
        <div className="flex gap-3">
          <span className="text-amber-300 mt-0.5 flex-shrink-0">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-200 mb-1">Środowisko testowe</p>
            <p className="text-xs text-fg-muted">Poniższe konta służą wyłącznie do testowania. Hasła są przechowywane jako zwykły tekst w <code className="text-amber-300/80">lib/auth.ts</code>. Przed wdrożeniem produkcyjnym zastąp je prawdziwą bazą danych z hashowaniem (bcrypt).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabKonto({ user }: { user: typeof KONTA_TESTOWE[0] }) {
  const isPracownik = user.role === "pracownik";
  const accentColor = isPracownik ? "#34D39A" : "#5B8CFF";
  const [status, setStatus] = useState<"aktywny" | "zawieszony">("aktywny");

  return (
    <div className="space-y-5">
      {/* Nagłówek konta */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg,${accentColor},${accentColor}99)` }}>
              {user.name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-bold text-fg">{user.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge label={user.role} color={isPracownik ? "signal" : "accent"} />
                <Badge label={status} color={status === "aktywny" ? "signal" : "amber"} />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatus(s => s === "aktywny" ? "zawieszony" : "aktywny")}
              className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-muted hover:border-amber-400/40 hover:text-amber-300 transition-colors"
            >
              {status === "aktywny" ? "Zawieś konto" : "Aktywuj konto"}
            </button>
          </div>
        </div>
      </div>

      {/* Dane dostępowe */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-fg-faint mb-3">Dane dostępowe</p>
        <div className="space-y-2">
          <KartaDanych label="E-mail / login" value={user.email} mono />
          <SekretnyBadge haslo={user.password} />
          <KartaDanych label="ID użytkownika" value={user.id} mono />
          {user.companyId && <KartaDanych label="ID firmy" value={user.companyId} mono />}
          {user.workerId  && <KartaDanych label="ID pracownika" value={user.workerId} mono />}
        </div>
      </div>

      {/* Link do panelu */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-fg-faint mb-3">Panel użytkownika</p>
        <a
          href={`/dashboard/${user.role}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:border-accent/30 transition-colors group"
        >
          <span className="text-sm text-fg-muted group-hover:text-fg transition-colors">
            Otwórz panel: <code className="text-accent font-mono">/dashboard/{user.role}</code>
          </span>
          <svg className="ml-auto text-fg-faint group-hover:text-accent transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function TabUprawnienia() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-fg-muted">Tabela uprawnień przypisanych do każdej roli w systemie.</p>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs text-fg-faint uppercase tracking-wider font-semibold">Funkcja</th>
              <th className="text-left px-5 py-3.5 text-xs text-fg-faint uppercase tracking-wider font-semibold">Opis</th>
              <th className="px-5 py-3.5 text-xs text-signal uppercase tracking-wider font-semibold text-center">Pracownik</th>
              <th className="px-5 py-3.5 text-xs text-accent uppercase tracking-wider font-semibold text-center">Firma</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(UPRAWNIENIA).map(([nazwa, prawa]) => (
              <tr key={nazwa} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3 font-semibold text-fg">{nazwa}</td>
                <td className="px-5 py-3 text-xs text-fg-muted">{prawa.opis}</td>
                <td className="px-5 py-3 text-center">
                  {prawa.pracownik
                    ? <span className="text-signal text-base">✓</span>
                    : <span className="text-fg-faint text-base">—</span>}
                </td>
                <td className="px-5 py-3 text-center">
                  {prawa.firma
                    ? <span className="text-accent text-base">✓</span>
                    : <span className="text-fg-faint text-base">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabUstawienia() {
  const [zapisano, setZapisano] = useState(false);
  return (
    <div className="space-y-5 max-w-lg">
      <div className="glass rounded-2xl p-5 space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-fg-faint">Sesja i bezpieczeństwo</p>
        <div className="space-y-3 text-sm text-fg-muted">
          <div className="flex justify-between items-center py-2 border-b border-white/6">
            <span>Czas ważności sesji</span>
            <span className="font-semibold text-fg">8 godzin</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/6">
            <span>Cookie httpOnly</span>
            <Badge label="włączone" color="signal" />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/6">
            <span>RBAC (ochrona tras)</span>
            <Badge label="aktywny" color="signal" />
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Hashowanie haseł</span>
            <Badge label="tylko prod" color="amber" />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-fg-faint">Środowisko</p>
        <div className="space-y-2 text-sm">
          <KartaDanych label="Wersja auth" value="mock / cookie-based" />
          <KartaDanych label="Plik konfiguracji" value="lib/auth.ts" mono />
          <KartaDanych label="Middleware" value="middleware.ts" mono />
        </div>
      </div>

      <button
        onClick={() => { setZapisano(true); setTimeout(() => setZapisano(false), 2000); }}
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
        style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)", color: "#fff" }}
      >
        {zapisano ? "✓ Zapisano" : "Zapisz ustawienia"}
      </button>
    </div>
  );
}

function AdminDashboardInner() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") ?? "pulpit") as Zakladka;

  const pracownik = KONTA_TESTOWE.find(u => u.role === "pracownik")!;
  const firma     = KONTA_TESTOWE.find(u => u.role === "firma")!;

  const PAGE_TITLES: Record<Zakladka, string> = {
    pulpit:      "Panel Administratora",
    pracownik:   "Konto: Pracownik",
    firma:       "Konto: Firma",
    uprawnienia: "Uprawnienia",
    ustawienia:  "Ustawienia",
  };

  const renderTab = () => {
    switch (tab) {
      case "pulpit":      return <TabPulpit />;
      case "pracownik":   return <TabKonto user={pracownik} />;
      case "firma":       return <TabKonto user={firma} />;
      case "uprawnienia": return <TabUprawnienia />;
      case "ustawienia":  return <TabUstawienia />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-fg">{PAGE_TITLES[tab]}</h1>
        <p className="text-sm text-fg-muted mt-1">Zarządzanie kontami testowymi i konfiguracją systemu</p>
      </div>
      {renderTab()}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense>
      <AdminDashboardInner />
    </Suspense>
  );
}
