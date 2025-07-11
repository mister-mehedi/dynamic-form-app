/** @type {import('tailwindcss').Config} */
export default {
  // 1. Add the paths to all of your template files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 2. Add daisyUI as a plugin
  plugins: [require("daisyui")],
}