/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#484B64",
        "light-grey": "#A7A9BA",
        white: "#EBEEFF",
      },
    },
  },
  plugins: [],
};
