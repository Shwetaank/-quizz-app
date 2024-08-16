/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeInOut: "fadeInOut 4s ease-in-out infinite",
      },
    },
  },
  plugins: [flowbite()],
};
