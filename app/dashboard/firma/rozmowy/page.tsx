"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const ROZMOWY = [
  { id:"r1", kandydat:"Dmytro Kovalenko",  oferta:"Operator CNC",     data:"12 cze 2026", godz:"10:00", tryb:"Zdalnie",    status:"potwierdzona", link:"https://meet.google.com/abc-def" },
  { id:"r2", kandydat:"Olena Marchuk",     oferta:"Operator CNC",     data:"13 cze 2026", godz:"11:30", tryb:"Stacjonarnie",status:"oczekuje",     link:null },
  { id:"r3", kandydat:"Taras Shevchuk",    oferta:"Spawacz TIG/MIG",  data:"14 cze 2026", godz:"09:00", tryb:"Zdalnie",    status:"oczekuje",     link:"https://teams.microsoft.com/xyz" },
  { id:"r4", kandydat:"Natalia Petrova",   oferta:"Prac. magazynowy", data:"5 cze 2026",  godz:"14:00", tryb:"Stacjonarnie",status:"odbyta",      link:null },
];

export default function RozmowyKwalifikacyjne() {
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState<string|null>(null);

  const statusColor = (s:string) => s==="potwierdzona"?"text-signal border-signal/25 bg-signal/10":s==="oczekuje"?"text-amber-300 border-amber-400/25 bg-amber-400/10":"text-fg-faint border-white/10 bg-white/5";

  return (
    <div className="space-y-6">
      <PageHeader title="Rozmowy kwalifikacyjne" subtitle="Planuj terminy, wysyłaj zaproszenia, przeglądaj kalendarz"
        actions={<button onClick={()=>setShowModal(true)} className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>+ Zaplanuj rozmowę</button>}/>

      <div className="grid grid-cols-3 gap-4">
        {[["Zaplanowane",ROZMOWY.filter(r=>r.status!=="odbyta").length,"text-accent"],["Potwierdzone",ROZMOWY.filter(r=>r.status==="potwierdzona").length,"text-signal"],["Odbyte",ROZMOWY.filter(r=>r.status==="odbyta").length,"text-fg-faint"]].map(([l,v,c])=>(
          <div key={String(l)} className="glass rounded-2xl p-4">
            <p className="text-xs text-fg-faint uppercase tracking-wider">{l}</p>
            <p className={`text-3xl font-black mt-1 ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {ROZMOWY.map(r=>(
          <div key={r.id} className={`glass rounded-2xl p-5 cursor-pointer transition-colors ${activeId===r.id?"border border-accent/30 bg-accent/5":""}`} onClick={()=>setActiveId(activeId===r.id?null:r.id)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex flex-col items-center justify-center flex-shrink-0">
                <p className="text-[10px] text-accent font-bold uppercase">{r.data.split(" ")[1]}</p>
                <p className="text-lg font-black text-accent">{r.data.split(" ")[0]}</p>
              </div>
              <div className="flex-1">
                <p className="font-bold text-fg">{r.kandydat}</p>
                <p className="text-sm text-fg-muted">{r.oferta} · {r.godz} · {r.tryb}</p>
              </div>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor(r.status)}`}>{r.status}</span>
            </div>

            {activeId===r.id && (
              <div className="mt-4 pt-4 border-t border-white/6 space-y-3">
                {r.link && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/8 border border-accent/15">
                    <span className="text-accent text-sm">🔗</span>
                    <span className="text-xs text-accent font-mono">{r.link}</span>
                    <button className="ml-auto text-xs text-accent hover:underline">Skopiuj</button>
                  </div>
                )}
                <div>
                  <p className="text-xs text-fg-faint mb-1.5">Notatki porejestracyjne</p>
                  <textarea rows={2} placeholder="Zapisz spostrzeżenia z rozmowy…" className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 resize-none"/>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-signal/25 text-signal hover:bg-signal/10 transition-colors">✓ Zatrudnij</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-red-400/20 text-red-300 hover:bg-red-400/10 transition-colors">✕ Odrzuć</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-faint hover:text-fg transition-colors ml-auto">Anuluj rozmowę</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setShowModal(false)}/>
          <div className="relative w-full max-w-md glass rounded-2xl p-6 space-y-4" style={{background:"#0E0F17"}}>
            <h3 className="text-lg font-bold text-fg">Zaplanuj rozmowę kwalifikacyjną</h3>
            {[["Kandydat",""],["Oferta pracy",""],["Data",""],["Godzina",""]].map(([l])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input type={l==="Data"?"date":l==="Godzina"?"time":"text"} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
            <div>
              <p className="text-xs text-fg-faint mb-1">Tryb</p>
              <select className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none">
                <option>Stacjonarnie</option><option>Zdalnie (link)</option>
              </select>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={()=>setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>Wyślij zaproszenie</button>
              <button onClick={()=>setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm border border-white/10 text-fg-faint hover:text-fg transition-colors">Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
