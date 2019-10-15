function EventEmitter() {
  this._event = {

  }
}

EventEmitter.maxLiteners = 10

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener) {
  if (!this._event) {
    this._event = Object.create(null)
  }
  if (this._event[type]) {
    this._event[type].push(listener)
  } else {
    this._event[type] = [listener]
  }
}

EventEmitter.prototype.emit = function(type, ...args) {
  if (this._event[type]) {
    this._event[type].forEach(listener => {
      listener.call(this, ...args)
    });
  }
}

EventEmitter.prototype.once = function(type, listener) {
  const _this = this

  function only(...args) {
    listener.call(this,...args)
    _this.removeListener(type, only)
  }

  only.origin = listener
  this.on(type, only)
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener =  function(type, listener) {
  if (this._event[type]) {
    this._event[type] = this._event[type].filter(fn => {
      return fn !== listener && fn.origin !== listener
    })
  }
}


module.exports = {
  EventEmitter
}

//for Example

req = new EventEmitter()

req.on('data', (data) => {
  console.log(data)
})

req.on('data', (data) => {
  console.log('do it 2',data)
})

req.on('end', (data) => {
  console.log(data)
})

req.once('once', (data) => {
  console.log(data)
})

req.emit('data', 'this is data')
req.emit('end', 'this is data_2')
req.emit('once', 'this is a data but only once')
console.log(req._event)