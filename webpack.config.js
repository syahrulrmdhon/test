const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const API_URL = {
    production: JSON.stringify('https://jsonplaceholder.typicode.com'),
    development: JSON.stringify('https://jsonplaceholder.typicode.com/development')
}
const webpack = require('webpack');
// var ROOT = path.resolve(__dirname, '..');
// var root = path.join.bind(path, ROOT);


module.exports = (env) => ({
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8080
    },
    devtool: 'source-map',
    output: {
        path: path.resolve("build"),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],

            },
            {
                test: /\.(ttf|woff|eot|png|svg|pdf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader"
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': API_URL[env.TARGET_ENV]
            }
        })

    ]
  

});