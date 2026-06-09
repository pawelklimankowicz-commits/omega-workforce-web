/**
 * Omega Workforce — typy platformy operacyjnej.
 * Walidacja JSON po stronie API nie jest tu — to czyste typy TS.
 */

// ─── Role i sesja ─────────────────────────────────────────────────────────────

export type UserRole = "admin" | "firma" | "pracownik";

export interface Session {
  userId:    string;
  role:      UserRole;
  name:      string;
  email:     string;
  avatar?:   string;
  companyId?: string;       // only for role=firma
  workerId?:  string;       // only for role=pracownik
  lang:       "pl" | "uk";
  expiresAt:  number;
  mfaVerified: boolean;
}

// ─── Pracownik ────────────────────────────────────────────────────────────────

export type WorkerStatus     = "aktywny" | "urlop" | "zawieszony" | "zakończony";
export type ContractType     = "umowa_o_prace" | "umowa_zlecenie" | "b2b" | "umowa_o_dzielo";
export type Nationality      = "PL" | "UA" | "other";
export type DocumentStatus   = "kompletne" | "niekompletne" | "wygasające";

export interface Worker {
  id:               string;
  firstName:        string;
  lastName:         string;
  email:            string;
  phone:            string;
  position:         string;
  department:       string;
  contractType:     ContractType;
  startDate:        string;   // ISO
  endDate?:         string;
  status:           WorkerStatus;
  nationality:      Nationality;
  hourlyRate:       number;   // PLN
  currentMonthHours: number;
  documentsStatus:  DocumentStatus;
  avatarInitials:   string;
}

// ─── Timesheety ───────────────────────────────────────────────────────────────

export type TimesheetStatus  = "oczekuje" | "zatwierdzono" | "odrzucono";
export type HourType         = "normalny" | "nadgodziny" | "nocny" | "świąteczny";

export interface TimesheetEntry {
  id:          string;
  workerId:    string;
  workerName:  string;
  date:        string;
  hours:       number;
  overtime:    number;
  type:        HourType;
  status:      TimesheetStatus;
  project?:    string;
  note?:       string;
}

export interface TimesheetWeek {
  weekLabel:   string;   // "24 cze – 30 cze 2025"
  workerId:    string;
  workerName:  string;
  entries:     TimesheetEntry[];
  totalHours:  number;
  totalOvertime: number;
  status:      TimesheetStatus;
}

// ─── Faktury i płatności ──────────────────────────────────────────────────────

export type InvoiceStatus = "wystawiona" | "opłacona" | "zaległa" | "w_trakcie";

export interface InvoiceBreakdown {
  baseSalaries:        number;
  overtime:            number;
  nightShift:          number;
  agencyFee:           number;
  socialContributions: number;
  additions:           number;
}

export interface Invoice {
  id:          string;
  number:      string;
  issueDate:   string;
  dueDate:     string;
  period:      string;   // "2025-06"
  netAmount:   number;
  vatAmount:   number;
  grossAmount: number;
  status:      InvoiceStatus;
  breakdown:   InvoiceBreakdown;
  downloadUrl: string;
}

// ─── Paski płacowe i wypłaty (pracownik) ──────────────────────────────────────

export type PayslipStatus = "wypłacono" | "oczekuje" | "w_trakcie";

export interface PayslipDeductions {
  incomeTax:         number;
  socialInsurance:   number;
  healthInsurance:   number;
  pensionContrib:    number;
}

export interface PayslipAdditions {
  overtime:          number;
  nightShift:        number;
  holiday:           number;
}

export interface Payslip {
  id:           string;
  period:       string;   // "2025-06"
  grossAmount:  number;
  netAmount:    number;
  deductions:   PayslipDeductions;
  additions:    PayslipAdditions;
  advance:      number;
  hoursWorked:  number;
  overtimeHours: number;
  status:       PayslipStatus;
  paymentDate?: string;
  downloadUrl:  string;
}

// ─── Dokumenty ────────────────────────────────────────────────────────────────

export type DocumentType   = "umowa" | "pasek" | "zaswiadczenie" | "rodo" | "inne";
export type DocumentStatus2 = "aktywny" | "wygasający" | "wygasły";

export interface Document {
  id:          string;
  type:        DocumentType;
  name:        string;
  uploadedAt:  string;
  expiresAt?:  string;
  status:      DocumentStatus2;
  size:        string;   // "1.2 MB"
  downloadUrl: string;
}

// ─── Godziny pracownika ───────────────────────────────────────────────────────

export interface DayLog {
  date:       string;
  hours:      number;
  overtime:   number;
  type:       HourType;
  project?:   string;
}

export interface WeekSummary {
  weekLabel:  string;
  days:       DayLog[];
  total:      number;
  overtime:   number;
}

// ─── Wnioski ──────────────────────────────────────────────────────────────────

export type RequestStatus = "oczekuje" | "rozpatrzono" | "odrzucono";
export type RequestType   = "korekta_godzin" | "zaliczka" | "urlop" | "inne";

export interface WorkerRequest {
  id:          string;
  type:        RequestType;
  date:        string;
  description: string;
  status:      RequestStatus;
  resolvedAt?: string;
  note?:       string;
}

// ─── KPI / metryki ────────────────────────────────────────────────────────────

export interface KpiMetric {
  label:    string;
  value:    string | number;
  change?:  number;          // % change vs previous period
  trend?:   "up" | "down" | "neutral";
  format?:  "currency" | "number" | "percent" | "days";
  color?:   "accent" | "signal" | "amber" | "red";
}

// ─── Alert / powiadomienie ────────────────────────────────────────────────────

export type AlertSeverity = "info" | "warning" | "error" | "success";

export interface Alert {
  id:       string;
  severity: AlertSeverity;
  title:    string;
  body:     string;
  date:     string;
  read:     boolean;
  action?:  { label: string; href: string };
}

// ─── Audit log ────────────────────────────────────────────────────────────────

export type AuditAction =
  | "login" | "logout" | "view_invoice" | "download_document"
  | "approve_timesheet" | "reject_timesheet" | "submit_request"
  | "view_payslip" | "export_report";

export interface AuditEntry {
  id:       string;
  userId:   string;
  action:   AuditAction;
  target?:  string;
  ip:       string;
  ts:       string;   // ISO timestamp
}
