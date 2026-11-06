import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)", '"Lato"', "sans-serif"],
        lato: ["var(--font-lato)", '"Lato"', "sans-serif"],
      },
      colors: {
        charcoal: {
          950: "#0E0F12",
          900: "#131418",
          850: "#181A20",
          800: "#20222A",
          750: "#272A34",
          700: "#323643",
          600: "#434858",
          500: "#5F667A",
          400: "#848CA2",
          300: "#AAB2C6",
          200: "#CAD1DE",
          100: "#E9ECF3",
        },
        softgray: {
          50: "#FAFBFC",
          100: "#F4F5F8",
          200: "#ECEEF2",
          300: "#E0E3EA",
          400: "#CBD0DB",
          500: "#9CA4B3",
          600: "#6D7585",
          700: "#4A5160",
          800: "#2B313D",
          900: "#171B23",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(99, 102, 241, 0.45)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
