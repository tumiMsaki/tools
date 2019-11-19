function nNew() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  const ret = Constructor.apply(obj, arguments);

  return typeof ret === "object" ? ret : obj;
}

function K(name, age) {
  this.name = name
  this.age = age
}

K.prototype.say = function() {
  return `my name is ${this.name}, and I'm ${this.age} years old`
}

const k = nNew(K, "masaki", 20)
console.log(k.name)
console.log(k.age)
console.log(k.say())
