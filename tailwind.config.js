/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      // backgroundImage: theme => ({
      //   'gradientBg': 'linear-gradient(to right, #6B49B3, #CEB7E2, #6B49B3)'
      // })
      
      // backgroundImage: theme => ({
      //   'gradientBg':  'linear-gradient(135deg, #B3E5FC, #4B0082, #E6E6FA)',
      // }),
      backgroundImage: theme => ({
        'gradientBg': 'linear-gradient(135deg, #FFA07A, #20B2AA, #87CEFA, #FFD700)',
      }),
      
      
      
    },
  },
  plugins: [],
}

