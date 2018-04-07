let fs = require('fs')
let path = require('path')

// copy
// fs.readFile(path.resolve(__dirname, '1.txt'), { flag: 'r' }, (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     fs.writeFile(path.resolve(__dirname, '3.txt'), data, function(err){
//         if (err) {
//             console.log(err)
//             return
//         }
//     })
// })

// node版本起码8.5
// fs.copyFile(path.resolve(__dirname, '1.txt'), path.resolve(__dirname, '3.txt'), (err) => {
//     console.log('拷贝成功')
// })


// 自己控制读取文件
// fd file descriptor 文件描述符 他代表对当前文件的描述
// process.stdout.write()  标准输出  1
// process.stderr.write()  错误输出  2
// let buffer = Buffer.alloc(3)
// fs.open(path.resolve(__dirname, '1.txt'), 'r', 0o666, function (err, fd) {
//     // offset表示的就是buffer从那个开始存储
//     // length就是一次想读几个
//     // positon代表的是文件读取位置，默认可以写null 当前位置从0开始
//     // length不能大于buffer的长度
//     fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytesRead) {
//         // bytesRead实际读取到的个数
//         console.log(err, buffer.toString())
//     })
// })

// ------------------------写入---a append使用了之后positon就无意义了   r+一边读一边改（用于替换内容）-------------------
fs.open(path.resolve(__dirname, '1.txt'), 'w', 0o666, function (err, fd) {
    // offset表示的就是buffer从那个开始存储
    // length就是一次想读几个
    // positon代表的是文件读取位置，默认可以写null 表示当前位置开始
    // length不能大于buffer的长度
    fs.write(fd, Buffer.from('测试'), 0, 3, 0, function (err, bytesWriten) {
        // bytesRead实际读取到的个数
        console.log(err)
    })
})



let fs = require('fs')
let path = require('path')

function copy2() {
    let size = 3;
    let buffer = Buffer.alloc(size);

    fs.open(path.resolve(__dirname, '1.txt'), 'r', 0o666, function (err, rfd) {
        fs.open(path.resolve(__dirname, '4.txt'), 'w', 0o666, function (err, wfd) {
            function next() {
                // 读到buffer里的
                fs.read(rfd, buffer, 0, size, null, function (err, bytesRead) {
                    if (bytesRead > 0) {
                        // 把buffer里的内容写出去
                        fs.write(wfd, buffer, 0, bytesRead, null, function (err, bytesWriten) {
                            next()
                        })
                    } else{
                        fs.close(rfd, function(){})
                        fs.fsync(wfd, function(){
                            fs.close(wfd, function(){
                                console.log('完了')
                            })
                        })
                    }
                })
            }
            next()
        })
    })
}

copy2();




// ---------------------------------------------


fs.open(path.resolve(__dirname, '1.txt'), 'w', 0o666, function (err, fd) {
    fs.write(fd, Buffer.from('测试'), 0, 3, 0, function (err, bytesWriten) {
        // 回调触发的时候，并不是真正的文件写入， 先把内容写入缓充区
        // 强制将缓存区的内容写入文件，然后关闭打开的文件
        fs.fsync(fd, function(){
            fs.close(fd, function(){
                console.log('关闭')
            })
        })
    })
})
















