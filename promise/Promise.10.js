// generator用*标识，用yeild（暂停，产出）
function* read() {
    console.log(1)
    let a = yield 'zhufeng';
    console.log(a)
    let b = yield 9;
    console.log(b)
    return b;
}
// 返回一个迭代器
let it = read();

// yeild的值是放在迭代器的value字段里的
console.log(it.next())//1 {value: 'zhufeng', done: false}-----执行的代码console.log(1)  yield 'zhufeng';
console.log(it.next())//undefined { value: 9, done: false }-----执行的代码let a = console.log(a)  yield 9;
console.log(it.next('这个参数是传给b的'))//这个参数是传给b的 { value: 9, done: false }


// generator用 通常跟promise搭配使用
let bluebird = require('bluebird')
let fs = require('fs')
let read = bluebird.promisify(fs.read);

function* r() {
    let res1 = yield read('./promise.0.js', 'utf8')
    let res2 = yield read(res1, 'utf8')
    return res2;
}

// let it = r();
// it.next().value.then((data) => {
//     it.next(data).value.then((data) => {
//         console.log(it.next(data).value)
//     })
// })


// 这么写太痛苦了，co库
let co = require('co')
co(r()).then((res2) => {
    console.log(res2)
})

function co(it) {
    return new Promise(function (resolve, reject) {
        function next(d) {
            let { value, done } = it.next(d);
            if (!done) {
                value.then((data) => {
                    next(data)
                }, reject)
            } else {
                resolve(value)
            }
        }
        next();
    })
}



