import path from "path";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'rgbundle.js',
        path: path.resolve( __dirname, '../dist')
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
    plugins: []
}