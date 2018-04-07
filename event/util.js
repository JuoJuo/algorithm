// util是一个工具

// util.promisefy()

let fs = require('fs')
let path = require('path')
let util = require('util')

let read = util.promisify(fs.readFile)
read(path.join('./1.txt'), 'utf8').then(function (data) {
    console.log(data)
})



// util.inspect()  
// 打印隐藏属性  内部其实用的就是inspect
console.dir(Array.prototype, { showHidden: true })
// 类似
console.log(util.inspect(Array.prototype, { showHidden: true }))

// util.inherits() 只继承共有方法
// inherits使用的就是Object.setPrototypeOf(A.prorotype, B.prototype);
function A(){
    
}
function B(){

}
util.inherits(A, B)
// A.prototype.__proto = B.prototype;
// A.prototype = Object.create(B.prototype);







