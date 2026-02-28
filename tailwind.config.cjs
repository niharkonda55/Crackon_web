/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0a0a0a",
        border: "#141414",
        text: "#e0ddd8",
        muted: "#3a3a3a",
        accent: "#c8b89a",
        danger: "#8b2020",
        success: "#1a4a2e"
      },
      fontFamily: {
        display: ["Raleway", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      letterSpacing: {
        extra: "0.35em",
        ultra: "0.5em"
      }
    }
  },
  plugins: []
};

