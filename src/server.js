/**
 * Created by BillLin on 2015/3/30.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../webpack.config.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, '192.168.8.45', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
    });
