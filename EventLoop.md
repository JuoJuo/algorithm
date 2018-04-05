
你能说出下面的输出结果吗？
```javascript
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
(() => console.log(5))();
```
## 一、同步任务和异步任务

- 前面的那段代码，只有最后一行是同步任务，因此最早执行。

## 二、本轮循环和次轮循环

Node 规定，process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。<br>
而setTimeout、setInterval、setImmediate的回调函数，追加在次轮循环。

> 根据语言规格，Promise对象的回调函数，会进入异步任务里面的"微任务"（microtask）队列。
> 微任务队列追加在process.nextTick队列的后面，也属于本轮循环。所以，下面的代码总是先输出3，再输出4。

```javascript
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
```

## 三、事件循环的概念

node只有一个主线程，事件循环是在主线程上完成的。

其次，Node 开始执行脚本时，会先进行事件循环的初始化，但是这时事件循环还没有开始，会先完成下面的事情。

- 同步任务
- 发出异步请求
- 规划定时器生效的时间
- 执行process.nextTick()等等

事件循环会无限次地执行，一轮又一轮。只有异步任务的回调函数队列清空了，才会停止执行。

每一轮的事件循环，分成六个阶段。这些阶段会依次执行。

## (1)timers

这个是定时器阶段，处理setTimeout()和setInterval()的回调函数。操作系统调度或其他回调的运行可能会延迟它们，时间不一定准确。（从技术上讲，Poll阶段控制何时执行定时器。）

## (2)I/O callbacks

这个阶段执行系统操作的回调（如TCP错误类型）。 例如，如果尝试连接时TCP套接字收到ECONNREFUSED，则某些*nix系统要等待报告该错误。这将排队在I / O回调阶段执行。

## (3)idle, prepare

该阶段只供 libuv 内部调用，这里可以忽略。

## (4)Poll

poll阶段主要有两个功能：

1.执行时间到期的定时器回调脚本
2.处理poll队列里的事件

事件循环进入这个阶段后，如果没有到期的定时器，会进入下面两个逻辑：
- 如果poll队列不为空，会迭代这个队列并同步执行队列里的回调，直到队列为空。或者到达这个阶段停留的时间上限。

- 如果poll队列为空
 - 如果设置了setImmediate，事件循环将结束poll阶段，并进入check阶段以执行这些预定脚本。
 
 - 如果没有设置setImmediate，时间循环会阻塞，等待回调被加入poll队列，然后马上执行。
 
 > 一旦poll队列为空，事件循环将检查定时器。 如果定时器时间到了，则事件循环将回退到timer阶段并执行这些定时器的回调。

（5）check

该阶段执行setImmediate()的回调函数。

（6）close callbacks

If a socket or handle is closed abruptly (e.g. socket.destroy()), the 'close' event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().
