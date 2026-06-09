import { getSession } from "@/lib/auth";
import { PRACOWNIK_KPI, PRACOWNIK_ALERTS, PAYSLIPS, WORKER_WEEKS, WORKER_DOCUMENTS, formatPLN, formatDate, periodLabel } from "@/lib/mock-data";
import { KpiGrid } from "@/components/dashboard/KpiCard";
import { AlertList } from "@/components/dashboard/AlertBanner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";

export default async function PracownikDashboard() {
  const session      = await getSession();
  const currentMonth = PAYSLIPS[0];
  const thisWeek     = WORKER_WEEKS[0];
  const weekTotal    = thisWeek.days.reduce((s, d) => s + d.hours, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Cześć, ${session?.name?.split(" ")[0] ?? ""} 👋`}
        subtitle="Twoje rozliczenia i godziny — czerwiec 2025"
      />

      {/* Alerts */}
      <AlertList alerts={PRACOWNIK_ALERTS.filter(a => !a.read)} />

      {/* KPI grid */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Twój przegląd — czerwiec 2025</h2>
        <KpiGrid metrics={PRACOWNIK_KPI} />
      </section>

      {/* 2-col */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bieżący pasek płacowy */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-fg">Rozliczenie bieżące</h2>
            <Link href="/dashboard/pracownik/wyplaty" className="text-xs text-accent hover:underline">
              Historia →
            </Link>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg,rgba(52,211,154,0.08),rgba(91,140,255,0.05))" }}>
              <div>
                <p className="text-xs text-fg-faint">{periodLabel(currentMonth.period)}</p>
                <p className="text-3xl font-extrabold text-fg mt-0.5">{formatPLN(currentMonth.netAmount)}</p>
                <p className="text-xs text-fg-muted mt-0.5">wynagrodzenie netto</p>
              </div>
              <StatusBadge status={currentMonth.status} withDot />
            </div>
            {/* Breakdown */}
            <div className="divide-y divide-white/6">
              {[
                { label: "Wynagrodzenie brutto", val: currentMonth.grossAmount, color: "#F4F5F8" },
                { label: "Nadgodziny",           val: currentMonth.additions.overtime, color: "#34D39A" },
                { label: "Zmiana nocna",         val: currentMonth.additions.nightShift, color: "#5B8CFF" },
                { label: "Podatek dochodowy",    val: -currentMonth.deductions.incomeTax, color: "#FF6B6B" },
                { label: "ZUS pracownika",       val: -(currentMonth.deductions.socialInsurance + currentMonth.deductions.healthInsurance + currentMonth.deductions.pensionContrib), color: "#FF6B6B" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between px-5 py-2.5">
                  <p className="text-sm text-fg-muted">{row.label}</p>
                  <p className="text-sm font-semibold" style={{ color: row.color }}>
                    {row.val >= 0 ? "" : "–"}{formatPLN(Math.abs(row.val))}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-white/8 flex justify-between items-center bg-white/3">
              <p className="text-sm font-bold text-fg">Do wypłaty</p>
              <p className="text-lg font-extrabold" style={{ color: "#34D39A" }}>{formatPLN(currentMonth.netAmount)}</p>
            </div>
          </div>
        </section>

        {/* Godziny tygodniowe */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-fg">Godziny — bieżący tydzień</h2>
            <Link href="/dashboard/pracownik/godziny" className="text-xs text-accent hover:underline">
              Pełny widok →
            </Link>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <div>
                <p className="text-xs text-fg-faint">{thisWeek.weekLabel}</p>
                <p className="text-2xl font-extrabold text-fg mt-0.5">{weekTotal}h</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-fg-faint">Nadgodziny</p>
                <p className="text-lg font-bold" style={{ color: "#FFB454" }}>{thisWeek.overtime}h</p>
              </div>
            </div>
            {/* Days */}
            <div className="divide-y divide-white/6">
              {thisWeek.days.map(d => {
                const pct = (d.hours / 10) * 100;
                return (
                  <div key={d.date} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-xs text-fg-muted w-20 flex-shrink-0">
                      {new Date(d.date).toLocaleDateString("pl-PL", { weekday: "short", day: "2-digit", month: "short" })}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/8">
                      <div className="h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%`, background: d.overtime > 0 ? "#FFB454" : "#5B8CFF" }} />
                    </div>
                    <span className="text-xs font-bold text-fg w-10 text-right">{d.hours}h</span>
                    {d.overtime > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,180,84,0.12)", color: "#FFB454" }}>
                        +{d.overtime}h OT
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Dokumenty expiring */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-fg">Twoje dokumenty</h2>
          <Link href="/dashboard/pracownik/dokumenty" className="text-xs text-accent hover:underline">
            Wszystkie →
          </Link>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/6">
            {WORKER_DOCUMENTS.slice(0, 4).map(doc => (
              <div key={doc.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/4 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(91,140,255,0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5B8CFF" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-fg truncate">{doc.name}</p>
                  <p className="text-xs text-fg-faint">{doc.size} · {formatDate(doc.uploadedAt)}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={doc.status} size="sm" />
                  <a href={doc.downloadUrl} className="text-xs text-accent hover:underline" download>
                    Pobierz
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
