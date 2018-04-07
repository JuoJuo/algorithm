let fs = require('fs')
let path = require('path')

// 读取文件的时候默认编码就是null null代表的就是二进制
// flag r读取  w写入 s同步 +增加相反操作 x排他
fs.readFile(path.resolve(__dirname, '1.txt'), { flag: 'r' }, (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
})

// 以什么编码格式写入到文件内encoding， mode权限相关
fs.writeFile(path.resolve(__dirname, '2.txt'), 'hello', { mode: '0o444', })