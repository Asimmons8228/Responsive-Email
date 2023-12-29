const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        firstComp: './src/js/firstComp/index.js',
        // vendor: ['react'] // Corrected typo in 'react'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js/components')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env", { modules: false }]
                    ]
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
};