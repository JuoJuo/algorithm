let fs = require('fs')


// 其他编码转utf8时候，会加一个bom

// ef bb bf
function stripBOM(content) {
    if (Buffer.isBuffer(content)) {
        if (content[0] === 0xEF && content[1] === 0xBB && content[2] === 0xBF) {
            return content.slice(3)
        }
    } else {
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1)
        }
        return content;
    }
}
console.log(fs.readFileSync('./1.txt'))
console.log(fs.readFileSync('./1.txt', 'utf8'))

console.log(stripBOM(fs.readFileSync('./1.txt')))
console.log(stripBOM(fs.readFileSync('./1.txt', 'utf8')))


// iconv-lite
// iconv.decode(content, 'gbk')
// buf乱码问题
let bf = Buffer.from('李仁杰')
console.log(bf.slice(0, 5).toString())
console.log(bf.slice(5).toString())

// string_decoder用来解决输出问题，不认识的不输出，先存着
let { StringDecoder } = require('string_decoder')
let sd = new StringDecoder()
console.log(sd.write(bf.slice(0, 5)).toString())
console.log(sd.write(bf.slice(5)).toString())
















