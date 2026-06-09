import type { ReactNode } from "react";

interface Props {
  title:       string;
  subtitle?:   string;
  actions?:    ReactNode;
  badge?:      { label: string; color?: string };
}

export function PageHeader({ title, subtitle, actions, badge }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-fg">{title}</h1>
          {badge && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(91,140,255,0.15)", color: badge.color ?? "#5B8CFF" }}>
              {badge.label}
            </span>
          )}
        </div>
        {subtitle && <p className="text-fg-muted text-sm">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
