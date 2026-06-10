"use client";
import { useState } from "react";
import { useDashLang } from "@/components/dashboard/DashLangProvider";
import { PageHeader } from "@/components/dashboard/PageHeader";

const T = {
  PL:{ title:"Mój profil & CV", sub:"Zarządzaj danymi osobowymi i dokumentami", tabs:["Dane osobowe","Doświadczenie","Dokumenty"], save:"Zapisz zmiany", saved:"✓ Zapisano", personal:"Dane osobowe", contact:"Kontakt", skills:"Umiejętności", langs:"Języki", uploadCV:"Wgraj CV (PDF)", cvNote:"CV jest widoczne wyłącznie dla pracodawców, którym wyrazisz zgodę.", completion:"Uzupełnienie profilu" },
  UA:{ title:"Мій профіль і CV", sub:"Керуйте особистими даними та документами", tabs:["Особисті дані","Досвід","Документи"], save:"Зберегти зміни", saved:"✓ Збережено", personal:"Особисті дані", contact:"Контакт", skills:"Навички", langs:"Мови", uploadCV:"Завантажити CV (PDF)", cvNote:"CV видно лише тим роботодавцям, яким ви надасте дозвіл.", completion:"Заповненість профілю" },
};

export default function ProfilPracownika() {
  const { lang } = useDashLang();
  const t = T[lang];
  const [tab, setTab] = useState(0);
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="space-y-6">
      <PageHeader title={t.title} subtitle={t.sub}/>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-signal/20 border border-signal/25 flex items-center justify-center text-2xl font-black text-signal">DK</div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border border-white/20 bg-[#0E0F17] flex items-center justify-center text-xs text-fg-faint hover:text-fg transition-colors">✎</button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-fg">Dmytro Kovalenko</h2>
          <p className="text-sm text-fg-muted">Operator CNC · Katowice</p>
          <div className="flex gap-2 mt-1.5 items-center">
            <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{width:"72%"}}/>
            </div>
            <p className="text-xs text-fg-faint">72% — {t.completion}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-white/8">
        {t.tabs.map((label,i)=>(
          <button key={i} onClick={()=>setTab(i)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${tab===i?"border-accent text-accent":"border-transparent text-fg-faint hover:text-fg"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab===0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">{t.personal}</p>
            {[["Imię","Dmytro"],["Nazwisko","Kovalenko"],["Data urodzenia","15.03.1990"],["Obywatelstwo","Ukraina"],["Nr PESEL / paszport","UA1234567"]].map(([l,v])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input defaultValue={v} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">{t.contact}</p>
            {[["E-mail","d.koval@mail.com"],["Telefon","+48 512 345 678"],["Adres zamieszkania","ul. Górnicza 5/10, Katowice"],["Języki",lang==="PL"?"ukraiński, polski (podstawowy)":"українська, польська (базовий рівень)"]].map(([l,v])=>(
              <div key={l}>
                <p className="text-xs text-fg-faint mb-1">{l}</p>
                <input defaultValue={v} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
              </div>
            ))}
            <div>
              <p className="text-xs text-fg-faint mb-1">{lang==="PL"?"O mnie":"Про мене"}</p>
              <textarea rows={3} defaultValue={lang==="PL"?"Doświadczony operator CNC z 5-letnim stażem w obróbce metali.":"Досвідчений оператор CNC з 5-річним стажем у металообробці."} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg focus:outline-none focus:border-accent/50 resize-none"/>
            </div>
          </div>
          <div className="lg:col-span-2 flex gap-3 pt-1">
            <button onClick={save} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>{saved?t.saved:t.save}</button>
          </div>
        </div>
      )}

      {tab===1 && (
        <div className="space-y-4">
          {[
            { firma:"AutoMetal Sp. z o.o.", stanowisko:"Operator CNC", okres:"2021 – teraz", opis:lang==="PL"?"Obsługa tokarek CNC FANUC, kontrola jakości, praca w systemie 3-zmianowym.":"Обслуговування токарних верстатів CNC FANUC, контроль якості, тризмінна робота." },
            { firma:"Koval Steel", stanowisko:"Frezer", okres:"2019 – 2021", opis:lang==="PL"?"Frezowanie CNC na maszynach Haas VF-2.":"Фрезерування CNC на верстатах Haas VF-2." },
          ].map((e,i)=>(
            <div key={i} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-fg">{e.stanowisko}</p>
                  <p className="text-sm text-fg-muted">{e.firma} · {e.okres}</p>
                  <p className="text-sm text-fg-faint mt-2">{e.opis}</p>
                </div>
                <button className="text-xs text-fg-faint hover:text-fg border border-white/10 rounded-lg px-2.5 py-1 transition-colors">{lang==="PL"?"Edytuj":"Редагувати"}</button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl border border-dashed border-white/15 text-sm text-fg-faint hover:text-fg hover:border-white/30 transition-colors">+ {lang==="PL"?"Dodaj doświadczenie":"Додати досвід"}</button>
        </div>
      )}

      {tab===2 && (
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5 border border-accent/15 bg-accent/4">
            <p className="text-xs text-accent mb-3">{t.cvNote}</p>
            <button className="text-sm px-4 py-2 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-colors">{t.uploadCV}</button>
          </div>
          {[{name:lang==="PL"?"Paszport UA":"Паспорт UA",s:"aktywny"},{name:lang==="PL"?"Prawo jazdy kat. B":"Водійське посвідчення кат. B",s:"aktywny"},{name:"CV 2026",s:"aktywny"}].map(d=>(
            <div key={d.name} className="glass rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">📄</div>
              <p className="flex-1 text-sm text-fg">{d.name}</p>
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-signal/25 bg-signal/10 text-signal">{d.s}</span>
              <button className="text-xs text-accent hover:underline">{lang==="PL"?"Pobierz":"Завантажити"}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
