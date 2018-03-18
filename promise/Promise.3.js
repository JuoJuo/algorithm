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

Promise.prototype.then = function(onFulfilled, onRejected){
    let self = this;
    let promise2;
    
    if(self.status === 'resolved'){
        promise2 = new Promise(function(resolve, reject){
            try {
                onFulfilled(self.value);
            } catch (error) {
                reject(e)
            }
            
        });
    }
    if(self.status === 'rejected'){
        promise2 = new Promise(function(resolve, reject){
            try {
                onRejected(self.reason);
            } catch (error) {
                reject(error)
            }
        });
    }
    if(self.status === 'pending'){
        // 此时既没有resolve也没有reject
        promise2 = new Promise(function(resolve, reject){
            self.onResollvedCallbacks.push(function(){
                // 上一次then的成功回调执行过程中报错，应该执行下一个then的reject
                try {
                    onFulfilled(self.value);
                } catch (error) {
                    reject(error)
                }
            });
            self.onRejectedCallbacks.push(function(){
                try {
                    onRejected(self.reason);
                } catch (error) {
                    reject(error)
                }
            });
        });
    }
    return promise2;
}

//场景
// 上一次then的成功回调执行过程中报错，应该执行下一个then的reject

let p = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve(111);
    });
})

p
.then(function(data){
    throw new Error("eroooooo")
},function(err){
    console.log(err);
})
.then(function(data){
    console.log(data);
},function(err){
    console.log(err);
});
