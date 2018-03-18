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
    if(self.status === 'resolved'){
        onFulfilled(self.value);
    }
    if(self.status === 'rejected'){
        onRejected(self.reason);
    }
    if(self.status === 'pending'){
        // 此时既没有resolve也没有reject
        self.onResollvedCallbacks.push(function(){
            onFulfilled(self.value);
        });
        self.onRejectedCallbacks.push(function(){
            onRejected(self.reason);
        });
    }
}

//场景
let p = new Promise(function(resolve, reject){
    setTimeout(() => {
        resolve("来了")
    }, 3000);
})
p.then(function(data){
    console.log(data)
},function(err){

})

p.then(function(data){
    console.log(data)
},function(err){

})

// then的时候可能没resolve也没有reject
//1.promise可以then多次，当成功后，会将then中成功方法，按照顺序执行
// 我们可以先将then中成功的回调和失败的毁掉存到数组内，当成功时调用成功的数组即可
