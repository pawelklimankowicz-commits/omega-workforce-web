import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PRACOWNIK_ALERTS } from "@/lib/mock-data";

export default async function PracownikLayout({ children }: { children: React.ReactNode }) {
  let session;
  try {
    session = await requireRole(["pracownik", "admin"]);
  } catch {
    redirect("/login");
  }

  return (
    <DashboardShell
      role={session.role}
      userName={session.name}
      userEmail={session.email}
      alerts={PRACOWNIK_ALERTS}
    >
      {children}
    </DashboardShell>
  );
}
