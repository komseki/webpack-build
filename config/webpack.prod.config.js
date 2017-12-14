const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('.');
const webpackBaseConfig = require('./webpack.base.config');

console.log(path.posix.join( 'static', 'css/[name].css' ));

/**
 * devtool : {@link https://webpack.js.org/configuration/devtool/#production}
 * EnvironmentPlugin : {@Link https://webpack.js.org/plugins/environment-plugin/#usage-with-default-values}
 */
module.exports = merge(webpackBaseConfig, {

    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    plugins: [
        // https://webpack.js.org/plugins/environment-plugin/#usage-with-default-values
        new webpack.EnvironmentPlugin({
            NODE_ENV: config.prod.NODE_ENV,
            DEBUG: false
        }),
        // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
        new UglifyJsPlugin({
            uglifyOptions:{
                compress : {
                    warnings: false
                }
            },
            sourceMap: true,
            parallel: false
        }),
        new ExtractTextPlugin({
            filename: path.posix.join( 'static', 'css/[name].[contenthash].css' ),
            // set the following option to `true` if you want to extract CSS from
            // codesplit chunks into this main css file as well.
            // This will result in *all* of your app's CSS being loaded upfront.
            allChunks: false,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.prod.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // https://webpack.js.org/plugins/no-emit-on-errors-plugin/
        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            allChunks: false
        }),

        // https://webpack.js.org/plugins/html-webpack-plugin/
        // https://github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true,
                removeComments: true
            },
            chunksSortMode : 'dependency'
        })
    ]
});
