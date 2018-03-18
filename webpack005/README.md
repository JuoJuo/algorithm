style-loader---------------在页面里插入style标签
options: {
    // insertInto: '#id'  指定插入位置
    // singleton: 'true'  只插一个style
}


css-loader-----------------在js里可以import css的
options: {
    // alias: (解析的别名)
    // importLoader: (@import)
    // Minimize: (是否压缩)
    // modules (是否启用css-modules模块化---了解 :local :global compose)
}



style-loader/url-----link标签的方式---打包后会多css--自动插link
file-loader


less-loader

test: /\.less$/,
use: [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader'
    },
    {
        loader: 'less-loader'
    }
],


extractTextWebpackPlugin---提取css--不会自动插link--要自己写---
初次只抽取同步加载的css，

var extractTextPlugin = require('extractTextPlugin')


postcss
postcss-loader
autoprefixer给加各浏览器前缀(postcss-loader的插件)

使用通常在css跟less之间，
loader: 'postcss-loader'
options: [
    ident: 'postcss',
    plugins: [
        require('autoprefixer')()
    ]
]
