import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a5f",
          light: "#2d5a8f",
          dark: "#0f1f33",
        },
        secondary: {
          DEFAULT: "#9b72aa",
          light: "#b88fc7",
          dark: "#7a5588",
        },
        background: "#0f172a",
        surface: "#1e293b",
      },
    },
  },
  plugins: [],
};

export default config;
