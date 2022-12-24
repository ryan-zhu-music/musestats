/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#EBEEFF",
    },
    extend: {
      colors: {
        "dark-grey": "#484B64",
        "light-grey": "#A7A9BA",
      },
    },
  },
  plugins: [],
};
