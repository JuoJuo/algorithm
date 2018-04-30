class Observer {
    constructor(data){
        this.observe(data);
    }
    observe(data){
        // 要对这个data数据将原有的数据属性改成set和get的形式
        if(!data || typeof data !== 'object'){
            return;
        }
        // 要将数据意义劫持
        // 先获取到data的key 和value
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data, key, data[key]);
            this.observe(data[key])
        })

    }
    // 定义响应式
    defineReactive(obj, key, value){
        // obj.key = value;
        let that = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get(){
                return value;
            },
            set(newValue){
                if(newValue !== value){
                    that.observe(newValue)//（如果是对象，继续劫持）处理在运行过程中重新赋值的情况
                    value = newValue;
                    dep.notify();
                }
            }
        })
    }
}

class Dep {
    constructor(){
        this.subs = [];
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach((watcher) => {
            watcher.update();
        })
    }
}