/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var svgoConfig = JSON.stringify({
    plugins: [
        {removeTitle: true},
        {convertColors: {shorthex: false}},
        {convertPathData: false}
    ]
});
module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'app.js'
    },

    debug: false,
    devtool: false,
    entry: './src/scripts/app.js',

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],

    resolve: {
        extensions: ['', '.js'],
        alias: {
            'styles': './src/styles',
            'components': './src/scripts/components/'
        }
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: [/node_modules/, /services/,/uploadify/,/mixins/,/index/,/character/],
            loader: 'jsxhint'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'react-hot!jsx-loader?harmony'
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        },
            {
                test: /\.js$/,
                loader: 'es6-loader!jsx-loader?harmony'
            }, {
                test: /\.css$/,
                loader: 'style/useable!css'
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.svg/,
                loaders: [
                    'file-loader',
                    'svgo-loader?' + svgoConfig
                ]
            }, {
                test: /\.woff$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.woff2$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.ttf$/,
                loader: "file-loader"
            },
            {
                test: /\.eot$/,
                loader: "file-loader"
            },]
    },
    jshint: {
        emitErrors: false
    }
};
