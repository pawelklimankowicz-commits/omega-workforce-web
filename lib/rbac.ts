/**
 * Omega Workforce — Role-Based Access Control.
 *
 * Zasada least-privilege: domyślnie brak dostępu, uprawnienia trzeba jawnie nadać.
 * W produkcji przenieś permissionsMatrix do bazy danych lub external policy store.
 */

import type { UserRole } from "./types/dashboard";

// ─── Definicja uprawnień ──────────────────────────────────────────────────────

export type Permission =
  // Widok pracownicy
  | "workers:read:all"        // lista wszystkich pracowników
  | "workers:read:own"        // tylko własny profil
  | "workers:write"           // edycja danych pracownika

  // Timesheety
  | "timesheets:read:all"     // wszystkie timesheety firmy
  | "timesheets:read:own"     // własne timesheety
  | "timesheets:approve"      // zatwierdzanie/odrzucanie
  | "timesheets:correct"      // wniosek o korektę

  // Faktury i finanse firmy
  | "invoices:read"
  | "invoices:download"

  // Wypłaty pracownika
  | "payslips:read:own"
  | "payslips:download:own"

  // Dokumenty
  | "documents:read:all"
  | "documents:read:own"
  | "documents:upload"

  // Raporty
  | "reports:read"
  | "reports:export"

  // Wnioski
  | "requests:create"
  | "requests:read:all"
  | "requests:resolve"

  // Wiadomości
  | "messages:read:own"
  | "messages:send"

  // Ustawienia
  | "settings:read:own"
  | "settings:read:all"
  | "settings:write:own"

  // Audit log
  | "audit:read";

// ─── Macierz uprawnień ────────────────────────────────────────────────────────

const PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "workers:read:all", "workers:read:own", "workers:write",
    "timesheets:read:all", "timesheets:read:own", "timesheets:approve", "timesheets:correct",
    "invoices:read", "invoices:download",
    "payslips:read:own", "payslips:download:own",
    "documents:read:all", "documents:read:own", "documents:upload",
    "reports:read", "reports:export",
    "requests:create", "requests:read:all", "requests:resolve",
    "messages:read:own", "messages:send",
    "settings:read:own", "settings:read:all", "settings:write:own",
    "audit:read",
  ],
  firma: [
    "workers:read:all",
    "timesheets:read:all", "timesheets:approve",
    "invoices:read", "invoices:download",
    "documents:read:all",
    "reports:read", "reports:export",
    "requests:read:all", "requests:resolve",
    "messages:read:own", "messages:send",
    "settings:read:own", "settings:write:own",
  ],
  pracownik: [
    "workers:read:own",
    "timesheets:read:own", "timesheets:correct",
    "payslips:read:own", "payslips:download:own",
    "documents:read:own",
    "requests:create", "messages:read:own", "messages:send",
    "settings:read:own", "settings:write:own",
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function can(role: UserRole, permission: Permission): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canAll(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => can(role, p));
}

export function canAny(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => can(role, p));
}

/** Uprawnienia dla roli (do przekazania do client components) */
export function getPermissions(role: UserRole): Permission[] {
  return PERMISSIONS[role] ?? [];
}

/** Route guards — mapa ścieżek do wymaganych uprawnień */
export const ROUTE_GUARDS: Record<string, Permission[]> = {
  "/dashboard/firma":                   ["timesheets:read:all"],
  "/dashboard/firma/pracownicy":        ["workers:read:all"],
  "/dashboard/firma/godziny":           ["timesheets:read:all"],
  "/dashboard/firma/faktury":           ["invoices:read"],
  "/dashboard/firma/raporty":           ["reports:read"],
  "/dashboard/firma/dokumenty":         ["documents:read:all"],
  "/dashboard/pracownik":               ["payslips:read:own"],
  "/dashboard/pracownik/godziny":       ["timesheets:read:own"],
  "/dashboard/pracownik/wyplaty":       ["payslips:read:own"],
  "/dashboard/pracownik/dokumenty":     ["documents:read:own"],
  "/dashboard/pracownik/wnioski":       ["requests:create"],
  "/dashboard/pracownik/wiadomosci":    ["messages:read:own"],
};
