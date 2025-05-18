/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
fontFamily: {
  sans: ['Montserrat', 'system-ui', 'sans-serif'],
  serif: ['Lora', 'Georgia', 'serif'],
},
      colors: {
        green: {
          800: '#2D3A24',
          700: '#3D4A34',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
