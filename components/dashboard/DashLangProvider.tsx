"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface DashLangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<DashLangCtx>({ lang: "PL", setLang: () => {} });

export function DashLangProvider({ defaultLang = "PL", children }: { defaultLang?: Lang; children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useDashLang(): DashLangCtx { return useContext(Ctx); }
