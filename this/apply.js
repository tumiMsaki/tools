Function.prototype.nApply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};

let foo = {
  value: "yk"
}

var value = 1

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

bar.nApply(foo)
