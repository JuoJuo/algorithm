
// fs里面有一个新增 判断文件是否存在 fs.access fs.accessSync
let fs = require('fs');//fs.readFile fs.readFileSync

let flag = fs.accessSync('./1.txt')

console.log(flag)

// 解决路径问题
let path = require('path')
// 给个文件名，他会根据当前运行的路径  给你拼出一个绝对路径
// __dirname 当前文件的所在文件的路径  他和cwd有区别
console.log(path.resolve(__dirname, '1.txt'))
console.log(process.cwd())
// 单纯的路径拼接
console.log(path.join('aaaa', 'bbbb'))
// 获取基本路径, 获取除了后缀的名字
console.log(path.basename('demo.js', '.js'))
// 获取最后一个.的内容
console.log(path.extname('demo.js'))
// window ; linux :
console.log(path.delimiter)
console.log(path.posix.delimiter)
// window \  linux /
console.log(path.sep)
console.log(path.posix.sep)

// vm 虚拟机模块 runinThisContext
let vm = require('vm')

var a = 1;
// 报错说a未定义
vm.runInThisContext('console.log(a)')
// 直接打出了1，eval是依赖于环境的
eval('console.log(a)')




