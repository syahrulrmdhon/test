const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const publicPath = "/"
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const API_URL = {
    production: JSON.stringify('https://api.core.gredu.co/'),
    development: JSON.stringify('https://dev.api.core.gredu.co/'),
    uat: JSON.stringify('https://uat.api.core.gredu.co/'),
    qa: JSON.stringify('https://qa.api.core.gredu.co/')
}

const CODE_ANALYTIC = {
    development: JSON.stringify('UA-134459105-5'),
    production: JSON.stringify('UA-134459105-4')
}

module.exports = (env) => ({
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        compress: true
    },
    devtool: ('production' === env.TARGET_ENV ? 'source-map' : 'cheap-module-eval-source-map'),
    output: {
        path: path.resolve("build"),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js',
        publicPath: publicPath
    },
    resolve: {
        alias: {
            'history/createMemoryHistory':
                path.resolve(__dirname, 'node_modules/history/es/createMemoryHistory'),
            'history/createHashHistory':
                path.resolve(__dirname, 'node_modules/history/es/createHashHistory'),
            'history/createBrowserHistory':
                path.resolve(__dirname, 'node_modules/history/es/createBrowserHistory'),
            'history/PathUtils':
                path.resolve(__dirname, 'node_modules/history/es/PathUtils')
        }
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
                test: /\.(ttf|jpg|jpeg|woff|ico|eot|png|svg|pdf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
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
                'API_URL': API_URL[env.TARGET_ENV],
                'ANALYTIC_CODE': CODE_ANALYTIC[env.TARGET_ENV]
            }
        }),
        new CopyPlugin([
            { from: './src/assets/images/logo.ico' },
        ]),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),
        new CompressionPlugin({
            test: /\.(jpg|jpeg|woff|ico|eot|png|pdf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            algorithm: 'gzip',
            compressionOptions: { level: 9 },
            threshold: 1024,
            deleteOriginalAssets: true
        })
    ],
    optimization: {
        runtimeChunk:'single',
        splitChunks: {
            chunks:'all',
            maxInitialRequests:Infinity,
            cacheGroups: {
                default: false,
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
//     optimization: {
//         runtimeChunk: 'single',
//         splitChunks: {
//           chunks: 'all',
//           maxInitialRequests: Infinity,
//           minSize: 0,
//           cacheGroups: {
//             vendor: {
//               test: /[\\/]node_modules[\\/]/,
//               name(module) {
//                 const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
//                 return `npm.${packageName.replace('@', '')}`;
//               },
//             },
//           },
//     },
// }


});