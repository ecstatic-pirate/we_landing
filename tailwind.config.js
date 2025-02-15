/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        gilda: ['Gilda Display', 'serif'],
      },
      colors: {
        navy: '#1B365D',
        sand: '#F9F6F0',
        'newspaper-bg': 'var(--newspaper-bg)',
        'newspaper-text': 'var(--newspaper-text)',
        'newspaper-accent': 'var(--newspaper-accent)',
        'cream-100': '#f4f1ea',
      },
    },
  },
  plugins: [],
}
