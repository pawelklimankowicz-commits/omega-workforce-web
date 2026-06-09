import { WORKER_DOCUMENTS, formatDate } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";

const TYPE_ICON: Record<string, { icon: string; bg: string; color: string }> = {
  umowa:         { icon: "📋", bg: "rgba(91,140,255,0.1)",  color: "#5B8CFF" },
  pasek:         { icon: "💰", bg: "rgba(52,211,154,0.1)",  color: "#34D39A" },
  zaswiadczenie: { icon: "📄", bg: "rgba(255,180,84,0.1)",  color: "#FFB454" },
  rodo:          { icon: "🔒", bg: "rgba(138,92,255,0.1)",  color: "#8A5CFF" },
  inne:          { icon: "📎", bg: "rgba(92,96,112,0.15)",  color: "#9CA0AD" },
};

const TYPE_LABEL: Record<string, string> = {
  umowa: "Umowa", pasek: "Pasek płacowy", zaswiadczenie: "Zaświadczenie", rodo: "RODO", inne: "Inne",
};

export default function DokumentyPracownikPage() {
  const expiring = WORKER_DOCUMENTS.filter(d => d.status === "wygasający");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moje dokumenty"
        subtitle="Umowy, paski płacowe, zaświadczenia i zgody"
        badge={expiring.length > 0 ? { label: `${expiring.length} wygasające`, color: "#FFB454" } : undefined}
      />

      {/* Expiring warning */}
      {expiring.length > 0 && (
        <div className="rounded-xl p-4 flex items-start gap-3 text-sm"
          style={{ background: "rgba(255,180,84,0.08)", border: "1px solid rgba(255,180,84,0.2)" }}>
          <span className="text-amber-400 flex-shrink-0 mt-0.5">⚠</span>
          <div>
            <p className="font-semibold text-fg">Wygasające dokumenty</p>
            <p className="text-fg-muted text-xs mt-0.5">
              {expiring.map(d => `${d.name} — wygasa ${d.expiresAt ? formatDate(d.expiresAt) : "niedługo"}`).join("; ")}
            </p>
          </div>
        </div>
      )}

      {/* Document grid */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/8 text-xs font-bold uppercase tracking-wider text-fg-faint">
          <div>Typ</div>
          <div>Dokument</div>
          <div className="hidden sm:block">Data ważności</div>
          <div>Status</div>
          <div>Akcja</div>
        </div>

        <div className="divide-y divide-white/6">
          {WORKER_DOCUMENTS.map(doc => {
            const t = TYPE_ICON[doc.type] ?? TYPE_ICON.inne;
            return (
              <div key={doc.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-white/4 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: t.bg }}>
                  {t.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg truncate">{doc.name}</p>
                  <p className="text-xs text-fg-faint">{TYPE_LABEL[doc.type]} · {doc.size} · dodano {formatDate(doc.uploadedAt)}</p>
                </div>
                <div className="hidden sm:block text-sm text-fg-muted">
                  {doc.expiresAt ? formatDate(doc.expiresAt) : <span className="text-fg-faint">—</span>}
                </div>
                <div>
                  <StatusBadge status={doc.status} size="sm" withDot />
                </div>
                <div>
                  <a href={doc.downloadUrl} download
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-fg-muted hover:text-fg hover:border-white/25 transition-all inline-flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    PDF
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-fg-faint text-center">
        Brakuje dokumentu? Skontaktuj się z opiekunem Omega Workforce —{" "}
        <a href="mailto:kontakt@omegaworkforce.pl" className="text-accent hover:underline">
          kontakt@omegaworkforce.pl
        </a>
      </p>
    </div>
  );
}
