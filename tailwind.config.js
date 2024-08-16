/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-brown': {
          100: '#E6CCB2',
          500: '#7F5539',
        },
      },
    },
  },
  plugins: [],
};
