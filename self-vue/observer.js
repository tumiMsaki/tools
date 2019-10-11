function defineAllNode(data, key, val) {
  observer(val)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable:true,
    set: function(newVal) {
      if( val === newVal ) {
        return
      }
      val = newVal
      console.log(`listening "${key}",and now it's "${newVal.toString()}"`)
      dep.notify()
    },
    get: function() {
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      console.log(`you look it --> ${val}`)
      return val
    }
  }) 
}

Dep.target = null


function observer(data) {
  if(!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineAllNode(data, key, data[key])
  })
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}