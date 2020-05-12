const plugin = require('tailwindcss/plugin');

module.exports = {
    corePlugins: {
        container: false,
    },
    plugins: [
        require('./tailwindcss')
    ]
};