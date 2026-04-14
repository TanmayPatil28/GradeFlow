import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          fixed: "var(--primary-fixed)",
          "fixed-dim": "var(--primary-fixed-dim)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          variant: "var(--surface-variant)",
          bright: "var(--surface-bright)",
          dim: "var(--surface-dim)",
          "container-low": "var(--surface-container-low)",
          container: "var(--surface-container)",
          "container-high": "var(--surface-container-high)",
          "container-highest": "var(--surface-container-highest)",
          "container-lowest": "var(--surface-container-lowest)",
        },
        "on-surface": {
          DEFAULT: "var(--on-surface)",
          variant: "var(--on-surface-variant)",
        },
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        premium: "var(--shadow-premium)",
        "premium-hover": "var(--shadow-premium-hover)",
      },
      animation: {
        "shimmer-slow": "shimmer 8s linear infinite",
        "holographic": "holographic-shift 6s ease-in-out infinite",
        "float-y": "float-y 10s ease-in-out infinite",
        "border-glow": "soft-pulse 4s ease-in-out infinite",
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))",
      },
      transitionTimingFunction: {
        "premium-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "liquid-spring": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        "hud-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
