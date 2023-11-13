import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(success|primary|warning|danger)-100/,
    },
    {
      pattern: /bg-(success|primary|warning|danger)/,
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        "purple-dark": {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              50: "#daeded",
              100: "#cee7e7",
              200: "#c1e1e1",
              300: "#9ccecf",
              400: "#52aaab",
              500: "#088587",
              600: "#07787a",
              700: "#066465",
              800: "#055051",
              900: "#044142",
              DEFAULT: "#088587",
              foreground: "#ffffff",
            },
            default: {
              100: "#ebedf5",
              DEFAULT: "#d8dbe8"
            },
            focus: "#F182F6",
          }
        },
      },
    }),
  ],
};
export default config;
