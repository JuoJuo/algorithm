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