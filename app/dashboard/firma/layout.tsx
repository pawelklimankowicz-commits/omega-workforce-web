import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { FIRMA_ALERTS } from "@/lib/mock-data";

export default async function FirmaLayout({ children }: { children: React.ReactNode }) {
  let session;
  try {
    session = await requireRole(["firma", "admin"]);
  } catch {
    redirect("/login");
  }

  return (
    <DashboardShell
      role={session.role}
      userName={session.name}
      userEmail={session.email}
      alerts={FIRMA_ALERTS}
    >
      {children}
    </DashboardShell>
  );
}
