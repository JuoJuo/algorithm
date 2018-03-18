treeShaking

加上webpack.optimize.UglifyJsPlugin()就ok了

有些treeshaking不好使，比如lodash。
就要借助lodash-es跟babel-loader来解决

css treeshaking
purifycss-webpack glob-all

file-loader---提取图片到发布目录--修改引用图片的路径
通过调整publicPath、outputPath、useRelativePath来调整路径不对的问题
url-loader
limit设置图片大小上线，转base64的
通过调整publicPath、outputPath、useRelativePath来调整路径不对的问题
img-loader
压缩图片pugquant


post-spirte
在postcss-loader里使用，是它的插件，合成一张图用的


htmlwebpackplugin是
用于生成html以及插入各种打包后的资源文件
在html中引用文件需要加一个html-loader


webpack-dev-server
它集成了http-proxy-middleware，直接在devServer里配置proxy就行了
devServer{
    hot : true（整个页面刷新）
    hotOnly: true（自己通过书写modul.hot写局部刷新的逻辑）
}
webpack.HotModuleReplacementPlugin() 模块热更新
webpack.NamedModulePlugin()看到清晰的路径输出

由于es6，less（要在loader里加配置）等被编译后，不好调试，找不到原来的情况，sourceMap就是做一个映射
devtool方式一
devtool：
dev一般取值
eval  最快最简陋
eval-source-map  
cheap-eval-source-map 
cheap-module-eval-source-map
pro一般取值
source-map
hidden-source-map
nosource-source-map


webpack.sourtceMapDevToolPlugin方式二
webpack.EvalSourtceMapDevToolPlugin方式三
