const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
        'p-container-y': '1rem', // py: 4
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.p-container': {
          padding: '1rem 3rem', // py: 4, px: 12
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
      });
    },
  ],
  darkMode: 'media', // Gunakan preferensi sistem (light/dark mode)
};
