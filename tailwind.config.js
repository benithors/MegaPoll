// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-8deg)'
          },
          '50%': {
            transform: 'rotate(8deg)'
          },
        }
      },
      animation: {
        wiggle: 'wiggle 0.2s linear',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["synthwave"],
  },
};
