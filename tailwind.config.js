/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space-blue': '#1A237E',
        'cosmic-purple': '#6A1B9A',
        'alien-green': '#00C853',
        'galactic-black': '#121212',
        'stellar-white': '#FFFFFF',
        'nova-teal': '#00BCD4',
        'tech-slate': '#37474F',
      },
    },
  },
  plugins: [],
}
