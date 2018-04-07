// {"吃屎"， [callback1, callback2]}
function EventEmmiter() {
    this._events = Object.create(null);
}

EventEmmiter.prototype.prependListenr = function(type, callback){
    this.on(type, callback, true)
}

EventEmmiter.prototype.prependOnceListenr = function(type, callback){
    this.once(type, callback, true)
}

EventEmmiter.prototype.on = function (type, callback, flag) {
    // 给继承它的那个类加一个属性
    if (!this._events) {
        this._events = Object.create(null)
    }
    // 做newListner方法
    if (type !== 'newListenr') {
        this._events['newListenr'] && this._events['newListenr'].forEach(() => {
            listener(type);
        })
    }


    if (this._events[type]) {
        if (flag) {
            this._events[type].unshift(callback)
        } else {
            this._events[type].push(callback)
        }
        
    } else {//没有的话
        this._events[type] = [callback]
    }

    if (this._events[type].length === this.getMaxListeners() + 1) {
        console.log('内存泄漏')
    }
}
EventEmmiter.prototype.emit = function (type, ...args) {
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...args)
        })
    }
}

EventEmmiter.prototype.removeListener = function (type, callback) {
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(function (listener) {
            // 返回false就是不要的
            return callback !== listener && callback.l !== listener
        })
    }
}

EventEmmiter.prototype.once = function (type, callback, flag) {
    //绑定，但是callback调用一次就删除
    function wrap(){
        callback(...arguments);
        this.removeListener(type, wrap);
    }
    wrap.l = callback;
    this.on(type, wrap, flag)
}

EventEmmiter.prototype.removeAllListener = function(){
    this._events = Object.create(null)
}

EventEmmiter.prototype.listeners = function(type){
    return this._events[type]
}

EventEmmiter.defaultMaxListeners = 10
EventEmmiter.prototype.addListener = EventEmmiter.prototype.on;
EventEmmiter.prototype.eventNames = function(){
    return Object.keys(this._events)
}
EventEmmiter.prototype.setMaxListeners = function(n){
    this._count = n;
}
EventEmmiter.prototype.getMaxListeners = function(){
    return this._count ? this._count : this.defaultMaxListeners;
}

let util = require('util')
let events = new EventEmmiter();

function Girl() { }

util.inherits(Girl, EventEmmiter)

let girl = new Girl();

girl.on('吃屎', function () {
    console.log(111)
})

girl.emit('吃屎')
console.log(girl._events)