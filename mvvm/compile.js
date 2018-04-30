class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        //如果这个元素能获取到， 我们才开始编译
        // 1.先把这些真实的DOM移入到内存中   fragment
        let fragment = this.node2fragment(this.el);

        // 2.编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
        this.compile(fragment);

        // 3.把编译好的fragment塞回到页面中去
        this.el.appendChild(fragment);
    }

    /* 辅助方法 */
    isElementNode(node) {
        return node.nodeType === 1
    }


    /* 核心方法 */
    node2fragment(el) {
        // 文档碎片
        let fragment = document.createDocumentFragment()
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment;
    }

    isDirective(name) {

    }

    compile(fragment) {
        // childNodes只有第一层，需要递归拿里面，与node2fragment中的 el.firstChild有区别
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(() => {
            if (this.isElementNode(node)) {
                // 元素
                console.log('element', node)
                this.compileElement(node)
                this.compile(node);
            } else {
                //文本节点
                console.log('text', node)
                this.compileText(node)
            }
        })
    }

    compileElement(node) {
        // v-model v-xxx
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            // 判断是否包含v-
            let arrtName = attr.name;
            if (this.isDirective(attrName)) {
                // 取到对应的值， 放到节点中
                let expr = attr.value;
                // let type = attrName.slice(2)
                let [, type] = attrName.split('-');
                // node this.vm.$data expr
                // todo .............
                CompileUtil[type](node, this.vm, expr);
            }
        });
    }

    compileText(node) {
        // {{}}
        let text = node.textContent//取文本中的内容
        // {{a}} {{b}} {{c}}
        let reg = /\{\{([^}]+)\}\}/g
        if (reg.text(text)) {
            // node this.vm.$data text
            // todo
            CompileUtil['text'](node, this.vm, expr);
        }
    }
}


CompileUtil = {
    getVal(vm, expr) {
        // [a.b.b.c.c.c]
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data)

    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return arguments[1];
        });
    },
    text(node, vm, expr) {//文本
        let updateFn = this.updater['textUpdater'];
        let value = this.getTextVal(vm, arguments[1]);
        // vm.$data[expr]

        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], () => {
                updateFn && updateFn(node, getTextVal())
            })
        });
        
        updateFn && updateFn(node, value)
    },
    model(node, vm, expr) {//model
        let updateFn = this.updater['modelUpdater'];
        // let value = this.getTextVal(vm, arguments[1]);
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, getVal(vm, value))
        })
        updateFn && updateFn(node, getVal(vm, value))
    },
    update: {
        // 文本更新
        updateText(node, value) {
            node.textContent = value
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value
        }
    }
}