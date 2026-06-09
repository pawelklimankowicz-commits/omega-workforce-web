import { PAYSLIPS, formatPLN, formatDate, periodLabel } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function WyplatyPage() {
  const ytdNet = PAYSLIPS.filter(p => p.status === "wypłacono").reduce((s, p) => s + p.netAmount, 0);
  const ytdHours = PAYSLIPS.reduce((s, p) => s + p.hoursWorked, 0);
  const current = PAYSLIPS[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Moje wypłaty"
        subtitle="Historia wynagrodzeń i pasków płacowych"
        badge={{ label: "2025", color: "#34D39A" }}
      />

      {/* YTD summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Łącznie netto 2025",    val: formatPLN(ytdNet),  color: "#34D39A" },
          { label: "Łączne godziny 2025",   val: `${ytdHours}h`,     color: "#5B8CFF" },
          { label: "Śred. wynagrodzenie",   val: formatPLN(ytdNet / PAYSLIPS.filter(p=>p.status==="wypłacono").length), color: "#5B8CFF" },
          { label: "Nadgodziny łącznie",    val: `${PAYSLIPS.reduce((s,p)=>s+p.overtimeHours,0)}h`, color: "#FFB454" },
        ].map(c => (
          <div key={c.label} className="glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${c.color}80, transparent)` }} />
            <p className="text-xs text-fg-faint mb-2">{c.label}</p>
            <p className="text-xl font-extrabold text-fg">{c.val}</p>
          </div>
        ))}
      </div>

      {/* Payslip list */}
      <div className="space-y-4">
        {PAYSLIPS.map((p, i) => (
          <div key={p.id} className="glass rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8"
              style={i === 0 ? { background: "linear-gradient(135deg,rgba(52,211,154,0.07),rgba(91,140,255,0.04))" } : {}}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-fg">{periodLabel(p.period)}</p>
                  {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(91,140,255,0.15)", color: "#5B8CFF" }}>Bieżący</span>}
                </div>
                <p className="text-xs text-fg-muted mt-0.5">{p.hoursWorked}h · w tym {p.overtimeHours}h nadgodzin</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-extrabold text-fg">{formatPLN(p.netAmount)}</p>
                  <p className="text-xs text-fg-muted">brutto: {formatPLN(p.grossAmount)}</p>
                </div>
                <StatusBadge status={p.status} withDot />
              </div>
            </div>

            {/* Breakdown grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y divide-white/6">
              {[
                { label: "Wynagrodzenie brutto",   val: formatPLN(p.grossAmount),    color: "#F4F5F8" },
                { label: "Podatek dochodowy",       val: `-${formatPLN(p.deductions.incomeTax)}`, color: "#FF6B6B" },
                { label: "ZUS / NFZ",               val: `-${formatPLN(p.deductions.socialInsurance + p.deductions.healthInsurance + p.deductions.pensionContrib)}`, color: "#FF6B6B" },
                { label: "Wynagrodzenie netto",     val: formatPLN(p.netAmount),      color: "#34D39A" },
              ].map(row => (
                <div key={row.label} className="px-4 py-3">
                  <p className="text-xs text-fg-faint mb-1">{row.label}</p>
                  <p className="text-sm font-bold" style={{ color: row.color }}>{row.val}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/8 bg-white/2">
              {p.paymentDate ? (
                <p className="text-xs text-fg-muted">Wypłacono: <strong className="text-fg">{formatDate(p.paymentDate)}</strong></p>
              ) : (
                <p className="text-xs text-fg-muted">Oczekuje na wypłatę</p>
              )}
              {p.advance > 0 && (
                <p className="text-xs text-fg-muted">Zaliczka: <strong className="text-amber-400">{formatPLN(p.advance)}</strong></p>
              )}
              <a href={p.downloadUrl} className="text-xs font-semibold text-accent hover:underline" download>
                Pobierz pasek PDF →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
