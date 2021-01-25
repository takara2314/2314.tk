import path from 'path';
import { Configuration } from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: Configuration = {
    context: path.join(__dirname, 'assets'),
    entry: './ts/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./html/index.html"
        })
    ],
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        open: true,
        port: 3000
    }
};

// webpack.config.ts が指定なしで呼ばれたとき、configを実行
export default config;