/**
 *
 */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: '/dist',
        filename: '[name].[hash:8].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? '/'
            : '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('img/[name].[hash:8].[ext]')
                    name : '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    // name: utils.assetsPath('img/[name].[hash:8].[ext]')
                    name : '[name].[hash:8].[ext]'
                }
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
                    name : '[name].[hash:8].[ext]'
                }
            }
        ]
    }
};
