"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const KANDYDACI = [
  { id:"k1", name:"Dmytro Kovalenko",  stanowisko:"Operator CNC",      exp:"5 lat",  jezyki:"UA, PL básico", lokalizacja:"Katowice",  dostepny:true  },
  { id:"k2", name:"Olena Marchuk",     stanowisko:"Pracownik magazynowy",exp:"2 lata", jezyki:"UA, PL",       lokalizacja:"Gliwice",   dostepny:true  },
  { id:"k3", name:"Vasyl Bondarenko",  stanowisko:"Spawacz TIG",        exp:"8 lat",  jezyki:"UA",           lokalizacja:"Sosnowiec", dostepny:false },
  { id:"k4", name:"Natalia Petrova",   stanowisko:"Pakowacz",           exp:"1 rok",  jezyki:"UA, RU",       lokalizacja:"Tychy",     dostepny:true  },
  { id:"k5", name:"Taras Shevchuk",    stanowisko:"Spawacz MIG",        exp:"6 lat",  jezyki:"UA, PL",       lokalizacja:"Bytom",     dostepny:true  },
  { id:"k6", name:"Maria Lysenko",     stanowisko:"Kontroler jakości",  exp:"3 lata", jezyki:"UA, EN",       lokalizacja:"Zabrze",    dostepny:false },
];

export default function BazaKandydatow() {
  const [q, setQ] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = KANDYDACI.filter(k=>k.name.toLowerCase().includes(q.toLowerCase())||k.stanowisko.toLowerCase().includes(q.toLowerCase()));
  const toggleSave = (id:string) => setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return (
    <div className="space-y-6">
      <PageHeader title="Baza kandydatów" subtitle="Przeglądaj CV kandydatów z zgodą RODO i zapraszaj do aplikowania"/>

      <div className="glass rounded-2xl p-4 border border-amber-400/15 bg-amber-400/4">
        <p className="text-xs text-amber-200">⚠ Dostęp wyłącznie do kandydatów, którzy wyrazili zgodę na przetwarzanie danych w celach rekrutacyjnych (RODO art. 6 ust. 1 lit. a).</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Szukaj stanowiska lub kandydata…" className="w-full pl-9 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
        </div>
        <select className="text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg-muted focus:outline-none">
          <option>Wszyscy</option><option>Dostępni</option><option>Niedostępni</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(k=>(
          <div key={k.id} className="glass rounded-2xl p-5 space-y-3 hover:bg-white/4 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#34D39A,#0EA572)"}}>
                  {k.name.split(" ").map(w=>w[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-fg text-sm">— CV anonimowe —</p>
                  <p className="text-xs text-fg-faint">{k.stanowisko}</p>
                </div>
              </div>
              <button onClick={()=>toggleSave(k.id)} className={`text-lg transition-colors ${saved.includes(k.id)?"text-amber-300":"text-fg-faint hover:text-amber-300"}`}>★</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/4 rounded-lg p-2">
                <p className="text-fg-faint">Doświadczenie</p>
                <p className="text-fg font-semibold mt-0.5">{k.exp}</p>
              </div>
              <div className="bg-white/4 rounded-lg p-2">
                <p className="text-fg-faint">Języki</p>
                <p className="text-fg font-semibold mt-0.5">{k.jezyki}</p>
              </div>
              <div className="bg-white/4 rounded-lg p-2">
                <p className="text-fg-faint">Lokalizacja</p>
                <p className="text-fg font-semibold mt-0.5">{k.lokalizacja}</p>
              </div>
              <div className="bg-white/4 rounded-lg p-2">
                <p className="text-fg-faint">Dostępność</p>
                <p className={`font-semibold mt-0.5 ${k.dostepny?"text-signal":"text-fg-faint"}`}>{k.dostepny?"Dostępny":"Niedostępny"}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 text-xs py-2 rounded-lg border border-white/10 text-fg-faint hover:text-fg transition-colors">Podgląd CV</button>
              <button className="flex-1 text-xs py-2 rounded-lg border border-accent/25 text-accent hover:bg-accent/10 transition-colors">Zaproś</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
