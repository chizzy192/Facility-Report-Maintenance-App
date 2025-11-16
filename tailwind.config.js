/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: 'rgba(var(--primary))',
        'primary-dark': 'rgba(var(--primary-dark))',
        background: 'rgba(var(--background))',
        surface: 'rgba(var(--surface))',
        text: 'rgba(var(--text))',
        'text-muted': 'rgba(var(--text-muted))',
        border: 'rgba(var(--border))',
        success: 'rgba(var(--success))',
        warning: 'rgba(var(--warning))',
        error: 'rgba(var(--error))',
        'background-black': 'rgba(var(--background-black))',
      },
    },
  },
  plugins: [],
}