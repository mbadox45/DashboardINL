/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui')],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1366px',
            '3xl': '1920px',
            '4xl': '2560px',
            '4k': '3840px',
            '5k': '5120px',
            '8k': '7680px'
        }
    }
};
