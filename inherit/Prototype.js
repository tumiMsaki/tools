function Father() {
  this.fatherProperty = true
  this.color = ['red', 'bule']
}

Father.prototype.sayFatherValue = function() {
  return this.fatherProperty
}

function Son() {
  this.sonPorperty = false
}

Son.prototype = new Father() //Son.prototype被重写,导致Son.prototype.constructor也一同被重写

Son.prototype.saySonValue = function() {
  return this.sonPorperty
}

var instance = new Son()
instance.color.push('white')
var instance2 = new Son()
console.log(instance.color)
console.log(instance2.color)
console.log(instance.sayFatherValue())

//问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
//问题二: 在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数.