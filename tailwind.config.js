/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f4e4bc',
        ink: '#2c2c2c',
        renaissance: {
          red: '#a52a2a',
          blue: '#4682b4',
          gold: '#d4af37',
          green: '#556b2f',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
