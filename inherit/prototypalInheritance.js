function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

var person = {
  name: 'yk'
}

var anotherPerson = Object.create(person, {
  name: {
    value: 'xjj'
  }
})


console.log(anotherPerson.name)