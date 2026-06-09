"use client";

import { useState } from "react";
import { WORKER_WEEKS } from "@/lib/mock-data";
import { PageHeader } from "@/components/dashboard/PageHeader";

const TYPE_COLORS: Record<string, string> = {
  normalny:   "#5B8CFF", nadgodziny: "#FFB454", nocny: "#8A5CFF", świąteczny: "#FF6B6B",
};

export default function GodzinyPracownikPage() {
  const [showRequest, setShowRequest] = useState(false);
  const [requestNote, setRequestNote] = useState("");
  const [submitted,   setSubmitted]   = useState(false);

  const totalMonth = WORKER_WEEKS.flatMap(w => w.days).reduce((s, d) => s + d.hours, 0);
  const totalOT    = WORKER_WEEKS.flatMap(w => w.days).reduce((s, d) => s + d.overtime, 0);

  function submitRequest() {
    if (!requestNote.trim()) return;
    setSubmitted(true);
    setShowRequest(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moje godziny"
        subtitle={`Czerwiec 2025 · ${totalMonth}h łącznie, ${totalOT}h nadgodzin`}
        actions={
          <button onClick={() => setShowRequest(true)}
            className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/15 text-fg-muted hover:text-fg hover:border-white/30 transition-all">
            Złóż wniosek o korektę
          </button>
        }
      />

      {submitted && (
        <div className="rounded-xl p-4 text-sm flex items-center gap-3"
          style={{ background: "rgba(52,211,154,0.1)", border: "1px solid rgba(52,211,154,0.2)", color: "#34D39A" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Wniosek wysłany. Opiekun skontaktuje się w ciągu 1 dnia roboczego.
        </div>
      )}

      {/* Month summary bar */}
      <div className="glass rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Łączne godziny",  val: `${totalMonth}h`,  color: "#5B8CFF" },
          { label: "Nadgodziny",      val: `${totalOT}h`,     color: "#FFB454" },
          { label: "Dni przepracowane", val: `${WORKER_WEEKS.flatMap(w => w.days).length}`,   color: "#34D39A" },
          { label: "Śr. h / dzień",   val: `${(totalMonth / Math.max(WORKER_WEEKS.flatMap(w => w.days).length, 1)).toFixed(1)}h`, color: "#9CA0AD" },
        ].map(c => (
          <div key={c.label} className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: c.color }}>{c.val}</p>
            <p className="text-xs text-fg-faint mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly breakdown */}
      {WORKER_WEEKS.map(week => (
        <div key={week.weekLabel} className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div>
              <p className="font-semibold text-fg text-sm">{week.weekLabel}</p>
              <p className="text-xs text-fg-muted mt-0.5">{week.total}h łącznie · {week.overtime}h nadgodzin</p>
            </div>
            <div className="h-1.5 w-24 rounded-full bg-white/8">
              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((week.total / 48) * 100, 100)}%`, background: "#5B8CFF" }} />
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {week.days.map(day => (
              <div key={day.date} className="flex items-center gap-4 px-5 py-3 hover:bg-white/3 transition-colors">
                <div className="w-28 flex-shrink-0">
                  <p className="text-xs font-semibold text-fg">
                    {new Date(day.date).toLocaleDateString("pl-PL", { weekday: "long" })}
                  </p>
                  <p className="text-xs text-fg-faint">
                    {new Date(day.date).toLocaleDateString("pl-PL", { day: "2-digit", month: "short" })}
                  </p>
                </div>

                {/* Bar */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-6 rounded-lg bg-white/6 relative overflow-hidden">
                    <div className="h-full rounded-lg transition-all"
                      style={{
                        width: `${(day.hours / 12) * 100}%`,
                        background: TYPE_COLORS[day.type] ?? "#5B8CFF",
                        opacity: 0.7,
                      }} />
                    <span className="absolute inset-0 flex items-center px-2 text-xs font-bold text-white">
                      {day.hours}h {day.type !== "normalny" && `(${day.type})`}
                    </span>
                  </div>
                  {day.overtime > 0 && (
                    <span className="text-xs px-2 py-1 rounded-lg flex-shrink-0"
                      style={{ background: "rgba(255,180,84,0.12)", color: "#FFB454" }}>
                      +{day.overtime}h OT
                    </span>
                  )}
                </div>

                {day.project && (
                  <span className="text-xs text-fg-faint hidden sm:block flex-shrink-0">{day.project}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Wniosek o korektę — modal */}
      {showRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRequest(false)} />
          <div className="relative w-full max-w-md glass rounded-2xl p-6 space-y-4 z-10">
            <h3 className="text-lg font-bold text-fg">Wniosek o korektę godzin</h3>
            <p className="text-sm text-fg-muted">Opisz dokładnie: dzień, liczbę godzin, powód korekty.</p>
            <textarea value={requestNote} onChange={e => setRequestNote(e.target.value)}
              rows={4} placeholder="Np. 5 czerwca 2025 — wpisano 8h, faktycznie pracowałem 10h. Zmiana nocna."
              className="field w-full resize-none text-sm" />
            <div className="flex gap-3">
              <button onClick={() => setShowRequest(false)} className="btn-ghost flex-1 text-sm py-2.5">
                Anuluj
              </button>
              <button onClick={submitRequest} disabled={!requestNote.trim()}
                className="btn-primary flex-[2] text-sm py-2.5 disabled:opacity-40">
                Wyślij wniosek →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
