"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Docelowa wartość (alias: `end` dla wstecznej zgodności) */
  to?: number;
  end?: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Animated number that counts up from 0 when scrolled into view. */
export function CountUp({ to, end, suffix = "", duration = 1600, className }: CountUpProps) {
  const target = to ?? end ?? 0;
  const ref     = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p      = Math.min((now - start) / duration, 1);
          const eased  = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("pl-PL")}
      {suffix}
    </span>
  );
}
