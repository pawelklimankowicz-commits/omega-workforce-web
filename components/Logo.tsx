export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <defs>
            <linearGradient id="omega-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5B8CFF" />
              <stop offset="100%" stopColor="#8A5CFF" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#omega-g)" opacity="0.16" />
          <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="url(#omega-g)" strokeWidth="1.2" />
          {/* Symbol Ω */}
          <path
            d="M10 22.5c-3-2-4-5-3-8.2C8 10.5 11.5 8.5 16 8.5s8 2 9 5.8c1 3.2 0 6.2-3 8.2"
            fill="none"
            stroke="url(#omega-g)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M7.5 22.5h5M19.5 22.5h5" stroke="url(#omega-g)" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-fg">
        Omega<span className="text-fg-muted"> Workforce</span>
      </span>
    </span>
  );
}
