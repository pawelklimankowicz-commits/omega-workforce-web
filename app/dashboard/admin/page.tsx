"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_USERS } from "@/lib/mock-users";

type Tab = "pulpit" | "weryfikacja" | "pracodawcy" | "pracownicy" | "oferty" | "maile" | "raporty" | "dziennik" | "ustawienia";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: "accent"|"signal"|"amber"|"red"|"faint" }) {
  const s = { accent:"border-accent/25 bg-accent/10 text-accent", signal:"border-signal/25 bg-signal/10 text-signal", amber:"border-amber-400/25 bg-amber-400/10 text-amber-300", red:"border-red-400/25 bg-red-400/10 text-red-300", faint:"border-white/10 bg-white/5 text-fg-faint" };
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${s[color]}`}>{label}</span>;
}

function Avatar({ name, color = "#5B8CFF" }: { name: string; color?: string }) {
  const i = name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{background:`linear-gradient(135deg,${color},${color}99)`}}>{i}</div>;
}

function Stat({ label, value, color="text-accent" }: { label:string; value:string|number; color?:string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs text-fg-faint uppercase tracking-wider">{label}</p>
      <p className={`text-4xl font-black mt-2 ${color}`}>{value}</p>
    </div>
  );
}

// ─── Tab: Pulpit ──────────────────────────────────────────────────────────────

function TabPulpit() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Oczekuje weryfikacji" value="4" color="text-amber-300"/>
        <Stat label="Aktywni pracodawcy" value="12" color="text-accent"/>
        <Stat label="Aktywni pracownicy" value="87" color="text-signal"/>
        <Stat label="Oferty pracy" value="23" color="text-purple-400"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Ostatnie wnioski do weryfikacji</p>
          <div className="space-y-3">
            {[
              { name:"TechNova Sp. z o.o.", type:"Pracodawca", date:"10 cze 2026", status:"oczekuje" },
              { name:"Dmytro Petrenko", type:"Pracownik", date:"10 cze 2026", status:"oczekuje" },
              { name:"BudMaster Polska", type:"Pracodawca", date:"9 cze 2026", status:"oczekuje" },
              { name:"Olena Kovalchuk", type:"Pracownik", date:"9 cze 2026", status:"oczekuje" },
            ].map(r=>(
              <div key={r.name} className="flex items-center gap-3 py-2 border-b border-white/6 last:border-0">
                <Avatar name={r.name} color={r.type==="Pracodawca"?"#5B8CFF":"#34D39A"}/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-fg truncate">{r.name}</p>
                  <p className="text-xs text-fg-faint">{r.type} · {r.date}</p>
                </div>
                <Badge label={r.status} color="amber"/>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Alerty systemowe</p>
          <div className="space-y-2">
            {[
              { sev:"red",    text:"2 konta zawieszone automatycznie (brak aktywności 90 dni)" },
              { sev:"amber",  text:"Certyfikat SSL wygasa za 14 dni" },
              { sev:"amber",  text:"5 pracowników z wygasającymi dokumentami" },
              { sev:"accent", text:"Backup bazy danych: OK (dzisiaj 03:00)" },
              { sev:"signal", text:"Wysłano 47 automatycznych maili w tym tygodniu" },
            ].map((a,i)=>(
              <div key={i} className={`flex gap-3 p-3 rounded-xl text-xs ${a.sev==="red"?"bg-red-400/8 border border-red-400/15":a.sev==="amber"?"bg-amber-400/8 border border-amber-400/15":a.sev==="accent"?"bg-accent/8 border border-accent/15":"bg-signal/8 border border-signal/15"}`}>
                <span className={`mt-0.5 flex-shrink-0 ${a.sev==="red"?"text-red-400":a.sev==="amber"?"text-amber-300":a.sev==="accent"?"text-accent":"text-signal"}`}>●</span>
                <span className="text-fg-muted">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Weryfikacja ─────────────────────────────────────────────────────────

function TabWeryfikacja() {
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState<Record<string,string>>({});
  const wnioski = [
    { id:"w1", name:"TechNova Sp. z o.o.", type:"pracodawca", date:"10 cze 2026", doc:"KRS, NIP", email:"kontakt@technova.pl" },
    { id:"w2", name:"Dmytro Petrenko",     type:"pracownik",  date:"10 cze 2026", doc:"CV, dowód", email:"d.petrenko@mail.com" },
    { id:"w3", name:"BudMaster Polska",    type:"pracodawca", date:"9 cze 2026",  doc:"KRS, REGON", email:"biuro@budmaster.pl" },
    { id:"w4", name:"Olena Kovalchuk",     type:"pracownik",  date:"9 cze 2026",  doc:"CV, paszport", email:"o.kovalchuk@mail.com" },
  ];
  const toggle = (id:string) => setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-fg-muted">Wnioski oczekujące na weryfikację dokumentów i aktywację konta.</p>
        {selected.length>0 && (
          <button className="text-xs px-3 py-1.5 rounded-lg bg-signal/15 text-signal border border-signal/25 hover:bg-signal/25 transition-colors">
            Zaakceptuj zaznaczone ({selected.length})
          </button>
        )}
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>
              <th className="px-4 py-3 w-8"><input type="checkbox" className="accent-accent"/></th>
              {["Wnioskodawca","Typ","Data","Dokumenty","E-mail","Akcje"].map(h=>(
                <th key={h} className="text-left px-4 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wnioski.map(w=>(
              <tr key={w.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3.5">
                  <input type="checkbox" checked={selected.includes(w.id)} onChange={()=>toggle(w.id)} className="accent-accent"/>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Avatar name={w.name} color={w.type==="pracodawca"?"#5B8CFF":"#34D39A"}/>
                    <span className="font-semibold text-fg">{w.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5"><Badge label={w.type} color={w.type==="pracodawca"?"accent":"signal"}/></td>
                <td className="px-4 py-3.5 text-fg-muted text-xs">{w.date}</td>
                <td className="px-4 py-3.5 text-fg-muted text-xs">{w.doc}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-fg-faint">{w.email}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs px-2.5 py-1 rounded-lg bg-signal/15 text-signal border border-signal/20 hover:bg-signal/25 transition-colors">✓ Akceptuj</button>
                    <button className="text-xs px-2.5 py-1 rounded-lg bg-red-400/10 text-red-300 border border-red-400/20 hover:bg-red-400/20 transition-colors">✕ Odrzuć</button>
                  </div>
                  <input value={note[w.id]??""} onChange={e=>setNote(n=>({...n,[w.id]:e.target.value}))}
                    placeholder="Powód odrzucenia…" className="mt-1.5 w-full text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Pracodawcy ──────────────────────────────────────────────────────────

function TabPracodawcy() {
  const [filter, setFilter] = useState("wszystkie");
  const firmy = [
    { name:"TechMetal Sp. z o.o.", nip:"1234567890", email:"firma@demo.pl",     status:"aktywny",    oferty:3, data:"1 lut 2026" },
    { name:"BudMaster Polska",     nip:"9876543210", email:"bm@budmaster.pl",   status:"aktywny",    oferty:1, data:"15 mar 2026" },
    { name:"LogiTrans SA",         nip:"5551234567", email:"hr@logitrans.pl",   status:"zawieszony", oferty:0, data:"20 sty 2026" },
    { name:"Omega Steel Sp.k.",    nip:"1112223334", email:"kadry@omsteel.pl",  status:"aktywny",    oferty:5, data:"5 kwi 2026" },
  ];
  const filtered = filter==="wszystkie"?firmy:firmy.filter(f=>f.status===filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["wszystkie","aktywny","zawieszony"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${filter===f?"bg-accent/20 text-accent border-accent/30":"border-white/10 text-fg-faint hover:text-fg"}`}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>{["Firma","NIP","E-mail","Status","Oferty","Rejestracja","Akcje"].map(h=>(
              <th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(f=>(
              <tr key={f.nip} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5"><div className="flex items-center gap-2"><Avatar name={f.name}/><span className="font-semibold text-fg">{f.name}</span></div></td>
                <td className="px-5 py-3.5 font-mono text-xs text-fg-faint">{f.nip}</td>
                <td className="px-5 py-3.5 text-xs text-fg-muted">{f.email}</td>
                <td className="px-5 py-3.5"><Badge label={f.status} color={f.status==="aktywny"?"signal":"amber"}/></td>
                <td className="px-5 py-3.5 text-fg-muted">{f.oferty}</td>
                <td className="px-5 py-3.5 text-xs text-fg-faint">{f.data}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 rounded border border-white/10 text-fg-faint hover:text-fg hover:border-white/25 transition-colors">Podgląd</button>
                    <button className="text-xs px-2 py-1 rounded border border-amber-400/20 text-amber-300 hover:bg-amber-400/10 transition-colors">{f.status==="aktywny"?"Zawieś":"Aktywuj"}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Pracownicy ──────────────────────────────────────────────────────────

function TabPracownicy() {
  const pracownicy = [
    { name:"Dmytro Kovalenko",  email:"pracownik@demo.pl",  status:"aktywny",    flaga:"🇺🇦", aplikacje:3, data:"15 sty 2026" },
    { name:"Olena Marchuk",     email:"o.marchuk@mail.com", status:"aktywny",    flaga:"🇺🇦", aplikacje:1, data:"20 lut 2026" },
    { name:"Vasyl Bondarenko",  email:"v.bond@mail.com",    status:"zawieszony", flaga:"🇺🇦", aplikacje:0, data:"3 mar 2026" },
    { name:"Natalia Petrova",   email:"n.petrova@mail.com", status:"aktywny",    flaga:"🇺🇦", aplikacje:5, data:"10 kwi 2026" },
    { name:"Taras Shevchuk",    email:"t.shev@mail.com",    status:"aktywny",    flaga:"🇺🇦", aplikacje:2, data:"1 maj 2026" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input placeholder="Szukaj pracownika…" className="flex-1 max-w-xs text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
        <button className="text-xs px-3 py-2 rounded-xl border border-white/10 text-fg-faint hover:text-fg transition-colors">Eksport CSV</button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>{["Pracownik","E-mail","Status","Kraj","Aplikacje","Rejestracja","Akcje"].map(h=>(
              <th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {pracownicy.map(p=>(
              <tr key={p.email} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5"><div className="flex items-center gap-2"><Avatar name={p.name} color="#34D39A"/><span className="font-semibold text-fg">{p.name}</span></div></td>
                <td className="px-5 py-3.5 text-xs text-fg-muted">{p.email}</td>
                <td className="px-5 py-3.5"><Badge label={p.status} color={p.status==="aktywny"?"signal":"amber"}/></td>
                <td className="px-5 py-3.5 text-lg">{p.flaga}</td>
                <td className="px-5 py-3.5 text-fg-muted">{p.aplikacje}</td>
                <td className="px-5 py-3.5 text-xs text-fg-faint">{p.data}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 rounded border border-white/10 text-fg-faint hover:text-fg transition-colors">Podgląd</button>
                    <button className="text-xs px-2 py-1 rounded border border-red-400/20 text-red-300 hover:bg-red-400/10 transition-colors">Flaga</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Oferty pracy ────────────────────────────────────────────────────────

function TabOferty() {
  const oferty = [
    { title:"Operator CNC",         firma:"TechMetal Sp. z o.o.", data:"1 cze 2026",  wygasa:"1 sie 2026",  aplikacje:12, status:"aktywna" },
    { title:"Spawacz TIG/MIG",      firma:"Omega Steel Sp.k.",    data:"15 maj 2026", wygasa:"15 lip 2026", aplikacje:8,  status:"aktywna" },
    { title:"Kierowca kat. C+E",    firma:"LogiTrans SA",         data:"10 kwi 2026", wygasa:"10 cze 2026", aplikacje:3,  status:"wygasła" },
    { title:"Pracownik magazynowy", firma:"BudMaster Polska",     data:"20 maj 2026", wygasa:"20 lip 2026", aplikacje:21, status:"aktywna" },
    { title:"Monter instalacji",    firma:"BudMaster Polska",     data:"5 cze 2026",  wygasa:"5 sie 2026",  aplikacje:6,  status:"aktywna" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input placeholder="Szukaj oferty…" className="flex-1 max-w-xs text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
        <select className="text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-fg-muted focus:outline-none">
          <option>Wszystkie statusy</option><option>Aktywne</option><option>Wygasłe</option>
        </select>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>{["Stanowisko","Firma","Dodana","Wygasa","Aplikacje","Status","Akcje"].map(h=>(
              <th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {oferty.map((o,i)=>(
              <tr key={i} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-fg">{o.title}</td>
                <td className="px-5 py-3.5 text-xs text-fg-muted">{o.firma}</td>
                <td className="px-5 py-3.5 text-xs text-fg-faint">{o.data}</td>
                <td className="px-5 py-3.5 text-xs text-fg-faint">{o.wygasa}</td>
                <td className="px-5 py-3.5 text-fg-muted">{o.aplikacje}</td>
                <td className="px-5 py-3.5"><Badge label={o.status} color={o.status==="aktywna"?"signal":"faint"}/></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 rounded border border-white/10 text-fg-faint hover:text-fg transition-colors">Podgląd</button>
                    <button className="text-xs px-2 py-1 rounded border border-red-400/20 text-red-300 hover:bg-red-400/10 transition-colors">Ukryj</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Szablony maili ──────────────────────────────────────────────────────

function TabMaile() {
  const [active, setActive] = useState(0);
  const szablony = [
    { name:"Rejestracja przyjęta",    trigger:"Auto po rejestracji",     vars:["{imię}","{typ_konta}"] },
    { name:"Konto aktywowane",        trigger:"Po akceptacji przez admina",vars:["{imię}","{link_logowania}"] },
    { name:"Konto odrzucone",         trigger:"Po odrzuceniu",           vars:["{imię}","{powód}"] },
    { name:"Konto zawieszone",        trigger:"Po zawieszeniu",          vars:["{imię}","{data_zawieszenia}","{powód}"] },
    { name:"Reset hasła",             trigger:"Na żądanie użytkownika",  vars:["{imię}","{link_reset}","{ważność}"] },
    { name:"Nowa aplikacja",          trigger:"Do pracodawcy",           vars:["{firma}","{stanowisko}","{kandydat}"] },
    { name:"Zaproszenie na rozmowę",  trigger:"Do kandydata",            vars:["{imię}","{firma}","{data}","{miejsce}"] },
    { name:"Aplikacja odrzucona",     trigger:"Do kandydata",            vars:["{imię}","{stanowisko}","{firma}"] },
  ];
  const s = szablony[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="glass rounded-2xl overflow-hidden">
        <p className="text-xs font-bold uppercase tracking-widest text-fg-faint px-4 py-3 border-b border-white/8">Szablony</p>
        <div className="divide-y divide-white/4">
          {szablony.map((t,i)=>(
            <button key={i} onClick={()=>setActive(i)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors ${i===active?"bg-accent/10 text-accent":"text-fg-muted hover:bg-white/4 hover:text-fg"}`}>
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="glass rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-fg">{s.name}</h3>
            <Badge label={s.trigger} color="faint"/>
          </div>
          <div>
            <p className="text-xs text-fg-faint mb-2">Temat maila</p>
            <input defaultValue={`Omega Workforce — ${s.name}`} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
          </div>
          <div>
            <p className="text-xs text-fg-faint mb-2">Treść (HTML/tekst)</p>
            <textarea rows={6} defaultValue={`Szanowna/y ${s.vars[0]},\n\nInformujemy, że: ${s.name.toLowerCase()}.\n\nPozdrawiamy,\nZespół Omega Workforce`}
              className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50 resize-none font-mono"/>
          </div>
          <div>
            <p className="text-xs text-fg-faint mb-2">Dostępne zmienne</p>
            <div className="flex flex-wrap gap-2">{s.vars.map(v=><code key={v} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded border border-accent/20">{v}</code>)}</div>
          </div>
          <div className="flex gap-2 pt-1">
            <button className="text-sm px-4 py-2 rounded-xl text-fg-faint border border-white/10 hover:border-white/25 hover:text-fg transition-colors">Podgląd</button>
            <button className="text-sm px-4 py-2 rounded-xl text-white font-semibold transition-all" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>Zapisz szablon</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Raporty ─────────────────────────────────────────────────────────────

function TabRaporty() {
  const stats = [
    { label:"Rejestracji (maj 2026)",    value:"34",   trend:"+12%", up:true },
    { label:"Aktywność (avg logowań/dzień)", value:"67", trend:"+5%",  up:true },
    { label:"Skuteczność ofert",          value:"38%",  trend:"-2%",  up:false },
    { label:"Zawieszeń / usunięć",        value:"3",    trend:"-50%", up:true },
  ];
  const raporty = [
    { name:"Raport rejestracji — maj 2026",    format:"CSV",  size:"48 KB" },
    { name:"Aktywność użytkowników — Q2 2026", format:"XLSX", size:"124 KB" },
    { name:"Skuteczność ofert — 2026",         format:"PDF",  size:"2.1 MB" },
    { name:"Zestawienie zawieszeń — 2026",     format:"CSV",  size:"22 KB" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s=>(
          <div key={s.label} className="glass rounded-2xl p-4">
            <p className="text-xs text-fg-faint">{s.label}</p>
            <p className="text-3xl font-black text-accent mt-1">{s.value}</p>
            <p className={`text-xs mt-1 font-semibold ${s.up?"text-signal":"text-red-400"}`}>{s.trend} vs poprz. okres</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Rejestracje — ostatnie 6 miesięcy</p>
          <div className="flex items-end gap-2 h-32">
            {[18,24,31,28,34,22].map((v,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-accent/40 hover:bg-accent/70 transition-colors" style={{height:`${(v/34)*100}%`}}/>
                <span className="text-[10px] text-fg-faint">{["S","L","M","K","M","C"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint mb-4">Dostępne raporty do pobrania</p>
          <div className="space-y-2">
            {raporty.map(r=>(
              <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/6 hover:border-white/15 transition-colors">
                <div className="text-xs font-bold px-2 py-1 rounded bg-accent/15 text-accent">{r.format}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-fg truncate">{r.name}</p>
                  <p className="text-xs text-fg-faint">{r.size}</p>
                </div>
                <button className="text-xs text-accent hover:underline">Pobierz</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Dziennik zdarzeń ────────────────────────────────────────────────────

function TabDziennik() {
  const logi = [
    { ts:"2026-06-10 14:32",user:"admin@omegaworkforce.pl", action:"Akceptacja konta",   target:"TechMetal Sp. z o.o.", ip:"192.168.1.1" },
    { ts:"2026-06-10 13:15",user:"firma@demo.pl",           action:"Logowanie",          target:"—",                   ip:"78.32.11.22" },
    { ts:"2026-06-10 12:44",user:"admin@omegaworkforce.pl", action:"Odrzucenie wniosku", target:"LogiTrans SA",         ip:"192.168.1.1" },
    { ts:"2026-06-10 11:30",user:"pracownik@demo.pl",       action:"Pobranie dokumentu", target:"Umowa_06_2026.pdf",   ip:"91.44.55.66" },
    { ts:"2026-06-10 10:05",user:"firma@demo.pl",           action:"Zatwierdzenie godzin",target:"Dmytro Kovalenko",   ip:"78.32.11.22" },
    { ts:"2026-06-10 09:21",user:"admin@omegaworkforce.pl", action:"Zawieszenie konta",  target:"LogiTrans SA",        ip:"192.168.1.1" },
    { ts:"2026-06-09 17:50",user:"pracownik@demo.pl",       action:"Złożenie wniosku",   target:"Wniosek urlopowy",    ip:"91.44.55.66" },
    { ts:"2026-06-09 16:33",user:"firma@demo.pl",           action:"Wystawienie faktury",target:"FV/2026/06/003",      ip:"78.32.11.22" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input placeholder="Filtruj po użytkowniku lub akcji…" className="flex-1 max-w-sm text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent/50"/>
        <button className="text-xs px-3 py-2 rounded-xl border border-white/10 text-fg-faint hover:text-fg transition-colors">Eksport logów</button>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/8">
            <tr>{["Czas","Użytkownik","Akcja","Cel","IP"].map(h=>(
              <th key={h} className="text-left px-5 py-3 text-xs text-fg-faint uppercase tracking-wider font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {logi.map((l,i)=>(
              <tr key={i} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-fg-faint">{l.ts}</td>
                <td className="px-5 py-3 text-xs text-fg-muted">{l.user}</td>
                <td className="px-5 py-3 text-sm text-fg font-medium">{l.action}</td>
                <td className="px-5 py-3 text-xs text-fg-muted">{l.target}</td>
                <td className="px-5 py-3 font-mono text-xs text-fg-faint">{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Ustawienia systemu ──────────────────────────────────────────────────

function TabUstawienia() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <div className="glass rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Konfiguracja SMTP</p>
          {[["Serwer SMTP","smtp.omegaworkforce.pl"],["Port","587"],["Użytkownik","noreply@omegaworkforce.pl"],["Nadawca","Omega Workforce <noreply@omegaworkforce.pl>"]].map(([l,v])=>(
            <div key={l}>
              <p className="text-xs text-fg-faint mb-1">{l}</p>
              <input defaultValue={v} className="w-full text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-fg focus:outline-none focus:border-accent/50"/>
            </div>
          ))}
        </div>
        <div className="glass rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Bezpieczeństwo</p>
          {[["Minimalna długość hasła","8"],["Czas wygasania sesji (h)","8"],["Maks. nieudanych logowań","5"]].map(([l,v])=>(
            <div key={l} className="flex items-center justify-between">
              <span className="text-sm text-fg-muted">{l}</span>
              <input defaultValue={v} className="w-16 text-sm text-center bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-fg focus:outline-none focus:border-accent/50"/>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="glass rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Zarządzanie administratorami</p>
          {MOCK_USERS.filter(u=>u.role==="admin").map(u=>(
            <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/4">
              <Avatar name={u.name} color="#e63946"/>
              <div className="flex-1">
                <p className="text-sm font-semibold text-fg">{u.name}</p>
                <p className="text-xs text-fg-faint">{u.email}</p>
              </div>
              <Badge label="admin" color="red"/>
            </div>
          ))}
          <button className="w-full text-xs py-2 rounded-xl border border-dashed border-white/15 text-fg-faint hover:text-fg hover:border-white/30 transition-colors">+ Dodaj administratora</button>
        </div>
        <div className="glass rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-fg-faint">Tryb systemu</p>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/4">
            <span className="text-sm text-fg-muted">Tryb konserwacji</span>
            <button className="w-10 h-5 rounded-full bg-white/10 border border-white/15 relative transition-colors hover:bg-white/20">
              <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white/40 transition-transform"/>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/4">
            <span className="text-sm text-fg-muted">Rejestracja otwarta</span>
            <button className="w-10 h-5 rounded-full border border-signal/40 relative transition-colors" style={{background:"rgba(52,211,154,0.3)"}}>
              <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-signal transition-transform"/>
            </button>
          </div>
        </div>
        <button onClick={save} className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all" style={{background:"linear-gradient(135deg,#5B8CFF,#8A5CFF)"}}>
          {saved?"✓ Zapisano":"Zapisz ustawienia"}
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const PAGE_TITLES: Record<Tab,string> = {
  pulpit:      "Dashboard",
  weryfikacja: "Kolejka weryfikacji",
  pracodawcy:  "Pracodawcy",
  pracownicy:  "Pracownicy",
  oferty:      "Oferty pracy",
  maile:       "Szablony maili",
  raporty:     "Raporty & statystyki",
  dziennik:    "Dziennik zdarzeń",
  ustawienia:  "Ustawienia systemu",
};

function AdminDashboardInner() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") ?? "pulpit") as Tab;

  const render = () => {
    switch(tab) {
      case "pulpit":      return <TabPulpit/>;
      case "weryfikacja": return <TabWeryfikacja/>;
      case "pracodawcy":  return <TabPracodawcy/>;
      case "pracownicy":  return <TabPracownicy/>;
      case "oferty":      return <TabOferty/>;
      case "maile":       return <TabMaile/>;
      case "raporty":     return <TabRaporty/>;
      case "dziennik":    return <TabDziennik/>;
      case "ustawienia":  return <TabUstawienia/>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-fg">{PAGE_TITLES[tab]}</h1>
        <p className="text-sm text-fg-muted mt-1">Panel Administratora · Omega Workforce</p>
      </div>
      {render()}
    </div>
  );
}

export default function AdminDashboard() {
  return <Suspense><AdminDashboardInner/></Suspense>;
}
