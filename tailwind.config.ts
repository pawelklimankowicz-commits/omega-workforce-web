import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#06060A",
          900: "#0A0A10",
          800: "#0E0F17",
          700: "#13141E",
          600: "#1A1C28",
        },
        line: "rgba(255,255,255,0.08)",
        accent: {
          DEFAULT: "#5B8CFF",
          violet: "#8A5CFF",
          glow:   "#6E7CFF",
        },
        signal: "#34D39A",
        amber:  "#FFB454",
        fg: {
          DEFAULT: "#F4F5F8",
          muted:   "#9CA0AD",
          faint:   "#5C6070",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        xl:   "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float:     "float 6s ease-in-out infinite",
        shimmer:   "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
