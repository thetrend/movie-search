/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('https://movies.graced.is/assets/cta_bg.png')"
      }
    },
  },
  plugins: [],
}
