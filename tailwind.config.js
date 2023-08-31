/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{scss,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Barlow', 'san-serif'],
      },
      colors: {
        primary: 'hsl(233.4,58.1%,45.9%)',
        purple: 'hsl(300,100%,25.1%)',
        blue: 'hsl(213.1,91.5%,46.3%)',
        aquamarine: 'hsl(233.4,58.1%,45.9%)',
        skyblue: 'hsl(202.5,100%,46.5%)',
        gray: 'hsl(0, 0%, 50%)',
        white: 'hsl(0, 0%, 100%)',
        black: 'hsl(0, 0%, 0%)',
      },
    },
  },
  plugins: [],
}

