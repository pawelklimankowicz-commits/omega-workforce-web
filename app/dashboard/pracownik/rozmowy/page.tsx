"use client";
import { useDashLang } from "@/components/dashboard/DashLangProvider";
import { PageHeader } from "@/components/dashboard/PageHeader";

const ROZMOWY = [
  { id:"r1", oferta:"Operator CNC",        firma:"TechMetal Sp. z o.o.", data:"12 cze 2026", godz:"10:00", tryb:"Zdalnie",     status:"potwierdzona", link:"https://meet.google.com/abc-def" },
  { id:"r2", oferta:"Tokarz",              firma:"AutoParts Polska",      data:"15 cze 2026", godz:"13:00", tryb:"Stacjonarnie",status:"oczekuje",    link:null },
];

const T = {
  PL:{ title:"Rozmowy kwalifikacyjne", sub:"Zaplanowane terminy i linki do połączeń", statuses:{ potwierdzona:"Potwierdzona", oczekuje:"Oczekuje" }, link:"Dołącz", address:"Adres biura Omega", prep:"Przygotowanie", prepNote:"Przypomnij sobie zakres obowiązków i przygotuj pytania dotyczące wynagrodzenia i warunków pracy." },
  UA:{ title:"Співбесіди", sub:"Заплановані терміни та посилання для підключення", statuses:{ potwierdzona:"Підтверджено", oczekuje:"Очікує" }, link:"Приєднатися", address:"Адреса офісу Omega", prep:"Підготовка", prepNote:"Пригадайте посадові обов'язки та підготуйте запитання щодо зарплати та умов праці." },
};

export default function RozmowyKwalifikacyjnePracownik() {
  const { lang } = useDashLang();
  const t = T[lang];

  const statusColor = (s:string) => s==="potwierdzona"?"text-signal border-signal/25 bg-signal/10":"text-amber-300 border-amber-400/25 bg-amber-400/10";

  return (
    <div className="space-y-6">
      <PageHeader title={t.title} subtitle={t.sub}/>

      {ROZMOWY.length===0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-fg-faint">{lang==="PL"?"Brak zaplanowanych rozmów.":"Немає запланованих співбесід."}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ROZMOWY.map(r=>(
            <div key={r.id} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex flex-col items-center justify-center flex-shrink-0">
                  <p className="text-[10px] text-accent font-bold uppercase">{r.data.split(" ")[1]}</p>
                  <p className="text-xl font-black text-accent">{r.data.split(" ")[0]}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-fg">{r.oferta}</p>
                      <p className="text-sm text-fg-muted">{r.firma}</p>
                    </div>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor(r.status)}`}>{t.statuses[r.status as keyof typeof t.statuses]}</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs text-fg-faint">🕐 {r.godz}</span>
                    <span className="text-xs text-fg-faint">📍 {r.tryb}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/6 space-y-3">
                {r.link ? (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/8 border border-accent/15">
                    <span className="text-accent text-sm">🔗</span>
                    <span className="text-xs text-accent font-mono flex-1">{r.link}</span>
                    <button className="text-xs px-3 py-1.5 rounded-lg font-bold text-white flex-shrink-0" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>{t.link}</button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/4 border border-white/8">
                    <p className="text-xs text-fg-faint">{t.address}: <span className="text-fg">ul. Przemysłowa 12, 40-001 Katowice</span></p>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-amber-400/6 border border-amber-400/12">
                  <p className="text-xs font-semibold text-amber-200 mb-1">💡 {t.prep}</p>
                  <p className="text-xs text-amber-100/70">{t.prepNote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
