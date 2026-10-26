/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040811',
          900: '#070f1e',
          850: '#091528',
          800: '#0c1b32',
          750: '#102342',
          700: '#18345c',
          650: '#1f4273',
          600: '#285591'
        },
        cyan: {
          glow: '#00f2fe',
          bright: '#00d2c4',
          teal: '#05d5b3',
          muted: '#6296b8'
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(0, 242, 254, 0.45)',
        'glow-teal': '0 0 25px -3px rgba(5, 213, 179, 0.45)',
        'card-navy': '0 12px 35px -5px rgba(2, 6, 16, 0.75)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
