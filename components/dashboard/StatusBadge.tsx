import type { WorkerStatus, TimesheetStatus, InvoiceStatus, PayslipStatus, DocumentStatus2, AlertSeverity } from "@/lib/types/dashboard";

type AnyStatus = WorkerStatus | TimesheetStatus | InvoiceStatus | PayslipStatus | DocumentStatus2 | AlertSeverity | string;

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; dot?: string }> = {
  // Worker
  aktywny:        { label: "Aktywny",       bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  urlop:          { label: "Urlop",         bg: "rgba(255,180,84,0.12)",  color: "#FFB454" },
  zawieszony:     { label: "Zawieszony",    bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  zakończony:     { label: "Zakończony",    bg: "rgba(92,96,112,0.15)",   color: "#9CA0AD" },
  // Timesheet
  oczekuje:       { label: "Oczekuje",      bg: "rgba(255,180,84,0.12)",  color: "#FFB454" },
  zatwierdzono:   { label: "Zatwierdzono",  bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  odrzucono:      { label: "Odrzucono",     bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  // Invoice
  wystawiona:     { label: "Wystawiona",    bg: "rgba(91,140,255,0.12)",  color: "#5B8CFF" },
  opłacona:       { label: "Opłacona",      bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  zaległa:        { label: "Zaległa",       bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  w_trakcie:      { label: "W trakcie",     bg: "rgba(91,140,255,0.12)",  color: "#5B8CFF" },
  // Documents
  "aktywny-doc":  { label: "Aktywny",       bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  wygasający:     { label: "Wygasający",    bg: "rgba(255,180,84,0.12)",  color: "#FFB454" },
  wygasły:        { label: "Wygasły",       bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  // Payslip
  wypłacono:      { label: "Wypłacono",     bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  // Doc status
  kompletne:      { label: "Kompletne",     bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  niekompletne:   { label: "Niekompletne",  bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  // Alert severity
  info:           { label: "Info",          bg: "rgba(91,140,255,0.12)",  color: "#5B8CFF" },
  warning:        { label: "Uwaga",         bg: "rgba(255,180,84,0.12)",  color: "#FFB454" },
  error:          { label: "Błąd",          bg: "rgba(255,100,100,0.12)", color: "#FF6B6B" },
  success:        { label: "OK",            bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
  // rozpatrzono
  rozpatrzono:    { label: "Rozpatrzono",   bg: "rgba(52,211,154,0.12)",  color: "#34D39A" },
};

interface Props {
  status: AnyStatus;
  size?: "sm" | "md";
  withDot?: boolean;
  /** Nadpisuje domyślny label */
  label?: string;
}

export function StatusBadge({ status, size = "md", withDot, label }: Props) {
  const cfg = STATUS_CONFIG[status] ?? {
    label: status, bg: "rgba(92,96,112,0.15)", color: "#9CA0AD",
  };

  const text   = label ?? cfg.label;
  const px     = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${px} rounded-full font-semibold whitespace-nowrap`}
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {withDot && (
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      )}
      {text}
    </span>
  );
}
