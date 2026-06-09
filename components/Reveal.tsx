"use client";

import {
  useEffect,
  useRef,
  useState,
  createElement,
  type ReactNode,
  type ElementType,
} from "react";

type AllowedTag = "div" | "section" | "li" | "article" | "aside" | "header" | "footer";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: AllowedTag;
};

/** Wrapper that fades + slides its children in once they enter the viewport. */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as as ElementType,
    {
      ref,
      style: { transitionDelay: `${delay}ms` },
      className: `reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
    },
    children
  );
}
