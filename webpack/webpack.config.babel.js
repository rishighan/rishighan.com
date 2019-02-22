import path from 'path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './dist',
  },
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true },
        },
        'ejs-html-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      inject: false,
      hash: true,
      title: 'Rishi Ghan',
      template: './public/index.ejs',
      filename: 'index.html',
      environment: 'development',
    }),
  ],
};
