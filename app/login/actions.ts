"use server";

import { redirect } from "next/navigation";
import { MOCK_USERS, createSessionToken, setSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email    = (formData.get("email")    as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string);

  if (!email || !password) {
    return { error: "Wypełnij adres e-mail i hasło." };
  }

  // TODO: produkcja → porównaj hash (bcrypt), nie plain-text
  const user = MOCK_USERS.find(
    u => u.email.toLowerCase() === email && u.password === password
  );

  if (!user) {
    // Celowo nie mówimy czy email czy hasło — bezpieczeństwo
    return { error: "Nieprawidłowy adres e-mail lub hasło." };
  }

  const token = createSessionToken({
    userId:     user.id,
    role:       user.role,
    name:       user.name,
    email:      user.email,
    companyId:  user.companyId,
    workerId:   user.workerId,
    lang:       "pl",
    mfaVerified: false,  // TODO: MFA flow
  });

  setSessionCookie(token);

  // Redirect po zalogowaniu
  const dest = user.role === "pracownik" ? "/dashboard/pracownik" : "/dashboard/firma";
  redirect(dest);
}

export async function logoutAction(): Promise<void> {
  const { clearSession } = await import("@/lib/auth");
  clearSession();
  redirect("/login");
}
