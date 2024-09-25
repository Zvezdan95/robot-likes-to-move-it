/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}', // Or adjust based on your file types
    ],
    theme: {
        extend: {
            colors: {
                'secondary': {
                    '100': '#f7f7f7',
                    '200': '#eaeaea',
                    '900': '#222222'
                },
            },
            boxShadow: {
                '12': '0 1px 12px 0 hsla(210, 11%, 7%, 0.08)',
            },
        },
    },
    plugins: [],
}

