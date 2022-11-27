/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./pages/*.{tsx,js}",
    "./pages/**/*.{tsx,js}",
    "./components/*.{tsx,js}",
    "./components/**/*.{tsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        "yearn-blue": "#0657F9",
        "pop-yellow": "#FEE45D",
      },
    },
  },
  plugins: [],
}
