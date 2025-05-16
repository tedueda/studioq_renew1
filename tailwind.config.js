/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7ac143',
        secondary: '#ffffff',
        dark: '#121212',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}