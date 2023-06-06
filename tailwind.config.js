const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {

        colors: {
            ...colors,
            'off-white': '#f1f1f1',
            'purple-light': '#8b74bd',
            'purple-normal': '#7953a9',
            'purple-dark': '#663399',
            'blue-light': '#567bed',
            'blue-normal': '#4066e0',
            'blue-dark': '#22277a',
            'qrl-red': '#c82b12',
            'qrl-blue': '#080078',
        },
        extend: {

            boxShadow: {
                'custom-shadow': 'rgba(17, 17, 26, 0.1) 0 4px 16px, rgba(17, 17, 26, 0.05) 0 8px 32px',
            },

            transitionProperty: {

                'max-height': 'max-height',

            },
        },
    },
    plugins: [],
};