import path from 'path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  mode: 'production',
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
        'ejs-html-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: url => `./fonts/${url}`,
          },
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
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
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
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
