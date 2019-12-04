function Father() {
  this.color = ['red', 'bule', 'yellow']
}

function Son() {
  Father.call(this) //继承了Father,且向父类型传递参数
}

var instance = new Son()

instance.color.push('white')

console.log(instance.color)

var instance2 = new Son()

console.log(instance2.color)