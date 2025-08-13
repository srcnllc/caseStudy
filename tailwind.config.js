// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // toggle ile dark mod yapılabilsin
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js için
  ],
  theme: { extend: {} },
  plugins: [],
}
