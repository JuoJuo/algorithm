// es 6
import sum from './sum';
// COMMONJS
const minus = require('./minus');

//AMD----因为multi是异步加载模块,打包后会多一个js，
require(['./multi'], function(muti){
    console.log(muti(2, 2));
});


console.log(sum(1, 1));
console.log(minus(9, 1));

