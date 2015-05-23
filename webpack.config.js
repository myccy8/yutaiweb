/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');
var svgoConfig = JSON.stringify({
    plugins: [
        {removeTitle: true},
        {convertColors: {shorthex: false}},
        {convertPathData: false}
    ]
});
module.exports = {

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,
    devtool: 'eval',
    entry:[
        'webpack-dev-server/client?http://192.168.0.2:3000',
        'webpack/hot/only-dev-server',
        './scripts/app.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        extensions: ['', '.js'],
        alias: {
            'styles': './styles',
            'components': './scripts/components/'
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
                exclude: [/jquery.js/],
                include: path.join(__dirname, 'src'),
                loader: 'es6-loader!jsx-loader?harmony'
            }, {
                test: /\.css$/,
                loader: 'style/useable!css-loader?singleton'
            },
            {
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

};
