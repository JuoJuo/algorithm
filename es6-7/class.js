function Parent() {
    this.name = 'ljdfkladsjfkl';
}

Parent.prototype.smoking = function () {
    console.log('somking')
}

function Child() {

}

// 这样做呢，this跟prototype上的属性都被继承了，而且constructor也不对
Child.prototype = new Parent();
console.log(new Child().__proto__.__proto__ == Parent.prototype);



// 这样就值继承了原型上的东西
Child.prototype = Object.create(Parent.prototype, { constructor: { value: Child } });

// 自己实现
function create(proto, config) {
    function Fn() { }
    Fn.prototype = proto;
    let fn = new Fn();
    fn.constructor = config.constructor.value;
    return new Fn;
}

