const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        heading: ['IntegralCF', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Tambahkan warna custom sesuai dengan variabel CSS
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        heading: 'var(--color-heading)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
      },
      spacing: {
        'p-container-x': '3rem', // px: 12
        'p-container-y': '1.5rem', // py: 4
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.p-container': {
          padding: '1.5rem 3rem', // py: 4, px: 12
        },
        '.p-container-x': {
          paddingLeft: '3rem', // px: 12
          paddingRight: '3rem', // px: 12
        },
        '.bg-primary': {
          backgroundColor: 'var(--color-background-primary)',
        },
        '.bg-common-black' : {
          backgroundColor: 'var(--color-background-common-black)',
        },
        '.bg-common-white': {
          backgroundColor: 'var(--color-background-common-white)',
        },
        '.text-common-black': {
          color: 'var(--color-text-common-black)',
        },
        '.text-common-white': {
          color: 'var(--color-text-common-white)',
        },
        '.text-shadow-sm': {
          'text-shadow': '1px 2px rgb(0 0 0 / 0.1)', // Example
        },
        '.text-shadow': {
          'text-shadow': '2px 4px rgb(0 0 0 / 0.1)', // Example shadow
        },
        '.text-shadow-md': {
          'text-shadow': '4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.06)',
        },
        '.text-shadow-lg': {
          'text-shadow': '10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)',
        },
        '.text-shadow-xl': {
          'text-shadow': '20px 25px rgb(0 0 0 / 0.1), 0 10px 10px rgb(0 0 0 / 0.04)',
        },
        '.text-shadow-2xl': {
          'text-shadow': '25px 50px rgb(0 0 0 / 0.25)',
        },
      });
    },
  ],
  darkMode: 'media', // Gunakan preferensi sistem (light/dark mode)
};
