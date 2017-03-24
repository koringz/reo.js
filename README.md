# Reo.js
这是一个原生的js库，封装的方法是基于js函数的扩展，不需要其他js插件功能，只要调用reojs库的方法就可以。由于是本月开始写reojs库，所以目前还在测试中，你可以阅读README.md阐述。reojs库感谢大家的支持，如果使用的过程出现了问题，可以交流讨论。

## Idea
Fast Visibale

Simple Call

## API

- `hook` 钩子调用机制，只要调用hook()方法，就能调用原型链的对象或方法，还可传递参数。
- `chain` 链式调用机制，通过chain()入口传递参数，然后用then实现链式调用。
- 超多Reo.js方法正在赶往的途中...

## Documentation

    在调用Reo API方法之前，需要实例一个Reojs库对象方便调用。
```js

// 创建一个Reo对象
var Reo = new Reo();

```
### hook
  通过`hook`钩子的调用机制，能够轻松的帮你调用到构造模块，注意：这个模块是自定义的构造函数，比如：`var static = function () {}`或者`function static () {}`。接着获取模块的原型链对象，原型链的写法主要参照原生JavaScript写法。最后我们可以向原型链的方法里面传递参数。
如果调用一个模块module时，没有手动定义`next()`方法，就会失去调用模块的原型链对象，所以，在调用模块时，一定要有then方法。

  多次调用模块的时候，为了不改变模块内部`this`指针，你需要自定义`hook`方法。自定义方法如：`var hook = Reo.hook()`。通过变量hook你可以在其他地方调用模块的子对象，方便快捷。

例如：

```js
<script>
// 管理组织模块
function static () {};
static.prototype.success = function  (a,b) {
    b.innerText = a;
}

// 定义一个元素
var test01 = document.querySelector('.test01');

// 创建一个管理模块的钩子
var hook = Reo.hook({
    // 模块 function static() {}
    module : 'static', 
    // 原始值 3
    val : 3 
});

// 创建一个返回值
var own_next = hook.next(function ( msg ) {
    // msg 为val初始值 = 3
    return msg + 3;  //  6
},function ( msg ) {
    return msg + 5;  //  8
});

// 获得一个组织对象
own_next.success( msg1, test01, msg2);
// return: 6 
</script>
```
### chain

  在调用`chain()`方法时，方法内部只接收一个对象{...}。此对象内部默认属性为可读、可写，布尔值为true。对象的属性val值是一个数组，对象的module属性值是一个调用的模块名称。
  
  所以，当调用`then()`方法时，会依次从val数组获得参数，并且`then()`内部的第一个参数为必填项。第二个参数message非必填，但是message必须从第二个`then()`方法开始记录。因为message只捕捉上一个`then()`的输出值。然后，第三个参数是`api()`方法，主要是回调作用，`api(...)`括号里面的参数将会被输出。
  
  最后，依次执行`next()`输出`then()`链式的结果。 
  
例如：
```js
<script>
// 定义一个元素
var fontAlgo = document.querySelector('.fontAlgo');

// 创建一个链式方法
var Chain = Reo.chain({
    module : 'next',
    val: [22,3,5] // mes1 = 22 ,mes2 = 3, mes3 = 5
});

// 使用链式调用
Chain.then(function ( mes1 ) {
    return mes1+3;
})
.then(function  ( mes2, massages, api ) {
    api( mes2 + 12);
})
.then(function  ( mes3, massages, api ) {
    api( mes3 + massages );
});

// 依次获得then的返回值
var first = Chain.next(), // 25
    second = Chain.next(), // 15
    third = Chain.next(); // 20

fontAlgo.innerText = first + ',' + second + ',' + third;
// 25,15,20
</script>
```

## License：
Copyright (c) 2017-2025 koringz <ok234@foxmail.com> https://koringz.github.io
