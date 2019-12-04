function Father(name) {
  this.name = name
  this.color = ['red', 'bule']
}

Father.prototype.sayName = function() {
  console.log(this.name)
}

function Son(name, age) {
  Father.call(this, name)
  this.age = age
}

Son.prototype = new Father()
Son.prototype.sayAge = function() {
  console.log(this.age)
}

var instance1 = new Son('yk', 18)
var instance2 = new Son('xjj', 19)

instance1.color.push('white')
console.log(instance1.color)
instance1.sayName()
instance1.sayAge()
console.log(instance2.color)
instance2.sayName()
instance2.sayAge()

