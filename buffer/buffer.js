// buffer是global上的属性，申请内存存放图片视频文本等

// 这种方式内存是干净的，声明比较耗时
let buffer = Buffer.alloc(6)
console.log(buffer)

let ff = Buffer.allocUnsafe(6)
console.log(ff)
// 用什么填 起始位置 结束位置
ff.fill(1, 3, 5)
console.log(ff)

// 通过字符串来申请内存,node中只支持utf8
console.log(Buffer.from('珠峰培训'))

// 通过数组构建buffer
console.log(Buffer.from(Buffer.from([16, 17, 18])))



let buffer = Buffer.alloc(12)
let buf1 = '珠'
let buf2 = '理查德'
// 写入内容，偏移量(从第几个开始写)， 长度（写多长）
buffer.write(buf1, 0, 3, 'utf8')
buffer.write(buf2, 3, 9, 'utf8')
console.log(buffer.toString())

// slice indexOf copy concat split
let arr = [1, 2, 3, 4]
// slice是深还是浅----》[1,[2],3,4]
arr.slice(0, 3)

// buffer和数组中的二维数组是一样的，buffer里存的都是内存地址

let buffer = Buffer.alloc(6, 1)
console.log('1', buffer)
let newBuffer = buffer.slice(0, 3)
console.log('2', buffer)
newBuffer[0] = 100
console.log('3', buffer)
console.log('说明是引用，因为buffer改了')



// copy
let buffer = Buffer.alloc(6)
let buf1 = Buffer.from('李')
let buf2 = Buffer.from('人')
// targetBuffer offset sourceStart sourceEnd
buf1.copy(buffer, 3, 0, 3)
buf2.copy(buffer, 0, 0, 3)
console.log(buffer.toString())



Buffer.prototype.myCopy = function (targetBuffer, offset, sourceStart, sourceEnd) {
    for (let i = 0; i < this.length; i++) {
        targetBuffer[i + offset] = this[i]
    }
}
let buffer = Buffer.alloc(6)
let buf1 = Buffer.from('李')
let buf2 = Buffer.from('人')
// targetBuffer offset sourceStart sourceEnd
buf1.myCopy(buffer, 3, 0, 3)
buf2.myCopy(buffer, 0, 0, 3)
console.log(buffer.toString())


Buffer.concat([buf1, buf2]).toString()
// 多的都是00
Buffer.concat([buf1, buf2], 1000)

Buffer.myConcat = function (list, totalLength) {
    if (list.length === 1) {
        return list[0]
    }
    if (typeof totalLength === 'undefined') {
        totalLength = list.reduce((prev, next) => {
            return prev + next.length;
        }, 0)
    }
    let buf = Buffer.alloc(totalLength)
    let pos = 0;//记忆位置
    list.forEach((buffer, index) => {
        for (let i = 0; i < buffer.length; i++) {
            buf[pos++] = buffer[i]
        }
    });
    buf.fill(0, pos)
    return buf;
}
let buf1 = Buffer.from('李')
let buf2 = Buffer.from('人')
console.log(Buffer.myConcat([buf1, buf2]).toString())
console.log(Buffer.myConcat([buf1, buf2], 1000).toString())
console.log(Buffer.myConcat([buf1, buf2], 1000))

// indexof
let bbb = Buffer.from('a---b---c---d---e')
// 返回的是buffer里长度的index
console.log(bbb.indexOf('---'))
Buffer.prototype.split = function (sep) {
    let arr = [];
    let len = Buffer.from(sep).length
    let index = 0;
    while (-1 !== (index = ths.indexOf(sep, pos))) {
        arr.push(this.slice(pos, index));
        pos = index + len
    }
    arr.push(this.slice(pos))
    return arr;
}


























