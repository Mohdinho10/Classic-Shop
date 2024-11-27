/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        secondaryColor: "#EEDF7A",
      },
      fontFamily: {
        // bodyFont: ["Poppins", "sans-serif"],
        bodyFont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
