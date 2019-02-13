const HtmlWebpackPlugin = require("html-webpack-plugin");
import path from 'path';

const SRC = path.resolve(`${__dirname }/src/`);
module.exports = {
    entry: {
        rgapp: path.resolve(`${__dirname}/src/index.js`)
    },
    output: {
        filename: 'rgbundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: "index.html"
        })
    ]
}