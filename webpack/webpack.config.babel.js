import path from "path";
import webpack from "webpack";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'rgbundle.js',
        path: path.resolve( __dirname, '../dist'),
        publicPath: '../public'
    },
    mode: "development",
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, '../src'),
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
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: '../dist',
        watchContentBase: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}