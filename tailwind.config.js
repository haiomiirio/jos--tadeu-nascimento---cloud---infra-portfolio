/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: '#FEFFF0',
          black: '#000000',
          yellow: '#FFDC58',
          pink: '#F3ABCB',
          blueLight: '#BAE6FF',
          blue: '#61BCFF',
          red: '#FF6258',
          purple: '#C5A1FF'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}
