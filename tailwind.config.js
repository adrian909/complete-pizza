/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        "fastfood-red": "#FF2D55",
        "fastfood-orange": "#FF6B35",
        "fastfood-yellow": "#FFD60A",
        "fastfood-lime": "#FFC300",
        "fastfood-blue": "#0066FF",
        "fastfood-purple": "#9D4EDD",
        
        "light-bg": "#F8F9FA",
        "light-card": "#FFFFFF",
        "light-border": "#E9ECEF",
        
        "dark-bg": "#0F0F0F",
        "dark-card": "#1A1A1A",
        "dark-border": "#2D2D2D",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shine": "shine 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "slide-in": "slideIn 0.5s ease-out",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 45, 85, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 45, 85, 0.8)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 45, 85, 0.3)",
        "glow-lg": "0 0 30px rgba(255, 45, 85, 0.5)",
      },
    },
  },
  plugins: [],
}

