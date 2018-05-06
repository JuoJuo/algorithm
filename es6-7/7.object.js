// Object.assign

// super的用法
let obj1 = {
    name: 'jack',
    getFather() {
        return super.name
    }
}

let obj2 = {
    name: 'rose',
    sex: 'male'
}

// Object.setPrototypeOf ==> obj1._proto_ = obj2
Object.setPrototypeOf(obj1, obj2)

console.log(obj1.sex)
console.log(obj1.name)
console.log(obj1.getFather())


Object.defineProperties(obj, 'name', {
    value: 'jack',
    // 不写默认是不可枚举的
    enumerable: true,
    // 与get set冲突
    writeble: true,
    configurable: true,
    set: function () {

    },
    get: function () {
    }
})



Object.defineProperties(obj, 'name', {
    // 与get set冲突
    value: 'jack',
    // 与get set冲突
    writable: true,

    // 不写默认是不可枚举的
    enumerable: true,
    configurable: true,
    set: function () {

    },
    get: function () {

    }
})