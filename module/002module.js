// 完成加载路径

let path = require('path')
let fs = require('fs')

function Module(filename) {
    this.filename = filename;
    this.exports = {};
}

Module._extentions = ['.js', '.json', '.node'];
Module._cache = {};
Module.resolvePathname = function (filename) {
    let p = path.resolve(__dirname, filename);
    // 判断是否带有后缀
    if (!path.extname(p)) {
        for (let i = 0; i < Module._extentions.length; i++) {
            // 优先js  其次json  最后node
            let newPath = p + Module._extentions[i];
            try{
                fs.accessSync(newPath);
                return newPath
            }catch(e){
                console.log(e)
            }
            
        }

    }
    return p;
}


function req(filename) {//filename是文件名 文件名可能没又后缀
    // 我们需要弄出一个绝对路径来，缓存是根据绝对路径来的
    // a 1.js b 1.js
    filename = Module.resolvePathname(filename)
    console.log(filename)
}

let result = req('./school');
