const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/screens/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins']
            },
            colors: {
                'telegram-bg': 'var(--telegram-bg-color)',
                'telegram-text': 'var(--telegram-text-color)',
                'telegram-hint': 'var(--telegram-hint-color)',
                'telegram-link': 'var(--telegram-link-color)',
                'telegram-button': 'var(--telegram-button-color)',
                'telegram-button-text': 'var(--telegram-button-text-color)',
                'telegram-secondary-bg': 'var(--telegram-secondary-bg-color)'
            }
        }
    },
    plugins: []
};
