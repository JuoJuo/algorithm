// 模板字符串
let name = '张三'
let str = `this is not ${name}`;




let str2 = 'this is not ${name}';

str2.replace(/\$\{([^}]+])\}/g, function(){
    return eval(arguments[1])
})

console.log(str2);


//模板字符串可以换行
let arr = ['珠峰',9];
// map 映射 可以将数字映射成一个新数组
let newArr = arr.map(function(){
    return `<li>
        <span>${item}</span>   
    </li>`
});

console.log(newArr);
str2 = `<ul>
            ${newArr.join('')}
        </ul>`;

// 代表的模板字符串
let name = 'zfpx';
let age = 9;
let str333 = `this is not ${name}`;
console.log('要求在${}前后都加个(),但手动操作太麻烦');

// tag名字随便起的   ...剩余运算符智能在函数最后使用（万一 ${name}太多，但又不确定有多少个）
function tag(arrs, ...args) {
    let args = Array.prototype.slice.call(arguments, 1)
    console.log(arrs)
    console.log(args)
    let str = '';
    for(let i; i<args.length; i++) {
        str+= arrs[i] +  args[i]
    }
    return str;
}
let newStr = tag`this is not ${name}`;
console.log(newStr)


// includes  endsWith startsWith
let str = 'zfpx'
// str.indexOf > -1麻烦 -------> str.includes直接布尔值
// padStart 补0 padEnd  补0操作
let date = new Date();
let str = `${date.getFullYear()}年${(date.getMonth()+1).toString().padStart(2,0)}月${date.getDate()}`;
console.log(str);

