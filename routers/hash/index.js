class HashRouter {
  constructor() {
    this.router = {}
    window.addEventListener('hashchange', this.load.bind(this), false)
  }

  register(hash, cb) {
    this.router[hash] = cb
  }

  registerIndex(cb) {
    this.router['index'] = cb
  }

  registerNot(cb) {
    this.router['404'] = cb
  }

  registerError(cb) {
    this.router['error'] = cb
  }

  load() {
    let hash = location.hash.slice(1)
    let handler
    if (!hash) {
      handler = this.router.index
    } else if (!this.router.hasOwnProperty(hash)){
      handler = this.router['404']
    } else {
      handler = this.router[hash]
    }
    try {
      handler.call(this)
    } catch (err) {
      this.router['error'].call(this)
    }
  }
}


let router = new HashRouter()
let container = document.querySelector('.container')

router.registerIndex(() => container.innerHTML = 'home')

router.register('/page1', () => container.innerHTML = 'page1')
router.register('/page2', () => container.innerHTML = 'page2')
router.register('/page3', () => container.innerHTML = 'page3')
router.register('/page4', () => { throw new Error('233333')})

router.load()

router.registerNot(() => container.innerHTML = '404')
router.registerError(() => container.innerHTML = '23333')