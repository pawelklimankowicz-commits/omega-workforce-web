"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const OFERTY = [
  { id:"o1", title:"Operator CNC",         lokalizacja:"Katowice",    wynagrodzenie:"28–32 zł/h", typ:"Pełny etat",  aplikacje:12, status:"aktywna",  dodana:"1 cze 2026",  wygasa:"1 sie 2026" },
  { id:"o2", title:"Spawacz TIG/MIG",       lokalizacja:"Gliwice",     wynagrodzenie:"30–36 zł/h", typ:"Pełny etat",  aplikacje:8,  status:"aktywna",  dodana:"15 maj 2026", wygasa:"15 lip 2026" },
  { id:"o3", title:"Pracownik magazynowy",  lokalizacja:"Sosnowiec",   wynagrodzenie:"22–25 zł/h", typ:"Zmianowy",    aplikacje:21, status:"aktywna",  dodana:"20 maj 2026", wygasa:"20 lip 2026" },
  { id:"o4", title:"Monter instalacji",     lokalizacja:"Tychy",       wynagrodzenie:"26–30 zł/h", typ:"Pełny etat",  aplikacje:6,  status:"robocza",  dodana:"5 cze 2026",  wygasa:"—" },
  { id:"o5", title:"Ślusarz",               lokalizacja:"Katowice",    wynagrodzenie:"25–29 zł/h", typ:"Pełny etat",  aplikacje:3,  status:"wygasła",  dodana:"1 kwi 2026",  wygasa:"1 cze 2026" },
];

export default function OfertyPracy() {
  const [filter, setFilter] = useState("wszystkie");
  const [showModal, setShowModal] = useState(false);

  const filtered = filter==="wszystkie"?OFERTY:OFERTY.filter(o=>o.status===filter);
  const badgeColor = (s:string)=>s==="aktywna"?"border-signal/25 bg-signal/10 text-signal":s==="robocza"?"border-amber-400/25 bg-amber-400/10 text-amber-300":"border-white/10 bg-white/5 text-fg-faint";

  return (
    <div className="space-y-6">
      <PageHeader title="Oferty pracy" subtitle="Twórz oferty, zarządzaj aplikacjami i śledź skuteczność"
        actions={<button onClick={()=>setShowModal(true)} className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>+ Nowa oferta</button>}/>

      <div className="grid grid-cols-3 gap-4">
        {[["Aktywne",OFERTY.filter(o=>o.status==="aktywna").length,"text-signal"],["Robocze",OFERTY.filter(o=>o.status==="robocza").length,"text-amber-300"],["Łącznie aplikacji",OFERTY.reduce((s,o)=>s+o.aplikacje,0),"text-accent"]].map(([l,v,c])=>(
          <div key={String(l)} className="glass rounded-2xl p-4">
            <p className="text-xs text-fg-faint uppercase tracking-wider">{l}</p>
            <p className={`text-3xl font-black mt-1 ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {["wszystkie","aktywna","robocza","wygasła"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter===f?"bg-accent/20 text-accent border-accent/30":"border-white/10 text-fg-faint hover:text-fg"}`}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(o=>(
          <div key={o.id} className="glass rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-bold text-fg">{o.title}</h3>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor(o.status)}`}>{o.status}</span>
                </div>
                <div className="flex gap-4 mt-2 flex-wrap">
                  <span className="text-xs text-fg-faint">📍 {o.lokalizacja}</span>
                  <span className="text-xs text-fg-faint">💰 {o.wynagrodzenie}</span>
                  <span className="text-xs text-fg-faint">⏱ {o.typ}</span>
                  <span className="text-xs text-fg-faint">📅 Dodana: {o.dodana}</span>
                  {o.wygasa!=="—"&&<span className="text-xs text-fg-faint">🔚 Wygasa: {o.wygasa}</span>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-black text-accent">{o.aplikacje}</p>
                <p className="text-xs text-fg-faint">aplikacji</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/6">
              <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-faint hover:text-fg hover:border-white/25 transition-colors">Podgląd</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-faint hover:text-fg hover:border-white/25 transition-colors">Edytuj</button>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-faint hover:text-fg hover:border-white/25 transition-colors">Duplikuj</button>
              {o.status==="aktywna"&&<button className="text-xs px-3 py-1.5 rounded-lg border border-amber-400/20 text-amber-300 hover:bg-amber-400/10 transition-colors ml-auto">Archiwizuj</button>}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowModal(false)}/>
          <div className="relative w-full max-w-lg glass rounded-2xl p-6 space-y-4" style={{background:"#0E0F17"}}>
            <h3 className="text-lg font-bold text-fg">Nowa oferta pracy</h3>
            {[["Stanowisko","np. Operator CNC"],["Lokalizacja","np. Katowice"],["Wynagrodzenie","np. 28–32 zł/h"],["Typ zatrudnienia","np. Pełny etat"]].map(([l,p])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input placeholder={p} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
            <div>
              <p className="text-xs text-fg-faint mb-1">Opis stanowiska</p>
              <textarea rows={4} placeholder="Zakres obowiązków, wymagania, oferujemy…" className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 resize-none"/>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={()=>setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>Opublikuj ofertę</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-fg-faint hover:text-fg transition-colors">Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
