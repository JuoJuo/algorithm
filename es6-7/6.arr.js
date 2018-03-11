// Array.from()

// 将类数组转化成数组  arguments dom对象
let arr =  Array.from({0:1,1:2,length:2})
console.log(arr);
// Array.from = Array.prototype.slice.call(arguments,0)
let result = Array.prototype.slice.call({0:1,1:2,length:2},0);


// ... 需要当前类数组有‘迭代器’     
// Array.from可以没有迭代器
// 什么是迭代器，迭代器需要返回一个对象， 他上面有一个next方法， 每次调用next方法，会返回一个新对象
console.log([...{0:1,1:2,length:2}]);//报错说这个对象不能被迭代
console.log([...{0:1,1:2,length:2, [Symbol.iterator]:function(){
    let index = 0;//当前迭代到了第几个
    let self = this;
    return {
        next: function(){//value代表的是当前的内容， done代表的是是否迭代完成
            return {value: self[index], done: index++ === self.length ? true : false}
        }
    }
}}]);


// 其他方法

console.log(Array.of(3));// [3]
console.log(Array(3)); // new Array(3)
console.log(Array(3).fill(3));//[ 3, 3, 3 ]

// reduce map filter some every forEach es5
// find findIndex es6
// includes  es7

// prev代表的是数组的第一项
// next代表的数组的第二项
// currentIndex当前迭代到了第几项
// current原数组
// reduce会将执行后的结果来作为下一次的prev
console.log([1,2,3,4,5].reduce((prev, next, currentIndex, current) => {
    return prev + next
}))
// 附加项目，不会改变数组的length  但是是在最前面
console.log([1,2,3,4,5].reduce((prev, next, currentIndex, current) => {
    console.log(prev, next, currentIndex, current.length)
    return prev + next
},15))

// reduce收敛 叠加
Array.prototype.myReduce = function(callback){
    let prev = this[0]; //数组的第一项
    for(var i = 1; i < this.length; i++){
        prev = callback(prev,this[i],i,this);
    }
    return prev
}
// 附加值的实现
Array.prototype.myReduce = function(callback,pre){
    // 看有没有pre 有就有传进来的 没有就用数组的第一项
    let prev = pre || this[0]; //数组的第一项
    for(var i = pre ? 0 : 1; i < this.length; i++){
        prev = callback(prev,this[i],i,this);
    }
    return prev
}

//reduce(收敛) map(映射) filter(过滤) some(找有没有满足条件的) every(和some相反) 
// findIndex find(看能不能找到) each(循环)
let newArr = [1,2,3].map((item, index) => {
    return `<li>${item}</li>`;
});
console.log(newArr);

// 简单实现--不返回true false的情况
Array.prototype.myFilter = function(callback){
    let arr = [];
    for(let i = 0; i < this.length; i++){
        arr.push(callback(this[i],i));
    }
    return arr;
}


// filter过滤 返回ture表示当前项留下，返回false表示不留
Array.prototype.myFilter = function(callback){
    let arr = [];
    for(let i = 0; i < this.length; i++){
        callback(this[i],i) ? arr.push(this[i]):void 0;
    }
    return arr;
}

let filterArr = [1,2,3,4,5].myFilter(function(item,index){
    if(item>3)return true
});
console.log(filterArr);

// find只会找一个  找到后返回的是当前项   找不到返回undefined,找到后停止'
let item = [1,2,3,45,6,7].find(function(){
    return item > 6
})
console.log(item);


// some 和every 是一对 
// some是找true找到了返回true  
[1,2,34,5,6,6,6].some(function(item, index){
    return item ===6;//值调5次，以为第五次就找到了
});

// every找false找到了就返回false
let flag = [1,2,3].every(function(item,index){
    console.log('11111');
    return item===1
});
console.log(flag);


// 数组的includes 数组的indexOf 
let result = [2,3,4,5,6].includes(3);
console.log(result)
