/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      transitionProperty: {
        height: "height",
      },
      animation: {
        fade: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
