/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px', // Adding xs breakpoint with min-width 450px
      },
    },
  },
  plugins: [],
}
