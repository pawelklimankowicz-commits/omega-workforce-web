"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";

// Mock conversations
const THREADS = [
  {
    id: "thr_001",
    from: "Opiekun Omega Workforce",
    avatar: "Ω",
    avatarColor: "#5B8CFF",
    subject: "Rozliczenie — czerwiec 2025",
    preview: "Twoje godziny za czerwiec zostały zatwierdzone. Wypłata 28 cze.",
    date: "2025-06-07",
    unread: true,
    messages: [
      {
        id: "msg_001", sender: "Opiekun Omega Workforce", mine: false,
        text: "Cześć Dmytro! Twoje godziny za tydzień 2–8 czerwca zostały zatwierdzone przez TechMetal. Rozliczenie trafi do wypłaty 28 czerwca. W razie pytań — pisz śmiało.",
        time: "2025-06-07 14:32",
      },
    ],
  },
  {
    id: "thr_002",
    from: "Kadry Omega Workforce",
    avatar: "K",
    avatarColor: "#34D39A",
    subject: "Zaświadczenie o zatrudnieniu",
    preview: "W załączniku nowe zaświadczenie o zatrudnieniu ważne do 30.09.2025.",
    date: "2025-06-05",
    unread: false,
    messages: [
      {
        id: "msg_002", sender: "Kadry Omega Workforce", mine: false,
        text: "Cześć! Wysyłamy aktualne zaświadczenie o zatrudnieniu. Ważność dokumentu: do 30 września 2025. Pobierz z zakładki Dokumenty → Zaświadczenie o zatrudnieniu.",
        time: "2025-06-05 10:15",
      },
      {
        id: "msg_003", sender: "Ty", mine: true,
        text: "Dziękuję, pobrałem.",
        time: "2025-06-05 11:02",
      },
    ],
  },
  {
    id: "thr_003",
    from: "Opiekun Omega Workforce",
    avatar: "Ω",
    avatarColor: "#5B8CFF",
    subject: "Zmiana grafiku — 16 cze",
    preview: "Prośba o potwierdzenie dyspozycyjności w dn. 16 cze (niedziela).",
    date: "2025-06-03",
    unread: false,
    messages: [
      {
        id: "msg_004", sender: "Opiekun Omega Workforce", mine: false,
        text: "Cześć Dmytro — czy możesz pracować w niedzielę 16 czerwca? TechMetal ma pilne zlecenie na Linii A. Zmiana: 6:00–14:00. Stawka x1.5.",
        time: "2025-06-03 08:40",
      },
      {
        id: "msg_005", sender: "Ty", mine: true,
        text: "Tak, mogę. Potwierdzam.",
        time: "2025-06-03 09:05",
      },
      {
        id: "msg_006", sender: "Opiekun Omega Workforce", mine: false,
        text: "Super! Zapisuję. Godziny pojawią się w timesheet po zmianie.",
        time: "2025-06-03 09:10",
      },
    ],
  },
];

export default function WiadomosciPage() {
  const [activeThread, setActiveThread] = useState(THREADS[0].id);
  const [reply,        setReply]        = useState("");
  const [sending,      setSending]      = useState(false);
  const [localMsgs, setLocalMsgs]       = useState<Record<string, { id: string; sender: string; mine: boolean; text: string; time: string }[]>>({});

  const thread = THREADS.find(t => t.id === activeThread)!;
  const allMessages = [...(thread.messages), ...(localMsgs[activeThread] ?? [])];
  const unreadCount = THREADS.filter(t => t.unread).length;

  function sendReply() {
    if (!reply.trim() || sending) return;
    setSending(true);
    const msg = { id: `local_${Date.now()}`, sender: "Ty", mine: true, text: reply.trim(), time: new Date().toLocaleString("pl-PL") };
    setLocalMsgs(prev => ({ ...prev, [activeThread]: [...(prev[activeThread] ?? []), msg] }));
    setReply("");
    setTimeout(() => setSending(false), 400);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wiadomości"
        subtitle="Komunikacja z opiekunem Omega Workforce"
        badge={unreadCount > 0 ? { label: `${unreadCount} nowe`, color: "#5B8CFF" } : undefined}
      />

      <div className="flex gap-4 h-[600px]">
        {/* Thread list */}
        <div className="w-64 flex-shrink-0 glass rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/8">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-faint">Rozmowy</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {THREADS.map(t => (
              <button key={t.id} onClick={() => setActiveThread(t.id)}
                className={`w-full text-left px-4 py-3.5 transition-all hover:bg-white/5 ${activeThread === t.id ? "bg-white/8" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: t.avatarColor }}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold truncate ${t.unread ? "text-fg" : "text-fg-muted"}`}>{t.from}</p>
                      {t.unread && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${t.unread ? "text-fg-muted" : "text-fg-faint"}`}>{t.subject}</p>
                    <p className="text-[10px] text-fg-faint mt-0.5 truncate">{t.preview}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message thread */}
        <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col min-w-0">
          {/* Thread header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: thread.avatarColor }}>
              {thread.avatar}
            </div>
            <div>
              <p className="text-sm font-bold text-fg">{thread.subject}</p>
              <p className="text-xs text-fg-faint">{thread.from}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {allMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.mine
                    ? "text-white rounded-br-sm"
                    : "text-fg rounded-bl-sm"
                }`}
                  style={{
                    background: msg.mine
                      ? "linear-gradient(135deg,#5B8CFF,#8A5CFF)"
                      : "rgba(255,255,255,0.08)",
                  }}>
                  {msg.text}
                  <p className={`text-[10px] mt-1.5 ${msg.mine ? "text-white/60" : "text-fg-faint"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <div className="p-4 border-t border-white/8 flex gap-3">
            <textarea
              value={reply} onChange={e => setReply(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
              rows={2} placeholder="Napisz wiadomość… (Enter żeby wysłać)"
              className="field flex-1 resize-none text-sm"
            />
            <button onClick={sendReply} disabled={!reply.trim() || sending}
              className="btn-primary px-4 py-2 text-sm self-end disabled:opacity-40 flex-shrink-0">
              Wyślij →
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-fg-faint text-center">
        Pilna sprawa? Zadzwoń do opiekuna:{" "}
        <a href="tel:+48503090523" className="text-accent hover:underline font-semibold">+48 503 090 523</a>
      </p>
    </div>
  );
}
