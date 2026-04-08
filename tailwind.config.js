/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#2d6a4f',
        'mint': '#74c69d',
        'offwhite': '#f8f9fa',
        'brand-dark': '#1b4332'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-green': 'linear-gradient(to right bottom, #1b4332, #2d6a4f, #74c69d)',
      }
    },
  },
  plugins: [],
}
