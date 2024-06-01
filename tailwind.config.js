/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      paletteBlack: "#100B00",
      paletteBlue: "#5Da9e9",
      paletteWhite: "#fefffe",
      paletteOrange: "#ff4a1c",
      paletteGreen: "#9bc53d",
    },
    extend: {
      backgroundImage: {
        "primary-gradient": "linear-gradient(45deg, #5Da9e9, #9bc53d);",
      },
    },
  },
  plugins: [],
};
