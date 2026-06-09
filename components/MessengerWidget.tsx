"use client";

import { useState, useEffect, useRef } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
// TODO: Przed wdrożeniem podmień numery/linki na prawdziwe dane firmy.

const BASE_MSG = encodeURIComponent("Dzień dobry, chciałem zapytać o usługi Omega Workforce.");

const MESSENGERS = [
  {
    id:    "whatsapp",
    label: "WhatsApp",
    bg:    "#25D366",
    href:  `https://wa.me/48503090523?text=${BASE_MSG}`,
    icon:  "whatsapp",
  },
  {
    id:    "telegram",
    label: "Telegram",
    bg:    "#2CA5E0",
    href:  "https://t.me/+48503090523",
    icon:  "telegram",
  },
  {
    id:    "viber",
    label: "Viber",
    bg:    "#7360F2",
    href:  "viber://chat?number=%2B48503090523",
    icon:  "viber",
  },
  {
    id:    "signal",
    label: "Signal",
    bg:    "#3A5FE5",
    href:  "https://signal.me/#p/+48503090523",
    icon:  "signal",
  },
] as const;

// ─── SVG icons ────────────────────────────────────────────────────────────────

function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
    </svg>
  );
}

function IconViber() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.4.006C8.458-.13 3.343 1.057 1.604 6.386-.373 12.298.72 16.04 1.96 17.494l.024.03v3.073c0 .613.49 1.073 1.073 1.073h3.074l.03.024c.923.796 2.18 1.378 3.618 1.758A11.57 11.57 0 0012 23.7c3.16 0 6.134-1.26 8.387-3.539C23.065 17.4 24.3 13.86 23.983 9.827c-.47-5.88-6.24-9.437-12.583-9.821zm6.027 16.21c-.39.94-1.48 1.61-2.52 1.61-.3 0-.6-.06-.87-.17-2.03-.74-5.29-2.6-7.05-4.49a18.21 18.21 0 01-3.7-6.12c-.32-.92-.09-2.09.6-2.77.36-.36.78-.55 1.23-.55.24 0 .47.05.67.15l2.35 1.05c.41.19.68.61.68 1.05v2.05c0 .42-.22.81-.58 1.03l-.84.52c.33.82.93 1.7 1.63 2.44.71.73 1.6 1.37 2.42 1.72l.51-.84c.22-.36.61-.58 1.03-.58h2.05c.44 0 .86.27 1.05.68l1.05 2.35c.19.41.16.87-.13 1.25z" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0a12 12 0 100 24A12 12 0 0012 0zm-1.26 4.05a8.04 8.04 0 016.52 3.04l.92-.92.71.71-.92.93A8.04 8.04 0 1110.74 4.05zm1.26.95a7 7 0 100 14A7 7 0 0013 5zm-1.5 2.5h3v1h-3zm-2.5 2h8v1h-8zm1 2h6v1h-6z" />
      <path d="M12 2.5a9.5 9.5 0 00-3.46.65L7.78 1.9A11 11 0 0123 12a11 11 0 01-1.9 6.22l-1.26-.76A9.5 9.5 0 0012 2.5zM2.5 12a9.5 9.5 0 001.76 5.54l-1.26.76A11 11 0 011 12c0-2.47.82-4.75 2.2-6.58l1.02.98A9.46 9.46 0 002.5 12zm2.06 6.78A9.5 9.5 0 0012 21.5a9.5 9.5 0 005.78-1.94l.98 1.02A11 11 0 0112 23a11 11 0 01-7.46-2.94l1.02-.98zM20.8 5.22l-1.02.98A9.5 9.5 0 0021.5 12a9.46 9.46 0 01-1.76 5.54l1.26.76A11 11 0 0023 12a11 11 0 00-2.2-6.78z" />
    </svg>
  );
}

const ICON_MAP = {
  whatsapp: <IconWhatsApp />,
  telegram: <IconTelegram />,
  viber:    <IconViber />,
  signal:   <IconSignal />,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function MessengerWidget() {
  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);

  // Delay mount so it doesn't block initial paint
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      aria-label="Kontakt przez komunikatory"
    >
      {/* ── Messenger list ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-end gap-2.5" aria-hidden={!open}>
        {MESSENGERS.map((m, i) => (
          <div
            key={m.id}
            className="flex items-center gap-3 transition-all duration-300"
            style={{
              opacity:    open ? 1 : 0,
              transform:  open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
              transitionDelay: open ? `${i * 55}ms` : `${(MESSENGERS.length - 1 - i) * 35}ms`,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {/* Label */}
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap select-none"
              style={{ background: "rgba(10,10,16,0.92)", color: "#F4F5F8", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {m.label}
            </span>

            {/* Button */}
            <a
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              aria-label={`Napisz na ${m.label}`}
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ background: m.bg, boxShadow: `0 4px 16px ${m.bg}55` }}
            >
              {ICON_MAP[m.icon]}
            </a>
          </div>
        ))}
      </div>

      {/* ── Main trigger button ────────────────────────────────────────────── */}
      <div className="relative flex-shrink-0">
        {/* Pulse ring — only when closed */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(91,140,255,0.3)", animationDuration: "2.2s" }} />
            <span className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(91,140,255,0.15)", animationDuration: "2.2s", animationDelay: "0.7s" }} />
          </>
        )}

        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="messenger-list"
          aria-label={open ? "Zamknij menu komunikatorów" : "Otwórz menu komunikatorów"}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background:  "linear-gradient(135deg, #5B8CFF, #8A5CFF)",
            boxShadow:   "0 8px 32px rgba(91,140,255,0.45)",
            transform:   open ? "rotate(45deg)" : "rotate(0deg)",
            transition:  "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
          }}
        >
          {open ? (
            // X icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Chat bubble icon
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Label below button — "Napisz do nas" */}
      <p
        className="text-center text-[10px] font-semibold text-fg-faint -mt-1 transition-opacity duration-300"
        style={{ opacity: open ? 0 : 1 }}
        aria-hidden
      >
        Napisz do nas
      </p>
    </div>
  );
}
