/**
 *
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 프로젝트 루트 경로로 사용할 수 있게 한다.
const _resolve= (p='') => path.resolve( __dirname, '..', p );

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        // 루트 경로 기준으로 작성 한다.
        path: _resolve( './dist' ),
        filename: '[name].[chunkhash].js',
        publicPath: ''
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
                test: /\.js$|\.html$/,
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
