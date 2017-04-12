# hook()
Through `hook` hook of call mechanism, can easy help you call to the construction module.

Create an organizational structure module, the prototype of the original writing method with reference to the original JavaScript written to facilitate the hook call this module prototype chain object. Note: This module is a custom constructor, as follows:
```js
function static () {};
static.prototype.success = function (a,b) {
    return b === a;
}
```

<a name="hook" href="#hook">#</a> reo.<b>hook</b>(object)

If you call a module module, there is no manual definition of the `then ()` method, it will lose the module to call the prototype chain object, so when calling the module, there must be the method.
Repeatedly call the module, in order not to change the module within the `this` pointer, you need to customize the `hook` method. The customization method is as follows:
```js
var hook = reo.hook({
    module : 'static', 
    val : 3 
});
```
<a name="then" href="#then">#</a> hook.<b>then</b>(fn())

Customize the hook hook, then pass the parameters into the module.
```js
var own_then = hook.then(function ( msg ) {
    return msg + 3;  //  6
},function ( msg ) {
    return msg + 5;  //  8
});
```

<a name="on" href="#on">#</a> own_then.<b>on</b>(params,fn())

Get the return of the parameters, through the on method call success module, and then pass the parameters into the success module inside.
```js
own_then.on('success', function (api, msg1, msg2){
	api(msg1, msg2);
});
```