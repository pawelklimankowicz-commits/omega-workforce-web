import type { UserRole } from "./types/dashboard";

export const MOCK_USERS: Array<{
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  companyId?: string;
  workerId?: string;
}> = [
  {
    id:        "usr_firma_01",
    email:     "firma@demo.pl",
    password:  "demo1234",
    role:      "firma",
    name:      "TechMetal Sp. z o.o.",
    companyId: "comp_techmental_01",
  },
  {
    id:        "usr_pracownik_01",
    email:     "pracownik@demo.pl",
    password:  "demo1234",
    role:      "pracownik",
    name:      "Dmytro Kovalenko",
    workerId:  "wkr_001",
  },
  {
    id:        "usr_admin_01",
    email:     "admin@omegaworkforce.pl",
    password:  "omega_admin_2025",
    role:      "admin",
    name:      "Admin Omega",
  },
];
