// 在 ES5 中，其实 this 的指向，始终坚持一个原理：this 永远指向最后调用它的那个对象


// eg:1
var name = "windowsName";
function a() {
    var name = "Cherry";
    console.log("inner:" + this);    // inner: [object Window]
    console.log(name);             // Cherry
    console.log(this.name);          // windowsName
}
a();
console.log("outer:" + this)         // outer: [object Window]

// 严格模式下
"use strict";
var name = "windowsName";
function a() {
  var name = "Cherry";
  console.log("inner:" + this);  // inner:undefined
  console.log(name);             // Cherry
  console.log(this.name);          // Cannot read property 'name' of undefined
}
console.log("outer:" + this)  // outer:[object Window]
a();
// 这个相信大家都知道为什么 log 的是 windowsName，因为根据刚刚的那句话“this 永远指向最后调用它的那个对象”，我们看最后调用 a 的地方 a();，前面没有调用的对象那么就是全局对象 window，这就相当于是 window.a()；注意，这里我们没有使用严格模式，如果使用严格模式的话，全局对象就是 undefined，那么就会报错 Uncaught TypeError: Cannot read property 'name' of undefined。


// eg:2
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();
// 在这个例子中，函数 fn 是对象 a 调用的，所以打印的值就是 a 中的 name 的值


// eg:3
var name = "windowsName";
var a = {
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // undefined
    }
}
a.fn();
// 这里为什么会打印 undefined 呢？这是因为正如刚刚所描述的那样，调用 fn 的是 a 对象，也就是说 fn 的内部的 this 是对象 a，而对象 a 中并没有对 name 进行定义，所以 log 的 this.name 的值是 undefined。


// eg:4
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // windowsName
    }
}
var f = a.fn;
f();
// 这里你可能会有疑问，为什么不是 Cherry，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，再接着跟我念这一句话：“this 永远指向最后调用它的那个对象”，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。


// eg:5
var name = "windowsName";
function fn() {
    var name = 'Cherry';
    innerFunction();
    function innerFunction() {
        console.log(this.name);      // windowsName
    }
}
fn();
// this 永远指向最后调用它的那个对象





// 改变 this 的指向
var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        },100);
    }
};
a.func2();     // this.func1 is not a function
// 在不使用箭头函数的情况下，是会报错的，因为最后调用 setTimeout 的对象是 window，但是在 window 中并没有 func1 函数。

// 1、使用 ES6 的箭头函数
var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout( () => {
            this.func1()
        },100);
    }
};
a.func2();     // Cherry

// 2、在函数内部使用 var _this = this
var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        var _this = this;
        setTimeout( function() {
            _this.func1()
        },100);
    }
};
a.func2()       // Cherry

// 3、使用 apply、call、bind
var a = {
  name : "Cherry",
  func1: function () {
      console.log(this.name)
  },
  func2: function () {
      setTimeout(  function () {
          this.func1()
      }.apply(a),100);
      // }.call(a),100);
      // }.bind(a),100);
  }
};
a.func2()            // Cherry