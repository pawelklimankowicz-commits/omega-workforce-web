"use client";

/**
 * Accessibility: skip-to-main-content link.
 * Widoczny tylko po Tab (focus). Zgodny z WCAG 2.1 2.4.1.
 * Umieść jako pierwsze dziecko <body> w layout.tsx.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => e.currentTarget.classList.add("focused")}
      onBlur={(e) => e.currentTarget.classList.remove("focused")}
    >
      Przejdź do treści głównej
    </a>
  );
}
