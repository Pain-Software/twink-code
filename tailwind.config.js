/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./src/master.js"],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Poppins', "sans-serif"],
            }
        },
        plugins: [],
    }
}
