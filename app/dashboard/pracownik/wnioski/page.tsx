"use client";

import { useState } from "react";
import { WORKER_REQUESTS, formatDate } from "@/lib/mock-data";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const REQUEST_TYPES = [
  { id: "korekta_godzin", label: "Korekta godzin",    icon: "⏱️" },
  { id: "zaliczka",       label: "Zaliczka",          icon: "💰" },
  { id: "urlop",          label: "Wniosek urlopowy",  icon: "🏖️" },
  { id: "inny",           label: "Inny",              icon: "📝" },
];

const TYPE_LABEL: Record<string, string> = {
  korekta_godzin: "Korekta godzin",
  zaliczka: "Zaliczka",
  urlop: "Urlop",
  inny: "Inny",
};

export default function WnioskiPage() {
  const [showNew, setShowNew]   = useState(false);
  const [type,    setType]      = useState("korekta_godzin");
  const [desc,    setDesc]      = useState("");
  const [sent,    setSent]      = useState(false);

  const pending = WORKER_REQUESTS.filter(r => r.status === "oczekuje").length;

  function submitRequest() {
    if (!desc.trim()) return;
    setSent(true);
    setShowNew(false);
    setDesc("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moje wnioski"
        subtitle="Korekty godzin, zaliczki, urlopy i inne"
        badge={pending > 0 ? { label: `${pending} w toku`, color: "#5B8CFF" } : undefined}
        actions={
          <button onClick={() => { setShowNew(true); setSent(false); }}
            className="btn-primary text-sm px-4 py-2.5">
            + Nowy wniosek
          </button>
        }
      />

      {sent && (
        <div className="rounded-xl p-4 flex items-center gap-3 text-sm"
          style={{ background: "rgba(52,211,154,0.1)", border: "1px solid rgba(52,211,154,0.2)", color: "#34D39A" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Wniosek wysłany. Opiekun skontaktuje się w ciągu 1 dnia roboczego.
        </div>
      )}

      {/* Request list */}
      <div className="space-y-3">
        {WORKER_REQUESTS.map(req => {
          const rtype = REQUEST_TYPES.find(t => t.id === req.type);
          return (
            <div key={req.id} className="glass rounded-2xl p-5 hover:bg-white/4 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(91,140,255,0.1)" }}>
                  {rtype?.icon ?? "📝"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-fg">{rtype?.label ?? TYPE_LABEL[req.type]}</p>
                        <StatusBadge status={req.status} size="sm" withDot />
                      </div>
                      <p className="text-xs text-fg-faint mt-0.5">Złożono: {formatDate(req.date)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-fg-muted mt-2 leading-relaxed">{req.description}</p>
                  {req.resolvedAt && req.note && (
                    <div className="mt-3 rounded-xl px-4 py-3 text-xs"
                      style={{ background: "rgba(52,211,154,0.06)", border: "1px solid rgba(52,211,154,0.12)" }}>
                      <p className="font-semibold text-fg">Odpowiedź opiekuna — {formatDate(req.resolvedAt)}</p>
                      <p className="text-fg-muted mt-0.5">{req.note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {WORKER_REQUESTS.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-fg font-semibold">Brak wniosków</p>
          <p className="text-fg-muted text-sm mt-1">Złóż pierwszy wniosek klikając przycisk powyżej.</p>
        </div>
      )}

      {/* New request modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <div className="relative w-full max-w-md glass rounded-2xl p-6 space-y-5 z-10">
            <div>
              <h3 className="text-lg font-bold text-fg">Nowy wniosek</h3>
              <p className="text-sm text-fg-muted mt-1">Wybierz rodzaj i opisz swoją prośbę.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">Rodzaj wniosku</label>
              <div className="grid grid-cols-2 gap-2">
                {REQUEST_TYPES.map(t => (
                  <button key={t.id} type="button" onClick={() => setType(t.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${type === t.id ? "border-accent bg-accent/8 text-fg" : "border-white/10 text-fg-muted hover:border-white/25"}`}>
                    <span className="text-base">{t.icon}</span>
                    <span className="text-xs font-semibold">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-fg-faint">Opis</label>
              <textarea value={desc} onChange={e => setDesc(e.target.value)}
                rows={4} placeholder={
                  type === "korekta_godzin" ? "Np. 5 cze — wpisano 8h, przepracowałem 10h." :
                  type === "zaliczka" ? "Proszę o zaliczkę X zł na poczet wynagrodzenia." :
                  type === "urlop" ? "Wniosek o urlop od … do … (podaj zakres dat)." :
                  "Opisz swoją prośbę…"
                }
                className="field w-full resize-none text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowNew(false)} className="btn-ghost flex-1 text-sm py-2.5">Anuluj</button>
              <button onClick={submitRequest} disabled={!desc.trim()}
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
