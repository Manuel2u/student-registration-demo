/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3748A0",
        secondary: "#2065D1",
        tertiary: "#2065D1",
        background: "#161C24",
        darktxt: "#637381",
        darkBlue: "#151a33",
        skills: "#2065D129",
        projects: "#161616",
        darknight: "#252A2F",
        icon: "#9E9E9E",
      },
      fontFamily: {
        dodoo: ["Sacramento"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
