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
        alpine: {
          50: '#f4f7f3',
          100: '#e6ede2',
          200: '#cedec7',
          300: '#a7c29c',
          400: '#7ba26d',
          500: '#5c844f',
          600: '#46683c',
          700: '#3b5732', // Secondary Green
          800: '#1f2e1a', // Primary Deep Green
          900: '#1a2717',
          950: '#0e150c',
        },
        sunshine: {
          50: '#fffdf5',
          100: '#fef7da',
          200: '#fdf0b4',
          300: '#fae383',
          400: '#f7d354',
          500: '#e5ba44', // Warm Accent Gold
          600: '#ca9b30',
          700: '#a17520',
          800: '#835c17',
          900: '#674612',
          950: '#3c2708',
        },
        modern: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
