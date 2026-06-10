"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function ProfilFirmy() {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"dane"|"dokumenty"|"historia">("dane");
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="space-y-6">
      <PageHeader title="Profil firmy" subtitle="Dane rejestrowe, dokumenty i historia zmian" badge={{label:"TechMetal Sp. z o.o."}}/>

      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center text-2xl font-black text-accent">TM</div>
        <div>
          <h2 className="text-xl font-bold text-fg">TechMetal Sp. z o.o.</h2>
          <div className="flex gap-2 mt-1">
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-signal/25 bg-signal/10 text-signal">Konto aktywne</span>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/10 bg-white/5 text-fg-faint">Profil: 80% uzupełniony</span>
          </div>
        </div>
        <div className="ml-auto">
          <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-accent"/>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-white/8">
        {([["dane","Dane podstawowe"],["dokumenty","Dokumenty"],["historia","Historia zmian"]] as const).map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${tab===id?"border-accent text-accent":"border-transparent text-fg-faint hover:text-fg"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab==="dane" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Dane podstawowe</p>
            {[["Nazwa firmy","TechMetal Sp. z o.o."],["NIP","1234567890"],["KRS","0000123456"],["REGON","987654321"],["Branża","Przemysł metalowy"]].map(([l,v])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input defaultValue={v} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Dane kontaktowe</p>
            {[["Adres","ul. Przemysłowa 12, 40-001 Katowice"],["Telefon","+48 32 123 45 67"],["E-mail kontaktowy","kontakt@techmetal.pl"],["E-mail do faktur","faktury@techmetal.pl"],["Osoba upoważniona","Anna Kowalska — Prezes"]].map(([l,v])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input defaultValue={v} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
            <div>
              <p className="text-xs text-fg-faint mb-1">Opis firmy</p>
              <textarea rows={3} defaultValue="Firma produkcyjna specjalizująca się w obróbce metali. Zatrudniamy operatorów CNC, spawaczy i mechaników." className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg focus:outline-none focus:border-accent/50 resize-none"/>
            </div>
          </div>
          <div className="lg:col-span-2 flex gap-3 pt-2">
            <button onClick={save} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>
              {saved?"✓ Zapisano":"Zapisz zmiany"}
            </button>
            <button className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-fg-faint hover:text-fg transition-colors">Anuluj</button>
          </div>
        </div>
      )}

      {tab==="dokumenty" && (
        <div className="space-y-3">
          {[
            { name:"Odpis KRS",         status:"aktywny",    data:"1 sty 2026",  wygasa:"1 sty 2027" },
            { name:"Zaświadczenie NIP",  status:"aktywny",    data:"15 mar 2025", wygasa:"—" },
            { name:"REGON",             status:"aktywny",    data:"15 mar 2025", wygasa:"—" },
            { name:"Polisa OC",         status:"wygasający", data:"1 cze 2025",  wygasa:"1 cze 2026" },
          ].map(d=>(
            <div key={d.name} className="glass rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-fg">{d.name}</p>
                <p className="text-xs text-fg-faint">Dodano: {d.data} · Wygasa: {d.wygasa}</p>
              </div>
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${d.status==="aktywny"?"border-signal/25 bg-signal/10 text-signal":"border-amber-400/25 bg-amber-400/10 text-amber-300"}`}>{d.status}</span>
              <button className="text-xs text-accent hover:underline">Pobierz</button>
              <button className="text-xs text-fg-faint hover:text-fg border border-white/10 rounded-lg px-2 py-1 transition-colors">Zastąp</button>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl border border-dashed border-white/15 text-sm text-fg-faint hover:text-fg hover:border-white/30 transition-colors">+ Wgraj nowy dokument</button>
        </div>
      )}

      {tab==="historia" && (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/8"><tr>
              {["Data","Zmiana","Kto"].map(h=><th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                { d:"10 cze 2026 14:02", z:"Zmiana adresu e-mail do faktur",  k:"Anna Kowalska" },
                { d:"5 cze 2026 09:30",  z:"Wgranie nowej polisy OC",          k:"Admin Omega" },
                { d:"20 maj 2026 11:15", z:"Aktualizacja danych kontaktowych", k:"Anna Kowalska" },
                { d:"1 lut 2026 10:00",  z:"Rejestracja konta",                k:"System" },
              ].map((r,i)=>(
                <tr key={i} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3 text-xs text-fg-faint font-mono">{r.d}</td>
                  <td className="px-5 py-3 text-sm text-fg">{r.z}</td>
                  <td className="px-5 py-3 text-xs text-fg-muted">{r.k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
