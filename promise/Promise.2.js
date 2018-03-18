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
            onFulfilled(self.value);
        });
    }
    if(self.status === 'rejected'){
        promise2 = new Promise(function(resolve, reject){
            onRejected(self.reason);
        });
    }
    if(self.status === 'pending'){
        // 此时既没有resolve也没有reject
        promise2 = new Promise(function(resolve, reject){
            self.onResollvedCallbacks.push(function(){
                onFulfilled(self.value);
            });
            self.onRejectedCallbacks.push(function(){
                onRejected(self.reason);
            });
        });
    }
    return promise2;
}

//场景

//链式调用，jq靠的返回this，但是promise不能。。。。
// promise靠的是返回一个新的promise
// eg
let p = new Promise(function(resolve, reject){
    resolve();
})

let p2 = p.then(function(){
    throw Error();
},function(){

})
// 如果按照返回this，理论上p跟p2是同一个对象，
// 但是！p是成功态，p2却成了失败态了