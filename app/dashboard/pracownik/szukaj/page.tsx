"use client";
import { useState } from "react";
import { useDashLang } from "@/components/dashboard/DashLangProvider";
import { PageHeader } from "@/components/dashboard/PageHeader";

const OFERTY = [
  { id:"o1", tytul:"Operator CNC",         firma:"TechMetal Sp. z o.o.", lokalizacja:"Katowice",  wynagrodzenie:"28–32 zł/h", typ:"Pełny etat",  dopasowanie:95, nowa:true  },
  { id:"o2", tytul:"Frezer CNC",            firma:"KovalSteel S.A.",      lokalizacja:"Gliwice",   wynagrodzenie:"30–35 zł/h", typ:"Pełny etat",  dopasowanie:88, nowa:true  },
  { id:"o3", tytul:"Tokarz",               firma:"AutoParts Polska",      lokalizacja:"Sosnowiec", wynagrodzenie:"26–30 zł/h", typ:"Pełny etat",  dopasowanie:80, nowa:false },
  { id:"o4", tytul:"Spawacz TIG",          firma:"IronCraft Sp. z o.o.",  lokalizacja:"Bytom",     wynagrodzenie:"32–38 zł/h", typ:"Zmianowy",    dopasowanie:72, nowa:false },
  { id:"o5", tytul:"Pracownik produkcji",  firma:"Fabryka Mebli Nord",    lokalizacja:"Zabrze",    wynagrodzenie:"22–25 zł/h", typ:"Zmianowy",    dopasowanie:60, nowa:false },
];

const T = {
  PL:{ title:"Szukaj pracy", sub:"Oferty dopasowane do Twojego profilu i umiejętności", apply:"Aplikuj", save:"Zapisz", match:"Dopasowanie", new:"Nowa" },
  UA:{ title:"Пошук роботи", sub:"Вакансії, підібрані до вашого профілю та навичок", apply:"Подати заявку", save:"Зберегти", match:"Відповідність", new:"Нова" },
};

export default function SzukajPracy() {
  const { lang } = useDashLang();
  const t = T[lang];
  const [q, setQ] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = q ? OFERTY.filter(o=>o.tytul.toLowerCase().includes(q.toLowerCase())||o.firma.toLowerCase().includes(q.toLowerCase())) : OFERTY;
  const toggleSave = (id:string) => setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return (
    <div className="space-y-6">
      <PageHeader title={t.title} subtitle={t.sub}/>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder={lang==="PL"?"Szukaj oferty lub firmy…":"Пошук вакансії або компанії…"} className="w-full pl-9 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
        </div>
        <select className="text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg-muted focus:outline-none">
          <option>{lang==="PL"?"Cała Polska":"Вся Польща"}</option>
          <option>Katowice</option><option>Gliwice</option><option>Sosnowiec</option>
        </select>
        <select className="text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg-muted focus:outline-none">
          <option>{lang==="PL"?"Wszystkie typy":"Усі типи"}</option>
          <option>{lang==="PL"?"Pełny etat":"Повна зайнятість"}</option>
          <option>{lang==="PL"?"Zmianowy":"Змінний"}</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(o=>(
          <div key={o.id} className="glass rounded-2xl p-5 hover:bg-white/3 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-sm font-bold text-fg-muted flex-shrink-0">
                {o.firma.slice(0,2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-fg">{o.tytul}</h3>
                      {o.nowa && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border border-signal/25 bg-signal/10 text-signal">{t.new}</span>}
                    </div>
                    <p className="text-sm text-fg-muted">{o.firma}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-accent" style={{width:`${o.dopasowanie}%`}}/>
                      </div>
                      <p className="text-xs text-accent font-bold">{o.dopasowanie}%</p>
                    </div>
                    <p className="text-[10px] text-fg-faint mt-0.5">{t.match}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-2 flex-wrap">
                  <span className="text-xs text-fg-faint">📍 {o.lokalizacja}</span>
                  <span className="text-xs text-fg-faint">💰 {o.wynagrodzenie}</span>
                  <span className="text-xs text-fg-faint">⏱ {o.typ}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/6">
              <button className="text-xs px-4 py-2 rounded-lg font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>{t.apply}</button>
              <button onClick={()=>toggleSave(o.id)} className={`text-xs px-3 py-2 rounded-lg border transition-colors ${saved.includes(o.id)?"border-amber-400/30 text-amber-300 bg-amber-400/8":"border-white/10 text-fg-faint hover:text-fg"}`}>
                {saved.includes(o.id)?"★":""} {t.save}
              </button>
              <button className="text-xs px-3 py-2 rounded-lg border border-white/10 text-fg-faint hover:text-fg transition-colors ml-auto">{lang==="PL"?"Szczegóły":"Деталі"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
