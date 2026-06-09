"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useDashLang } from "./DashLangProvider";
import type { Alert } from "@/lib/types/dashboard";

interface Props {
  userName:      string;
  userRole:      string;
  alerts?:       Alert[];
  onMenuToggle?: () => void;
  // Legacy props kept for API compat but unused (lang comes from context)
  title?:        string;
  lang?:         string;
  onLangChange?: (l: string) => void;
}

export function TopBar({ userName, alerts = [], onMenuToggle }: Props) {
  const { lang, setLang }             = useDashLang();
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const unread = alerts.filter(a => !a.read).length;

  const searchPlaceholder = lang === "UA" ? "Пошук…"               : "Szukaj…";
  const notifLabel        = lang === "UA" ? "Сповіщення"           : "Powiadomienia";
  const noNotifText       = lang === "UA" ? "Немає сповіщень"      : "Brak powiadomień";
  const unreadText        = (n: number) =>
    lang === "UA" ? `${n} непрочитаних` : `${n} nieprzeczytanych`;

  return (
    <header className="h-16 border-b border-white/8 flex items-center gap-4 px-5 sticky top-0 z-30"
      style={{ background: "rgba(10,10,16,0.95)", backdropFilter: "blur(12px)" }}>

      {/* Mobile hamburger */}
      {onMenuToggle && (
        <button type="button" onClick={onMenuToggle}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-fg-muted hover:text-fg transition-all flex-shrink-0"
          aria-label={lang === "UA" ? "Відкрити меню" : "Otwórz menu"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      )}

      {/* Search */}
      <div className="flex-1 max-w-xs hidden md:block">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 transition-colors" />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Language toggle — wired to DashLangProvider context */}
        <div className="flex items-center rounded-lg overflow-hidden border border-white/10"
          role="group" aria-label={lang === "UA" ? "Вибір мови" : "Wybór języka"}>
          <Globe className="mx-1.5 h-3 w-3 text-fg-faint" aria-hidden />
          {(["PL", "UA"] as const).map(l => (
            <button key={l} type="button" onClick={() => setLang(l)}
              className={`px-2.5 py-1.5 text-xs font-bold transition-all ${
                lang === l ? "" : "text-fg-faint hover:text-fg"
              }`}
              style={lang === l ? { background: "rgba(91,140,255,0.2)", color: "#5B8CFF" } : {}}
              aria-pressed={lang === l}
              aria-label={`Język ${l}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button type="button" onClick={() => setNotifOpen(o => !o)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-fg-muted hover:text-fg hover:border-white/25 transition-all"
            aria-label={`${notifLabel}${unread ? ` — ${unreadText(unread)}` : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center text-ink"
                style={{ background: "#FF6B6B" }}>
                {unread}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-11 w-80 z-20 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                style={{ background: "#0E0F17" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                  <p className="text-sm font-bold text-fg">{notifLabel}</p>
                  {unread > 0 && <span className="text-xs text-fg-faint">{unreadText(unread)}</span>}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-white/6">
                  {alerts.length === 0 ? (
                    <p className="p-4 text-sm text-fg-muted text-center">{noNotifText}</p>
                  ) : alerts.map(a => (
                    <div key={a.id} className={`px-4 py-3 transition-colors hover:bg-white/4 ${!a.read ? "bg-white/3" : ""}`}>
                      <p className="text-xs font-semibold text-fg">{a.title}</p>
                      <p className="text-xs text-fg-muted mt-0.5 line-clamp-2">{a.body}</p>
                      {a.action && (
                        <Link href={a.action.href} onClick={() => setNotifOpen(false)}
                          className="text-xs text-accent mt-1 inline-block hover:underline">
                          {a.action.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #5B8CFF, #8A5CFF)" }}>
          {userName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()}
        </div>
      </div>
    </header>
  );
}
