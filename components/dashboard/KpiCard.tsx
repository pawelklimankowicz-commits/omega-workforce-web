import type { KpiMetric } from "@/lib/types/dashboard";

const COLOR_MAP = {
  accent:  { border: "#5B8CFF", glow: "rgba(91,140,255,0.15)", text: "#5B8CFF" },
  signal:  { border: "#34D39A", glow: "rgba(52,211,154,0.15)", text: "#34D39A" },
  amber:   { border: "#FFB454", glow: "rgba(255,180,84,0.15)", text: "#FFB454" },
  red:     { border: "#FF6B6B", glow: "rgba(255,107,107,0.15)", text: "#FF6B6B" },
} as const;

interface Props {
  metric: KpiMetric;
  className?: string;
}

export function KpiCard({ metric, className = "" }: Props) {
  const colKey = metric.color ?? "accent";
  const col    = COLOR_MAP[colKey];
  const hasChange = metric.change !== undefined && metric.change !== 0;
  const up     = (metric.change ?? 0) > 0;

  return (
    <div
      className={`relative rounded-2xl p-5 flex flex-col gap-2 ${className}`}
      style={{
        background: `linear-gradient(160deg, rgba(14,15,23,0.95), rgba(10,10,16,0.95))`,
        border: `1px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 0 0 1px transparent`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${col.border}80, transparent)` }} />

      {/* Metric label */}
      <p className="text-xs font-semibold text-fg-faint uppercase tracking-wider">
        {metric.label}
      </p>

      {/* Value */}
      <p className="text-2xl sm:text-3xl font-extrabold leading-none"
        style={{ color: "#F4F5F8" }}>
        {metric.value}
      </p>

      {/* Change indicator */}
      {hasChange && (
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center gap-0.5 text-xs font-bold ${up ? "text-signal" : "text-red-400"}`}>
            {up ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 4l8 8H4z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 20l8-8H4z" />
              </svg>
            )}
            {Math.abs(metric.change!)}
            {metric.format === "percent" || metric.change !== undefined ? "%" : ""}
          </span>
          <span className="text-xs text-fg-faint">vs. poprzedni okres</span>
        </div>
      )}
    </div>
  );
}

// ─── Grid wrapper ─────────────────────────────────────────────────────────────

interface KpiGridProps {
  metrics: KpiMetric[];
}

export function KpiGrid({ metrics }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {metrics.map(m => (
        <KpiCard key={m.label} metric={m} />
      ))}
    </div>
  );
}
