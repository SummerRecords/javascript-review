// 作用
// 首先问个问题，这三个函数的存在意义是什么？答案是改变函数执行时的上下文，再具体一点就是改变函数运行时的this指向。有了这个认识，接下来我们来看一下,怎么使用这三个函数。
function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  showName: function () {
    console.log(this.name);
  }
}
var person = new Person('heluo wode');
person.showName(); // heluo wode

// 通过call、apply、bind可以做一些事情：
var animal = {
  name: 'cat'
}
person.showName.call(animal); // cat
person.showName.apply(animal); // cat
person.showName.bind(animal)(); // cat


// call、apply与bind的差别:
// call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。

// call、apply的区别:
// 他们俩之间的差别在于参数的区别，call和aplly的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。
// fn.call(obj, arg1, arg2, arg3...);
// fn.bind(obj, arg1, arg2, arg3...)();
// fn.apply(obj, [arg1, arg2, arg3...]);



// 应用：

// 求数组中的最大和最小值
var arr = [34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687];
// 常规方法：
Math.max(34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687);
Math.min(34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687);
// apply/call/bind:
Math.max.apply(Math, arr);
Math.max.call(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687);
Math.max.bind(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)();
Math.min.apply(Math, arr);
Math.min.call(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687);
Math.min.bind(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)();
// 很显然apply是最佳方法
