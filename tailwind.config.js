/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Unica One', 'sans-serif'],
        'karla': ['Karla', 'sans-serif'],
      },
      colors: {
        obsidian: '#0A0A0A',
        slate: '#1E1E1E',
        ghost: '#F5F5F0',
        copper: '#CC6B3C',
        'white-primary': '#FFFFFF',
        'off-white': '#FAFAFA',
        'gray-light': '#F5F5F5',
        'black-primary': '#0D0D0D',
        'gray-dark': '#333333',
        'gray-medium': '#666666',
        'bronze': '#8B7355',
        'bronze-light': '#A0826D',
      },
    },
  },
  plugins: [],
}