"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const APLIKACJE = [
  { id:"a1", kandydat:"Dmytro Kovalenko",  oferta:"Operator CNC",       data:"9 cze 2026",  status:"nowa",      email:"d.koval@mail.com",  notatka:"" },
  { id:"a2", kandydat:"Olena Marchuk",     oferta:"Operator CNC",       data:"8 cze 2026",  status:"w toku",    email:"o.march@mail.com",  notatka:"Dobry kandydat — umówić rozmowę." },
  { id:"a3", kandydat:"Vasyl Bondarenko",  oferta:"Spawacz TIG/MIG",    data:"7 cze 2026",  status:"nowa",      email:"v.bond@mail.com",   notatka:"" },
  { id:"a4", kandydat:"Natalia Petrova",   oferta:"Prac. magazynowy",   data:"6 cze 2026",  status:"zatrudniona",email:"n.petr@mail.com",  notatka:"Zatrudniona od 15 cze 2026." },
  { id:"a5", kandydat:"Taras Shevchuk",    oferta:"Spawacz TIG/MIG",    data:"5 cze 2026",  status:"odrzucona", email:"t.shev@mail.com",   notatka:"Brak wymaganych uprawnień." },
  { id:"a6", kandydat:"Ivan Kravchenko",   oferta:"Monter instalacji",  data:"4 cze 2026",  status:"nowa",      email:"i.krav@mail.com",   notatka:"" },
  { id:"a7", kandydat:"Maria Lysenko",     oferta:"Prac. magazynowy",   data:"3 cze 2026",  status:"w toku",    email:"m.lysen@mail.com",  notatka:"Czeka na referencje." },
];

const STATUSY: Record<string,{color:string;bg:string;border:string}> = {
  "nowa":       {color:"text-accent",   bg:"bg-accent/10",  border:"border-accent/25"},
  "w toku":     {color:"text-amber-300",bg:"bg-amber-400/10",border:"border-amber-400/25"},
  "zatrudniona":{color:"text-signal",   bg:"bg-signal/10",  border:"border-signal/25"},
  "odrzucona":  {color:"text-red-400",  bg:"bg-red-400/10", border:"border-red-400/25"},
};

export default function Aplikacje() {
  const [filter, setFilter] = useState("wszystkie");
  const [selected, setSelected] = useState<string|null>(null);

  const filtered = filter==="wszystkie"?APLIKACJE:APLIKACJE.filter(a=>a.status===filter);
  const detail = APLIKACJE.find(a=>a.id===selected);

  return (
    <div className="space-y-6">
      <PageHeader title="Aplikacje" subtitle="Przeglądaj zgłoszenia kandydatów i zarządzaj procesem rekrutacji"/>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries({"nowa":0,"w toku":0,"zatrudniona":0,"odrzucona":0}).map(([s])=>{
          const count = APLIKACJE.filter(a=>a.status===s).length;
          const st = STATUSY[s];
          return (
            <div key={s} className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/4 transition-colors" onClick={()=>setFilter(s)}>
              <p className="text-xs text-fg-faint uppercase tracking-wider">{s}</p>
              <p className={`text-3xl font-black mt-1 ${st.color}`}>{count}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        {["wszystkie","nowa","w toku","zatrudniona","odrzucona"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter===f?"bg-accent/20 text-accent border-accent/30":"border-white/10 text-fg-faint hover:text-fg"}`}>
            {f.charAt(0).toUpperCase()+f.slice(1)} {f!=="wszystkie"&&`(${APLIKACJE.filter(a=>a.status===f).length})`}
          </button>
        ))}
        <button className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-white/10 text-fg-faint hover:text-fg transition-colors">Eksport CSV</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/8"><tr>
              {["Kandydat","Oferta","Data","Status","Akcje"].map(h=><th key={h} className="text-left px-4 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(a=>{
                const st = STATUSY[a.status];
                return (
                  <tr key={a.id} className={`border-b border-white/4 hover:bg-white/3 transition-colors cursor-pointer ${selected===a.id?"bg-white/5":""}`} onClick={()=>setSelected(a.id)}>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-fg">{a.kandydat}</p>
                      <p className="text-xs text-fg-faint">{a.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-fg-muted">{a.oferta}</td>
                    <td className="px-4 py-3.5 text-xs text-fg-faint">{a.data}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${st.border} ${st.bg} ${st.color}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        <button className="text-xs px-2 py-1 rounded border border-white/10 text-fg-faint hover:text-fg transition-colors">CV</button>
                        <button className="text-xs px-2 py-1 rounded border border-accent/20 text-accent hover:bg-accent/10 transition-colors">Rozmowa</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="glass rounded-2xl p-5">
          {detail ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-signal/20 flex items-center justify-center text-sm font-bold text-signal">
                  {detail.kandydat.split(" ").map(w=>w[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-fg">{detail.kandydat}</p>
                  <p className="text-xs text-fg-faint">{detail.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-white/6"><span className="text-fg-faint">Oferta</span><span className="text-fg">{detail.oferta}</span></div>
                <div className="flex justify-between py-2 border-b border-white/6"><span className="text-fg-faint">Data aplikacji</span><span className="text-fg">{detail.data}</span></div>
              </div>
              <div>
                <p className="text-xs text-fg-faint mb-2">Notatka wewnętrzna</p>
                <textarea rows={3} defaultValue={detail.notatka} placeholder="Dodaj notatkę…" className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 resize-none"/>
              </div>
              <p className="text-xs font-bold text-fg-faint uppercase tracking-wider">Zmień status</p>
              <div className="grid grid-cols-2 gap-2">
                {["w toku","zatrudniona","odrzucona"].map(s=>(
                  <button key={s} className="text-xs py-2 rounded-lg border border-white/10 text-fg-faint hover:text-fg hover:border-white/25 transition-colors">{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center py-12">
              <div>
                <p className="text-3xl mb-2">👆</p>
                <p className="text-sm text-fg-faint">Kliknij wiersz aby zobaczyć szczegóły kandydata</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
