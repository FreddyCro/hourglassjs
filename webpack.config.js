'use strict';

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");

const entries = () => ({
  'hourglass-umd.min': '/src/index-umd.js',
  'hourglass.min': '/src/index.js',
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // new CompressionPlugin(),
    new CleanWebpackPlugin({ dry: true, protectWebpackAssets: false })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
