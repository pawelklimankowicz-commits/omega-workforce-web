"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/login/actions";
import type { UserRole } from "@/lib/types/dashboard";

// ─── Nav items ────────────────────────────────────────────────────────────────

type NavItem = { label: string; href: string; icon: React.ReactNode; badge?: number };

function IconGrid()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function IconUsers()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>; }
function IconClock()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function IconFile()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function IconChart()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>; }
function IconDocs()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>; }
function IconWallet() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>; }
function IconMail()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function IconRequest(){ return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function IconGear()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>; }

const NAV: Record<UserRole, NavItem[]> = {
  firma: [
    { label: "Dashboard",   href: "/dashboard/firma",             icon: <IconGrid /> },
    { label: "Pracownicy",  href: "/dashboard/firma/pracownicy",  icon: <IconUsers /> },
    { label: "Godziny",     href: "/dashboard/firma/godziny",     icon: <IconClock />, badge: 3 },
    { label: "Faktury",     href: "/dashboard/firma/faktury",     icon: <IconWallet /> },
    { label: "Raporty",     href: "/dashboard/firma/raporty",     icon: <IconChart /> },
    { label: "Dokumenty",   href: "/dashboard/firma/dokumenty",   icon: <IconDocs /> },
    { label: "Ustawienia",  href: "/dashboard/firma/ustawienia",  icon: <IconGear /> },
  ],
  pracownik: [
    { label: "Pulpit",       href: "/dashboard/pracownik",                icon: <IconGrid /> },
    { label: "Moje godziny", href: "/dashboard/pracownik/godziny",        icon: <IconClock /> },
    { label: "Wypłaty",      href: "/dashboard/pracownik/wyplaty",        icon: <IconWallet /> },
    { label: "Dokumenty",    href: "/dashboard/pracownik/dokumenty",      icon: <IconDocs /> },
    { label: "Wnioski",      href: "/dashboard/pracownik/wnioski",        icon: <IconRequest /> },
    { label: "Wiadomości",   href: "/dashboard/pracownik/wiadomosci",     icon: <IconMail />, badge: 1 },
    { label: "Ustawienia",   href: "/dashboard/pracownik/ustawienia",     icon: <IconGear /> },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/firma", icon: <IconGrid /> },
    { label: "Firma",     href: "/dashboard/firma/pracownicy", icon: <IconUsers /> },
  ],
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface Props {
  role:      UserRole;
  userName:  string;
  userEmail: string;
  onClose?:  () => void;
}

export function Sidebar({ role, userName, userEmail, onClose }: Props) {
  const pathname  = usePathname();
  const nav       = NAV[role] ?? [];
  const initials  = userName.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
  const accentCol = role === "pracownik" ? "#34D39A" : "#5B8CFF";

  const SidebarContent = () => (
    <nav className="flex flex-col h-full" aria-label="Nawigacja panelu">
      {/* Logo */}
      <div className="flex flex-col gap-1 px-4 py-4 border-b border-white/8">
        <Image
          src="/logo-horizontal.png"
          alt="Omega Workforce"
          width={180}
          height={34}
          priority
          className="object-contain object-left"
        />
        <p className="text-[10px] text-fg-faint pl-0.5">
          {role === "firma" ? "Panel firmy B2B" : role === "pracownik" ? "Panel pracownika" : "Panel admina"}
        </p>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group ${
                active ? "text-fg" : "text-fg-muted hover:text-fg hover:bg-white/5"
              }`}
              style={active ? { background: `${accentCol}15`, color: "#F4F5F8" } : {}}>
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: accentCol }} />
              )}
              <span className={`transition-colors ${active ? "" : "text-fg-faint group-hover:text-fg-muted"}`}
                style={active ? { color: accentCol } : {}}>
                {item.icon}
              </span>
              {item.label}
              {item.badge ? (
                <span className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                  style={{ background: accentCol, color: "#06060A" }}>
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* User profile + logout */}
      <div className="p-3 border-t border-white/8">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
            style={{ background: `linear-gradient(135deg, ${accentCol}, ${accentCol}99)` }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-fg truncate">{userName}</p>
            <p className="text-[10px] text-fg-faint truncate">{userEmail}</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" title="Wyloguj się"
              className="text-fg-faint hover:text-red-400 transition-colors p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );

  return <SidebarContent />;
}
