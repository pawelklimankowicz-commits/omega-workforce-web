import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

/** /dashboard → redirect do właściwego panelu na podstawie roli */
export default async function DashboardRedirect() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "pracownik") redirect("/dashboard/pracownik");
  redirect("/dashboard/firma");
}
