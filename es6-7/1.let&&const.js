// es6 -> es2015 babel 可以将es6转换成es5


// var 作用域的问题（会污染全局作用域）
let a = 1;
console.log(window.a)//undefinded

// var 的声明问题 可能有重复声明的问题
let b =2
let b =2//报错

// 变量提升 预解释

console.log(dog);//undefined  变量只会预解释
var dog = 'a'
console.log(dog);//function cat () {}   函数会预解释跟赋值
function cat () {
}


// 常量  不能被更改的量
const PI = 3.14
PI = 1//报错
// 引用地址不改变就行


// let 、const不会声明到window下

// {}可以表示一个作用域

let a = 1;
if (true) {
    console.log(1);
    let a = 2;
}
