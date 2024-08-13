import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    keyframes: {
      fadeInOut: {
        "0%": { opacity: "0" },
        "50%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
    },
    animation: {
      fadeInOut: "fadeInOut 3s ease-in-out infinite",
    },
  },
  plugins: [flowbite()],
};
