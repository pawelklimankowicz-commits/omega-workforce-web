"use client";

import { useState } from "react";
import { TIMESHEETS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import type { TimesheetStatus } from "@/lib/types/dashboard";

const TYPE_LABEL: Record<string, string> = {
  normalny: "Normalny", nadgodziny: "Nadgodziny", nocny: "Nocny", świąteczny: "Świąteczny",
};

export default function GodzinyPage() {
  const [filter, setFilter] = useState<TimesheetStatus | "all">("all");
  const [approving, setApproving] = useState<string | null>(null);
  const [localSheets, setLocalSheets] = useState(TIMESHEETS);

  const filtered = filter === "all" ? localSheets : localSheets.filter(t => t.status === filter);
  const pending  = localSheets.filter(t => t.status === "oczekuje").length;

  async function handleApprove(id: string) {
    setApproving(id);
    await new Promise(r => setTimeout(r, 600)); // mock API delay
    setLocalSheets(s => s.map(t => t.workerId === id ? { ...t, status: "zatwierdzono" as TimesheetStatus } : t));
    setApproving(null);
  }

  async function handleReject(id: string) {
    setLocalSheets(s => s.map(t => t.workerId === id ? { ...t, status: "odrzucono" as TimesheetStatus } : t));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Godziny i timesheety"
        subtitle="Zatwierdzaj przepracowane godziny przed wystawieniem faktury"
        badge={pending > 0 ? { label: `${pending} do zatwierdzenia`, color: "#FFB454" } : undefined}
      />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "oczekuje", "zatwierdzono", "odrzucono"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              filter === f
                ? "text-fg border-accent"
                : "border-white/10 text-fg-muted hover:border-white/25 hover:text-fg"
            }`}
            style={filter === f ? { background: "rgba(91,140,255,0.12)" } : {}}>
            {f === "all" ? "Wszystkie" : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-2 text-xs text-fg-faint">
              ({f === "all" ? localSheets.length : localSheets.filter(t => t.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Timesheet cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 glass rounded-2xl text-fg-muted">
            <p className="text-4xl mb-3">🕐</p>
            <p className="font-semibold">Brak timesheetów</p>
            <p className="text-sm mt-1">Zmień filtr lub okres</p>
          </div>
        )}
        {filtered.map(ts => (
          <div key={`${ts.workerId}-${ts.weekLabel}`} className="glass rounded-2xl overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)" }}>
                  {ts.workerName.split(" ").map((w: string) => w[0]).slice(0,2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-fg text-sm">{ts.workerName}</p>
                  <p className="text-xs text-fg-muted">Tydzień: {ts.weekLabel}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-fg">{ts.totalHours}h</p>
                  <p className="text-xs text-fg-muted">w tym {ts.totalOvertime}h nadgodzin</p>
                </div>
                <StatusBadge status={ts.status} withDot />
              </div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-white/5">
              {ts.entries.map(e => (
                <div key={e.id} className="flex items-center gap-4 px-5 py-2.5 text-sm hover:bg-white/3 transition-colors">
                  <span className="text-fg-muted w-24 flex-shrink-0 text-xs">
                    {new Date(e.date).toLocaleDateString("pl-PL", { weekday: "short", day: "2-digit", month: "short" })}
                  </span>
                  <span className="font-semibold text-fg w-12">{e.hours}h</span>
                  {e.overtime > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,180,84,0.12)", color: "#FFB454" }}>
                      +{e.overtime}h OT
                    </span>
                  )}
                  <span className="text-xs text-fg-muted">{TYPE_LABEL[e.type]}</span>
                  {e.project && (
                    <span className="text-xs text-fg-faint ml-auto hidden sm:block">{e.project}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            {ts.status === "oczekuje" && (
              <div className="flex gap-3 px-5 py-4 border-t border-white/8 bg-white/2">
                <button onClick={() => handleApprove(ts.workerId)}
                  disabled={approving === ts.workerId}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-ink transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "#34D39A" }}>
                  {approving === ts.workerId ? (
                    <span className="w-3.5 h-3.5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                  Zatwierdź
                </button>
                <button onClick={() => handleReject(ts.workerId)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Odrzuć
                </button>
                <span className="ml-auto text-xs text-fg-faint self-center">
                  Zatwierdzasz: {ts.totalHours}h · est. {(ts.entries[0] && `${(ts.totalHours * 30).toLocaleString("pl-PL")} zł`)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
