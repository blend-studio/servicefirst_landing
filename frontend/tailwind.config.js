/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sf: {
          primary: '#002F6C', // Blu ServiceFirst
          secondary: '#F05A28', // Arancione ServiceFirst
          light: '#F4F6F8',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}