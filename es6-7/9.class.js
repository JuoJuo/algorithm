class Prarent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    static hello() {
        console.log('hello~~~~')
    }
}

class Child extends Prarent {
    constructor(age, name) {
        super(name)// ==> Parent.call()
        this.age = age;
    }
}

let child = new Child('jack')
console.log(child.getName())

Child.hello()
Prarent.hello()