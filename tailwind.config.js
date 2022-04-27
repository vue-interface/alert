module.exports = {
    content: [
        "./index.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/variant/tailwindcss'),
        require('@vue-interface/progress-bar/tailwindcss'),
        require('./tailwindcss')
    ],
    safelist: [
        ...require('@vue-interface/variant/tailwindcss/safelist')(),
        ...require('@vue-interface/progress-bar/tailwindcss/safelist')(),
        ...require('./tailwindcss/safelist')()
    ]
};