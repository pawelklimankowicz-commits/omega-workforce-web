import { WORKERS, formatDate } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";

// Simulated per-worker document records (expand from WORKERS.documentsStatus)
const FIRMA_DOCUMENTS = [
  {
    workerId: "wkr_001", workerName: "Dmytro Kovalenko",
    docs: [
      { id: "fd_001", name: "Umowa zlecenia 2025",          type: "umowa",          status: "aktywny",   expiresAt: "2025-12-31", uploadedAt: "2025-01-03" },
      { id: "fd_002", name: "Badania lekarskie",            type: "medyczne",       status: "aktywny",   expiresAt: "2026-01-03", uploadedAt: "2025-01-03" },
      { id: "fd_003", name: "Karta pobytu",                 type: "legalizacja",    status: "aktywny",   expiresAt: "2026-03-01", uploadedAt: "2025-01-03" },
    ],
  },
  {
    workerId: "wkr_003", workerName: "Vasyl Petrenko",
    docs: [
      { id: "fd_010", name: "Umowa o pracę 2023",           type: "umowa",          status: "aktywny",   expiresAt: "2025-12-31", uploadedAt: "2023-09-01" },
      { id: "fd_011", name: "Karta pobytu",                 type: "legalizacja",    status: "wygasający",expiresAt: "2025-06-30", uploadedAt: "2022-07-01" },
      { id: "fd_012", name: "Badania lekarskie",            type: "medyczne",       status: "aktywny",   expiresAt: "2026-09-01", uploadedAt: "2025-09-01" },
    ],
  },
  {
    workerId: "wkr_006", workerName: "Andriy Lysenko",
    docs: [
      { id: "fd_020", name: "Umowa o pracę 2023",           type: "umowa",          status: "aktywny",   expiresAt: "2025-12-31", uploadedAt: "2023-11-01" },
      { id: "fd_021", name: "Badania lekarskie — BRAK",     type: "medyczne",       status: "niekompletny", uploadedAt: "—" },
    ],
  },
];

const TYPE_ICON: Record<string, { icon: string; color: string }> = {
  umowa:       { icon: "📋", color: "#5B8CFF" },
  medyczne:    { icon: "🏥", color: "#34D39A" },
  legalizacja: { icon: "🛂", color: "#FFB454" },
  rodo:        { icon: "🔒", color: "#8A5CFF" },
  inne:        { icon: "📎", color: "#9CA0AD" },
};

const totalExpiring = FIRMA_DOCUMENTS.flatMap(w => w.docs).filter(d => d.status === "wygasający").length;
const totalMissing  = FIRMA_DOCUMENTS.flatMap(w => w.docs).filter(d => d.status === "niekompletny").length;

export default function DokumentyFirmaPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dokumenty pracowników"
        subtitle="Kontrola umów, badań lekarskich i legalizacji pobytu"
        badge={
          totalExpiring + totalMissing > 0
            ? { label: `${totalExpiring + totalMissing} wymaga uwagi`, color: "#FFB454" }
            : undefined
        }
      />

      {/* Alert summary */}
      {(totalExpiring > 0 || totalMissing > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {totalExpiring > 0 && (
            <div className="rounded-xl p-4 flex items-start gap-3 text-sm"
              style={{ background: "rgba(255,180,84,0.08)", border: "1px solid rgba(255,180,84,0.2)" }}>
              <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
              <div>
                <p className="font-semibold text-fg">{totalExpiring} dokument wygasający</p>
                <p className="text-xs text-fg-muted mt-0.5">Wymaga odnowienia w ciągu 30 dni.</p>
              </div>
            </div>
          )}
          {totalMissing > 0 && (
            <div className="rounded-xl p-4 flex items-start gap-3 text-sm"
              style={{ background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)" }}>
              <span style={{ color: "#FF6B6B" }} className="mt-0.5 flex-shrink-0">✕</span>
              <div>
                <p className="font-semibold text-fg">{totalMissing} brakujący dokument</p>
                <p className="text-xs text-fg-muted mt-0.5">Uzupełnij przed kolejną kontrolą.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Per-worker document tables */}
      {FIRMA_DOCUMENTS.map(worker => {
        const workerRecord = WORKERS.find(w => w.id === worker.workerId);
        const hasIssue = worker.docs.some(d => d.status !== "aktywny");
        return (
          <div key={worker.workerId} className="glass rounded-2xl overflow-hidden">
            {/* Worker header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8"
              style={hasIssue ? { background: "rgba(255,180,84,0.05)" } : {}}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)" }}>
                  {workerRecord?.avatarInitials ?? "??"}
                </div>
                <div>
                  <p className="font-semibold text-fg text-sm">{worker.workerName}</p>
                  <p className="text-xs text-fg-faint">{workerRecord?.position} · {workerRecord?.department}</p>
                </div>
              </div>
              <StatusBadge status={hasIssue ? "wygasający" : "kompletne"} size="sm" withDot />
            </div>

            {/* Documents */}
            <div className="divide-y divide-white/5">
              {worker.docs.map(doc => {
                const t = TYPE_ICON[doc.type] ?? TYPE_ICON.inne;
                return (
                  <div key={doc.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3.5 items-center hover:bg-white/3 transition-colors">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                      style={{ background: `${t.color}18` }}>
                      {t.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-fg truncate">{doc.name}</p>
                      <p className="text-xs text-fg-faint">
                        Dodano: {doc.uploadedAt !== "—" ? formatDate(doc.uploadedAt) : "—"}
                      </p>
                    </div>
                    <div className="text-sm text-fg-muted hidden sm:block">
                      {doc.expiresAt ? formatDate(doc.expiresAt) : <span className="text-fg-faint">—</span>}
                    </div>
                    <StatusBadge status={doc.status} size="sm" withDot />
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-fg-muted hover:text-fg hover:border-white/25 transition-all whitespace-nowrap">
                      {doc.status === "niekompletny" ? "Dodaj ↑" : "PDF ↓"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="text-xs text-fg-faint text-center">
        Kompletna lista dokumentów wszystkich pracowników.{" "}
        <a href="mailto:kadry@omegaworkforce.pl" className="text-accent hover:underline">
          Skontaktuj się z opiekunem →
        </a>
      </p>
    </div>
  );
}
