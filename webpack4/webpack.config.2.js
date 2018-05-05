let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
// 单页 index.html 引用了 多个js
// entry:['./src/index.js','./src/a.js'],

// 多页 a.html index.js / b.html a.js
// 1.entry(写成key，value的形式) ---->  {  index:'./src/index.js', a:'./src/a.js'},
// 2.output（filename也不能写死文件名了，不然都打到一个js里去了。） ---->  filename:'[name].[hash:8].js',
// 3.HtmlWebpackPlugin也要配置两个同时指定哪些html会被自动添加script标签（template:'./src/index.html'），
// 输出的时候是否改名（ filename:'rename.html',），
// 引入的哪些js（chunks: ['index']）此处的值为entry里的key
module.exports = {
  // entry可以写一个数组
  // entry:['./src/index.js','./src/a.js'],
  entry:{ // 多入口 多出口
    index:'./src/index.js',
    a:'./src/a.js'
  },
  output:{
    filename:'[name].[hash:8].js',
    path: path.resolve('./build')
  }, 
  devServer:{
    contentBase:'./build',
    port:3000,
    compress:true,
    open:true
  },
  module:{}, 
  plugins:[
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      filename:'a.html',
      template:'./src/index.html',
      title:'珠峰架构',
      hash:true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename:'b.html',
      template: './src/index.html',
      title: '珠峰架构',
      hash: true,
      chunks:['a']
    })
  ],
  mode:'development', 
  resolve:{}, 
}