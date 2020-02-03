
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, args) => {

    const devMode = args.mode !== "production";

    console.log()

    return{

        mode:'development',
        entry:  path.resolve(__dirname, './src/index.js'),
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.[hash:4].js',
            publicPath: '/'
        },

        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },

        devServer: {
            contentBase: path.join(__dirname, '/dist'),
            compress: true,
            port: 7000,
            host:"0.0.0.0",
            stats: 'errors-only'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude:  /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
                },
                {
                    test: /\.html$/,
                    loader: "html-loader"
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: "file-loader",
                    options: {
                        publicPath: "img",
                        outputPath: "img"
                    }
                }
            ]
        },

        plugins: [

            new CleanWebpackPlugin(['dist'], {
                root: __dirname,
                verbose: true,
                dry: false
            }),

            new HtmlWebpackPlugin({
                title: 'Custom template',
                hash:false,
                // Load a custom template (lodash by default see the FAQ for details)
                template: './index.html',
                inlineSource: '.(js|css)$'
            }),

            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : "[name].[hash:4].css",
                chunkFilename: devMode ? "[id].css" : "[id].[hash:4].css"
            }),


        ]


    }


};
