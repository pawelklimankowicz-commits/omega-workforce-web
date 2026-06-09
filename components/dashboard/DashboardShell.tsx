"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { DashLangProvider } from "./DashLangProvider";
import type { UserRole } from "@/lib/types/dashboard";
import type { Alert } from "@/lib/types/dashboard";

interface Props {
  role:      UserRole;
  userName:  string;
  userEmail: string;
  alerts:    Alert[];
  children:  React.ReactNode;
}

export function DashboardShell({ role, userName, userEmail, alerts, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashLangProvider>
      <div className="flex h-screen overflow-hidden" style={{ background: "#0E0F17" }}>
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 h-screen sticky top-0 border-r border-white/8"
          style={{ background: "#0A0A10" }}>
          <Sidebar role={role} userName={userName} userEmail={userEmail} />
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 border-r border-white/8 z-50"
              style={{ background: "#0A0A10" }}>
              <Sidebar role={role} userName={userName} userEmail={userEmail} onClose={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopBar
            userName={userName}
            userRole={role}
            alerts={alerts}
            onMenuToggle={() => setMobileOpen(o => !o)}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="p-5 sm:p-7 max-w-screen-xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashLangProvider>
  );
}
