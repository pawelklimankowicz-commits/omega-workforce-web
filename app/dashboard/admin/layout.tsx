import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session;
  try {
    session = await requireRole(["admin"]);
  } catch {
    redirect("/login");
  }

  return (
    <DashboardShell
      role={session.role}
      userName={session.name}
      userEmail={session.email}
      alerts={[]}
    >
      {children}
    </DashboardShell>
  );
}
