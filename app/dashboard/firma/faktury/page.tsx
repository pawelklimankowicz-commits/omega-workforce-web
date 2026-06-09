import { INVOICES, formatPLN, formatDate, periodLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function FakturyPage() {
  const totalGross    = INVOICES.reduce((s, i) => s + i.grossAmount, 0);
  const overdue       = INVOICES.filter(i => i.status === "zaległa");
  const pending       = INVOICES.filter(i => i.status === "w_trakcie");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Faktury i rozliczenia"
        subtitle="Historia i status płatności za obsługę pracowników"
        actions={
          <button className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/15 text-fg-muted hover:text-fg hover:border-white/30 transition-all">
            ↓ Eksportuj CSV
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Łącznie wystawiono", val: formatPLN(totalGross),                       color: "#5B8CFF" },
          { label: "Do opłacenia",       val: formatPLN(pending.reduce((s,i) => s + i.grossAmount, 0)),    color: "#FFB454" },
          { label: "Zaległe",            val: formatPLN(overdue.reduce((s,i) => s + i.grossAmount, 0)),    color: "#FF6B6B" },
        ].map(c => (
          <div key={c.label} className="glass rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${c.color}80, transparent)` }} />
            <p className="text-xs text-fg-faint uppercase tracking-wider mb-2">{c.label}</p>
            <p className="text-2xl font-extrabold" style={{ color: "#F4F5F8" }}>{c.val}</p>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/8 text-xs font-bold uppercase tracking-wider text-fg-faint">
          <div>Faktura / Okres</div>
          <div className="hidden sm:block">Termin</div>
          <div>Kwota brutto</div>
          <div>Status</div>
          <div>Akcja</div>
        </div>

        <div className="divide-y divide-white/6">
          {INVOICES.map(inv => (
            <div key={inv.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-white/4 transition-colors">
              <div>
                <p className="text-sm font-semibold text-fg">{inv.number}</p>
                <p className="text-xs text-fg-muted">{periodLabel(inv.period)}</p>
              </div>
              <div className="hidden sm:block text-sm text-fg-muted">
                {formatDate(inv.dueDate)}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-fg">{formatPLN(inv.grossAmount)}</p>
                <p className="text-xs text-fg-faint">netto: {formatPLN(inv.netAmount)}</p>
              </div>
              <div>
                <StatusBadge status={inv.status} withDot />
              </div>
              <div className="flex gap-2">
                <a href={inv.downloadUrl}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-fg-muted hover:text-fg hover:border-white/25 transition-all"
                  download>
                  PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost breakdown — latest invoice */}
      <section>
        <h2 className="text-sm font-bold text-fg mb-4">Rozbicie kosztów — {periodLabel(INVOICES[1].period)}</h2>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/8 sm:grid-cols-3">
            {[
              { label: "Wynagrodzenia bazowe",  val: INVOICES[1].breakdown.baseSalaries  },
              { label: "Nadgodziny",             val: INVOICES[1].breakdown.overtime      },
              { label: "Zmiana nocna",           val: INVOICES[1].breakdown.nightShift   },
              { label: "Marża agencji",          val: INVOICES[1].breakdown.agencyFee    },
              { label: "Dodatki",                val: INVOICES[1].breakdown.additions    },
              { label: "VAT (23%)",              val: INVOICES[1].vatAmount              },
            ].map(row => (
              <div key={row.label} className="p-4">
                <p className="text-xs text-fg-faint mb-1">{row.label}</p>
                <p className="text-base font-bold text-fg">{formatPLN(row.val)}</p>
                <div className="mt-2 h-1 rounded-full bg-white/8">
                  <div className="h-1 rounded-full"
                    style={{
                      width: `${(row.val / INVOICES[1].grossAmount * 100).toFixed(1)}%`,
                      background: "linear-gradient(90deg,#5B8CFF,#8A5CFF)"
                    }} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-white/8 flex items-center justify-between">
            <p className="text-sm font-semibold text-fg-muted">Łącznie brutto</p>
            <p className="text-xl font-extrabold text-fg">{formatPLN(INVOICES[1].grossAmount)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
