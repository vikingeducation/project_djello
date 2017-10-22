var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.(css)$/,
                use: ['style', 'postcss', 'css'],
            },
            {
                test: /\.(jpg|png|svg|woff|ttf)$/,
                use: 'file-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: ['sass', 'node']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ],
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
};