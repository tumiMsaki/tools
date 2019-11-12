Object.prototype.observer = {
  subscribers: {},

  subscribe: function(type, fn) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = []
    }
    this.subscribers[type].push(fn)
  },

  unsubscribe: function(type, fn) {
    this.subscribers[type] = this.subscribers[type].filter(item => {
      return item !== fn
    })
  },

  publish: function(type, ...args) {
    this.subscribers[type].forEach(fn => {
      fn(...args)
    })
  }
}

const Tom = {
  read: function(news) {
    console.log("read", news)
  },
  speak: function(news) {
    console.log("speak:", news)
  }
}

const Jack = new Object()

Jack.observer.subscribe("new1", Tom.read)
Jack.observer.subscribe("new2", Tom.speak)

Jack.observer.publish("new2", "cqupt")
console.log(Jack.observer.subscribers)
