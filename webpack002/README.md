babel-loader babel-core
依赖标准
babel-presets    es2015 es2016 es2017 env(从15到17以及最近最新发布的标准都包含在内)
babel-presets-react      自定义的第三方
babel-presets-stage 0-3  未来试行的标准

奇怪为什么打包的时候会报错缺这两个模块 "emojis-list" "p-try"


babel-polyfill --save   全局的，可以理解为在window下定义那些低版本浏览器不支出的函数特性，eg： generator set include。使用的时候要import

两种使用方式
@babel/runtime --save局部的而已
（@babel/plugin-transform-runtime --save-dev）

用@貌似会匹配版本