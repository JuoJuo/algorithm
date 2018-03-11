entry: {
        main: './main.js',
        main1: './main1.js',
        jquery:["jquery"],
        vue:["vue"]
},

new CommonsChunkPlugin({
        name: ["chunk","common1","common2"],
        minChunks:2
})

jquery被打包到common1.js,
vue被打包到common2.js,
chunk.js打包的是公共的业务模块(webpack用插件CommonsChunkPlugin进行打包的时候，
将符合引用次数(minChunks)的模块打包到name参数的数组的第一个块里（chunk）,
然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，
最后一个块包含webpack生成的在浏览器上使用各个块的加载代码，
所以页面上使用的时候最后一个块必须最先加载!!!)

改进  name: ["common","jquery","vue","load"], 使用的时候必须最先加载load.js
<!-- -------------------------------------------------------------------------- -->

new CommonsChunkPlugin({
            name: "jquery",
            minChunks:2
})
main.js,main1.js共同引用的chunk1和chunk2会被打包到jquery.js里

minChunks:2修改为minChunks:Infinity后，chunk1和chunk2都打包到main.js,main1.js里

如果指定chunk

 new CommonsChunkPlugin({
            name: "jquery",
            minChunks:2,
            chunks:["main","main1"]
})
只有在main.js和main1.js中都引用的模块才会被打包的到公共模块（这里即jquery.js）


window.webpackJsonp必须最先加载