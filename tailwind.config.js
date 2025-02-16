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
        sand: '#000000',
        'cream-100': '#000000',
      },
    },
  },
  plugins: [],
}
