const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            publicPath: '/',
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        module: {
            rules: [{
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.(jpg|png)$/i,
                type: 'asset/resource',
            }],
        },
        devServer: {
            historyApiFallback: true,
            contentBase: 'static',
            compress: true,
            port: 8888,
        },
        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: 'static/index.html',
                    inject: 'body',
                    title: 'Классный мессенджер',
                },
            ),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin(envKeys),
            new CopyPlugin({
                patterns: [{
                    from: 'static/assets',
                    to: 'assets',
                }],
            }),
        ],
    };
};
