/** @type {import('tailwindcss').Config} */ //Informs IDE to autocomplete based on Tailwinds official schema, helps with typos

export default {
    content: [ //Content tells Tailwind compiler which files contain UI markup
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: { //marks safe areas for our apps navigation toolbar, not hidden behind camera punch holes or iphone notches etc.
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom',
            }
        },
    },
    plugins: [],
}