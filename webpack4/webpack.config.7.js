let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


// 我们想抽less编译过来的，跟css打包来的到不同的css里面
let LessExtract = new ExtractTextWebpackPlugin({
  filename: 'css/less.css',
  disable:true//改用link标签引入css热更新就失效了，所以我们开发阶段就禁用抽取，配合fallback:'style-loader',来开发。
});
let cssExtract = new ExtractTextWebpackPlugin({
  filename: 'css/css.css',
  disable:true
});
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
    LessExtract,
    cssExtract,
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
        test: /\.css$/, use: cssExtract.extract({
          fallback:'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.less$/, use: LessExtract.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
      }
    ]
  }
}
