// 在浏览器，全局作用于用window访问
// 在node里用global
// node在执行的时候，为了实现模块增加了一个闭包
var a = 1;
console.log(global.a);

//标准输出-----1表示
console.log('log')
console.info('info')

//错误输出-----2表示
console.warn('warn')
console.error('error')


console.dir(Array.prototype, { showHidden: true });
console.time("起名")
console.timeEnd("同名")

//断言------有错会抛出一个AssertException  测试mocha kamra
//chai TDD BDD 持续集成  测试覆盖率
console.assert((1+1 === 2), 'error')


console.log(global)
// process进程   
    // argv  后续执行时传参
    // pid 进程id 端口占用情况  任务管理器lsof -i 8080 kill -9 id号
    // chdir change directory 工作目录
    console.log(process.cwd())
    process.chdir('..')//改变运行的目录
    // cwd  current working directory 当前工作目录
    console.log(process.cwd())//因当前执行的目录的变化而变化
    console.log(__dirname)
    // nextTick 微任务node中
    // 浏览器中的微任务   then   messageChannel mutationOBserver
    // 宏任务
    // setTimeout setInterval setImmediate
    // stdout stderr stdin
    process.stdout.write()  //==> console.log()
    process.stderr.write()  //==> console.error()
// Buffer 存储文件内容
// setImmediate  setInterval setTimeout



// 浏览器调试node --inspect-brk ./node/1.node.js


























