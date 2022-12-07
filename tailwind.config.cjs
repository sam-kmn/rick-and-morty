/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: {
            DEFAULT: '#F5F8FD',
          },
          anthracite: {
            100: '#1A2328',
            80: '#484F53',
            70: '#5F6569',
            50: '#8C9193',
            25: '#C6C8C9',
          },
        },
        secondary: {
          100: '#0088DA',
          40: '#BAC6D8',
          30: '#CBD4E2',
          15: '#E5EAF0',
          10: '#EEF1F5',
          5: '#F6F8FA',
        },
        saturated: { red: { DEFAULT: '#FF2626' } },
      },
    },
  },
  plugins: [],
}
