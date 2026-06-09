"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/translations";

interface LangCtx {
  lang:    Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: "PL", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("PL");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangCtx {
  return useContext(LangContext);
}
