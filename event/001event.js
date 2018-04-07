let fs = require('fs')
let path = require('path')
let util = require('util')
let EventEmmiter = require('events')
let events = new EventEmmiter();

function Girl(){

}

util.inherits(Girl, EventEmmiter)

let girl = new Girl();

// 后面每一个事件注册，都会调用一下这个回调
girl.on('newListener', function(eventName, callback){
    console.log(eventName)
})


function chishi(){
    console.log('2222222222222222')
    console.log(arguments)
}

// 当绑定新的事件时， 会出发这个函数,on绑定的方法不会马上执行，只有当emit能触发
girl.on('吃屎', chishi)
// 只触发一次
girl.once('吃屎222', chishi)

console.log(girl._events)
// girl.on('吃屎2', chishi)

girl.emit('吃屎', 'param', 'data')
// 移除事件
girl.removeListener('吃屎', callback)
//最大事件,默认只有10个
EventEmmiter.defaultMaxListeners
girl.setMaxListeners(3)
girl.eventNames()
girl.prependListener('吃屎', function(){
    // 先调这个回调，再调其他的
})
girl.prependOnceListener('吃屎', function(){
    // 先调这个回调，再调其他的
})




