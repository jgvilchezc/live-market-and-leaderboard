import type { Config } from "tailwindcss";

const brand = {
  500: "#3e63dd",
  light: "#e3e9fd",
};
const primary = "#101837";
const secondary = "#9fa2d1";
const success = "#2955a3";
const warning = "#de035e";
const white = "#ffffff";

const blue = {
  50: "#deebff",
  100: "#d7e4ff",
  200: "#a7c2ff",
  300: "#82a8fc",
  400: "#4b83ff",
  500: "#004fff",
  600: "#0040f1",
  700: "#0035e2",
  800: "#002ad6",
  900: "#0014c4",
};

const purple = {
  50: "#edf0ff",
  100: "#dce4ff",
  200: "#d1d6ff",
  300: "#c1cfff",
  400: "#7c9aff",
  500: "#436bff",
  600: "#3e63dd",
  700: "#0d33b2",
  800: "#1600a4",
  900: "#1c0d80",
};

const navy = {
  50: "#fafcff",
  100: "#f4f7fb",
  200: "#ebf0f6",
  300: "#e2efff",
  400: "#a3d3ff",
  500: "#64b5fd",
  600: "#0684f3",
  700: "#0774f3",
  800: "#043da0",
  900: "#152d76",
};

const mint = {
  50: "#e2fdff",
  100: "#b9f7fc",
  200: "#82e3fd",
  300: "#49f3ff",
  400: "#01ffda",
  500: "#69d4db",
  600: "#4abcbb",
  700: "#479998",
  800: "#0a7675",
  900: "#134646",
};

const black = {
  50: "#fcfcfc",
  100: "#f4f4f4",
  200: "#eaeaea",
  300: "#d9d9d9",
  400: "#c7c7c7",
  500: "#959595",
  600: "#8c8c8c",
  700: "#535353",
  800: "#434343",
  900: "#17191a",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        white: white,
        brand: brand,
        primary: primary,
        secondary: secondary,
        success: success,
        warning: warning,
        blue: blue,
        purple: purple,
        navy: navy,
        mint: mint,
        black: black,
        gray: black,
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
