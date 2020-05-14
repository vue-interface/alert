const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: [
        './src/**/*.vue'
    ],
    corePlugins: {
        container: false,
    },
    plugins: [
        require('@vue-interface/variant/tailwindcss'),
        require('./tailwindcss')
    ]
};