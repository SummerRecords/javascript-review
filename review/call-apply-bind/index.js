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
person.showName();  // heluo wode

// 通过call、apply、bind可以做一些事情：
var animal = {
  name: 'cat'
}