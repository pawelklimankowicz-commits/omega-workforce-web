"use client";
import { useState } from "react";
import { useDashLang } from "@/components/dashboard/DashLangProvider";
import { PageHeader } from "@/components/dashboard/PageHeader";

const APLIKACJE = [
  { id:"a1", oferta:"Operator CNC",        firma:"TechMetal Sp. z o.o.", data:"9 cze 2026",  status:"w toku",  etap:"Rozmowa zaplanowana" },
  { id:"a2", oferta:"Frezer CNC",          firma:"KovalSteel S.A.",      data:"7 cze 2026",  status:"nowa",    etap:"Oczekiwanie na odpowiedź" },
  { id:"a3", oferta:"Tokarz",              firma:"AutoParts Polska",      data:"3 cze 2026",  status:"w toku",  etap:"Weryfikacja dokumentów" },
  { id:"a4", oferta:"Pracownik produkcji", firma:"Fabryka Mebli Nord",    data:"28 maj 2026", status:"odrzucona",etap:"Brak wolnych miejsc" },
  { id:"a5", oferta:"Spawacz TIG",         firma:"IronCraft Sp. z o.o.", data:"20 maj 2026", status:"oferta",  etap:"Oferta pracy wysłana!" },
];

const T = {
  PL:{ title:"Moje aplikacje", sub:"Śledź statusy swoich zgłoszeń rekrutacyjnych", statuses:{ nowa:"Nowa", "w toku":"W toku", odrzucona:"Odrzucona", oferta:"Oferta pracy" }, stage:"Etap" },
  UA:{ title:"Мої заявки", sub:"Відстежуйте статуси своїх заявок на роботу", statuses:{ nowa:"Нова", "w toku":"В обробці", odrzucona:"Відхилено", oferta:"Пропозиція роботи" }, stage:"Етап" },
};

const statusColors: Record<string,string> = {
  nowa:"text-accent border-accent/25 bg-accent/10",
  "w toku":"text-amber-300 border-amber-400/25 bg-amber-400/10",
  odrzucona:"text-red-400 border-red-400/25 bg-red-400/10",
  oferta:"text-signal border-signal/25 bg-signal/10",
};

export default function MojeAplikacje() {
  const { lang } = useDashLang();
  const t = T[lang];
  const [filter, setFilter] = useState("wszystkie");

  const filtered = filter==="wszystkie" ? APLIKACJE : APLIKACJE.filter(a=>a.status===filter);

  return (
    <div className="space-y-6">
      <PageHeader title={t.title} subtitle={t.sub}/>

      <div className="grid grid-cols-4 gap-4">
        {(["nowa","w toku","odrzucona","oferta"] as const).map(s=>(
          <div key={s} className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/4 transition-colors" onClick={()=>setFilter(s)}>
            <p className="text-xs text-fg-faint uppercase tracking-wider">{t.statuses[s]}</p>
            <p className={`text-3xl font-black mt-1 ${statusColors[s].split(" ")[0]}`}>{APLIKACJE.filter(a=>a.status===s).length}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {["wszystkie","nowa","w toku","oferta","odrzucona"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors capitalize ${filter===f?"bg-accent/20 text-accent border-accent/30":"border-white/10 text-fg-faint hover:text-fg"}`}>
            {f==="wszystkie"?(lang==="PL"?"Wszystkie":"Всі"):t.statuses[f as keyof typeof t.statuses]??f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(a=>(
          <div key={a.id} className="glass rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-sm font-bold text-fg-muted flex-shrink-0">
                {a.firma.slice(0,2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-fg">{a.oferta}</p>
                    <p className="text-sm text-fg-muted">{a.firma}</p>
                  </div>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColors[a.status]}`}>{t.statuses[a.status as keyof typeof t.statuses]}</span>
                </div>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-fg-faint">📅 {a.data}</span>
                  <span className="text-xs text-fg-muted">→ {a.etap}</span>
                </div>
              </div>
            </div>
            {a.status==="oferta" && (
              <div className="mt-4 pt-4 border-t border-white/6 flex gap-3">
                <button className="text-sm px-4 py-2 rounded-xl font-bold text-white" style={{background:"linear-gradient(135deg,#34D39A,#0EA572)"}}>{lang==="PL"?"Przyjmij ofertę":"Прийняти пропозицію"}</button>
                <button className="text-sm px-4 py-2 rounded-xl border border-white/10 text-fg-faint hover:text-fg transition-colors">{lang==="PL"?"Odrzuć":"Відхилити"}</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
