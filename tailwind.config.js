/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dualityBg: '#1E1830',
        dualityDeep: '#120E1E',
        guildBlue: '#2F4A8A',
        guildBlueLight: '#4364B5',
        goldPrimary: '#D4A537',
        goldLight: '#F0CF6E',
        parchmentLight: '#F5E9C9',
        parchmentMid: '#EAD7A7',
        parchmentDark: '#D5BE86',
        parchmentText: '#3B2A1A',
        ribbonRed: '#B91C1C',
        ribbonDark: '#7F1D1D'
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        fantasy: ['Cinzel', 'serif'],
        serifBody: ['"Crimson Text"', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}