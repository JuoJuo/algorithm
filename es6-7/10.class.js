// ----------继承了prototype上的构造里this的，还有静态的
function defineProperies(protoParent, properties) {
    properties.forEach((item, index) => {
        Object.defineProperty(protoParent, item.key, {
            ...item,
            enumerable: true,
            configurable: true,
        })
    });
}

function _createClass(Parent, protoArr, staticArr) {
    if (protoArr) {
        defineProperies(Parent.prototype, protoArr)
    }

    if (staticArr) {
        defineProperies(Parent, staticArr)
    }
}

var Parent = function () {
    function Parent() {
        this.name = 'fdsafdsfdsaf'
    }
    _createClass(Parent, [//原型上放
        {
            key: 'methodName',
            value: function () {
                return this.name;
            }
        }
    ], [//静态
            {
                key: 'staticMethod',
                value: function () {
                    return 'staticMethod'
                }
            }
        ])
    return Parent;
}()

Parent.a = function () {
    console.log('a~a~a~a~a~a~a~a~')
}
function _classCallCheck(instance, Child) {
    if (!(instance instanceof Child)) {
        throw new Error("without new")
    }
}

function _inherits(Child, Parent) {
    // 继承共有的
    Child.prototype = Object.create(Parent.prototype, { constructor: { value: Child } });
    // 继承静态的 ==> Child.__proto__ = Parent
    Object.setPrototypeOf(Child, Parent)
}

var Child = function (Parent) {
    _inherits(Child, Parent)

    function Child(...args) {
        // Parent.call()
        // 因为已经 Child.__proto__ = Parent
        // 所以他们是等价的Object.getPrototypeOf(Child) == Child.__proto__ == Parent
        // 防止没有继承，或者没有传参等异常情况。
        _classCallCheck(this, Child)
        let obj = Object.getPrototypeOf(Child).call(this);
        let that = this;
        // 防止调用父类的构造后，返回一个对象。 我们就吧这个对象给child
        if (typeof obj === 'object') {
            that = obj
        }
        return that;
    }
    return Child;
}(Parent)

// Child()
// Child.a()
// console.log(Parent.prototype)
console.log(new Child().methodName())