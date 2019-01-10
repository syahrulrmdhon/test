const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');


const API_URL = {
    production: JSON.stringify('https://jsonplaceholder.typicode.com'),
    development: JSON.stringify('https://jsonplaceholder.typicode.com/development')
}

const webpack = require('webpack');
var ROOT = path.resolve(__dirname, '..');
var root = path.join.bind(path, ROOT);


module.exports = (env) => ({
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        compress: true
    },
    devtool: ( 'production' === env.TARGET_ENV ? 'source-map' : 'cheap-module-eval-source-map' ),
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],

            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["./src/styles/"]
                    }
                }]
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
        new AsyncChunkNames(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'API_U RL': API_URL[env.TARGET_ENV]
            }
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
    
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20
                },
    
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
    

});