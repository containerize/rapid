var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BASE_DIR = '../dist/';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, BASE_DIR),
        publicPath: "/static/",
        filename: 'static/js/bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([
            {from: 'static',to:'static'},
            {from: 'index.html'}
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        publicPath: "/",
        port: 9090
    }
};