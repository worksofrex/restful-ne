/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": {
          DEFAULT: "#0e7490"
        },
        "text": {
          DEFAULT: "#5D6E8B",
          "red": "#ff7c6b"
        }
      },
      screens: {
        msm: "0px"
      },
      fontFamily: {
        "generalsans": ['General Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

