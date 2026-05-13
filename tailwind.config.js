/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        civic: {
          teal:    '#0f766e',
          teal2:   '#115e59',
          teal3:   '#0d9488',
          gold:    '#d97706',
          jeep:    '#f59e0b',
          modern:  '#10b981',
          ebus:    '#3b82f6',
          loop:    '#a855f7',
          ferry:   '#8b5cf6',
          danger:  '#dc2626',
        },
      },
      boxShadow: {
        sheet: '0 -8px 30px rgba(0,0,0,0.15)',
        card:  '0 2px 12px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
