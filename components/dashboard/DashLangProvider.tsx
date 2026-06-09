"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface DashLangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<DashLangCtx>({ lang: "PL", setLang: () => {} });

export function DashLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("PL");
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useDashLang(): DashLangCtx { return useContext(Ctx); }
