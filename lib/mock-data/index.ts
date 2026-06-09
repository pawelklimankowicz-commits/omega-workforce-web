/**
 * Mock data — Omega Workforce platform.
 * Zamień na wywołania API / Supabase / Prisma w produkcji.
 * Wszystkie dane fikcyjne — do celów demo i testów.
 */

import type {
  Worker, TimesheetWeek, Invoice, Payslip,
  Document, WeekSummary, Alert, WorkerRequest, KpiMetric,
} from "../types/dashboard";

// ─── Pracownicy (widok firmy) ─────────────────────────────────────────────────

export const WORKERS: Worker[] = [
  {
    id: "wkr_001", firstName: "Dmytro",  lastName: "Kovalenko",
    email: "d.kovalenko@omega.pl", phone: "+48 500 111 222",
    position: "Operator CNC", department: "Produkcja",
    contractType: "umowa_zlecenie", startDate: "2024-03-01",
    status: "aktywny", nationality: "UA", hourlyRate: 30,
    currentMonthHours: 172, documentsStatus: "kompletne",
    avatarInitials: "DK",
  },
  {
    id: "wkr_002", firstName: "Olena",   lastName: "Shevchenko",
    email: "o.shevchenko@omega.pl", phone: "+48 500 222 333",
    position: "Spawacz MIG/TIG", department: "Produkcja",
    contractType: "umowa_zlecenie", startDate: "2024-01-15",
    status: "aktywny", nationality: "UA", hourlyRate: 35,
    currentMonthHours: 168, documentsStatus: "kompletne",
    avatarInitials: "OS",
  },
  {
    id: "wkr_003", firstName: "Vasyl",   lastName: "Petrenko",
    email: "v.petrenko@omega.pl", phone: "+48 500 333 444",
    position: "Magazynier", department: "Logistyka",
    contractType: "umowa_o_prace", startDate: "2023-09-01",
    status: "aktywny", nationality: "UA", hourlyRate: 26,
    currentMonthHours: 160, documentsStatus: "wygasające",
    avatarInitials: "VP",
  },
  {
    id: "wkr_004", firstName: "Iryna",   lastName: "Bondarenko",
    email: "i.bondarenko@omega.pl", phone: "+48 500 444 555",
    position: "Kontroler jakości", department: "Jakość",
    contractType: "umowa_zlecenie", startDate: "2024-06-01",
    status: "aktywny", nationality: "UA", hourlyRate: 28,
    currentMonthHours: 164, documentsStatus: "kompletne",
    avatarInitials: "IB",
  },
  {
    id: "wkr_005", firstName: "Mykola",  lastName: "Sydorenko",
    email: "m.sydorenko@omega.pl", phone: "+48 500 555 666",
    position: "Tokarz", department: "Produkcja",
    contractType: "umowa_zlecenie", startDate: "2024-04-10",
    status: "urlop", nationality: "UA", hourlyRate: 32,
    currentMonthHours: 80, documentsStatus: "kompletne",
    avatarInitials: "MS",
  },
  {
    id: "wkr_006", firstName: "Andriy",  lastName: "Lysenko",
    email: "a.lysenko@omega.pl", phone: "+48 500 666 777",
    position: "Kierowca wózka widłowego", department: "Logistyka",
    contractType: "umowa_o_prace", startDate: "2023-11-01",
    status: "aktywny", nationality: "UA", hourlyRate: 27,
    currentMonthHours: 176, documentsStatus: "niekompletne",
    avatarInitials: "AL",
  },
  {
    id: "wkr_007", firstName: "Natalia", lastName: "Kravchenko",
    email: "n.kravchenko@omega.pl", phone: "+48 500 777 888",
    position: "Pracownik linii montażowej", department: "Produkcja",
    contractType: "umowa_zlecenie", startDate: "2024-05-15",
    status: "aktywny", nationality: "UA", hourlyRate: 24,
    currentMonthHours: 168, documentsStatus: "kompletne",
    avatarInitials: "NK",
  },
  {
    id: "wkr_008", firstName: "Serhiy",  lastName: "Marchenko",
    email: "s.marchenko@omega.pl", phone: "+48 500 888 999",
    position: "Elektryk przemysłowy", department: "Utrzymanie ruchu",
    contractType: "umowa_zlecenie", startDate: "2024-02-01",
    status: "aktywny", nationality: "UA", hourlyRate: 38,
    currentMonthHours: 170, documentsStatus: "kompletne",
    avatarInitials: "SM",
  },
];

// ─── KPI firmy ────────────────────────────────────────────────────────────────

export const FIRMA_KPI: KpiMetric[] = [
  { label: "Aktywni pracownicy",   value: 8,            change: +2,   trend: "up",    format: "number",   color: "signal"  },
  { label: "Koszt miesięczny",     value: "62 400 zł",  change: -3.2, trend: "down",  format: "currency", color: "accent"  },
  { label: "Zatwierdzone godziny", value: "1 318h",     change: +5.1, trend: "up",    format: "number",   color: "accent"  },
  { label: "Niezatwierdzone",      value: 3,            change: 0,    trend: "neutral",format: "number",  color: "amber"   },
  { label: "Faktury do opłacenia", value: "2",          change: 0,    trend: "neutral",format: "number",  color: "amber"   },
  { label: "Wygasające dokumenty", value: "2 osoby",    change: 0,    trend: "neutral",format: "number",  color: "amber"   },
];

// ─── Timesheety ───────────────────────────────────────────────────────────────

export const TIMESHEETS: TimesheetWeek[] = [
  {
    weekLabel: "2–8 cze 2025",
    workerId: "wkr_001", workerName: "Dmytro Kovalenko",
    totalHours: 44, totalOvertime: 4,
    status: "oczekuje",
    entries: [
      { id: "ts_001", workerId: "wkr_001", workerName: "Dmytro Kovalenko", date: "2025-06-02", hours: 8, overtime: 0, type: "normalny", status: "oczekuje", project: "Linia A" },
      { id: "ts_002", workerId: "wkr_001", workerName: "Dmytro Kovalenko", date: "2025-06-03", hours: 10, overtime: 2, type: "nadgodziny", status: "oczekuje", project: "Linia A" },
      { id: "ts_003", workerId: "wkr_001", workerName: "Dmytro Kovalenko", date: "2025-06-04", hours: 8, overtime: 0, type: "normalny", status: "oczekuje", project: "Linia B" },
      { id: "ts_004", workerId: "wkr_001", workerName: "Dmytro Kovalenko", date: "2025-06-05", hours: 10, overtime: 2, type: "nadgodziny", status: "oczekuje", project: "Linia A" },
      { id: "ts_005", workerId: "wkr_001", workerName: "Dmytro Kovalenko", date: "2025-06-06", hours: 8, overtime: 0, type: "normalny", status: "oczekuje", project: "Linia A" },
    ],
  },
  {
    weekLabel: "2–8 cze 2025",
    workerId: "wkr_002", workerName: "Olena Shevchenko",
    totalHours: 42, totalOvertime: 2,
    status: "zatwierdzono",
    entries: [
      { id: "ts_006", workerId: "wkr_002", workerName: "Olena Shevchenko", date: "2025-06-02", hours: 8, overtime: 0, type: "normalny", status: "zatwierdzono", project: "Spawalnia" },
      { id: "ts_007", workerId: "wkr_002", workerName: "Olena Shevchenko", date: "2025-06-03", hours: 10, overtime: 2, type: "nadgodziny", status: "zatwierdzono", project: "Spawalnia" },
    ],
  },
  {
    weekLabel: "2–8 cze 2025",
    workerId: "wkr_003", workerName: "Vasyl Petrenko",
    totalHours: 40, totalOvertime: 0,
    status: "oczekuje",
    entries: [
      { id: "ts_008", workerId: "wkr_003", workerName: "Vasyl Petrenko", date: "2025-06-02", hours: 8, overtime: 0, type: "normalny", status: "oczekuje", project: "Magazyn C" },
    ],
  },
];

// ─── Faktury ──────────────────────────────────────────────────────────────────

export const INVOICES: Invoice[] = [
  {
    id: "inv_001", number: "FV/2025/06/001",
    issueDate: "2025-06-01", dueDate: "2025-06-15", period: "2025-05",
    netAmount: 58_400, vatAmount: 13_432, grossAmount: 71_832,
    status: "opłacona",
    breakdown: { baseSalaries: 44_800, overtime: 3_200, nightShift: 1_400, agencyFee: 7_200, socialContributions: 0, additions: 1_800 },
    downloadUrl: "#",
  },
  {
    id: "inv_002", number: "FV/2025/07/001",
    issueDate: "2025-07-01", dueDate: "2025-07-15", period: "2025-06",
    netAmount: 62_400, vatAmount: 14_352, grossAmount: 76_752,
    status: "w_trakcie",
    breakdown: { baseSalaries: 47_200, overtime: 4_800, nightShift: 1_200, agencyFee: 7_680, socialContributions: 0, additions: 1_520 },
    downloadUrl: "#",
  },
  {
    id: "inv_003", number: "FV/2025/05/001",
    issueDate: "2025-05-01", dueDate: "2025-05-15", period: "2025-04",
    netAmount: 55_600, vatAmount: 12_788, grossAmount: 68_388,
    status: "zaległa",
    breakdown: { baseSalaries: 42_400, overtime: 2_400, nightShift: 1_600, agencyFee: 6_840, socialContributions: 0, additions: 2_360 },
    downloadUrl: "#",
  },
];

// ─── KPI pracownika ───────────────────────────────────────────────────────────

export const PRACOWNIK_KPI: KpiMetric[] = [
  { label: "Wynagrodzenie netto",  value: "4 820 zł",  change: +2.1, trend: "up",      format: "currency", color: "signal"  },
  { label: "Przepracowane godz.",  value: "172h",      change: +4,   trend: "up",      format: "number",   color: "accent"  },
  { label: "Nadgodziny",           value: "12h",       change: -2,   trend: "down",    format: "number",   color: "amber"   },
  { label: "Status rozliczenia",   value: "Rozliczono", change: 0,   trend: "neutral", format: "number",   color: "signal"  },
];

// ─── Paski płacowe pracownika ─────────────────────────────────────────────────

export const PAYSLIPS: Payslip[] = [
  {
    id: "pay_001", period: "2025-06",
    grossAmount: 6_480, netAmount: 4_820,
    deductions: { incomeTax: 584, socialInsurance: 624, healthInsurance: 310, pensionContrib: 142 },
    additions: { overtime: 360, nightShift: 120, holiday: 0 },
    advance: 500, hoursWorked: 172, overtimeHours: 12,
    status: "oczekuje", downloadUrl: "#",
  },
  {
    id: "pay_002", period: "2025-05",
    grossAmount: 6_240, netAmount: 4_643,
    deductions: { incomeTax: 562, socialInsurance: 600, healthInsurance: 299, pensionContrib: 136 },
    additions: { overtime: 240, nightShift: 0, holiday: 0 },
    advance: 0, hoursWorked: 168, overtimeHours: 8,
    status: "wypłacono", paymentDate: "2025-05-28", downloadUrl: "#",
  },
  {
    id: "pay_003", period: "2025-04",
    grossAmount: 6_120, netAmount: 4_560,
    deductions: { incomeTax: 549, socialInsurance: 589, healthInsurance: 293, pensionContrib: 129 },
    additions: { overtime: 120, nightShift: 0, holiday: 0 },
    advance: 0, hoursWorked: 160, overtimeHours: 4,
    status: "wypłacono", paymentDate: "2025-04-29", downloadUrl: "#",
  },
  {
    id: "pay_004", period: "2025-03",
    grossAmount: 6_000, netAmount: 4_470,
    deductions: { incomeTax: 538, socialInsurance: 578, healthInsurance: 288, pensionContrib: 126 },
    additions: { overtime: 0, nightShift: 0, holiday: 0 },
    advance: 0, hoursWorked: 160, overtimeHours: 0,
    status: "wypłacono", paymentDate: "2025-03-28", downloadUrl: "#",
  },
];

// ─── Godziny pracownika (bieżący miesiąc) ────────────────────────────────────

export const WORKER_WEEKS: WeekSummary[] = [
  {
    weekLabel: "2–8 cze 2025", total: 44, overtime: 4,
    days: [
      { date: "2025-06-02", hours: 8,  overtime: 0, type: "normalny",   project: "Linia A" },
      { date: "2025-06-03", hours: 10, overtime: 2, type: "nadgodziny", project: "Linia A" },
      { date: "2025-06-04", hours: 8,  overtime: 0, type: "normalny",   project: "Linia B" },
      { date: "2025-06-05", hours: 10, overtime: 2, type: "nadgodziny", project: "Linia A" },
      { date: "2025-06-06", hours: 8,  overtime: 0, type: "normalny",   project: "Linia A" },
    ],
  },
  {
    weekLabel: "26 maj – 1 cze 2025", total: 40, overtime: 0,
    days: [
      { date: "2025-05-26", hours: 8, overtime: 0, type: "normalny", project: "Linia A" },
      { date: "2025-05-27", hours: 8, overtime: 0, type: "normalny", project: "Linia B" },
      { date: "2025-05-28", hours: 8, overtime: 0, type: "normalny", project: "Linia A" },
      { date: "2025-05-29", hours: 8, overtime: 0, type: "normalny", project: "Linia A" },
      { date: "2025-05-30", hours: 8, overtime: 0, type: "normalny", project: "Linia A" },
    ],
  },
];

// ─── Dokumenty pracownika ─────────────────────────────────────────────────────

export const WORKER_DOCUMENTS: Document[] = [
  {
    id: "doc_001", type: "umowa", name: "Umowa zlecenia 2025",
    uploadedAt: "2025-01-03", expiresAt: "2025-12-31",
    status: "aktywny", size: "0.8 MB", downloadUrl: "#",
  },
  {
    id: "doc_002", type: "pasek", name: "Pasek płacowy — czerwiec 2025",
    uploadedAt: "2025-06-28",
    status: "aktywny", size: "0.2 MB", downloadUrl: "#",
  },
  {
    id: "doc_003", type: "pasek", name: "Pasek płacowy — maj 2025",
    uploadedAt: "2025-05-29",
    status: "aktywny", size: "0.2 MB", downloadUrl: "#",
  },
  {
    id: "doc_004", type: "rodo", name: "Klauzula RODO",
    uploadedAt: "2025-01-03",
    status: "aktywny", size: "0.1 MB", downloadUrl: "#",
  },
  {
    id: "doc_005", type: "zaswiadczenie", name: "Zaświadczenie o zatrudnieniu",
    uploadedAt: "2025-04-10", expiresAt: "2025-09-30",
    status: "wygasający", size: "0.3 MB", downloadUrl: "#",
  },
];

// ─── Wnioski pracownika ───────────────────────────────────────────────────────

export const WORKER_REQUESTS: WorkerRequest[] = [
  {
    id: "req_001", type: "korekta_godzin", date: "2025-06-05",
    description: "Proszę o korektę godzin — wpisano 8h, faktycznie przepracowałem 10h.",
    status: "rozpatrzono", resolvedAt: "2025-06-07", note: "Korekta zatwierdzona.",
  },
  {
    id: "req_002", type: "zaliczka", date: "2025-05-20",
    description: "Prośba o zaliczkę 500 zł na poczet wynagrodzenia za maj.",
    status: "rozpatrzono", resolvedAt: "2025-05-21", note: "Zaliczka przelana.",
  },
  {
    id: "req_003", type: "urlop", date: "2025-06-10",
    description: "Wniosek o urlop 14–18 lipca 2025.",
    status: "oczekuje",
  },
];

// ─── Alerty firmy ─────────────────────────────────────────────────────────────

export const FIRMA_ALERTS: Alert[] = [
  {
    id: "alert_001", severity: "warning", read: false,
    date: "2025-06-08",
    title: "Wygasające dokumenty",
    body: "Vasyl Petrenko — karta pobytu wygasa za 23 dni (30.06.2025).",
    action: { label: "Sprawdź dokumenty", href: "/dashboard/firma/pracownicy/wkr_003" },
  },
  {
    id: "alert_002", severity: "warning", read: false,
    date: "2025-06-08",
    title: "Niekompletne dokumenty",
    body: "Andriy Lysenko — brak aktualnego badania lekarskiego.",
    action: { label: "Uzupełnij", href: "/dashboard/firma/pracownicy/wkr_006" },
  },
  {
    id: "alert_003", severity: "error", read: false,
    date: "2025-06-01",
    title: "Faktura zaległa",
    body: "FV/2025/05/001 — zaległa płatność 68 388 zł. Termin minął 15 maja.",
    action: { label: "Przejdź do faktury", href: "/dashboard/firma/faktury" },
  },
  {
    id: "alert_004", severity: "info", read: true,
    date: "2025-06-05",
    title: "Timesheety do zatwierdzenia",
    body: "3 timesheety czekają na Twoje zatwierdzenie za tydzień 2–8 cze.",
    action: { label: "Zatwierdź", href: "/dashboard/firma/godziny" },
  },
];

// ─── Alerty pracownika ────────────────────────────────────────────────────────

export const PRACOWNIK_ALERTS: Alert[] = [
  {
    id: "palert_001", severity: "info", read: false,
    date: "2025-06-08",
    title: "Wypłata w toku",
    body: "Rozliczenie za czerwiec 2025 jest w trakcie przygotowania. Spodziewana data: 28 cze.",
  },
  {
    id: "palert_002", severity: "warning", read: false,
    date: "2025-06-05",
    title: "Zaświadczenie o zatrudnieniu wygasa",
    body: "Twoje zaświadczenie o zatrudnieniu wygaśnie za 114 dni (30.09.2025).",
    action: { label: "Pobierz nowe", href: "/dashboard/pracownik/dokumenty" },
  },
];

// ─── Formatowanie ─────────────────────────────────────────────────────────────

export function formatPLN(amount: number): string {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", { day: "2-digit", month: "short", year: "numeric" });
}

export function periodLabel(period: string): string {
  const [year, month] = period.split("-");
  const months = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
  return `${months[parseInt(month) - 1]} ${year}`;
}
