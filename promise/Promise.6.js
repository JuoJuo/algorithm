function Promise(executor){

    let self = this;
    self.status = 'pending';
    self.value = undefined;//默认成功的值
    self.reason = undefined;//默认失败的原因
    self.onResollvedCallbacks = [];//存放成功的回调
    self.onRejectedCallbacks = [];//存放失败的回调

    function resolve(value){//成功状态
        if(self.status === 'pending'){
            self.status = 'resolved';
            self.value = value;
            self.onResollvedCallbacks.forEach(function(fn){
                fn()
            });
        }
    }
    function reject(reason){//失败状态
        if(self.status === 'pending'){
            self.status = 'rejected';
            self.reason = reason;      
            self.onRejectedCallbacks.forEach(function(fn){
                fn()
            });
        }
    }
    try {
        executor(resolve, reject);
    } catch (error) {//如果executor执行过程有异常
        reject(error)
    }
}

function resolvePromise(promis2, x, resolve, reject) {
    // 防止自己返回自己，循环引用
    if(promis2 === x){
        return reject(new TypeError('循环引用'))
    }
    let called;//标识是否已经调用过了成功或者失败

    // 如果x是一个promise，function防止return一个匿名函数，里面包一个new Promise
    if (x!== null || (typeof x === 'object' || typeof x === 'function')) {
        //可能是真正的promise，可能是碰巧有个对象也叫promise ，也有then方法
        // 兼容写法
        try {
            let then = x.then;
            if(typeof then === 'function'){
                if(called) return;
                called = true;
                // 返回给我们的promise已经执行了，
                // 此处我们添加了两个成功的回调跟失败的回调。
                // 目的是为了处理接下来的then
                then.call(x, function(datay){
                    // 如果resolve里传的依然是一个promise，延伸如果每一个都是传的promise
                //   datay如果不是一个promise，下一次直接就走到65行了。
                    resolvePromise(promis2, datay, resolve, reject)
                },function(error){
                    if(called) return;
                    called = true;
                    // 它自己在executor里失败了，我们还是要处理成调用下一个then里的reject
                    reject(error)
                });
            } else {
                // 不是函数直接掉下一个promise的then
                resolve(x);
            }
        } catch (error) {
            if(called) return;
            called = true;
            reject(error)
        }
    }
}

Promise.prototype.then = function(onFulfilled, onRejected){
    // ---------------值的穿透
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:function(value){
        return value;
    }
    onRejected = typeof onRejected === 'function'?onRejected:function(err){
        throw err
    }
    let self = this;
    let promise2;
    
    if(self.status === 'resolved'){
        promise2 = new Promise(function(resolve, reject){
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    // resolve(x)本来应该直接执行第二次的成功回调
                    // 但是现在有可能返回值是promise，允许其他人乱写。。。
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(e)
                }
            });
        });
    }
    if(self.status === 'rejected'){
        promise2 = new Promise(function(resolve, reject){
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            });
        });
    }
    if(self.status === 'pending'){
        // 此时既没有resolve也没有reject
        promise2 = new Promise(function(resolve, reject){
            self.onResollvedCallbacks.push(function(){
                // 上一次then的成功回调执行过程中报错，应该执行下一个then的reject
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            });
            self.onRejectedCallbacks.push(function(){
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                });
            });
        });
    }
    return promise2;
}

// 场景
// promise里规范要求，所有的then中的回调都需要异步执行，
// 所以我们给加上setTimeOut

let p = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve(111);
    });
})

p.then().then().then()
.then(function(data){
    console.log(data)
    return new Promise(function(resolve, reject){
        resolve(200)
    })
},function(err){
    console.log(err);
})
.then(function(data){
    console.log(123);
    console.log(data);
},function(err){
    console.log(err);
});
