/**
 *
 */
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry : {
        app : ['babel-polyfill', './src/app.js']
    },
    output: {
        path: '',
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? ''
            : ''
    },
    module: {
        rules: [
            {}
        ]
    }
};
