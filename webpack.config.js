const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const API_URL = {
    production: JSON.stringify('https://jsonplaceholder.typicode.com'),
    development: JSON.stringify('https://jsonplaceholder.typicode.com')
}
const webpack = require('webpack')
const Jarvis = require("webpack-jarvis");

module.exports = (env) => ({
    devServer: {
        historyApiFallback: true
    },
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "bundled.js"
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
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': API_URL[env.TARGET_ENV]
            }
        }),
        new Jarvis({
            port: 1988
        })
    ]
});