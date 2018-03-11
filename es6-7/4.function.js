function ajax(url, method){
    let self = this;
    this.method = method || 'get'
}

function ajax(url, method='get'){
    console.log(method)
}


function ajax({url=new Error('url不能为空'), method='get'}){
    console.log(method)
}

ajax('/test')

ajax('/test')

// --------------------------将函数剩下的参数编程数组,只能放在函数最后面
function sum(currency, ...argsLeft){
    return currency + eval(argsLeft.join('+'))

}
console.log(sum('$', 1,2,34,45,3))

// 箭头函数
let a = () => {}
// 写了{}就认为是函数体，所以是undefined
console.log(a())

let b = () => {return {}}
console.log(b())

let c = () => ({})
console.log(c())
// ------------
function mother(a){
    return function(b){
        return a+b
    }
}
console.log(mother(1)(2))


let fn = (a) => {
    return (b) => {
        return a+b
    }
}
// 不要return的话，就去掉大括号，等价的
let fn = (a) => (b) => a+b
// 参数只有一个还可以简化
let fn = a => b => a+b
console.log(fn(1)(2))

// 箭头函数的特点  没有function关键字  没有this指向  没有arguments
// 还是按照谁调用的就this就是谁
let name = 2;
let obj = {
    name: 1,
    fn: function(){
        setTimeout(() => {
            console.log(this.name)
        });
    }
}
let fn = obj.fn;
fn()
// let fn = obj.fn()


// 对象里没有作用域，只有 函数 全局  {} 里才有
// 而且let定义的不是window下，所以打出来依然是undefined
let name = 2;
let obj = {
    name: 1,
    fn: () => {
        console.log(this.name)
    }
}
obj.fn();