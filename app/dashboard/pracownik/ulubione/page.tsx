"use client";
import { useState } from "react";
import { useDashLang } from "@/components/dashboard/DashLangProvider";
import { PageHeader } from "@/components/dashboard/PageHeader";

const ULUBIONE = [
  { id:"u1", oferta:"Frezer CNC",            firma:"KovalSteel S.A.",      lokalizacja:"Gliwice",  wynagrodzenie:"30–35 zł/h", dodana:"8 cze 2026",  aktywna:true  },
  { id:"u2", oferta:"Operator obrabiarek",   firma:"MetalPro Sp. z o.o.", lokalizacja:"Katowice", wynagrodzenie:"27–31 zł/h", dodana:"5 cze 2026",  aktywna:true  },
  { id:"u3", oferta:"Tokarz CNC",            firma:"AutoParts Polska",     lokalizacja:"Bytom",    wynagrodzenie:"26–30 zł/h", dodana:"1 cze 2026",  aktywna:false },
];

const T = {
  PL:{ title:"Ulubione oferty", sub:"Zapisane oferty pracy — aplikuj gdy będziesz gotowy", apply:"Aplikuj", remove:"Usuń", expired:"Wygasła" },
  UA:{ title:"Збережені вакансії", sub:"Збережені вакансії — подайте заявку, коли будете готові", apply:"Подати заявку", remove:"Видалити", expired:"Закінчилась" },
};

export default function UlubioneOferty() {
  const { lang } = useDashLang();
  const t = T[lang];
  const [items, setItems] = useState(ULUBIONE);
  const remove = (id:string) => setItems(prev=>prev.filter(x=>x.id!==id));

  return (
    <div className="space-y-6">
      <PageHeader title={t.title} subtitle={t.sub}/>

      {items.length===0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="text-5xl mb-4">★</p>
          <p className="text-fg-faint">{lang==="PL"?"Brak zapisanych ofert. Dodaj oferty z wyszukiwarki.":"Немає збережених вакансій. Додайте вакансії з пошуку."}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(o=>(
            <div key={o.id} className={`glass rounded-2xl p-5 ${!o.aktywna?"opacity-60":""}`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-sm font-bold text-fg-muted flex-shrink-0">
                  {o.firma.slice(0,2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-fg">{o.oferta}</p>
                      <p className="text-sm text-fg-muted">{o.firma}</p>
                    </div>
                    {!o.aktywna && <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/10 bg-white/5 text-fg-faint">{t.expired}</span>}
                  </div>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    <span className="text-xs text-fg-faint">📍 {o.lokalizacja}</span>
                    <span className="text-xs text-fg-faint">💰 {o.wynagrodzenie}</span>
                    <span className="text-xs text-fg-faint">★ {lang==="PL"?"Dodano":"Збережено"}: {o.dodana}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/6">
                {o.aktywna && <button className="text-xs px-4 py-2 rounded-lg font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>{t.apply}</button>}
                <button onClick={()=>remove(o.id)} className="text-xs px-3 py-2 rounded-lg border border-red-400/20 text-red-300 hover:bg-red-400/10 transition-colors ml-auto">{t.remove}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
