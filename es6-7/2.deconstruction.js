// 等号左边跟右边结构相等，就可以解构


// 解构叫既声明 又赋值
let arr = [1,2,3]
let a1 = arr[0]
let a2 = arr[1]
let a3 = arr[2]

console.log(a1,a2,a3);
// 等价
let [a1,a2,a3] = [1,2,3];//数组的key要对应上
console.log(a1,a2,a3);

// 
let {name, age} = {name: 'demo', age: 9}
console.log(name,age);
// -- 对象的解构 想改名可以采用：的方式 ，
let {age,name: n} = {name: 'demo', age: 9}
console.log(n,age);
// 赋默认值可以用=号
let {age,name ='zhangsan'} = {name: 'demo', age: 9}

// =可以赋默认值 ：用来更改名字的
let arr = [{name:'zfpx',age:9},'回龙观',[1,2,3]];
let [{age,address="东大街"},b] = arr;
console.log(b,age,address);

// (key对上就行，可以无序，也可以省略)
let {age} = {name: 'demo', age: 9}

// 应用
function method(url, method, data) {
// 有时候可能有些不用传，自己要判断
}
method("a","b","c");
function method({url, method, data}) {}//改
