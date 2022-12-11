/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F1D1",
        secondary: {
          green: "#40AC7F",
          light_green: "#9EDEA1",
          blue: "#3134e8",
          light_blue: "#74aced",
          red: "#e02232",
          light_red: "#eb5965"
        }
    }
  },
  plugins: [],
  }
}
