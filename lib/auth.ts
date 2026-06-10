/**
 * Omega Workforce — zarządzanie sesją.
 *
 * Aktualnie: cookie-based mock (base64 JSON).
 * Produkcja: zamień na Clerk lub NextAuth.js.
 *   - Clerk:    import { currentUser } from "@clerk/nextjs/server"
 *   - NextAuth: import { getServerSession } from "next-auth"
 *
 * BEZPIECZEŃSTWO:
 *   - cookie httpOnly + Secure + SameSite=lax
 *   - TTL 8h, wygaszany po stronie middleware
 *   - W produkcji podpisz token kluczem (JWT z secretem lub Clerk)
 */

import { cookies } from "next/headers";
import type { Session, UserRole } from "./types/dashboard";
export { MOCK_USERS } from "./mock-users";

const COOKIE_NAME = "omega_session";
const TTL_MS      = 8 * 60 * 60 * 1000; // 8 godzin

// ─── Tworzenie sesji ──────────────────────────────────────────────────────────

export function createSessionToken(session: Omit<Session, "expiresAt">): string {
  const full: Session = {
    ...session,
    expiresAt: Date.now() + TTL_MS,
  };
  return Buffer.from(JSON.stringify(full)).toString("base64url");
}

export function setSessionCookie(token: string): void {
  cookies().set(COOKIE_NAME, token, {
    httpOnly:  true,
    secure:    process.env.NODE_ENV === "production",
    sameSite:  "lax",
    maxAge:    TTL_MS / 1000,
    path:      "/",
  });
}

// ─── Odczyt sesji (server-side) ───────────────────────────────────────────────

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const session = JSON.parse(raw) as Session;
    if (session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }
  return session;
}

export async function requireRole(allowed: UserRole[]): Promise<Session> {
  const session = await requireSession();
  if (!allowed.includes(session.role)) {
    throw new Error("FORBIDDEN");
  }
  return session;
}

// ─── Wylogowanie ──────────────────────────────────────────────────────────────

export function clearSession(): void {
  cookies().delete(COOKIE_NAME);
}
