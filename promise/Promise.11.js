let bluebird = require('bluebird');
let fs = require('fs');
let read = bluebird.promisify(fs.readFile);


// async await  ====>  generator + co 

// async修饰函数， await后面必须是primise
async function r(params) {
    let content1 = await read('./2.promise/1.txt');
    let content2 = await read(content1)
    return content2
}
r().then(function(data){
    console.log(data)
})