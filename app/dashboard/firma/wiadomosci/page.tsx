"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

const WIADOMOSCI = [
  { id:"w1", nadawca:"Dmytro Kovalenko",  temat:"Pytanie o ofertę Operator CNC",   tresc:"Dzień dobry, chciałbym zapytać o szczegóły oferty…", czas:"Dzisiaj 11:42", przeczytana:false, awatar:"DK" },
  { id:"w2", nadawca:"Agencja Omega",     temat:"Nowy kandydat dopasowany do oferty", tresc:"Znaleźliśmy kandydata spełniającego Twoje wymagania…", czas:"Dzisiaj 09:15", przeczytana:false, awatar:"AO" },
  { id:"w3", nadawca:"Olena Marchuk",     temat:"Potwierdzenie rozmowy 13 cze",     tresc:"Potwierdzam udział w rozmowie kwalifikacyjnej…",    czas:"Wczoraj 16:30", przeczytana:true,  awatar:"OM" },
  { id:"w4", nadawca:"Agencja Omega",     temat:"Raport tygodniowy – tydzień 23",   tresc:"W zeszłym tygodniu wpłynęło 14 nowych aplikacji…",  czas:"Wczoraj 08:00", przeczytana:true,  awatar:"AO" },
  { id:"w5", nadawca:"Taras Shevchuk",    temat:"Dokumenty do podpisania",          tresc:"Przesyłam skan umowy o pracę do weryfikacji…",      czas:"8 cze 2026",   przeczytana:true,  awatar:"TS" },
];

export default function Wiadomosci() {
  const [selected, setSelected] = useState<string|null>("w1");
  const [reply, setReply] = useState("");

  const msg = WIADOMOSCI.find(m=>m.id===selected);

  return (
    <div className="space-y-6">
      <PageHeader title="Wiadomości" subtitle="Komunikacja z kandydatami i agencją Omega"
        actions={<button className="text-sm font-bold px-4 py-2 rounded-xl text-white" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>+ Nowa wiadomość</button>}/>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" style={{height:"600px"}}>
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/8">
            <input placeholder="Szukaj wiadomości…" className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/4">
            {WIADOMOSCI.map(m=>(
              <div key={m.id} onClick={()=>setSelected(m.id)}
                className={`px-4 py-3.5 cursor-pointer hover:bg-white/4 transition-colors ${selected===m.id?"bg-accent/8 border-l-2 border-l-accent":""}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">{m.awatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${m.przeczytana?"text-fg-muted":"text-fg font-semibold"}`}>{m.nadawca}</p>
                      <p className="text-[10px] text-fg-faint flex-shrink-0">{m.czas.replace("Dzisiaj ","").replace("Wczoraj","wcz.")}</p>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${m.przeczytana?"text-fg-faint":"text-fg-muted"}`}>{m.temat}</p>
                    {!m.przeczytana && <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1"/>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 glass rounded-2xl flex flex-col overflow-hidden">
          {msg ? (
            <>
              <div className="px-5 py-4 border-b border-white/8">
                <p className="font-bold text-fg">{msg.temat}</p>
                <p className="text-xs text-fg-faint mt-0.5">Od: {msg.nadawca} · {msg.czas}</p>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent flex-shrink-0">{msg.awatar}</div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-fg max-w-prose">
                    <p>{msg.tresc}</p>
                    <p className="mt-2 text-fg-muted text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan justo non augue commodo, vel sodales magna tempus. Nunc pharetra magna at finibus condimentum.</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-white/8">
                <div className="flex gap-3 items-end">
                  <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={2}
                    placeholder="Napisz odpowiedź…"
                    className="flex-1 text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 resize-none"/>
                  <button onClick={()=>setReply("")} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>Wyślij</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <p className="text-4xl mb-3">✉️</p>
                <p className="text-sm text-fg-faint">Wybierz wiadomość z listy</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
