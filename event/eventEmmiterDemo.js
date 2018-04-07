
// 发布订阅模式  node中http  stream都会继承这个模块

let fs = require('fs')
let path = require('path')
let EventEmmiter = require('events')
let events = new EventEmmiter();


let arr = [];

events.on('getData', function(data){
    arr.push(data)
    if (arr.length === 2) {
        console.log(arr)
    }
})


fs.readFile(path.join(__dirname, './aaa.txt'), 'utf8', function(err, data){
    events.emit('getData', data)
})

fs.readFile(path.join(__dirname, './bbb.txt'), 'utf8', function(err, data){
    events.emit('getData', data)
})