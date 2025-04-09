/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './packages/components/**/*.{vue,js,ts,jsx,tsx},',
        './play/src/**/*.{vue,js,ts,jsx,tsx},'
    ],
    theme: {
        extend: {}
    },
    plugins: []
};
