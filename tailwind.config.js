/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        "light-gray": "rgb(0,0,0,0.33)",
        "light-black": "rgb(0,0,0,0.50)",
        "light-red": "rgb(251,217,211)",
        "light-blue": "#d8ecf3",
        "menu-colors": "#5577FF",
        black: "rgb(0,0,0)",
        white: "rgb(255,255,255)",
        textarea: "rgb(217,217,217,0.75)",
        background: "#F4F2EE",
        green: "rgb(26, 147, 46,0.15)",
        orange: "rgb(250, 187, 24,0.15)",
        darkgreen: "rgb(26, 147, 46)",
        darkorange: "rgb(250, 187, 24)",
      },
    },
    fontSize: {
      nano: "10px",
      chip: "12px",
      xs: "14px",
      sm: "16px",
      medium: "20px",
      lg: "36px",
    },
  },
  plugins: [],
};
