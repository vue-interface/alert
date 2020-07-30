module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('tailwindcss')
                ]
            }
        }
    }
};