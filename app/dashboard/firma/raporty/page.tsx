"use client";

import { useState } from "react";
import { WORKERS, INVOICES, TIMESHEETS, formatPLN, periodLabel } from "@/lib/mock-data";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

type ReportPeriod = "2025-06" | "2025-05" | "2025-04";

const PERIODS: { id: ReportPeriod; label: string }[] = [
  { id: "2025-06", label: "Czerwiec 2025" },
  { id: "2025-05", label: "Maj 2025" },
  { id: "2025-04", label: "Kwiecień 2025" },
];

const REPORT_TYPES = [
  { id: "koszty",      label: "Raport kosztów",          icon: "💰", desc: "Podsumowanie kosztów pracowniczych według działów i stanowisk" },
  { id: "godziny",     label: "Raport godzin",           icon: "⏱️",  desc: "Godziny przepracowane, nadgodziny i nieobecności" },
  { id: "pracownicy",  label: "Raport pracowników",      icon: "👥", desc: "Lista aktywnych pracowników z kosztami i statusem dokumentów" },
  { id: "faktury",     label: "Zestawienie faktur",      icon: "📄", desc: "Historia faktur, statusy płatności i sumy za okres" },
];

// ── Mock aggregated data ─────────────────────────────────────────────
const BY_DEPT: { dept: string; workers: number; hours: number; cost: number }[] = [
  { dept: "Produkcja",        workers: 4, hours: 682, cost: 22_900 },
  { dept: "Logistyka",        workers: 2, hours: 336, cost: 9_990  },
  { dept: "Jakość",           workers: 1, hours: 164, cost: 4_590  },
  { dept: "Utrzymanie ruchu", workers: 1, hours: 170, cost: 6_460  },
];

const totalHours = BY_DEPT.reduce((s, d) => s + d.hours, 0);
const totalCost  = BY_DEPT.reduce((s, d) => s + d.cost, 0);

export default function RaportyPage() {
  const [period,  setPeriod]  = useState<ReportPeriod>("2025-06");
  const [loading, setLoading] = useState<string | null>(null);

  function handleExport(type: string) {
    setLoading(type);
    setTimeout(() => {
      setLoading(null);
      // In production: trigger actual download
      alert(`Eksport raportu "${type}" — gotowy.\nW produkcji plik CSV/XLSX zostanie pobrany automatycznie.`);
    }, 1400);
  }

  const invoice = INVOICES.find(i => i.period === period);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Raporty"
        subtitle="Analizy kosztów, godzin i zestawienia pracownicze"
        actions={
          <select value={period} onChange={e => setPeriod(e.target.value as ReportPeriod)}
            className="field text-sm py-2 pl-3 pr-8 bg-surface2 border-white/15 rounded-xl cursor-pointer">
            {PERIODS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        }
      />

      {/* Period summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Łączny koszt pracowniczy", val: formatPLN(invoice?.netAmount ?? totalCost), color: "#5B8CFF" },
          { label: "Przepracowane godziny",    val: `${totalHours}h`,                            color: "#34D39A" },
          { label: "Aktywni pracownicy",        val: `${WORKERS.filter(w => w.status === "aktywny").length}`,  color: "#34D39A" },
          { label: "Nadgodziny",               val: `${TIMESHEETS.reduce((s, t) => s + t.totalOvertime, 0)}h`, color: "#FFB454" },
        ].map(kpi => (
          <div key={kpi.label} className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, ${kpi.color}80, transparent)` }} />
            <p className="text-xs text-fg-faint mb-2">{kpi.label}</p>
            <p className="text-2xl font-extrabold text-fg">{kpi.val}</p>
          </div>
        ))}
      </div>

      {/* Cost by department */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div>
            <h2 className="text-sm font-bold text-fg">Koszty według działów</h2>
            <p className="text-xs text-fg-muted mt-0.5">{periodLabel(period)}</p>
          </div>
          <button onClick={() => handleExport("koszty_działy")}
            disabled={loading === "koszty_działy"}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 text-fg-muted hover:text-fg hover:border-white/30 transition-all disabled:opacity-50">
            {loading === "koszty_działy"
              ? <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            }
            Eksportuj CSV
          </button>
        </div>
        <div className="divide-y divide-white/6">
          {BY_DEPT.map(d => {
            const pct = Math.round((d.cost / totalCost) * 100);
            return (
              <div key={d.dept} className="flex items-center gap-5 px-5 py-4 hover:bg-white/3 transition-colors">
                <div className="w-32 flex-shrink-0">
                  <p className="text-sm font-semibold text-fg">{d.dept}</p>
                  <p className="text-xs text-fg-faint mt-0.5">{d.workers} prac. · {d.hours}h</p>
                </div>
                {/* Progress bar */}
                <div className="flex-1 h-2 rounded-full bg-white/8">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: "#5B8CFF" }} />
                </div>
                <div className="text-right flex-shrink-0 w-28">
                  <p className="text-sm font-bold text-fg">{formatPLN(d.cost)}</p>
                  <p className="text-xs text-fg-faint">{pct}% łącznego kosztu</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between px-5 py-3 bg-white/3 border-t border-white/8">
          <p className="text-sm font-bold text-fg">Łącznie</p>
          <p className="text-base font-extrabold text-fg">{formatPLN(totalCost)}</p>
        </div>
      </div>

      {/* Report download cards */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Dostępne raporty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REPORT_TYPES.map(rt => (
            <div key={rt.id} className="glass rounded-2xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "rgba(91,140,255,0.1)" }}>
                {rt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-fg">{rt.label}</p>
                <p className="text-xs text-fg-muted mt-0.5 leading-relaxed">{rt.desc}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleExport(rt.id)}
                    disabled={!!loading}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-white/15 text-accent hover:border-accent/50 transition-all disabled:opacity-40 flex items-center gap-1.5">
                    {loading === rt.id
                      ? <span className="w-3 h-3 border border-accent/30 border-t-accent rounded-full animate-spin" />
                      : null
                    }
                    {loading === rt.id ? "Przygotowuję…" : "Pobierz CSV"}
                  </button>
                  <button className="text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-white/10 text-fg-muted hover:text-fg transition-all">
                    Pobierz XLSX
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Invoices summary */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-fg">Zestawienie faktur</h2>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/8 text-xs font-bold uppercase tracking-wider text-fg-faint">
            <div>Numer</div>
            <div className="hidden sm:block">Okres</div>
            <div>Brutto</div>
            <div>Status</div>
            <div>Akcja</div>
          </div>
          <div className="divide-y divide-white/6">
            {INVOICES.map(inv => (
              <div key={inv.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/3 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-fg">{inv.number}</p>
                  <p className="text-xs text-fg-faint">termin: {inv.dueDate}</p>
                </div>
                <div className="hidden sm:block text-sm text-fg-muted">{periodLabel(inv.period)}</div>
                <div className="text-sm font-bold text-fg">{formatPLN(inv.grossAmount)}</div>
                <StatusBadge status={inv.status} size="sm" withDot />
                <a href={inv.downloadUrl} className="text-xs text-accent hover:underline font-semibold">
                  PDF →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
