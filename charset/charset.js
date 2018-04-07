
// 2进制 8进制 16进制
console.log(0b11)
console.log(0o11)
console.log(0x11)

parseInt('11111', 2);
'111111'.toString(16)

// unicode -> utf8
console.log(0x73E0.toString(2))//111 001111 100000

// unicode中文2字符串
// 1110xxxx 10xxxxxx 10xxxxxx utf8三个 前面的为了标识的utf8格式
// 转成urf8就是填坑1110xxxx 10xxxxxx 10xxxxxx, 把之前的二进制111 001111 100000依次填进去,不够补零
//111001111 10001111  10100000 utf8二进制
// 16进制的表示
console.log(0b11100111.toString(16))
console.log(0b10001111.toString(16))
console.log(0b10100000.toString(16))
// e7 8f a0

function transfer(code) {
    let arrs = ['1110', '10', '10'];
    let c = code.toString(2)
    arrs[2] = arrs[2] + c.slice(c.length - 6)
    arrs[1] = arrs[1] + c.slice(c.length - 12, c.length - 6)
    arrs[0] = arrs[0] + c.slice(0, c.length - 12).padStart(4, 0)
    arrs = arrs.map(item => parseInt(item, 2).toString(16))
    console.log(arrs)
}
transfer(0x59DC)