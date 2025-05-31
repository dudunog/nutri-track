import { colors } from "./presentation/styles/colors";
import { fontFamily } from "./presentation/styles/font-family";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/home.tsx", "./presentation/components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },
  plugins: [],
};
