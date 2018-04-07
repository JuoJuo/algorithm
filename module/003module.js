// 把找到的文件模块缓存起来

let path = require('path')
let fs = require('fs')
let vm = require('vm')

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

Module.wrapper = [
    "(function(exports, require, module, __dirname, __filename){", "})"
]

Module.wrap = function(script) {
    return Module.wrapper[0] + script +  Module.wrapper[1];
}

Module._extentions['js'] = function(module){
    let script = fs.readFileSync(module.filename)
    let fnStr = Module.wrap(script)
    console.log(fnStr)
    vm.runInThisContext(fnStr).call(module.exports, module.exports, req, module)
    
}
Module._extentions['json'] = function(module){
    let script = fs.readFileSync(module.filename)
    module.exports = JSON.parse(script)
}

Module.prototype.load = function(filename){
    // 可能是js  可能是json
    let ext = path.extname(filename).slice(1);
    Module._extentions[ext](this)
}

function req(filename) {//filename是文件名 文件名可能没又后缀
    // 我们需要弄出一个绝对路径来，缓存是根据绝对路径来的
    // a 1.js b 1.js
    filename = Module.resolvePathname(filename)
    console.log(filename)
    // 看缓存里是否有这个模块
    let cacheModule = Module._cache[filename]

    if (cacheModule) {
        return cacheModule.exports
    }
    // 没又缓存，就创建模块，并缓存
    let module = new Module(filename);
    module.load(filename);
    Module._cache[module.filename] = module;
    return module.exports;
}

let result = req('./school');
let result2 = req('./school');
console.log(result)
console.log(result2)
