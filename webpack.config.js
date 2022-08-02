const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './debug.js',
  mode: 'development',
  devServer: {
    open: true,
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'build'),
    },
    hot: true,
    port: 8088,
    host: '0.0.0.0',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /MoneroCoreJS\.wasm$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
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
