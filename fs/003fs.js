let fs = require('fs')
let path = require('path')

// fs.mkdirSync
// 必须保证父级存在才能创建
fs.mkdir('a', function () {

})



// ----------------同步------------不推荐
function makep(dir) {
    let paths = dir.split('/');
    for (let i = 1; i < paths.length; i++) {
        let newPath = paths.slice(0, i).join('/')
        // [a] [a,b] [a,b,c]
        try {
            fs.accessSync(newPath, fs.constants.R_OK)
        } catch (e) {
            fs.mkdirSync(newPath)
        }
    }
}

makep('a/b/c/d/e')



let fs = require('fs')
let path = require('path')
// ----------------异步------------
function makep(dir, callback) {
    let paths = dir.split('/');
    function next(index) {
        if (index > paths.length) {
            callback()
            return
        }
        let newPath = paths.slice(0, index).join('/')
        fs.access(newPath, (error) => {
            if (error) {
                fs.mkdir(newPath, (err) => {
                    next(++index)
                })
            } else {
                // 如果这个文件夹存在，就往下一个走--存在有些文件夹存在，有些不存在的情况
                next(++index)
            }
        })
    }
    next(1)
}

makep('a/b/c/d/e', function () {
    console.log('done')
})





let fs = require('fs')
let path = require('path')

// fs.rmdirSync('a')
// fs.rmdir('a')

// 删文件的
// fs.unlink('a.js')
// fs.unlinkSync('a.js')

fs.stat('a', (err, stat) => {
    console.log(stat)
    console.log(stat.isDirectory())
    console.log(stat.isFile())
    // 读取当前文件夹下的内容
    fs.readdir('a', (err, files) => {
        console.log(files)
    })
})
// fs.statSync()


function removeDir(dir) {
    let files = fs.readdirSync(dir)
    for (let i = 0; i < files.length; i++) {
        let newPath = path.join(dir, files[i])
        fs.stat(newPath, (err, stat) => {
            if (stat.isDirectory()) {
                removeDir(dir)
            } else {
                fs.unlinkSync(newPath)
            }
        })
    }
    fs.rmdirSync(dir)
}


function removeDirAsync(dir) {
    return new Promise(function (resolve, reject) {
        fs.stat(dir, function (err, files) {
            if (stat.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    // 拼接全路径
                    files = files.map(file => path.join(dir, file))
                    // 目录下的每一个都再remove一下，是文件的直接删
                    files = files.map(file => removePromise(file))
                    Promise.all(files).then(function () {
                        fs.rmdir(dir, resolve)
                    })
                })
            } else {
                fs.unlink(dir, resolve)
            }
        })

    })
}

removeDirAsync('a/b/c/d/e').then(() => {
    console.log(111)
})










