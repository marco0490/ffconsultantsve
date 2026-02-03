module.exports =  {
  content: [
    "./index.html",
    "./src/**/**/*.{scss,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Barlow', 'san-serif'],
      },
      animation: {
        'fade-in-out': 'fadeInOut 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%, 50%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
          '50.1%, 100%': { opacity: '0', transform: 'translateX(-50%) translateY(-5px)' },
        },
      },
      colors: {
        primary: 'hsl(233.4,58.1%,45.9%)',
        purple: 'hsl(300,100%,25.1%)',
        blue: 'hsl(213.1,91.5%,46.3%)',
        aquamarine: 'hsl(233.4,58.1%,45.9%)',
        skyblue: 'hsl(202.5,100%,46.5%)',
        white: 'hsl(0, 0%, 100%)',
        black: 'hsl(0, 0%, 0%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

