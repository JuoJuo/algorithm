let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssTractPlugin  = require('mini-css-extract-plugin');
let webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('./build')
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    compress: true,
    open: true,
    hot: true
  },
  plugins: [
    new MiniCssTractPlugin({
      filename:'css/css.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '珠峰架构',
      hash: true,
    }),
  ],
  mode: 'development',
  resolve: {},
  module: {
    rules: [ // 从右往左写
      {
        test: /\.css$/, use: [
          MiniCssTractPlugin.loader,
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/, use: [
          MiniCssTractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
}

// 1.MiniCssTractPlugin这个插件目前有坑，热更新无效