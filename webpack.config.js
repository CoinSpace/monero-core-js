const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './debug.js',
  mode: 'development',
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    host: '0.0.0.0',
    port: 5000,
    before: function (app, server, compiler) {
      console.log('beofer')
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    fallback: {
      crypto: false,
      fs: false,
      path: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  optimization: {
    splitChunks: false,
  },
};
