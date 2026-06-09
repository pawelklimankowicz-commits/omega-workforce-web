"use client";

import { useState } from "react";
import type { Alert, AlertSeverity } from "@/lib/types/dashboard";
import Link from "next/link";

const SEV: Record<AlertSeverity, { bg: string; border: string; icon: string; iconColor: string }> = {
  error:   { bg: "rgba(255,107,107,0.08)", border: "rgba(255,107,107,0.25)", icon: "⚠", iconColor: "#FF6B6B" },
  warning: { bg: "rgba(255,180,84,0.08)",  border: "rgba(255,180,84,0.25)",  icon: "!", iconColor: "#FFB454" },
  info:    { bg: "rgba(91,140,255,0.08)",  border: "rgba(91,140,255,0.25)",  icon: "i", iconColor: "#5B8CFF" },
  success: { bg: "rgba(52,211,154,0.08)",  border: "rgba(52,211,154,0.25)",  icon: "✓", iconColor: "#34D39A" },
};

interface SingleProps { alert: Alert; onDismiss?: (id: string) => void }

export function AlertItem({ alert, onDismiss }: SingleProps) {
  const s = SEV[alert.severity];
  return (
    <div className="flex items-start gap-3 rounded-xl p-4 text-sm"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black mt-0.5"
        style={{ background: s.border, color: s.iconColor }}>
        {s.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-fg mb-0.5">{alert.title}</p>
        <p className="text-fg-muted text-xs leading-relaxed">{alert.body}</p>
        {alert.action && (
          <Link href={alert.action.href}
            className="inline-block mt-2 text-xs font-semibold underline decoration-dotted"
            style={{ color: s.iconColor }}>
            {alert.action.label} →
          </Link>
        )}
      </div>
      {onDismiss && (
        <button type="button" onClick={() => onDismiss(alert.id)}
          className="flex-shrink-0 text-fg-faint hover:text-fg transition-colors p-0.5"
          aria-label="Zamknij">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

interface ListProps { alerts: Alert[] }

export function AlertList({ alerts: initial }: ListProps) {
  const [list, setList] = useState(initial);
  if (list.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {list.map(a => (
        <AlertItem key={a.id} alert={a} onDismiss={id => setList(l => l.filter(x => x.id !== id))} />
      ))}
    </div>
  );
}
