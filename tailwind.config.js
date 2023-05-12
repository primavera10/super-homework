/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center: true,
      padding:{
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    colors:{
      primary: "#4f46e5",
      black:"#020617",
      lightGray: "#e5e7eb",
      violet:"#6366f1",
      red:'#ef4444',
      white:"#ffffff",
      cyan:"#14b8a6",
      darkGray:"#6b7280",
    },
    fontFamily:{
      sans: 'Carlito'
    },
    extend: {},
  },
  plugins: [],
}

