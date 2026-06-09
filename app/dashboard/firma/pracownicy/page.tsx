"use client";

import { useState } from "react";
import { WORKERS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/dashboard/PageHeader";
import type { Worker, WorkerStatus, Nationality } from "@/lib/types/dashboard";

const NATIONALITY_FLAG: Record<Nationality, string> = { PL: "🇵🇱", UA: "🇺🇦", other: "🌐" };
const CONTRACT_LABEL: Record<string, string> = {
  umowa_o_prace: "Umowa o pracę", umowa_zlecenie: "Umowa zlecenie",
  b2b: "B2B", umowa_o_dzielo: "Umowa o dzieło",
};

export default function PracownicyPage() {
  const [search,     setSearch]     = useState("");
  const [statusFilter, setStatus]   = useState<WorkerStatus | "all">("all");
  const [natFilter,  setNat]        = useState<Nationality | "all">("all");
  const [selected,   setSelected]   = useState<Set<string>>(new Set());

  const filtered = WORKERS.filter(w => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${w.firstName} ${w.lastName} ${w.position} ${w.department}`.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    const matchNat    = natFilter === "all" || w.nationality === natFilter;
    return matchSearch && matchStatus && matchNat;
  });

  function toggleAll() {
    setSelected(s => s.size === filtered.length ? new Set() : new Set(filtered.map(w => w.id)));
  }

  function toggleOne(id: string) {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pracownicy"
        subtitle={`${WORKERS.filter(w => w.status === "aktywny").length} aktywnych z ${WORKERS.length} łącznie`}
        actions={
          <button className="text-sm font-semibold px-4 py-2.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg,#5B8CFF,#8A5CFF)" }}>
            + Dodaj pracownika
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj pracownika, stanowiska…"
            className="field w-full pl-9 text-sm" />
        </div>
        <select value={statusFilter} onChange={e => setStatus(e.target.value as WorkerStatus | "all")}
          className="field text-sm" style={{ minWidth: 140 }}>
          <option value="all">Wszystkie statusy</option>
          <option value="aktywny">Aktywni</option>
          <option value="urlop">Urlop</option>
          <option value="zawieszony">Zawieszeni</option>
          <option value="zakończony">Zakończeni</option>
        </select>
        <select value={natFilter} onChange={e => setNat(e.target.value as Nationality | "all")}
          className="field text-sm" style={{ minWidth: 130 }}>
          <option value="all">Wszystkie nacje</option>
          <option value="UA">🇺🇦 Ukraina</option>
          <option value="PL">🇵🇱 Polska</option>
          <option value="other">Inne</option>
        </select>
      </div>

      {/* Selection bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(91,140,255,0.1)", border: "1px solid rgba(91,140,255,0.2)" }}>
          <span className="font-semibold text-accent">{selected.size} zaznaczonych</span>
          <button className="text-fg-muted hover:text-fg transition-colors">Eksportuj CSV</button>
          <button className="text-fg-muted hover:text-fg transition-colors">Pobierz dokumenty</button>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-fg-faint hover:text-fg">✕ Odznacz</button>
        </div>
      )}

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-x-4 px-4 py-3 border-b border-white/8 text-xs font-bold uppercase tracking-wider text-fg-faint">
          <div className="flex items-center">
            <input type="checkbox"
              checked={selected.size === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 accent-accent rounded"
              aria-label="Zaznacz wszystkich" />
          </div>
          <div>Pracownik</div>
          <div className="hidden md:block">Stanowisko / Dział</div>
          <div className="hidden lg:block">Umowa</div>
          <div className="hidden sm:block">Godz. mies.</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-fg-muted">
            <p className="text-4xl mb-3">👥</p>
            <p className="font-semibold">Brak wyników</p>
            <p className="text-sm mt-1">Zmień filtry lub dodaj pracownika</p>
          </div>
        ) : (
          <div className="divide-y divide-white/6">
            {filtered.map(w => (
              <div key={w.id}
                className={`grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-x-4 px-4 py-3.5 items-center transition-colors hover:bg-white/4 cursor-pointer ${selected.has(w.id) ? "bg-accent/5" : ""}`}>
                <div onClick={() => toggleOne(w.id)}>
                  <input type="checkbox" checked={selected.has(w.id)} onChange={() => toggleOne(w.id)}
                    className="w-4 h-4 accent-accent rounded" aria-label={`Zaznacz ${w.firstName}`} />
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#5B8CFF99,#8A5CFF99)" }}>
                    {w.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-fg truncate">
                      {NATIONALITY_FLAG[w.nationality]} {w.firstName} {w.lastName}
                    </p>
                    <p className="text-xs text-fg-faint">{w.email}</p>
                  </div>
                </div>
                <div className="hidden md:block min-w-0">
                  <p className="text-sm text-fg truncate">{w.position}</p>
                  <p className="text-xs text-fg-faint">{w.department}</p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs text-fg-muted">{CONTRACT_LABEL[w.contractType]}</p>
                  <p className="text-xs text-fg-faint">od {w.startDate}</p>
                </div>
                <div className="hidden sm:block text-center">
                  <p className="text-sm font-semibold text-fg">{w.currentMonthHours}h</p>
                  <p className="text-xs text-fg-faint">{(w.hourlyRate * w.currentMonthHours).toLocaleString("pl-PL")} zł</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <StatusBadge status={w.status} size="sm" withDot />
                  {w.documentsStatus !== "kompletne" && (
                    <StatusBadge status={w.documentsStatus} size="sm" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between text-xs text-fg-faint">
          <span>{filtered.length} z {WORKERS.length} pracowników</span>
          <span>Łączny koszt/mies.: <strong className="text-fg">
            {(filtered.reduce((s, w) => s + w.hourlyRate * w.currentMonthHours, 0)).toLocaleString("pl-PL")} zł
          </strong></span>
        </div>
      </div>
    </div>
  );
}
