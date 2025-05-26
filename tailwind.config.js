export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                euroleague: '#E67E22',
                eurocup: '#3498DB',
            },
        },
    },
    plugins: [],
};
