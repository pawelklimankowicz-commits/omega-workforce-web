import { getSession } from "@/lib/auth";
import { FIRMA_KPI, FIRMA_ALERTS, WORKERS, TIMESHEETS, INVOICES, formatPLN, formatDate } from "@/lib/mock-data";
import { KpiGrid } from "@/components/dashboard/KpiCard";
import { AlertList } from "@/components/dashboard/AlertBanner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";

export default async function FirmaDashboard() {
  const session = await getSession();
  const pendingTimesheets = TIMESHEETS.filter(t => t.status === "oczekuje").length;
  const overdueInvoice    = INVOICES.filter(i => i.status === "zaległa");

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Dzień dobry, ${session?.name?.split(" ")[0] ?? ""} 👋`}
        subtitle="Przegląd operacyjny Twojego zespołu"
        badge={{ label: "Czerwiec 2025" }}
        actions={
          <Link href="/dashboard/firma/godziny"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25"
            style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            Zatwierdź godziny ({pendingTimesheets})
          </Link>
        }
      />

      {/* Alerts */}
      <AlertList alerts={FIRMA_ALERTS.filter(a => !a.read)} />

      {/* KPI grid */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Kluczowe wskaźniki — bieżący miesiąc</h2>
        <KpiGrid metrics={FIRMA_KPI} />
      </section>

      {/* 2-col layout: workers + invoices */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent workers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-fg">Aktywni pracownicy</h2>
            <Link href="/dashboard/firma/pracownicy" className="text-xs text-accent hover:underline">
              Wszyscy ({WORKERS.length}) →
            </Link>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/6">
              {WORKERS.slice(0, 5).map(w => (
                <Link key={w.id} href={`/dashboard/firma/pracownicy`}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/4 transition-colors group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)" }}>
                    {w.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-fg truncate">{w.firstName} {w.lastName}</p>
                    <p className="text-xs text-fg-muted truncate">{w.position}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-fg-muted hidden sm:block">{w.currentMonthHours}h</span>
                    <StatusBadge status={w.status} size="sm" withDot />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent invoices */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-fg">Ostatnie faktury</h2>
            <Link href="/dashboard/firma/faktury" className="text-xs text-accent hover:underline">
              Wszystkie →
            </Link>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/6">
              {INVOICES.map(inv => (
                <div key={inv.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/4 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-fg">{inv.number}</p>
                    <p className="text-xs text-fg-muted">Termin: {formatDate(inv.dueDate)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-fg">{formatPLN(inv.grossAmount)}</p>
                    <StatusBadge status={inv.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Zaległa faktura — prominent banner */}
      {overdueInvoice.length > 0 && (
        <div className="rounded-2xl p-5 flex items-center justify-between gap-4"
          style={{ background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)" }}>
          <div>
            <p className="font-bold text-fg mb-1">⚠ Zaległa płatność</p>
            <p className="text-sm text-fg-muted">
              {overdueInvoice.map(i => `${i.number} — ${formatPLN(i.grossAmount)}`).join(", ")} · Termin minął.
            </p>
          </div>
          <Link href="/dashboard/firma/faktury"
            className="flex-shrink-0 text-sm font-bold px-4 py-2 rounded-xl transition-all hover:opacity-90"
            style={{ background: "rgba(255,107,107,0.2)", color: "#FF6B6B" }}>
            Przejdź do faktur →
          </Link>
        </div>
      )}
    </div>
  );
}
