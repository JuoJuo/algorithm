// ...的作用  在我们的函数形参中 是剩余运算符 把剩下的结果转化成数组


// 在对象中或者数组中 也可以用...
// 展开运算符 拓展运算符
let arr = [1,2,3];
let arr2 = [1,2,3];
let arr3 = [...arr, ...arr2];


let name = {name: 'zhangsan'};
let age = {age: 8};
let result = {...name, ...age}
console.log(result)

let newObj = Object.assign({}, name, age);
console.log(result)


// 
// 深拷贝 俩人没关系 浅拷贝 俩人有关系 （assign和...都是浅拷贝）
let school = {name:'zfpx',age:{age:1}}
let newSchool =Object.assign(school)
school.age.age =2;
console.log(newSchool)


// 实现一个深拷贝 不支持函数拷贝
let school = {name:'zfpx',age:{age:1},fn:function(){}}
let result = JSON.parse(JSON.stringify(school));
school.age.age =2;
console.log(result);

// 递归拷贝 保证如果是对象 生成一个空对象 将值放到对象内 
let school = {name:'zfpx',age:{age:1},arr:[1,2,3]}

function deepClone(parent,c){ // {age:1}  {}
    let child = c||{};
    for(var key in parent){
        if(parent.hasOwnProperty(key)){
            let current = parent[key];
            if(typeof current === 'object'){ //判断值是否是对象，对象另作处理
                //{age:{}}
                child[key] = Object.prototype.toString.call(current)==='[object Array]'?[]:{}
                // {age:1} {age:{}}
                deepClone(parent[key],child[key])
            }else{ 
                child[key] = parent[key];
            }
        }
    }
    return child;
}
console.log(deepClone(school));

// ----------
function mapActions(){
    return {name: 'zhangsan', age: 13}
}

let obj = {
    ...mapActions()
}
// ---------展开运算符
console.log(Math.min(1,2,4,5))
let arr = [1,2,3,4]
console.log(Math.min.apply(Math, arr))
console.log(Math.min(...arr));

// -------剩余的接收的时候转成数组，传递的时候就是展开
let fn = (...args) => {
    console.log(...args);
}
fn(4,5,6)

