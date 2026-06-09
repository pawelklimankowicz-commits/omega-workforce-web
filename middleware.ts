/**
 * Next.js middleware — ochrona tras dashboardu.
 *
 * BEZPIECZEŃSTWO:
 * - Każde żądanie do /dashboard/* przechodzi przez ten plik.
 * - Sprawdzamy ważność sesji i rolę użytkownika.
 * - Firma nie może wejść do panelu pracownika i odwrotnie.
 * - Wygasłe sesje → usunięcie cookie + redirect na /login.
 */

import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "omega_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Ochrona tras dashboard ────────────────────────────────────────────────
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get(COOKIE_NAME);

    // Brak sesji → login
    if (!sessionCookie?.value) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    // Dekodowanie i walidacja sesji
    let session: { role: string; expiresAt: number } | null = null;
    try {
      const raw = Buffer.from(sessionCookie.value, "base64url").toString("utf-8");
      session = JSON.parse(raw);
    } catch {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    // Wygasła sesja
    if (!session || session.expiresAt < Date.now()) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    // RBAC — cross-role access prevention
    if (pathname.startsWith("/dashboard/firma") && session.role === "pracownik") {
      return NextResponse.redirect(new URL("/dashboard/pracownik", request.url));
    }
    if (pathname.startsWith("/dashboard/pracownik") && session.role === "firma") {
      return NextResponse.redirect(new URL("/dashboard/firma", request.url));
    }
  }

  // ── Redirect zalogowanego użytkownika z /login ────────────────────────────
  if (pathname === "/login") {
    const sessionCookie = request.cookies.get(COOKIE_NAME);
    if (sessionCookie?.value) {
      try {
        const raw   = Buffer.from(sessionCookie.value, "base64url").toString("utf-8");
        const s     = JSON.parse(raw);
        if (s.expiresAt > Date.now()) {
          return NextResponse.redirect(
            new URL(`/dashboard/${s.role === "admin" ? "firma" : s.role}`, request.url)
          );
        }
      } catch { /* ignoruj */ }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
